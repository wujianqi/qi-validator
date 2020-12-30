import methods from './methods';
import messages, { targetDefault } from './messages';
import Chain, {
  StructObject, TypeStruct, Method, AsyncMethod,
  ResultObject, Callback, TypeMessages
} from './chain';
export { 
  Method,  AsyncMethod, ResultObject, 
  Callback, TypeMessages, Chain
};

interface TypeValue {
  [key: string]: any;
  [key: number]: any;
}

export interface Validator<T> {
  readonly string: T;
  readonly number: T;
  readonly object: T;
  readonly array: T;
  readonly boolean: T;
  readonly any: T;
  printout: boolean;
  singleMode: boolean;
  validate(data: string|number|boolean|null|undefined, struct: T): boolean | Promise<boolean>;
  validate(data: object, struct: TypeStruct): boolean | Promise<boolean>;
  validate(data: any, struct: TypeStruct): boolean | Promise<boolean>;
  get(obj: TypeValue, path: string | (string|number) []): any;
}

let __printout = false;
let __singleMode: false;

/**
 * 查找类型链对象集合
 * @param struct
 * @param path
 * @param cb
 */
function findChain(struct: TypeStruct, path: (string | number)[], cb: Function): void {
  if (Array.isArray(struct) && struct.length > 0) {
    struct.forEach((t: StructObject|Chain|undefined, i: number) => {
      const p = path.concat();

      p.push(i);
      if (t instanceof Chain) { cb(p, t); }
      else if (typeof t === 'object') { 
        findChain(t, p, cb); 
      }
    });
  } else {
    for (const key in struct) {
      if (Object.prototype.hasOwnProperty.call(struct, key)) {
        const type = (struct as StructObject)[key];
        const p = path.concat();

        p.push(key);
        if (type instanceof Chain) { cb(p, type); }
        else if (typeof type === 'object') { 
          findChain(type as StructObject, p, cb); 
        }        
      }
    }
  }
}

/**
 * 匹配数据项
 * @param obj
 * @param path
 */
function findValue(obj: TypeValue, path: (string | number)[]): any {
  try {
    if (!path || path.length === 0) return obj;  
    const p = path[0];
    const currentPath: string | number = (+p).toString() === p ? +p : p;
  
    if ((typeof currentPath === 'number' && Array.isArray(obj)) || 
      Object.prototype.hasOwnProperty.call(obj, currentPath)) {
      if (path.length === 1) return obj[currentPath];
    }
    return findValue(obj[currentPath], path.slice(1)); 
  } catch (error) {
    return void 0;
  }
}

/**
 * 消息格式化
 * @param info
 * @param n1
 * @param n2
 * @param n3
 */
function format(info: string, n1?: string, n2?: string[], n3?: string[]): string {
  n1 = n1 || '';
  const nv = n2 || targetDefault;

  info = info.replace(/%a/g, n1);
  if (/\%t/.test(info)) info = info.replace(/%t/g, () => {
    const ns = (nv.length > 0 ? nv.shift() : '')
    return ns? ns : ''; 
  });
  if (n3 && n3.length > 0 && /\%\d+/.test(info)) 
    n3.forEach((n: string, i) => info = info.replace(new RegExp(`%${i}` , 'g'), n));
  return info;
}

function getinfo(key: string, chainMsg?: TypeMessages): string {
  let nm;  
  
  if (chainMsg && chainMsg[key]) nm = chainMsg[key];
  else if((messages as TypeMessages)[key]) nm = (messages as TypeMessages)[key];
  else nm = messages.default;
  return nm;
}

type ResultArray = [
  (string|number)[],
  (string|number)[],
  string[],
  (string | number)[]?,
  [Callback?, Callback?]?
];

/**
 * 类型链验证
 * @param data
 * @param chain
 */
function chkchain(value: any, chain: Chain, path?: (string | number)[]): 
  ResultArray | Promise<ResultArray> | undefined{
  if (typeof value === 'string') value = value.trim();
  if (!value && chain.__types.indexOf('required') === -1) return void 0; // 非必填项无值，视为通过

  const ms = methods as { [k: string]: Method },
    nms = chain.__names,
    afncs: Promise<boolean>[] = [],
    afArgs: [number, any[]][] = [],
    errkeys: (string|number)[] = [],
    okeys: (string|number)[] = [],
    errMsgs: string[] = [],
    result: ResultArray = [
      errkeys, okeys, errMsgs, path, chain.__handler
    ],
    addm = (m: string, args?: string[]) => // 设错误消息
      errMsgs.push(format(getinfo(m, chain.__msgs), nms[0], nms[1], args)),
    getm = (args?: any[]) => // 取值格式化
      [value].concat(args).map(n => methods.string(n) || methods.number(n) ? String(n): '');

  for (let i = 0, len = chain.__types.length; i < len; i++) {
    const t = chain.__types[i];
  
    if (typeof t === 'string') { // 内置单参数方法验证失败
      if (ms[t](value) === false) {
        errkeys.push(t);
        addm(t, getm());
        if(__singleMode) break;
      } else okeys.push(t);
    }
    else if (Array.isArray(t)) { // 内置多参数方法验证失败
      if(ms[t[0]](value, ...t[1]) === false) {
        errkeys.push(t[0]);
        addm(t[0], getm(t[1]));
        if(__singleMode) break;
      } else okeys.push(t[0]);
    }
  }

  for (let i = 0, len = chain.__customs.length; i < len; i++) {
    const n = chain.__customs[i];
    const ars = n[2] || [];
  
    if (n[0] === 0 ) {
      if (n[1](value, ...ars) === false) {
        errkeys.push(i);
        addm(String(i), getm(ars));
        if(__singleMode) break;
      } else okeys.push(i);
    } else if (n[0] === 1 ) { // 链内异步合并
      afncs.push(n[1](value, ...ars) as Promise<boolean>)
      afArgs.push([i,ars]);
    }
  }
  
  if(chain.isAsync) {  // 异步方法验证
    return new Promise((resolve, reject) => {
      Promise.all(afncs).then(res => {
        res.forEach((n, i) => {
          if(n === false) {
            const j = afArgs[i][0];

            errkeys.push(j);
            addm(String(j), getm(afArgs[i][1]));
          } else okeys.push(i);
        })
        resolve(result);
      }).catch(error => {
        reject(error);
      });
    });
    
  } else return result;
}

/**
 * 将验证结果消息输出（调试）
 * @param errs 
 */
function printout(errs: ResultObject) {
  const m = errs,
    p = m.path ? m.path.join('.') + ': \n': '',
    nm = m.msgs ? m.msgs.map((n, i) => (m.keys? m.keys[i].toString() :'') + ' \u2717 ' + n) : [];

  console.warn(`\x1B[31m${p}\x1B[36m${nm.join('\n')}`);
}


/**
 * 验证结果处理（生成对象，返回结果）
 * @param chain 
 * @param keys
 * @param path
 */
function getResult(results: ResultArray): boolean {
  if (!results) return true;
  const errkeys: (string|number)[] = results[0],
    okeys: (string|number)[] = results[1],
    errMsgs: string[] = results[2],
    path = results[3],
    handlers = results[4];

  if (errkeys.length > 0 ) { 
    const getErrs = () => {
      const errs: ResultObject = {keys: errkeys};

      if (errMsgs.length > 0) errs.msgs = errMsgs;
      if (path && path.length > 0) errs.path = path;
      return errs;
    };

    if (handlers && handlers[0]) handlers[0](getErrs());
    if (__printout) printout(getErrs());
    return false;
  } else {
    if (handlers && handlers[1]) { 
      const oks: ResultObject = {keys: okeys};
      if (path && path.length > 0) oks.path = path;

      handlers[1](oks);
    }    
    return true;
  }
}

/**
 * 数据验证
 * @param value
 * @param struct
 * @param parentPath
 */
function check(value: any, struct: TypeStruct, parentPath?: (string | number)[]): 
  boolean | Promise<boolean> {
  if(typeof value !== 'object' && !(struct instanceof Chain)) throw new Error('Invalid arguments');
  const checkeds: boolean[] = [],
    asyncFuncs: (Promise<ResultArray>)[] = [],
    checked = () => checkeds.length > 0 ? checkeds.indexOf(false) === -1 : false;
 
  if(struct instanceof Chain) { // 单链验证
    const result = chkchain(value, struct);
  
    if (struct.isAsync) {
      asyncFuncs.push(result as Promise<ResultArray>);
    } else {
      checkeds.push(getResult(result as ResultArray ));
    }

  } else if(typeof value === 'object' && typeof struct === 'object') {
    const chains: [Chain, (string | number)[]][] = [];

    findChain(struct, [], (path: (string | number)[], chain: Chain) => { // 递归查找验证链
      chains.push([chain, path]);
    });

    chains.forEach(item => {
      const c = item[0],
        p = item[1],
        d = findValue(value, p),
        np = parentPath ? parentPath.concat(p) : p, // 父链路径
        result = chkchain(d, c, np);

      if (c.isAsync) {
        asyncFuncs.push(result as Promise<ResultArray>);
      } else {
        checkeds.push(getResult(result as ResultArray ));
      }
      if(c.__substruct) check(d, c.__substruct, np); // 验证子链

    });
  } else throw new Error('Invalid arguments');

  if(asyncFuncs.length > 0) { // 异步合并处理
    return new Promise((resolve, reject) => {
      Promise.all(asyncFuncs).then(res => {
        res.forEach(n => {
          checkeds.push(getResult(n));
        })
        resolve(checked());
      }).catch(error => {
        reject(error);
      });
    });
  
  } else return checked();
}

const validator: Validator<Chain> = {
  get string() {
    return new Chain().string;
  },
  get number() {
    return new Chain().number;
  },
  get object() {
    return new Chain().object;
  },
  get array() {
    return new Chain().array;
  },
  get boolean() {
    return new Chain().boolean;
  },
  get any() {
    return new Chain();
  },  
  get printout() {
    return __printout;
  },
  set printout(arr) {
    __printout = arr;
  },
  get singleMode() {
    return __singleMode;
  },
  set singleMode(arr) {
    __singleMode = arr;
  },
  validate: (data: any, struct: TypeStruct): boolean | Promise<boolean> => check(data, struct),
  get: (obj: TypeValue, path: string | (string|number) []): any => {
    return findValue(obj, methods.string(path) ? path.split('.'): path);
  }
}

export default validator;

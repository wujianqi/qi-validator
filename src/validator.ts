import methods from './methods';
import messages, { targetDefault } from './messages';
import chain, { 
  StructObject, StructArray, ChainConstructor, Method, AsyncMethod,
  ResultObject, Callback, TypeMessages, TypeChain
} from './chain';
export { 
  StructObject, StructArray, Method,  AsyncMethod, ResultObject, 
  Callback, TypeMessages, TypeChain
};

interface TypeValue {
  [key: string]: any;
  [key: number]: any;
}

const validator = {  
  get string() {
    return chain().string;
  },
  get number() {
    return chain().number;
  },
  get object() {
    return chain().object;
  },
  get array() {
    return chain().array;
  },
  get boolean() {
    return chain().boolean;
  },
  get any() {
    return chain();
  },
  printout: true
};

/**
 * 查找类型链对象集合
 * @param struct
 * @param path
 * @param cb
 */
function findChain(struct: StructObject|StructArray, path: (string | number)[], cb: Function): void {
  if (Array.isArray(struct) && struct.length > 0) {
    struct.forEach((t, i) => {
      const p = path.concat();

      p.push(i);
      if (t instanceof ChainConstructor) { cb(p, t); }
      else if (typeof t === 'object') { 
        findChain(t, p, cb); 
      }
    });
  } else {
    Object.keys(struct).forEach(key => {
      const type = (struct as StructObject)[key];
      const p = path.concat();

      p.push(key);
      if (type instanceof ChainConstructor) { cb(p, type); }
      else if (typeof type === 'object') { 
        findChain(type as StructObject|StructArray, p, cb); 
      }
    })
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
  
    if ((typeof currentPath === 'number' && Array.isArray(obj)) || obj.hasOwnProperty(currentPath)) {
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
function format(info: string, n1?: string, n2?: string[], n3?: (string|number)[]): string {
  n1 = n1 || '';
  n2 = n2 || targetDefault;
  info = info.replace(/%a/g, n1).replace(/%t/g, () => (n2.length > 0 ? n2.shift() : ''));

  if (n3 && n3.length > 0) {
    n3.forEach((n: string|number, i) => {
      const reg = new RegExp(`%${i}` , 'gm');

      info = info.replace(reg, methods.number(n) ? String(n): n);
    })
  }
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
  Callback[]?
];

/**
 * 类型链验证
 * @param data
 * @param chain
 */
function chkchain(value: any, chain: TypeChain, path?: (string | number)[]): 
  ResultArray | Promise<ResultArray> {
  if (!value && chain.$types.indexOf('required') === -1) return void 0; // 非必填项无值，视为通过

  const ms = methods as { [k: string]: Method },
    nms = chain.$names,
    afncs: Promise<boolean>[] = [],
    afArgs: [number, any[]][] = [],
    errkeys: (string|number)[] = [],
    okeys: (string|number)[] = [],
    errMsgs: string[] = [],
    result: ResultArray = [
      errkeys, okeys, errMsgs, path, chain.$handler
    ],
    addm = (m: string, args?: (string|number)[]) => // 设错误消息
      errMsgs.push(format(getinfo(m, chain.$msgs), nms[0], nms[1], args)),
    getm = (args?: any[]) => // 取值格式化
      [value].concat(args).map(n => methods.string(n) || methods.number(n) ? n: '');
  
  chain.$types.forEach( t=> {
    if (typeof t === 'string') { // 内置单参数方法验证失败
      if (ms[t](value) === false) {
        errkeys.push(t);        
        addm(t, getm());
      } else okeys.push(t);
    }
    else if (Array.isArray(t)) { // 内置多参数方法验证失败
      if(ms[t[0]](value, ...t[1]) === false) {
        errkeys.push(t[0]);
        addm(t[0], getm(t[1]));
      } else okeys.push(t[0]);
    }
  });

  chain.$customs.forEach((n, i) => { // 自定义方法验证
    if (n[0] === 0 ) {
      if (n[1](value, ...n[2]) === false) {
        errkeys.push(i);
        addm(String(i), getm(n[2]));
      } else okeys.push(i);
    } else if (n[0] === 1 ) { // 链内异步合并
      afncs.push(n[1](value, ...n[2]) as Promise<boolean>)
      afArgs.push([i,n[2]]);
    }
  });
  
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
      const errs: ResultObject = {};

      if (errkeys.length > 0) errs.keys = errkeys;
      if (errMsgs.length > 0) errs.msgs = errMsgs;
      if (path && path.length > 0) errs.path = path;
      return errs;
    };

    if (handlers && handlers[0]) handlers[0](getErrs());
    if (validator.printout) {
      const m = getErrs();

      console.warn(m.path ? m.path.join('.') + ': ': '', m.msgs.join('; '));
    }
    return false;
  } else {
    if (handlers && handlers[1]) { 
      const oks: ResultObject = {};
      if (okeys.length > 0) oks.keys = okeys;
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
function check(value: any, struct: StructObject|StructArray|TypeChain, parentPath?: (string | number)[]): 
  boolean | Promise<boolean> {
  if(typeof value !== 'object' && !(struct instanceof ChainConstructor)) throw new Error('Invalid arguments');
  const checkeds: boolean[] = [],
    asyncFuncs: (Promise<ResultArray>)[] = [],
    checked = () => checkeds.length > 0 ? checkeds.indexOf(false) === -1 : false;
 
  if(struct instanceof ChainConstructor) { // 单链验证
    const result = chkchain(value, struct);
  
    if (struct.isAsync) {
      asyncFuncs.push(result as Promise<ResultArray>);
    } else {
      checkeds.push(getResult(result as ResultArray ));
    }

  } else if(typeof value === 'object' && typeof struct === 'object') {
    const chains: [TypeChain, (string | number)[]][] = [];

    findChain(struct, [], (path: (string | number)[], chain: TypeChain) => { // 递归查找验证链
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
      if(c.$substruct) check(d, c.$substruct, np); // 验证子链

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
function validate(data: string|number|boolean|null|undefined, struct: TypeChain): boolean | Promise<boolean>;
function validate(data: object, struct: StructObject|StructArray|TypeChain): boolean | Promise<boolean>;
function validate(data: any, struct: StructObject|StructArray|TypeChain): boolean | Promise<boolean> {
  return check(data, struct);
}

export default Object.assign(validator, {
  validate,
  get(obj: TypeValue, path: string | (string|number) []): any {
    return findValue(obj, methods.string(path) ? path.split('.'): path);
  },
  
});
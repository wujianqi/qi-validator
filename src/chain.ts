import methods from './methods';

export interface StructObject {
  [key: string]: TypeStruct;
}
export type TypeStruct = StructObject | 
  (StructObject|undefined)[] | ChainConstructor | 
  (ChainConstructor|undefined)[] ;

export interface Method {
  (...values: any[]): boolean;
}
export interface AsyncMethod {
  (...values: any[]): Promise<boolean>;
}
export interface ResultObject {
  keys: (string|number)[];
  msgs?: string[];
  path?: (string|number)[];
}
export interface TypeMessages {
  [key: string]: string;
  [key: number]: string;
}
export interface Callback {
  (result: ResultObject): any;
}

interface ChainConstructor {
  readonly required: this;
  readonly english: this;
  readonly alphanum: this;
  readonly chinese: this;
  readonly upper: this;
  readonly lower: this;
  readonly hasLetter: this;
  readonly hasDigit: this;
  readonly hasSpec: this;
  readonly nospace: this;
  readonly nodbc: this;
  readonly norepeat: this;
  readonly nospec: this;
  readonly qq: this;
  readonly age: this;
  readonly zipcode: this;
  readonly ip: this;
  readonly ipv6: this;
  readonly port: this;
  readonly domain: this;
  readonly bizcode: this;
  readonly invoice: this;
  readonly bankcard: this;
  readonly pbcard: this;
  readonly ticker: this;
  readonly passport: this;
  readonly score: this;
  readonly currency: this;
  readonly float: this;
  readonly positivefloat: this;
  readonly integer: this;
  readonly positiveint: this;
  readonly decimal: this;
  readonly percent: this;
  readonly even: this;
  readonly odd: this;
  readonly email: this;
  readonly url: this;
  readonly ftp: this;
  readonly http: this;
  readonly ws: this;
  readonly account: this;
  readonly password: this;
  readonly hex: this;
  readonly color: this;
  readonly ascii: this;
  readonly base64: this;
  readonly md5: this;
  readonly uuid: this;
  readonly mobile: this;
  readonly telphone: this;
  readonly phone: this;
  readonly year: this;
  readonly month: this;
  readonly day: this;
  readonly hour: this;
  readonly minute: this;
  readonly hmt: this;
  readonly time: this;
  readonly date: this;
  readonly datetime: this;
  readonly idcard: this;
  readonly autocard: this;
  readonly longitude: this;
  readonly latitude: this;
  readonly londms: this;
  readonly latdms: this;
  readonly approval: this;
  readonly citycode: this;
  readonly address: this;
  readonly isbn: this;
  readonly tag: this;
  readonly jwt: this;
  readonly mac: this;
  readonly thunder: this;
  readonly mask: this;
  readonly ed2k: this;
  readonly magnet: this;
  readonly path: this;
  readonly file: this;
  readonly linuxfile: this;
  readonly imgurl: this;
  readonly doc: this;
  readonly object: this;
  readonly boolean: this;
  readonly string: this;
  readonly number: this;
  readonly array: this;
  readonly func: this;
  readonly datetype: this;
  readonly empty: this;
  readonly idcardvalid: this;
  ext(value: string): this;
  min(value: string | number): this;
  max(value: string | number): this;
  charlen(value: string | number): this;
  len(value: string | number): this;
  not(value: any): this;
  eq(value: any): this;
  has(value: any): this;
  in(value: any): this;
  gt(value: string | number | Date): this;
  gte(value: string | number | Date): this;
  lt(value: string | number | Date): this;
  lte(value: string | number | Date): this;
  minof(val: string | number | Date, ...vals: (string | number | Date)[]): this;
  maxof(val: string | number | Date, ...vals: (string | number | Date)[]): this;
  enum(val: any, ...vals: any[]): this;
  and(val: any, ...vals: any[]): this;
  an(val: any, ...vals: any[]): this;
  or(val: any, ...vals: any[]): this;
  between(val1: string | number | Date, val2: string | number | Date): this;
  norepeats(val1: string | number, val2?: number): this;
  regexp(val: RegExp): this;
}

const props = Object.create(null);

/**
 * 验证类型链
 */
class ChainConstructor {
  __types: (string | [string, any])[] = [];
  __substruct: (TypeStruct | undefined);
  __handler: [Callback?, Callback?] = [];
  __customs: [0|1, Method|AsyncMethod, any[]?][] = [];
  __names: [string?, string[]?] = [];
  __msgs: TypeMessages| undefined;

  isAsync = false; // 是否为一个异步请求链
  struct(s: TypeStruct) { // 子链
    this.__substruct = s;
    return this;
  }
  apply(method: Method, ...args: any[]) { // 自定义验证方法
    if(methods.func(method)) this.__customs.push([0, method, args]);
    return this;
  }
  async(method: AsyncMethod, ...args: any[]) { // 自定义异步验证方法
    if(methods.func(method)) this.__customs.push([1, method, args]);
    this.isAsync = true;
    return this;
  }
  error(f: Callback) { // 验证失败处理
    if(methods.func(f)) this.__handler[0] = f;
    return this;
  }
  ok(f: Callback) { // 验证成功处理
    if(methods.func(f)) this.__handler[1] = f;
    return this;
  }
  alias(n: string,...names: string[]) { // 名称
    const n1 = this.__names[0],
      n2 = this.__names[1];

    if (!n1) this.__names[0] = n;
    else if (n1 && !n2) this.__names[1] = [n];
    else if(n1 && n2) n2.push(n);
    if (names.length > 0) {
      if (!n2) this.__names[1]  = names;
      else this.__names[1]  = n2.concat(names);       
    }
    return this;
  }
  msg(key: string, info: string): this ;
  msg(msgs: TypeMessages): this ;
  msg(key: string|TypeMessages, info?: string): this {
    if (!this.__msgs)  this.__msgs = {};
    if(methods.string(key) && info) this.__msgs[key] = info;
    else if(methods.object(key)) {
      if (Object.assign) Object.assign(this.__msgs, key)
      else {
        for (const k in key) {
          if (Object.prototype.hasOwnProperty.call(key, k)) this.__msgs[k] = key[k];
        }
      }
    }
    return this;
  }

}

for (const key in methods) {
  if (methods.hasOwnProperty(key)) {
    const rule = (methods as { [k: string]: Method })[key];

    if (rule.length === 1) {
      props[key] = {
        get() {
          this.__types.push(key);
          return this;
        },
      };
    } else {
      props[key] = {
        value(...args: any[]) {
          this.__types.push([key, args]);
          return this;
        },
      };
    }    
  }
}

Object.defineProperties(ChainConstructor.prototype, props);

export default ChainConstructor;

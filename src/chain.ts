import methods from './methods';

type T1 = 'norepeats'|'ext';
type T2 = 'min'|'max'|'charlen'|'len';
type T3 = 'not'|'eq'|'has'|'in';
type T4 = 'gt'|'gte'|'lt'|'lte';
type T5 = 'minof'|'maxof';
type T6 = 'enum'|'and'|'an'|'or';

type Tp1 = {
  [k in T1]?: (value: string) => TypeChain;
};
type Tp2 = {
  [k in T2]?: (value: string|number) => TypeChain;
};
type Tp3 = {
  [k in T3]?: (value: any) => TypeChain;
};
type Tp4 = {
  [k in T4]?: (value: string | number | Date) => TypeChain;
};
type Tp5 = {
  [k in T5]?: (val: string | number | Date, ...vals: (string | number | Date)[]) => TypeChain;
};
type Tp6 = {
  [k in T6]?: (val: any, ...vals: any[]) => TypeChain;
};
type TypeProps = {
  readonly [k in keyof (Omit<typeof methods, T1 | T2 | T3 | T4 | T5 | T6
    | 'between'| 'norepeats'| 'regexp'>)]?: TypeChain;
};
export type TypeChain = ChainConstructor & TypeProps & Tp1 & Tp2 & Tp3 & Tp4 & Tp5 & Tp6 & {
  'between'?: (val1: string | number | Date, val2: string | number | Date) => TypeChain;
  'norepeats'?: (val1: string | number, val2: number) => TypeChain;
  'regexp'?: (arg: RegExp) => TypeChain;
};

export interface StructObject {
  [key: string]: StructArray | StructObject | TypeChain[] | TypeChain;
}
export interface StructArray extends Array<StructObject> {
  [key: number]: StructObject ;
}
export interface Method {
  (...values: any[]): boolean;
}
export interface AsyncMethod {
  (...values: any[]): Promise<boolean>;
}
export interface ResultObject {
  keys?: (string|number)[];
  msgs?: string[];
  path?: (string|number)[];
}
export interface TypeMessages {
  [key: string]: string;
  [key: number]: string;
}
export interface Callback {
  (result?: ResultObject): void;
}

/**
 * 验证类型链
 */
export class ChainConstructor {
  $types: (string | [string, any])[] = [];
  $substruct: (StructArray | StructObject);
  $handler: [Callback?, Callback?] = [];
  $customs: [0|1, Method|AsyncMethod, any[]?][] = [];
  $names: [string?, string[]?] = [];
  $msgs: TypeMessages;

  isAsync = false; // 是否为一个异步请求链
  struct(s: StructArray | StructObject) { // 子链
    this.$substruct = s;
    return this;
  }
  apply(method: Method, ...args: any[]) { // 自定义验证方法
    if(methods.func(method)) this.$customs.push([0, method, args]);
    return this;
  }
  async(method: AsyncMethod, ...args: any[]) { // 自定义异步验证方法
    if(methods.func(method)) this.$customs.push([1, method, args]);
    this.isAsync = true;
    return this;
  }
  error(f: Callback) { // 验证失败处理
    if(methods.func(f)) this.$handler[0] = f;
    return this;
  }
  ok(f: Callback) { // 验证成功处理
    if(methods.func(f)) this.$handler[1] = f;
    return this;
  }
  alias(n: string,...names: string[]) { // 名称
    const n1 = this.$names[0],
      n2 = this.$names[1];

    if (!n1) this.$names[0] = n;
    else if (n1 && !n2) this.$names[1] = [n];
    else if(n1 && n2) this.$names[1].push(n);
    if (names.length > 0) {
      if (!n2) this.$names[1]  = names;
      else this.$names[1]  = n2.concat(names);       
    }
    return this;
  }
  msg(key: string, info: string): this ;
  msg(msgs: TypeMessages): this ;
  msg(key: string|TypeMessages, info?: string): this {
    if (!this.$msgs)  this.$msgs = {};
    if(methods.string(key) && info) this.$msgs[key] = info;
    else if(methods.object(key)) Object.assign(this.$msgs, key);
    return this;
  }
  
}

const props = Object.create(null);

Object.keys(methods).forEach(key  => {
  const rule = (methods as { [k: string]: Method })[key];

  if (rule.length === 1) {
    props[key] = {
      get() {
        this.$types.push(key);
        return this;
      },
    };
  } else {
    props[key] = {
      value(...args: any[]) {
        this.$types.push([key, args]);
        return this;
      },
    };
  }
});
Object.defineProperties(ChainConstructor.prototype, props);

export default (): TypeChain => new ChainConstructor();

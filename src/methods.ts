import rules, {norepeat, ext} from './rules';

const isObject = (arg: any): arg is object =>
  typeof arg === 'object' &&
    Object.prototype.toString.call(arg) === '[object Object]';
const num2str = (arg: string | number | any[]): string | any[] => 
  typeof arg === 'number' ? String(arg) : arg;
const str2num = (arg: string | number): number => 
  typeof arg === 'string' ? +arg : arg;

function checkInclude(arg1: any, arg2: any) {
  if ((typeof arg1 === 'number' || typeof arg1 === 'string') &&
        (typeof arg2 === 'number' || typeof arg2 === 'string')) {
    return String(arg1).indexOf(String(arg2)) > -1;
  } else if (Array.isArray(arg1)) { return arg1.indexOf(arg2) > -1; }
  else if (isObject(arg1) && typeof arg2 === 'string') {
    return Object.keys(arg1).indexOf(arg2) > -1;
  }
  return false;
}

function has(arg1: string | number, arg2: string | number): boolean;
function has(arg1: any[], arg2: any): boolean;
function has(arg1: object, arg2: string ): boolean;
function has(arg1: string | number| any[] | object, arg2: string | number| any ): boolean {
  return checkInclude(arg1, arg2);
}
function inc(arg1: string | number, arg2: string | number): boolean;
function inc(arg1: any, arg2: any[]): boolean;
function inc(arg1: string, arg2: object): boolean;
function inc(arg1: string | number | any, arg2: string | number| any[]| object): boolean {
  return checkInclude(arg2, arg1);
}

/**
 * 方法集合
 */
const methods = {
  object: isObject,
  boolean: (arg: any): arg is boolean => typeof arg === 'boolean',
  string: (arg: any): arg is string => typeof arg === 'string',
  number: (arg: any): arg is number => typeof arg === 'number',
  array: (arg: any): arg is any[] => Array.isArray(arg),
  func: (arg: any): arg is Function  => typeof arg === 'function',
  datetype: (arg: any): arg is Date  => arg instanceof Date,
  enum: (arg: any, arg1: any, ...args: any) => [arg1].concat(args).indexOf(arg) > -1,
  norepeats: (arg: string, content: string, num = 1) => 
    norepeat(content, num).test(arg),
  ext: (arg: string, types: string) => ext(types).test(arg),
  idcardvalid(arg: string | number) {
    const val = String(arg),
      args = val.toUpperCase().split(''),
      factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
      parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2],
      reg = rules.idcard;
    let sum = 0,
      ai = 0,
      wi = 0;

    for (let i = 0; i < 17; i++) {
      ai = parseInt(args[i], 10);
      wi = factor[i];
      sum += ai * wi;
    }
    return reg.test(val) && parity[sum % 11] == args[17];
  },
  not: (arg1: any, arg2: any) => arg1 != arg2,
  eq: (arg1: any, arg2: any) => arg1 == arg2,
  gt: <T extends string | number | Date>(arg1: T, arg2: T) => +arg1 > +arg2,
  gte: <T extends string | number | Date>(arg1: T, arg2: T) => +arg1 >= +arg2,
  lt: <T extends string | number | Date>(arg1: T, arg2: T) => +arg1 < +arg2,
  lte: <T extends string | number | Date>(arg1: T, arg2: T) => +arg1 <= +arg2,
  between: <T extends string | number | Date>(arg1: T, arg2: T, arg3: T) =>
    +arg1 > +arg2 && +arg1 < +arg3,
  len: (arg1: string | number | any[], arg2: string | number) => 
    num2str(arg1).length === str2num(arg2),
  min: (arg1: string | number | any[], arg2: string | number) =>
    num2str(arg1).length >= str2num(arg2),
  max: (arg1: string | number | any[], arg2: string | number) => 
    num2str(arg1).length <= str2num(arg2),    
  minof: <T extends string | number | Date>(arg1: T, arg2: T, ...args: T[]) =>
    +arg1 === Math.min(...[arg2].concat(args).map((i) => +i)),
  maxof: <T extends string | number | Date>(arg1: T, arg2: T, ...args: T[]) =>
    +arg1 === Math.max(...[arg2].concat(args).map((i) => +i)),
  charlen: (arg1: string | number, arg2: string | number) => {
    const v1 = num2str(arg1) as string,
      v2 = str2num(arg2),
      len = v1.length;
    let realLength = 0,
      charCode = -1;

    for (let i = 0; i < len; i++) {
      charCode = v1.charCodeAt(i);
      if (charCode >= 0 && charCode <= 128) { realLength += 1; }
      else { realLength += 2; }
    }
    return realLength <= v2;
  },
  empty: (arg: any) => !!arg ? 
    (arg.length ? arg.length === 0: (isObject(arg))? Object.keys(arg).length === 0 : false): true,
  regexp: (arg: any, arg2: RegExp): boolean => arg2.test(arg),
  and: <T extends any>(arg1: T, arg2: T, ...args: T[]) => 
    [arg1, arg2].concat(args).every(i => !!i),
  an: <T extends any>(arg1: T, arg2: T, ...args: T[]) => 
    [arg1, arg2].concat(args).filter(i => !!i).length === 1,
  or:<T extends any>(arg1: T, arg2: T, ...args: T[]) => 
    [arg1, arg2].concat(args).filter(i => !!i).length > 0,
  has,
  in: inc
};

Object.keys(rules).forEach(key => {
  (methods as {[key: string]: (...values: any[]) => boolean })[key] = (value: string | number) => {
    if (typeof value === 'number') value = String(value);
    return ((rules as {[key: string]: RegExp})[key]).test(value);
  }
})

export default methods as typeof methods & { 
  [k in keyof typeof rules]: (value: string | number) => boolean;    
};

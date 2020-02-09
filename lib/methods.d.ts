import rules from './rules';
declare function has(arg1: string | number, arg2: string | number): boolean;
declare function has(arg1: any[], arg2: any): boolean;
declare function has(arg1: object, arg2: string): boolean;
declare function inc(arg1: string | number, arg2: string | number): boolean;
declare function inc(arg1: any, arg2: any[]): boolean;
declare function inc(arg1: string, arg2: object): boolean;
declare const methods: {
    object: (arg: any) => arg is object;
    boolean: (arg: any) => arg is boolean;
    string: (arg: any) => arg is string;
    number: (arg: any) => arg is number;
    array: (arg: any) => arg is any[];
    func: (arg: any) => arg is Function;
    datetype: (arg: any) => arg is Date;
    enum: (arg: any, arg1: any, ...args: any) => boolean;
    norepeats: (arg: string, content: string, num?: number) => boolean;
    ext: (arg: string, types: string) => boolean;
    idcardvalid(arg: string | number): boolean;
    not: (arg1: any, arg2: any) => boolean;
    eq: (arg1: any, arg2: any) => boolean;
    gt: <T extends string | number | Date>(arg1: T, arg2: T) => boolean;
    gte: <T_1 extends string | number | Date>(arg1: T_1, arg2: T_1) => boolean;
    lt: <T_2 extends string | number | Date>(arg1: T_2, arg2: T_2) => boolean;
    lte: <T_3 extends string | number | Date>(arg1: T_3, arg2: T_3) => boolean;
    between: <T_4 extends string | number | Date>(arg1: T_4, arg2: T_4, arg3: T_4) => boolean;
    len: (arg1: string | number | any[], arg2: string | number) => boolean;
    min: (arg1: string | number | any[], arg2: string | number) => boolean;
    max: (arg1: string | number | any[], arg2: string | number) => boolean;
    minof: <T_5 extends string | number | Date>(arg1: T_5, arg2: T_5, ...args: T_5[]) => boolean;
    maxof: <T_6 extends string | number | Date>(arg1: T_6, arg2: T_6, ...args: T_6[]) => boolean;
    charlen: (arg1: string | number, arg2: string | number) => boolean;
    empty: (arg: any) => boolean;
    regexp: (arg: any, arg2: RegExp) => boolean;
    and: <T_7 extends any>(arg1: T_7, arg2: T_7, ...args: T_7[]) => boolean;
    an: <T_8 extends any>(arg1: T_8, arg2: T_8, ...args: T_8[]) => boolean;
    or: <T_9 extends any>(arg1: T_9, arg2: T_9, ...args: T_9[]) => boolean;
    has: typeof has;
    in: typeof inc;
};
declare type TypeMethods = typeof methods & {
    [k in keyof typeof rules]: (value: string | number) => boolean;
};
declare const _default: TypeMethods;
export default _default;
//# sourceMappingURL=methods.d.ts.map
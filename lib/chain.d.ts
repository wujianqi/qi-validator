import methods from './methods';
declare type T1 = 'norepeats' | 'ext';
declare type T2 = 'min' | 'max' | 'charlen' | 'len';
declare type T3 = 'not' | 'eq' | 'has' | 'in';
declare type T4 = 'gt' | 'gte' | 'lt' | 'lte';
declare type T5 = 'minof' | 'maxof';
declare type T6 = 'enum' | 'and' | 'an' | 'or';
declare type Tp1 = {
    [k in T1]?: (value: string) => TypeChain;
};
declare type Tp2 = {
    [k in T2]?: (value: string | number) => TypeChain;
};
declare type Tp3 = {
    [k in T3]?: (value: any) => TypeChain;
};
declare type Tp4 = {
    [k in T4]?: (value: string | number | Date) => TypeChain;
};
declare type Tp5 = {
    [k in T5]?: (val: string | number | Date, ...vals: (string | number | Date)[]) => TypeChain;
};
declare type Tp6 = {
    [k in T6]?: (val: any, ...vals: any[]) => TypeChain;
};
declare type TypeProps = {
    readonly [k in keyof (Omit<typeof methods, T1 | T2 | T3 | T4 | T5 | T6 | 'between' | 'norepeats' | 'regexp'>)]?: TypeChain;
};
export declare type TypeChain = ChainConstructor & TypeProps & Tp1 & Tp2 & Tp3 & Tp4 & Tp5 & Tp6 & {
    'between'?: (val1: string | number | Date, val2: string | number | Date) => TypeChain;
    'norepeats'?: (val1: string | number, val2: number) => TypeChain;
    'regexp'?: (arg: RegExp) => TypeChain;
};
export interface StructObject {
    [key: string]: StructArray | StructObject | TypeChain[] | TypeChain;
}
export interface StructArray extends Array<StructObject> {
    [key: number]: StructObject;
}
export interface Method {
    (...values: any[]): boolean;
}
export interface AsyncMethod {
    (...values: any[]): Promise<boolean>;
}
export interface ResultObject {
    keys?: (string | number)[];
    msgs?: string[];
    path?: (string | number)[];
}
export interface TypeMessages {
    [key: string]: string;
    [key: number]: string;
}
export interface Callback {
    (result?: ResultObject): void;
}
export declare class ChainConstructor {
    $types: (string | [string, any])[];
    $substruct: (StructArray | StructObject);
    $handler: [Callback?, Callback?];
    $customs: [0 | 1, Method | AsyncMethod, any[]?][];
    $names: [string?, string[]?];
    $msgs: TypeMessages;
    isAsync: boolean;
    struct(s: StructArray | StructObject): this;
    apply(method: Method, ...args: any[]): this;
    async(method: AsyncMethod, ...args: any[]): this;
    error(f: Callback): this;
    ok(f: Callback): this;
    alias(n: string, ...names: string[]): this;
    msg(key: string, info: string): this;
    msg(msgs: TypeMessages): this;
}
declare const _default: () => TypeChain;
export default _default;
//# sourceMappingURL=chain.d.ts.map
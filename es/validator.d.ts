import Chain, { TypeStruct, Method, AsyncMethod, ResultObject, Callback, TypeMessages } from './chain';
export { Method, AsyncMethod, ResultObject, Callback, TypeMessages, Chain };
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
    validate(data: string | number | boolean | null | undefined, struct: T): boolean | Promise<boolean>;
    validate(data: object, struct: TypeStruct): boolean | Promise<boolean>;
    validate(data: any, struct: TypeStruct): boolean | Promise<boolean>;
    get(obj: TypeValue, path: string | (string | number)[]): any;
}
declare const validator: Validator<Chain>;
export default validator;
//# sourceMappingURL=validator.d.ts.map
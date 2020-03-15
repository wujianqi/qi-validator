import Chain, { TypeStruct, Method, AsyncMethod, ResultObject, Callback, TypeMessages } from './chain';
export { Method, AsyncMethod, ResultObject, Callback, TypeMessages, Chain };
interface TypeValue {
    [key: string]: any;
    [key: number]: any;
}
declare const validator: {
    readonly string: Chain;
    readonly number: Chain;
    readonly object: Chain;
    readonly array: Chain;
    readonly boolean: Chain;
    readonly any: Chain;
    printout: boolean;
    singleMode: boolean;
} & {
    validate(data: string | number | boolean | null | undefined, struct: Chain): boolean | Promise<boolean>;
    validate(data: object, struct: TypeStruct): boolean | Promise<boolean>;
    validate(data: any, struct: TypeStruct): boolean | Promise<boolean>;
    get(obj: TypeValue, path: string | (string | number)[]): any;
};
export default validator;
//# sourceMappingURL=validator.d.ts.map
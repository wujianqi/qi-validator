import Chain, { TypeStruct, Method, AsyncMethod, ResultObject, Callback, TypeMessages } from './chain';
export { Method, AsyncMethod, ResultObject, Callback, TypeMessages, Chain };
interface TypeValue {
    [key: string]: any;
    [key: number]: any;
}
declare function validate(data: string | number | boolean | null | undefined, struct: Chain): boolean | Promise<boolean>;
declare function validate(data: object, struct: TypeStruct): boolean | Promise<boolean>;
declare const _default: {
    readonly string: Chain;
    readonly number: Chain;
    readonly object: Chain;
    readonly array: Chain;
    readonly boolean: Chain;
    readonly any: Chain;
    printout: boolean;
} & {
    validate: typeof validate;
    get(obj: TypeValue, path: string | (string | number)[]): any;
};
export default _default;
//# sourceMappingURL=validator.d.ts.map
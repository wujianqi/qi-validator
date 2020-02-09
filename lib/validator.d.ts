import { StructObject, StructArray, Method, AsyncMethod, ResultObject, Callback, TypeMessages, TypeChain } from './chain';
export { StructObject, StructArray, Method, AsyncMethod, ResultObject, Callback, TypeMessages, TypeChain };
interface TypeValue {
    [key: string]: any;
    [key: number]: any;
}
declare function validate(data: string | number | boolean | null | undefined, struct: TypeChain): boolean | Promise<boolean>;
declare function validate(data: object, struct: StructObject | StructArray | TypeChain): boolean | Promise<boolean>;
declare const _default: {
    readonly string: TypeChain;
    readonly number: TypeChain;
    readonly object: TypeChain;
    readonly array: TypeChain;
    readonly boolean: TypeChain;
    readonly any: TypeChain;
    printout: boolean;
} & {
    validate: typeof validate;
    get(obj: TypeValue, path: string | (string | number)[]): any;
};
export default _default;
//# sourceMappingURL=validator.d.ts.map
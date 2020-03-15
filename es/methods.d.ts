declare function has(arg1: string | number, arg2: string | number): boolean;
declare function has(arg1: any[], arg2: any): boolean;
declare function has(arg1: object, arg2: string): boolean;
declare function inc(arg1: string | number, arg2: string | number): boolean;
declare function inc(arg1: any, arg2: any[]): boolean;
declare function inc(arg1: string, arg2: object): boolean;
declare const _default: {
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
} & {
    required: (value: string | number) => boolean;
    english: (value: string | number) => boolean;
    alphanum: (value: string | number) => boolean;
    chinese: (value: string | number) => boolean;
    upper: (value: string | number) => boolean;
    lower: (value: string | number) => boolean;
    hasLetter: (value: string | number) => boolean;
    hasDigit: (value: string | number) => boolean;
    hasSpec: (value: string | number) => boolean;
    nospace: (value: string | number) => boolean;
    nodbc: (value: string | number) => boolean;
    norepeat: (value: string | number) => boolean;
    nospec: (value: string | number) => boolean;
    qq: (value: string | number) => boolean;
    age: (value: string | number) => boolean;
    zipcode: (value: string | number) => boolean;
    ip: (value: string | number) => boolean;
    ipv6: (value: string | number) => boolean;
    port: (value: string | number) => boolean;
    domain: (value: string | number) => boolean;
    bizcode: (value: string | number) => boolean;
    invoice: (value: string | number) => boolean;
    bankcard: (value: string | number) => boolean;
    pbcard: (value: string | number) => boolean;
    ticker: (value: string | number) => boolean;
    passport: (value: string | number) => boolean;
    score: (value: string | number) => boolean;
    currency: (value: string | number) => boolean;
    float: (value: string | number) => boolean;
    positivefloat: (value: string | number) => boolean;
    integer: (value: string | number) => boolean;
    positiveint: (value: string | number) => boolean;
    decimal: (value: string | number) => boolean;
    percent: (value: string | number) => boolean;
    even: (value: string | number) => boolean;
    odd: (value: string | number) => boolean;
    email: (value: string | number) => boolean;
    url: (value: string | number) => boolean;
    ftp: (value: string | number) => boolean;
    http: (value: string | number) => boolean;
    ws: (value: string | number) => boolean;
    account: (value: string | number) => boolean;
    password: (value: string | number) => boolean;
    hex: (value: string | number) => boolean;
    color: (value: string | number) => boolean;
    ascii: (value: string | number) => boolean;
    base64: (value: string | number) => boolean;
    md5: (value: string | number) => boolean;
    uuid: (value: string | number) => boolean;
    mobile: (value: string | number) => boolean;
    telphone: (value: string | number) => boolean;
    phone: (value: string | number) => boolean;
    year: (value: string | number) => boolean;
    month: (value: string | number) => boolean;
    day: (value: string | number) => boolean;
    hour: (value: string | number) => boolean;
    minute: (value: string | number) => boolean;
    hmt: (value: string | number) => boolean;
    time: (value: string | number) => boolean;
    date: (value: string | number) => boolean;
    datetime: (value: string | number) => boolean;
    idcard: (value: string | number) => boolean;
    autocard: (value: string | number) => boolean;
    longitude: (value: string | number) => boolean;
    latitude: (value: string | number) => boolean;
    londms: (value: string | number) => boolean;
    latdms: (value: string | number) => boolean;
    approval: (value: string | number) => boolean;
    citycode: (value: string | number) => boolean;
    address: (value: string | number) => boolean;
    isbn: (value: string | number) => boolean;
    tag: (value: string | number) => boolean;
    jwt: (value: string | number) => boolean;
    mac: (value: string | number) => boolean;
    mask: (value: string | number) => boolean;
    thunder: (value: string | number) => boolean;
    ed2k: (value: string | number) => boolean;
    magnet: (value: string | number) => boolean;
    path: (value: string | number) => boolean;
    file: (value: string | number) => boolean;
    linuxfile: (value: string | number) => boolean;
    imgurl: (value: string | number) => boolean;
    doc: (value: string | number) => boolean;
};
export default _default;
//# sourceMappingURL=methods.d.ts.map
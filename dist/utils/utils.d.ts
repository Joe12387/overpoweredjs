export declare const getSpecificType: (variable: unknown) => "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "null" | "array" | "infinity" | "-infinity" | "nan";
export declare const getSpecificTypeAndValue: (variable: unknown) => {
    type: string;
    value: unknown;
};
export declare const stringify: (value: any) => any;

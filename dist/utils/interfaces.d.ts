export interface ComponentInterface {
    name: string;
    func: ComponentFunctionInterface;
}
export type ComponentFunctionInterface = (fingerprint: object) => ComponentOutputInterface;
export interface ComponentOutputInterface {
    status: number;
    value?: string | number | object | boolean | null;
    type?: string;
    isTrusted?: boolean;
}
export declare const resolveComponent: (status: number, value?: string | number | object | boolean | null) => ComponentOutputInterface;

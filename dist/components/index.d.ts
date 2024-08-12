export declare const fingerprintStage1: ComponentInterface[];
export declare const fingerprintStage2: ComponentInterface[];
export declare const fingerprintStage3: ComponentInterface[];
export interface ComponentOutputInterface {
    status: number;
    value?: string | number | object | boolean | null;
    type?: string;
    isTrusted?: boolean;
}
export interface ComponentInterface {
    name: string;
    func: ComponentFunctionInterface;
}
export type ComponentFunctionInterface = (fingerprint: object) => Promise<ComponentOutputInterface>;

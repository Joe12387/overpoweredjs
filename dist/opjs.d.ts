/*!
 *
 * OverpoweredJS v0.0.1
 *
 * https://github.com/Joe12387/overpoweredjs
 *
 *
 **/
declare global {
    interface Window {
        opjs: typeof opjs;
    }
    interface Navigator {
        brave?: object;
        userAgentData?: {
            getHighEntropyValues: (keys: string[]) => Promise<{
                brands: string[];
            }>;
        };
    }
}
type GetFingerprintFunction = () => unknown;
export declare function opjs(): Promise<{
    getFingerprint: GetFingerprintFunction;
}>;
export default opjs;

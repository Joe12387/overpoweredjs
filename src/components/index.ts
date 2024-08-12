import { detectBrave } from './brave/brave';
import { timingResolution } from './timingResolution/timingResolution';
import { userAgentData } from './userAgentData/userAgentData';
import { jsHeapSizeLimit } from './jsHeapSizeLimit/jsHeapSizeLimit';
import { screen } from './screen/screen';
import { devicePixelRatio } from './devicePixelRatio/devicePixelRatio';
import { getBattery } from './getBattery/getBattery';
import { matchMedia } from './matchMedia/matchMedia';

export const fingerprintStage1: ComponentInterface[] = [];
export const fingerprintStage2: ComponentInterface[] = [];
export const fingerprintStage3: ComponentInterface[] = [];

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
export type ComponentFunctionInterface = (
  fingerprint: object
) => Promise<ComponentOutputInterface>;

function addComponent(
  component: ComponentFunctionInterface,
  componentName: string,
  stage: ComponentInterface[],
): void {
  stage.push({
    name: componentName,
    func: component,
  });
}

// stage 1
addComponent(detectBrave, 'brave', fingerprintStage1);
addComponent(timingResolution, 'timingResolution', fingerprintStage1);
addComponent(userAgentData, 'userAgentData', fingerprintStage1);
addComponent(jsHeapSizeLimit, 'jsHeapSizeLimit', fingerprintStage1);

// stage 2
addComponent(screen, 'screen', fingerprintStage2);
addComponent(devicePixelRatio, 'devicePixelRatio', fingerprintStage2);
addComponent(getBattery, 'getBattery', fingerprintStage2);
addComponent(matchMedia, 'matchMedia', fingerprintStage2);

// stage 3
// this may be used for additional components that require the outputs of stages 1 and/or 2

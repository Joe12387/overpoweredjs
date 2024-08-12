"use strict";
exports.__esModule = true;
exports.fingerprintStage3 = exports.fingerprintStage2 = exports.fingerprintStage1 = void 0;
var brave_1 = require("./brave/brave");
var timingResolution_1 = require("./timingResolution/timingResolution");
var userAgentData_1 = require("./userAgentData/userAgentData");
var jsHeapSizeLimit_1 = require("./jsHeapSizeLimit/jsHeapSizeLimit");
var screen_1 = require("./screen/screen");
var devicePixelRatio_1 = require("./devicePixelRatio/devicePixelRatio");
var getBattery_1 = require("./getBattery/getBattery");
var matchMedia_1 = require("./matchMedia/matchMedia");
exports.fingerprintStage1 = [];
exports.fingerprintStage2 = [];
exports.fingerprintStage3 = [];
function addComponent(component, componentName, stage) {
    stage.push({
        name: componentName,
        func: component
    });
}
// stage 1
addComponent(brave_1.detectBrave, 'brave', exports.fingerprintStage1);
addComponent(timingResolution_1.timingResolution, 'timingResolution', exports.fingerprintStage1);
addComponent(userAgentData_1.userAgentData, 'userAgentData', exports.fingerprintStage1);
addComponent(jsHeapSizeLimit_1.jsHeapSizeLimit, 'jsHeapSizeLimit', exports.fingerprintStage1);
// stage 2
addComponent(screen_1.screen, 'screen', exports.fingerprintStage2);
addComponent(devicePixelRatio_1.devicePixelRatio, 'devicePixelRatio', exports.fingerprintStage2);
addComponent(getBattery_1.getBattery, 'getBattery', exports.fingerprintStage2);
addComponent(matchMedia_1.matchMedia, 'matchMedia', exports.fingerprintStage2);
// stage 3
// this may be used for additional components that require the outputs of stages 1 and/or 2

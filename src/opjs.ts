/*!
 *
 * OverpoweredJS v0.0.1
 *
 * https://github.com/Joe12387/overpoweredjs
 *
 *
 **/

import {
  fingerprintStage1,
  fingerprintStage2,
  fingerprintStage3,
} from './components';

import { hash } from './utils/hash';

import { stringify } from './utils/utils';

declare global {
  interface Window {
    opjs: typeof opjs;
  }
  interface Navigator {
    brave?: object;
    userAgentData?: {
      getHighEntropyValues: (keys: string[]) => Promise<{ brands: string[] }>;
    };
  }
}

const isOpaque = false; // vestigial from CS Edition, may be used in future versions of OS Edition

function processModule(module: object, name: string): object {
  const processedModule = {};
  processedModule[name] = {};
  const status = module['status'];
  const status_identifier = 'status';
  if (isOpaque) {
    processedModule[name][status_identifier] = status;
  } else {
    if (typeof processedModule[name][status_identifier] !== 'undefined') {
      throw new Error('Status already exists on the object');
    }
    processedModule[name][status_identifier] = status;
  }
  if (status >= 0) {
    const value = module['value'];
    const type = module['type'];
    if (type === 'object') {
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          const identifier = key;
          if (isOpaque) {
            const keyHash = hash(identifier).toString(36);
            processedModule[keyHash] = hash(
              hash(stringify(value[key])).toString(36),
              hash(hash(type).toString(36), hash(keyHash, status))
            ).toString(36);
          } else {
            processedModule[identifier] = value[key];
          }
        }
      }
    } else {
      const value_identifier = name + '_value';
      const type_identifier = name + '_type';
      if (isOpaque) {
        const value_keyHash = hash(value_identifier).toString(36);
        processedModule[name][value_keyHash] = hash(
          hash(stringify(value)).toString(36),
          hash(hash(type).toString(36), hash(value_keyHash, status))
        ).toString(36);
        const type_keyHash = hash(type_identifier).toString(36);
        processedModule[name][type_keyHash] = hash(
          hash(stringify(value)).toString(36),
          hash(hash(type).toString(36), hash(type_keyHash, status))
        ).toString(36);
      } else {
        processedModule[value_identifier] = value;
        processedModule[type_identifier] = type;
      }
    }
  }
  return processedModule;
}

function processFingerprint(fingerprint: object): object {
  const brave = processModule(fingerprint['brave'], 'brave');
  const screen = processModule(fingerprint['screen'], 'screen');
  const userAgentData = processModule(fingerprint['userAgentData'], 'userAgentData');
  const jsHeapSizeLimit = processModule(fingerprint['jsHeapSizeLimit'], 'jsHeapSizeLimit');
  const devicePixelRatio = processModule(fingerprint['devicePixelRatio'], 'devicePixelRatio');
  const timingResolution = processModule(fingerprint['timingResolution'], 'timingResolution');
  const getBattery = processModule(fingerprint['getBattery'], 'getBattery');
  const matchMedia = processModule(fingerprint['matchMedia'], 'matchMedia');

  const processedFingerprint = {
    ...brave,
    ...screen,
    ...userAgentData,
    ...jsHeapSizeLimit,
    ...devicePixelRatio,
    ...timingResolution,
    ...getBattery,
    ...matchMedia,
  };

  return processedFingerprint;
}

type GetFingerprintFunction = () => unknown;

function withTimeout<T>(promise: Promise<T>, ms: number, error: string, context: string): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(`OverpoweredJS: ${error} - Context: ${context}`)), ms)
  );
  return Promise.race([promise, timeout]);
}

function handleError(error: Error, stage: string, componentName: string) {
  console.error(`OverpoweredJS: Error in ${componentName} (${stage}): ${error.message}`);
}

export async function opjs(): Promise<{
  getFingerprint: GetFingerprintFunction;
}> {
  return new Promise<{
    getFingerprint: GetFingerprintFunction;
  }>((resolve, reject) => {
    const fingerprint = {};

    if (typeof self.window !== 'object' || self.window === null || typeof self.window.document !== 'object' || self.window.document === null) {
      reject(new Error('OverpoweredJS: window and/or document object not found. Only run in a browser environment. Other contexts are not supported.'));
    }

    const timeoutMs = 2000; // 2 seconds

    const fingerprintStage1Promises = fingerprintStage1.map((component) => ({
      promise: withTimeout(
        component.func(fingerprint).catch((error) => {
          handleError(error, 'stage 1', component.name);
          throw error;
        }),
        timeoutMs,
        `OverpoweredJS: ${component.name} (stage 1) timed out`,
        `Stage 1 - ${component.name}`
      ),
      name: component.name,
    }));

    return Promise.all(fingerprintStage1Promises.map((p) => p.promise))
      .then((results) => {
        results.forEach((result, index) => {
          const name = fingerprintStage1Promises[index].name;
          fingerprint[name] = result;
        });

        const fingerprintStage2Promises = fingerprintStage2.map(
          (component) => ({
            promise: withTimeout(
              component.func(fingerprint).catch((error) => {
                handleError(error, 'stage 2', component.name);
                throw error;
              }),
              timeoutMs,
              `OverpoweredJS: ${component.name} (stage 2) timed out`,
              `Stage 2 - ${component.name}`
            ),
            name: component.name,
          })
        );

        return Promise.all(fingerprintStage2Promises.map((p) => p.promise))
          .then((results) => {
            results.forEach((result, index) => {
              const name = fingerprintStage2Promises[index].name;
              fingerprint[name] = result;
            });

            const fingerprintStage3Promises = fingerprintStage3.map(
              (component) => ({
                promise: withTimeout(
                  component.func(fingerprint).catch((error) => {
                    handleError(error, 'stage 3', component.name);
                    throw error;
                  }),
                  timeoutMs,
                  `OverpoweredJS: ${component.name} (stage 3) timed out`,
                  `Stage 3 - ${component.name}`
                ),
                name: component.name,
              })
            );

            return Promise.all(fingerprintStage3Promises.map((p) => p.promise))
              .then((results) => {
                results.forEach((result, index) => {
                  const name = fingerprintStage3Promises[index].name;
                  fingerprint[name] = result;
                });

                const getFingerprint: GetFingerprintFunction = () => processFingerprint(fingerprint);
                resolve({ getFingerprint });
              })
              .catch((error) => {
                handleError(error, 'stage 3', 'unknown');
                reject(new Error(`OverpoweredJS: Error in stage 3: ${error.message}`));
              });
          })
          .catch((error) => {
            handleError(error, 'stage 2', 'unknown');
            reject(new Error(`OverpoweredJS: Error in stage 2: ${error.message}`));
          });
      })
      .catch((error) => {
        handleError(error, 'stage 1', 'unknown');
        reject(new Error(`OverpoweredJS: Error in stage 1: ${error.message}`));
      });
  });
}

if (typeof window !== 'undefined') {
  self.window.opjs = opjs;
}

// for debugging purposes only
// self.window
//   .opjs()
//   .then((fp) => console.log(fp.getFingerprint()))
//   .catch(console.error);

export default opjs;

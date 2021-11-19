import {device, expect, element, by} from 'detox';

describe('Example (explicit)', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
    });
  });

  afterAll(async () => {
    await device.terminateApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should increment value after tap', async () => {
    await expect(element(by.id('test-screen'))).toBeVisible();
    await element(by.id('reduxTestIncrementButton')).tap();
  });
});

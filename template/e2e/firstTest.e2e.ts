import detox, {device, expect, element, by, waitFor} from 'detox';

describe('Example (explicit)', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      permissions: {
        notifications: 'YES',
      },
    });
  });

  afterAll(async () => {
    //await device.terminateApp();
    //await detox.cleanup();
  });

  beforeEach(async () => {
    //await device.reloadReactNative();
  });

  it('should increment value after tap', async () => {
    await expect(element(by.id('test-screen'))).toBeVisible();
    await element(by.id('reduxTestIncrementButton')).tap();
  });

  it('should Open Rn Page', async () => {
    const button = await element(by.text('Open Rn Page'));
    await button.tap();
    await device.pressBack();
  });

  it('should have Flash message', async () => {
    const scrollElement = element(by.id('test-scroll-view'));
    const expectedMapElement = element(by.text('Map Test'));
    const expectedSwipeElement = element(by.text('Test Gradient Button'));
    await waitFor(expectedMapElement)
      .toBeVisible()
      .whileElement(by.id('test-scroll-view'))
      .scroll(150, 'down');
    await scrollElement.scroll(500, 'down', 0, 300);
    await waitFor(expectedSwipeElement)
      .toBeVisible()
      .whileElement(by.id('test-scroll-view'))
      .scroll(150, 'down');
    await expectedSwipeElement.tap();
  });
});

const utils = require('../utils');
const timeout = 20000;
let testCounter = 0;

jest.setTimeout(timeout);
describe(
  '/ (Home Page)',
  () => {
    let page;

    beforeEach(async () => {
      testCounter++;
      await page.evaluate((count) => {
        const elm = document.querySelector('test-app > div');
        elm.id = `popper${count}`;
        elm.style.display = 'block';
      }, testCounter - 1)
    });

    afterEach(async () => {
      await page.evaluate(() => {
        const elm = document.querySelector('test-app > div');
        elm.parentNode.removeChild(elm);
      });
    });

    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto('http://localhost:8888');
      await page.waitForSelector('popper-content');
      console.log('page ready');
    }, timeout);

    afterAll(async () => {
      await page.close()
    });

    it('should show popper on start', async () => {
      await page.waitForSelector(`popper-content`, {
        visible: false
      });
      await page.waitForSelector(`popper-content`, {
        visible: true
      });
      const popperText = await utils.getPopperText(page);
      expect(popperText.trim()).toEqual('testing');
      // let popperBox = await popper.boundingBox();
      // let targetBox = await popperTarget.boundingBox();
      // await page.evaluate(() => {debugger});
      // expect((targetBox.y + targetBox.height) - popperBox.y).toEqual(18);

    });

    it('should show popper on click', async () => {
      await page.waitForSelector(`popper-content`, {
        visible: false
      });
      await page.click(`.popperTarget`);
      await page.waitForSelector(`popper-content`, {
        visible: true
      });
      const popperText = await utils.getPopperText(page);
      const popperContainerBox = await utils.getPopperBoundingBox(page);
      const targetBox = await utils.getTargetBoundingBox(page);
      expect(popperText.trim()).toEqual('testing');
      expect(popperContainerBox.y - (targetBox.y + targetBox.height)).toEqual(5);
    });

    it('should on right', async () => {
      await page.waitForSelector(`popper-content`, {
        visible: false
      });
      await page.click(`.popperTarget`);
      await page.waitForSelector(`popper-content`, {
        visible: true
      });
      const popperText = await utils.getPopperText(page);
      const popperContainerBox = await utils.getPopperBoundingBox(page);
      const targetBox = await utils.getTargetBoundingBox(page);
      expect(popperText.trim()).toEqual('testing');
      expect(popperContainerBox.x - (targetBox.x + targetBox.width)).toEqual(5);
    });

    it('should open to top', async () => {
      await page.waitForSelector(`popper-content`, {
        visible: false
      });
      await page.click(`.popperTarget`);
      await page.waitForSelector(`popper-content`, {
        visible: true
      });
      const popperText = await utils.getPopperText(page);
      const popperContainerBox = await utils.getPopperBoundingBox(page);
      const targetBox = await utils.getTargetBoundingBox(page);
      expect(popperText.trim()).toEqual('testing');
      //await utils.pause(page);
      expect(targetBox.y - (popperContainerBox.y + popperContainerBox.height)).toEqual(5);

    });

    it('left placement should flip to right', async () => {
      await page.waitForSelector(`popper-content`, {
        visible: false
      });
      await page.click(`.popperTarget`);
      await page.waitForSelector(`popper-content`, {
        visible: true
      });
      const popperText = await utils.getPopperText(page);
      const popperContainerBox = await utils.getPopperBoundingBox(page);
      const targetBox = await utils.getTargetBoundingBox(page);
      expect(popperText.trim()).toEqual('testing');
      expect(popperContainerBox.x - (targetBox.x + targetBox.width)).toEqual(5);

    });

    it('should show/hover in hover', async () => {
      await page.waitForSelector(`popper-content`, {
        visible: false
      });
      await page.hover(`.popperTarget`);
      await page.waitForSelector(`popper-content`, {
        visible: true
      });
      const popperText = await utils.getPopperText(page);
      const popperContainerBox = await utils.getPopperBoundingBox(page);
      const targetBox = await utils.getTargetBoundingBox(page);
      expect(popperText.trim()).toEqual('testing');
      expect(popperContainerBox.x - (targetBox.x + targetBox.width)).toEqual(5);
      await page.hover('p');
      await page.waitForSelector(`popper-content`, {
        visible: false
      });
    });

    it('should not show popper with trigger none', async () => {
      await page.click(`.popperTarget`);
      await page.waitForSelector(`popper-content`, {
        visible: false
      });
      await page.hover(`.popperTarget`);
      await page.waitForSelector(`popper-content`, {
        visible: false
      });
    });

    it('should show popper-content component on right', async () => {
      await page.waitForSelector(`popper-content`, {
        visible: false
      });
      await page.click(`.popperTarget`);
      await page.waitForSelector(`popper-content`, {
        visible: true
      });
      const popperText = await utils.getPopperText(page);
      const popperContainerBox = await utils.getPopperBoundingBox(page);
      const targetBox = await utils.getTargetBoundingBox(page);
      expect(popperText.trim()).toEqual('testing');
      expect(popperContainerBox.x - (targetBox.x + targetBox.width)).toEqual(5);
    });
  }
);
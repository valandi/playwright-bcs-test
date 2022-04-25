const { test } = require('@playwright/test');
const {
  VisualGridRunner,
  Eyes,
  Target,
  Configuration,
  BatchInfo,
  BrowserType
} = require('@applitools/eyes-playwright');

test.describe('Demo App - Ultrafast', () => {
  let eyes, runner;
  
  test.beforeEach(async () => {
    runner = new VisualGridRunner({
      testConcurrency: 5
    });
    
    eyes = new Eyes(runner);
    eyes.setMatchTimeout(0);
    const configuration = new Configuration();
    configuration.setBatch(new BatchInfo('13px batch'));
    configuration.addBrowser(1280, 720, BrowserType.CHROME);
    eyes.setConfiguration(configuration);
  });

  test('Smoke Test', async ({ page }) => {
    await page.goto('https://render-wus.applitools.com/renderid/bb9ae10c-20a6-484f-a4a8-244e4d5e5448/eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBQ1lzM3FiMExrS0VqVmk0RmMyLUNRfn4iLCJpYXQiOjE2NTA5MDg5MzMsImV4cCI6MTY1MDkzMDUzMywiaXNzIjoiZXllc2FwaS5hcHBsaXRvb2xzLmNvbSxleWVzcHVibGljd3VzaTAuYmxvYi5jb3JlLndpbmRvd3MubmV0IiwidmdzZXJ2aWNldXJsIjoiaHR0cHM6Ly9yZW5kZXItd3VzLmFwcGxpdG9vbHMuY29tIiwicHJ2IjoiMiJ9.bekXYQBl6wkCDuQaHERWqaX3nNzNzVORxKyT0PyVIa2rmQ5k6NEUdERUNIL9KGbxwRLkkgPbJhRf1Nh_C-pu6aGihqwT0DyIMSppJsWoZW1dP9NrN4bryh1sW4xr7Y83yZC2iMCffmmjLhfDUQ74m-0jBE0xtdeMDR0y4lS08XM/?rg_namespace-override=d_MxaR_OoUmVRifZPsCsYw~~', {timeout: 0});

    await eyes.open(page, "13px batch", "13px batch");

    // This manipulates the DOM as expected
    //
    // await page.evaluate(async () => {
    //   if (document.querySelector("#kx-proxy-suufsmrl6")) 
    //   {
    //     document.querySelector("#kx-proxy-suufsmrl6").style.display="none";
    //   }
    // });
    
    let count = 0;
    await eyes.checkWindow('window');
    await eyes.check(
      'js-fullpage', 
      Target.region('body')
            .visualGridOption('polyfillAdoptedStyleSheets', true)
            .beforeRenderScreenshotHook(async() => {
              document.querySelector('body').style.backgroundColor = 'red';
              document.querySelector("#kx-proxy-suufsmrl6").style.display="none";
              count = 20;
            })
    );
    console.log(count);
    await eyes.close(false);
  });

  test.afterEach(async () => {
    await eyes.abort();
    const results = await runner.getAllTestResults(false);
    console.log('Ultrafast Results', results);
  });
});
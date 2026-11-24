// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /*Maximum time one test can run for, */
  timeout: 100*1000,
  retries:1,
  expect:{

    timeout: 5000,
  },
  reporter: 'html',
  

  /*Shared settings for all the projects below.See https://playwright.dev/doc */
  
  use: {
    browserName:'chromium',
    headless:true,
    actionTimeout:10*1000,
    navigationTimeout:30*1000,
  },

  

   


  
});


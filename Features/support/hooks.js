const playwright=require("@playwright/test")
const { After, Before,BeforeStep,AfterStep,Status } = require('@cucumber/cucumber')
const{POManager}=require("../../Pageobjects/POManager")
const {  expect } = require("@playwright/test");

Before(async function () {
  const browser=await playwright.chromium.launch({headless:true});
    const Context=await browser.newContext();
    this.page=await Context.newPage();
    this.poManager=new POManager(this.page,expect);
})

After(function () {
  console.log("Test is executed successfully")
})

BeforeStep( function () {
  // This hook will be executed before all steps in a scenario with tag @foo
})

AfterStep(async function ({ result }) {
  if(result.status===Status.FAILED){
    await this.page.screenshot({path:"screenshot2.png"});
  }
})

const{test,expect}=require("@playwright/test");
const{customtest}=require("../Utils/Fixture")

customtest("Fixtures Demo",async({authenticatedPage})=>{
    await authenticatedPage.goto("https://rahulshettyacademy.com/client");
     const CardTitles=authenticatedPage.locator('.card-body b');
     await CardTitles.first().waitFor();
    const allTitles=await CardTitles.allTextContents();
    console.log(allTitles);


})
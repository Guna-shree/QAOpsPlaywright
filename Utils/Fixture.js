const{test}=require("@playwright/test")

exports.customtest =test.extend({

    authenticatedPage: async({browser},use)=>{
    const Context=await browser.newContext();
    const page=await Context.newPage();    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("gunashreel@gmail.com")
    await page.locator("#userPassword").fill("Gunashree@2003");
    await page.locator("#login").click();
    const CardTitles=page.locator('.card-body b');
    await CardTitles.first().waitFor();
    
    await use(page);
    await Context.close();
    
    }
})
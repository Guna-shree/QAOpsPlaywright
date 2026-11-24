const{test,expect}=require("@playwright/test")
let webContext;
test.beforeAll(async({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    const username=page.locator("#userEmail");
    const password=page.locator("#userPassword");
    const login=page.locator("#login");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await username.fill("gunashreel@gmail.com");
    await password.fill("Gunashree@2003");
    await login.click();
    const CardTitles=page.locator('.card-body b');
    await CardTitles.first().waitFor();
    await context.storageState({path:"state.json"});
    webContext=await browser.newContext({storageState:"state.json"});
})

test("Test case 1",async()=>{
    const email="gunashreel@gmail.com";
    const productName="iphone 13 pro";
    const page=await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products=page.locator('.card-body');
    const CardTitles=page.locator('.card-body b');
    //await CardTitles.first().waitFor();
    const allTitles=await CardTitles.allTextContents();
    
    
    const count=await products.count();
    for(let i=0; i<count; ++i)
        {
        if(await products.nth(i).locator("b").textContent()===productName){
         await products.nth(i).locator("text= Add To Cart").click()
         break;    
        }
    }
    await page.locator("[routerlink*='cart'] ").click();
    await page.locator("div li").first().waitFor();
   const bool= await page.locator("h3:has-text('iphone 13 pro')").isVisible();
   expect(bool).toBeTruthy();

   await page.locator("text=Checkout").click();
await page.locator("[type='text']").nth(1).fill("86438675");
await page.locator("[type='text']").nth(2).fill("Gunashree");
await page.locator("[type='text']").nth(3).fill("rahulshettyacademy");
await page.locator("[type='submit']").click();
await page.locator("text=* Coupon Applied").waitFor();
const bool1=await page.locator("text=* Coupon Applied").isVisible();
expect(bool1).toBeTruthy();

await page.locator("[placeholder*='Country']").pressSequentially("Ind")
await page.locator(".ta-results").waitFor();
const options=await page.locator(".ta-results");
const dropdownCount=await options.locator("button").count();


for(let i=0;i<dropdownCount;i++){
     if(await options.locator("[type='button']").nth(i).textContent()===" India")
     {
        await options.locator("[type='button']").nth(i).click();
        break;
     }
}
await expect(page.locator(".user__name  [type='text']").first()).toHaveText(email);
 await page.locator(".action__submit ").click();
 await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
 const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
 console.log(orderId);

await page.locator("[routerlink*='myorders']").last().click();
await page.locator("tr.ng-star-inserted").first().waitFor();
const orders =await page.locator("tr.ng-star-inserted");
const productCount=await orders.locator("[scope='row']").count();
console.log(productCount);
for(let i=0;i<productCount;i++)
    {
    const id=await orders.locator("[scope='row']").nth(i).textContent();
        if(orderId.includes(id)){

            await orders.nth(i).locator("text=View").first().click();
            break;
        
        }
        

    }
const orderIdDetails=await page.locator(".col-text").textContent();
expect(orderId.includes(orderIdDetails)).toBeTruthy();
//await page.pause();

})
test("Test case 2",async()=>{
    
    const page=await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products=page.locator('.card-body');
    const CardTitles=page.locator('.card-body b');
    //await CardTitles.first().waitFor();
    const allTitles=await CardTitles.allTextContents();
    console.log(allTitles)
})



const{test,expect}=require('@playwright/test');

test("Browser Context opening -Error Validation",async({browser})=>{

    
    const Context=await browser.newContext();
    const page=await Context.newPage();
    const userName=page.locator("#username");
    const password=page.locator("[type='password']");
    const signIn=page.locator("#signInBtn");
    await page.goto("https://rahulshettyacademy.com/LoginpagePractise/");
    console.log(await page.title())
    //css
    await page.locator("#username").fill("rahul");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

   // type-->fill
   await userName.fill("");
   await userName.fill("rahulshettyacademy");
   await signIn.click();
   console.log(await page.locator(".card-body a").first().textContent());
   console.log(await page.locator(".card-body a").nth(1).textContent());


    

    
});

test("Title name",async({page})=>{
await page.goto("https://www.google.com/");
console.log(await page.title())
await expect (page).toHaveTitle("Google");

})

test("All titles of the Product",async({page})=>{
    const CardTitles=page.locator('.card-body b');
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('#userEmail').fill("gunashreel@gmail.com");
    await page.locator('#userPassword').fill("Gunashree@2003");
    await page.locator('#login').click();
   // await page.locator('.card-body b').first().textContent();
   //await page.waitForLoadState('networkidle'); ---->This is flaky
   await CardTitles.first().waitFor();
    const allTitles=await CardTitles.allTextContents();
    console.log(allTitles);

})

test("UI Controls",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/LoginpagePractise/");
    const dropdown=page.locator("select.form-control");
    await dropdown.selectOption("teach");
    await page.locator(".checkmark").last().click();
    //await page.locator(".checkmark").nth(1).click();
    await page.locator("#okayBtn").click();
// assertion for radio button
    await expect(page.locator(".checkmark").last()).toBeChecked();
    //console.log(await page.locator(".checkmark").last().isChecked());

    await page.locator("#terms").click();
    //assertion for checkbox to be checked
    await expect(page.locator("#terms")).toBeChecked();
    //expect(await page.locator("#terms").isChecked()).toBeTruthy();
    await page.locator("#terms").uncheck();
    //assertion for checkbox to be unchecked
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    //expect(await page.locator("#terms")).not.toBeChecked();
    //await page.pause();
    await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class","blinkingText");
   
})
test("child window handling",async({browser})=>{
    
    const context=await browser.newContext();
    const page=await context.newPage();
    const documentlink=page.locator("[href*='documents-request']")
    await page.goto("https://rahulshettyacademy.com/LoginpagePractise/");
    const username=page.locator("#username");

    const [newpage]=await Promise.all(
        [
    context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
    documentlink.click()

    ]);//new page is opened
    const text=await newpage.locator(".red").textContent();
    console.log(text);
    const arrayText=text.split("@");
    const domain=arrayText[1].split(" ")[0];
    //console.log(domain);
    await username.fill(domain);
    console.log(await username.inputValue());
   // await page.pause();





    
})
test("End-to-End testing",async({page})=>{
    const email="gunashreel@gmail.com";
    const productName="iphone 13 pro";
    const username=page.locator("#userEmail");
    const password=page.locator("#userPassword");
    const login=page.locator("#login");
    const products=page.locator('.card-body');
    const CardTitles=page.locator('.card-body b');
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await username.fill(email);
    await password.fill("Gunashree@2003");
    await login.click();
    await CardTitles.first().waitFor();
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


})




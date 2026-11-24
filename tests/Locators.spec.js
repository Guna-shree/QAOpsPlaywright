const{test,expect}=require ("@playwright/test")

test("special locators",async({page})=>
{
      //time out for test level for assertion
    const slowExpect=expect.configure({timeout:9000})
      //time out for overall test (test level)
      test.setTimeout(60000);
      //action timeout for test level
      page.setDefaultTimeout(9000);
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female")
    await page.getByPlaceholder("Password").fill("Gunashree@2003");
    await page.getByRole("button",{name :"Submit"}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    //5 seconds default timeout for expect assertion(Global level)
    //step level timeout for assertion 
    await expect( page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout:8000})
    //Global->test->step level
    //step level action timeout
    await page.getByRole("link",{name :"Shop"}).click({timeout:9000})
    await slowExpect(page.locator(".my-4").first()).toContainText("Shop");
    await page.locator("app-card").filter({hasText:"Blackberry"}).getByRole("button").click();

    
})

test("End-to-End testing using special locators",async({page})=>{
    const email="gunashreel@gmail.com";
    const productName="iphone 13 pro";
    const username=page.getByPlaceholder("email@example.com");
    const password=page.getByPlaceholder("enter your passsword");
    const login=page.getByRole("button",{name:"Login"});
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await username.fill(email);
    await password.fill("Gunashree@2003");
    await login.click();
    await page.locator('.card-body b').first().waitFor();
    await page.locator(".card-body").filter({hasText:"iphone 13 pro"}).getByRole("button",{name:"Add to Cart"}).click();
    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("iphone 13 pro")).toBeVisible();
    await page.getByRole("button",{name:"Checkout"}).click();
    
    await page.locator("[type='text']").nth(1).fill("86438675");
    await page.locator("[type='text']").nth(2).fill("Gunashree");
    await page.locator("[type='text']").nth(3).fill("rahulshettyacademy");
    await page.getByRole("button",{name:"Apply Coupon"}).click();
    await page.locator("text=* Coupon Applied").waitFor();
    await expect(page.getByText("* Coupon Applied")).toBeVisible();

    await page.getByPlaceholder("Select Country").pressSequentially("Ind")
    await page.locator(".ta-results").waitFor();
    await page.getByRole("button",{name:"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();







/*await expect(page.getByLabel(".user__name  [type='text']").first()).toHaveText(email);
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
await page.pause();*/

})



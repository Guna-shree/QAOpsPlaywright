const{test,expect,request}=require('@playwright/test')
const loginPayload={userEmail:"gunashreel@gmail.com",userPassword:"Gunashree@2003"};
const orderPayload={"orders":[{country:"Cuba",productOrderedId:"6960ea76c941646b7a8b3dd5"}]}
let loginToken;
let orderId

test.beforeAll(async()=>{

    const apiContext=await request.newContext();
    const LoginResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:loginPayload})
    expect(LoginResponse.ok()).toBeTruthy();
   const loginResponseJson=await LoginResponse.json();
   loginToken=loginResponseJson.token
  console.log(loginToken)

  //order creation
  const orderResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data:orderPayload,
        headers:{
            'Authorization':loginToken,
             'Content-Type':'application/json'
        }

    }
  );
   const orderResponseJson=await orderResponse.json();
   console.log(orderResponseJson);
   orderId=orderResponseJson.orders[0];
   console.log(orderId)


})

test("Place the order",async({page})=>{
    
    await page.addInitScript(value=>{
        window.localStorage.setItem("token",value)
    },loginToken)
    
    // const username=page.locator("#userEmail");
    // const password=page.locator("#userPassword");
    // const login=page.locator("#login");
    
   
    // await username.fill(email);
    // await password.fill("Gunashree@2003");
    // await login.click();
    await page.goto("https://rahulshettyacademy.com/client/");
  

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
            //await page.pause();
            console.log(id)
            break;
            
        
        }
        

    }
const orderIdDetails=await page.locator(".col-text").textContent();
expect(orderId.includes(orderIdDetails)).toBeTruthy();


})




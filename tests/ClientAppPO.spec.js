const{test,expect}=require("@playwright/test");
const{POManager}=require("../Pageobjects/POManager")



test("Client App",async({page})=>{

    const poManager=new POManager(page,expect);
    const username="gunashreel@gmail.com";
    const password="Gunashree@2003";
    const productName="iphone 13 pro";
    
    const loginpage=poManager.getLoginPage();
    await loginpage.goTo();
    await loginpage.login(username,password);

    const dashboardPage=poManager.getDashboardPage();
    await dashboardPage.addToCart(productName);

    const mycartpage=poManager.getCheckoutPage();
    await mycartpage.myCart(productName);

    const payments=poManager.getPaymentsPage();
    await payments.personalInformation("86438675","Gunashree","rahulshettyacademy");
    await payments.shippinginformation("Ind",username);

    const orderconfirmation=poManager.getOrderConfirmationPage();
    const orderId=await orderconfirmation.orderConfirmation();

    const orders=poManager.getOrderHistoryPage();
    await orders.orderHistory(orderId);
    await orders.orderSummary(orderId);

})


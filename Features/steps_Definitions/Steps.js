const { Given,When, Then } = require('@cucumber/cucumber')
const {  expect } = require("@playwright/test");
const playwright=require("@playwright/test")
const{POManager}=require("../../Pageobjects/POManager")

Given('login to Ecommerce application with {string} and {string}',{timeout:100*1000},  async function (username, password) {
    // Write code here that turns the phrase above into concrete actions

    this.username=username;
    
    
    const loginpage=this.poManager.getLoginPage();
    await loginpage.goTo();
    await loginpage.login(this.username,password);
});

When('Add {string} to cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    
    const dashboardPage=this.poManager.getDashboardPage();
    await dashboardPage.addToCart(productName);


});

Then('Verify {string} is displayed in the cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const mycartpage=this.poManager.getCheckoutPage();
    await mycartpage.myCart(productName);
});

When('Enter valid details and place the Order', async function () {
    // Write code here that turns the phrase above into concrete actions
    const payments=this.poManager.getPaymentsPage();
    await payments.personalInformation("86438675","Gunashree","rahulshettyacademy");
    await payments.shippinginformation("Ind",this.username);
});

Then('verify order is present in the orderHistory', async function () {
    // Write code here that turns the phrase above into concrete actions
    const orderconfirmation=this.poManager.getOrderConfirmationPage();
    const orderId = await orderconfirmation.orderConfirmation();
    const orders=this.poManager.getOrderHistoryPage();
    await orders.orderHistory(orderId);
    await orders.orderSummary(orderId);
});
class OrderConfirmationPage{
     constructor(page,expect){
        this.page=page;
        this.expect=expect;
        this.orderConfirmationText=page.locator(".hero-primary");
        this.ordersButton=page.locator("[routerlink*='myorders']")


     }


async orderConfirmation(){

    await this.expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
    const orderId = await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order Id Before:",orderId);
    await this.ordersButton.last().click();
    return orderId;
}
}
module.exports={OrderConfirmationPage}
class CheckoutPage{
    constructor(page,expect){
        this.page=page;
        this.expect=expect;
        this.orderedlist=page.locator("div li");
        this.orderedItem=page.locator("h3:has-text('iphone 13 pro')")
        this.checkoutbutton=page.locator("text=Checkout")

    }

    async myCart(productName)
    {
        await this.orderedlist.first().waitFor();
        const name=await this.orderedItem.textContent();
        console.log("Product Name:",name)
        this.expect(name).toBe(productName);
        await this.checkoutbutton.click();
    }
}
module.exports={CheckoutPage}
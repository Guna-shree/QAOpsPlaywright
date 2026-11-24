class OrderHistoryPage{

    constructor(page,expect){
        this.page=page;
        this.expect=expect;
        this.orders=page.locator("tr.ng-star-inserted")
        this.orderidtext= page.locator(".col-text");

    }

async orderHistory(orderId){
await this.orders.first().waitFor();
const productCount=await this.orders.locator("[scope='row']").count();
//console.log(productCount);
for(let i=0;i<productCount;i++)
    {
    const id=await this.orders.locator("[scope='row']").nth(i).textContent();
        if(orderId.includes(id)){

            await this.orders.nth(i).locator("text=View").first().click();
            break;
        
        }
        

    }
}
async orderSummary(orderId){
const orderIdDetails=await this.orderidtext.textContent();
this.expect(orderId.includes(orderIdDetails)).toBeTruthy();
console.log("order Id After:",orderIdDetails)
//await page.pause();
}

}
module.exports={OrderHistoryPage}


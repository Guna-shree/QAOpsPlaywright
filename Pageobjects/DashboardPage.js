class DashboardPage
{
    constructor(page)
    {
this.page=page;
this.products=page.locator('.card-body');
this.CardTitles=page.locator('.card-body b');
this.AddtoCartbutton=page.locator("[routerlink*='cart'] ")



    }
    async addToCart(productName)
    {
        await this.CardTitles.first().waitFor()
        const allTitles=await this.CardTitles.allTextContents();
        console.log(allTitles)
         const count=await this.products.count();
            for(let i=0; i<count; ++i)
                {
                if(await this.products.nth(i).locator("b").textContent()===productName){
                 await this.products.nth(i).locator("text= Add To Cart").click()
                 break;    
                }
            }
            await this.AddtoCartbutton.click();
    }

}

module.exports={DashboardPage};
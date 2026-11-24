class PaymentsPage{

    constructor(page,expect)
    {
        this.page=page;
        this.expect=expect;
        this.CVVCodeInput=page.locator("[type='text']").nth(1)
        this.NameonCardInput=page.locator("[type='text']").nth(2)
        this.ApplyCouponInput=page.locator("[type='text']").nth(3)
        this.ApplyCouponButton=page.locator("[type='submit']")
        this.CouponAppliedText=page.locator("text=* Coupon Applied")
        this.CountryDropdown=page.locator("[placeholder*='Country']")
        this.usernameInput=page.locator(".user__name  [type='text']").first()
        this.PlaceOrderButton=page.locator(".action__submit ");
    }

async personalInformation(CVVCode,NameonCard,ApplyCoupon){

await this.CVVCodeInput.fill(CVVCode);
await this.NameonCardInput.fill(NameonCard);
await this.ApplyCouponInput.fill(ApplyCoupon);
await this.ApplyCouponButton.click();
await this.CouponAppliedText.waitFor();
const bool1=await this.CouponAppliedText.isVisible();
this.expect(bool1).toBeTruthy();
}


async shippinginformation(country,username){

await this.CountryDropdown.pressSequentially(country)
await this.page.locator(".ta-results").waitFor();
const options=await this.page.locator(".ta-results");
const dropdownCount=await options.locator("button").count();


for(let i=0;i<dropdownCount;i++){
     if(await options.locator("[type='button']").nth(i).textContent()===" India")
     {
        await options.locator("[type='button']").nth(i).click();
        break;
     }
}
 await this.expect(this.usernameInput).toHaveText(username);
 await  this.PlaceOrderButton.click();
}
}
module.exports={PaymentsPage}
const{LoginPage}=require("../Pageobjects/LoginPage")
const{DashboardPage}=require("../Pageobjects/DashboardPage")
const{CheckoutPage}=require("../Pageobjects/CheckoutPage")
const{PaymentsPage}=require("../Pageobjects/PaymentsPage")
const{OrderConfirmationPage}=require("../Pageobjects/OrderConfirmationPage")
const{OrderHistoryPage}=require("../Pageobjects/OrderHistoryPage")

class POManager{
    constructor(page,expect){
        this.page=page;
        this.expect=expect;
        this.loginpage=new LoginPage(this.page);
        this.dashboardPage=new DashboardPage(this.page);
        this.mycartpage=new CheckoutPage(this.page,this.expect);
        this.payments=new PaymentsPage(this.page,this.expect);
        this.orderconfirmation=new OrderConfirmationPage(this.page,this.expect);
        this.orderHistory=new OrderHistoryPage(this.page,this.expect);

    }

   getLoginPage(){
    return this.loginpage;
   }
getDashboardPage(){
    return this.dashboardPage;

}
getCheckoutPage(){
    return this.mycartpage;
}
getPaymentsPage(){
return this.payments;
}
getOrderConfirmationPage(){
    return this.orderconfirmation;
}
getOrderHistoryPage(){
    return this.orderHistory;
}
}
module.exports={POManager}
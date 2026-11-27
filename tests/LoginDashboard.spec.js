const { test, expect } = require("@playwright/test");
const { POManager } = require("../Pageobjects/POManager");

test("login and verify iphone 13 pro is on the dashboard", async ({ page }) => {
    const poManager = new POManager(page, expect);
    const loginPage = poManager.getLoginPage();
    const productName = "iphone 13 pro";

    await loginPage.goTo();
    await loginPage.login("gunashreel@gmail.com", "Gunashree@2003");

    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash");

    const dashboardPage = poManager.getDashboardPage();
    await expect(dashboardPage.CardTitles.filter({ hasText: productName })).toBeVisible();
});

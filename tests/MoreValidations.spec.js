const {test,expect}=require("@playwright/test")

test("popups Handling",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("http://www.google.com");
    //await page.goBack();
    //await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    //await page.pause();
    page.on("dialog",dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();
    const framepage=await page.frameLocator("#courses-iframe");
    await framepage.locator("li a[href*='lifetime-access']:visible").click();
    //await framepage.getByRole("link",{name:"All Access Plan"}).click();
    const textcontent=await framepage.locator("div.text h2 ").textContent();
    console.log(await textcontent.split(" ")[1]);

    
})
test("Screenshots handling",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:"partialscreenshots.png"})
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:"screenshots.png"});
    await expect(page.locator("#displayed-text")).toBeHidden();
    
})
test.skip(" Visual testing",async({page})=>{
    await page.goto("https://www.rahulshettyacademy.com");
    expect(await page.screenshot()).toMatchSnapshot("landing.png")
    })
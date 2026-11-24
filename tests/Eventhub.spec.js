const{test,expect}=require("@playwright/test");

test("Booking flow with Event creation ",async({page})=>{

    const eventTitle="Coffee Friday";
//step 1
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder("you@email.com").fill("gunashreel@gmail.com");
    await page.getByPlaceholder("••••••").fill("Gunashree@2003");
    await page.getByRole("button",{name:"Sign In"}).click();
    await expect(page.getByRole("link",{name:"Browse Events"}).first()).toBeVisible();
//step 2
    await page.getByRole("button",{name:"Admin"}).click();
    await page.getByRole("link",{name:"Manage Events"}).first().click();
    await expect(page.getByText("+ New Event")).toBeVisible();
    await page.getByLabel("Title").fill("Coffee Friday")
    await page.getByPlaceholder("Describe the event…").fill("Ready to power through your final stretch before the weekend? Grab your favorite mug and join us for Coffee Friday! We’ll have a full coffee bar, a cozy corner to chat, and a great group of people to help you transition smoothly from work mode to weekend mode.");
    await page.locator("#city").fill("Chennai");
    await page.locator("#venue").fill("YMCA Nandanam, Nungambakkam, Chennai");
    await page.locator("input[id='event-date-&-time']").fill("2026-11-01T18:30");
    await page.getByLabel("price ($)").fill("500");
    await page.locator("#total-seats").fill("50");
    await page.getByRole("button",{name:"+ Add Event"}).click();
    await expect(page.getByText("Event created!")).toBeVisible();

//step 3

    await page.locator("#nav-events").click();
    const allTitles=await page.locator("[data-testid='event-card']")
    await expect(allTitles.nth(0)).toBeVisible();
    const Matchedtitle= await allTitles.filter({hasText:eventTitle});
    await expect(Matchedtitle).toBeVisible();
    const seats=await Matchedtitle.locator("span.text-emerald-600").innerText();
    const seatsBeforeBooking=await parseInt(seats);
    console.log("seats Before Booking",seatsBeforeBooking);
//step 4
    await Matchedtitle.getByRole("link",{name:"Book Now"}).click();
//step 5
    await expect(page.locator("#ticket-count")).toHaveText("1");
    await page.getByLabel("Full name").fill("Shrishti");
    await page.getByLabel("Email").fill("shrishti007@gmail.com");
    await page.getByLabel("Phone Number").fill("9734692832");
    await page.getByRole("button",{name:"Confirm Booking"}).click();
//step 6
    await expect(page.getByText("Booking Ref")).toBeVisible();
    const bookingRef=await page.locator(".booking-ref").innerText();
    //console.log(bookingRef)
//step 7 
    await page.getByRole("button",{name:"View My Bookings"}).click();
    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");
    await expect(page.locator("#booking-card").first()).toBeVisible();
    const matchedCard=await page.locator("#booking-card").filter({hasText:bookingRef});
    await expect(matchedCard).toBeVisible();
    await expect(matchedCard).toContainText(eventTitle);
//step 8
    await page.reload();
    await page.locator("#nav-events").click();
    const allTitle=await page.locator("[data-testid='event-card']")
    await expect(allTitle.nth(0)).toBeVisible();
    const matchedtitle= await allTitle.filter({hasText:eventTitle});
    await expect(matchedtitle).toBeVisible();
    //await page.pause();
    const seatsCount=await matchedtitle.locator("span.text-emerald-600").innerText();
    const seatsAfterBooking=await parseInt(seatsCount);
    console.log("seats After Booking",seatsAfterBooking);
   await expect(seatsAfterBooking).toBe(seatsBeforeBooking-1);

})

test("Refund Eligibility check",async({page})=>{
//step1
    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    await page.getByPlaceholder("you@email.com").fill("gunashreel@gmail.com");
    await page.getByPlaceholder("••••••").fill("Gunashree@2003");
    await page.getByRole("button",{name:"Sign In"}).click();
    await expect(page.getByRole("link",{name:"Browse Events"}).first()).toBeVisible();
//step 2
    await page.locator("#nav-events").click();
    await page.locator("#event-card").first().getByRole("link",{name:"Book Now"}).click();
    await page.getByLabel("Full name").fill("Saasho");
    await page.getByLabel("Email").fill("saashoi007@gmail.com");
    await page.getByLabel("Phone Number").fill("9744692832");
    await page.getByRole("button",{name:"Confirm Booking"}).click();
//step 3
    await page.getByRole("button",{name:"View My Bookings"}).click();
    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");
    await page.locator("#booking-card").first().getByRole("button",{name:"View Details"}).click();
    await expect(page.locator("div h2").last()).toBeVisible();
   
   
//step 4
    const bookingRef=await page.locator("span.text-gray-900.font-mono").textContent();
    const eventTitle=await page.locator("h1").textContent();
    await expect(bookingRef[0]).toBe(eventTitle[0]);
    console.log(bookingRef)
    console.log(eventTitle)
//step 5



    

})
async (page) => {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://127.0.0.1:5173/?utm_source=template-check");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("heading", { level: 1 }).waitFor();

  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = await page.evaluate(() => ({
      viewport: innerWidth,
      content: document.documentElement.scrollWidth,
      brokenLinks: [...document.querySelectorAll('a[href^="#"]')].filter((a) => !document.getElementById(a.getAttribute("href").slice(1))).map((a) => a.getAttribute("href")),
    }));
    assert(dimensions.content <= dimensions.viewport, "Horizontal overflow at " + width);
    assert(dimensions.brokenLinks.length === 0, "Broken anchors: " + dimensions.brokenLinks);
    const headline = await page.locator("#hero h1").evaluate((element) => ({ height: element.getBoundingClientRect().height, lineHeight: parseFloat(getComputedStyle(element).lineHeight) }));
    assert(headline.height <= headline.lineHeight * 2.1, "Hero headline exceeds two lines at " + width);
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  for (const name of ["Telande", "KwirkMart", "CBK Beauty"]) {
    await page.getByRole("button", { name: new RegExp(name) }).click();
    assert(await page.locator(".project-panel.is-open").count() === 1, "Exactly one project should be open");
    assert((await page.locator(".project-panel.is-open .project-tab").textContent()).includes(name), "Wrong project opened");
  }
  await page.getByRole("button", { name: "Build", exact: true }).click();
  assert((await page.locator(".process-copy").textContent()).includes("See the work"), "Process selector did not update");
  await page.getByRole("button", { name: "Run", exact: true }).click();
  assert((await page.locator(".process-copy").textContent()).includes("Launch"), "Process run panel did not update");
  await page.getByRole("button", { name: "Scope", exact: true }).click();
  await page.getByRole("button", { name: "Beauty & wellness", exact: true }).click();
  assert((await page.locator("#industry-panel").textContent()).includes("Make room"), "Industry selector did not update");
  await page.getByRole("button", { name: "Food & hospitality", exact: true }).click();
  assert((await page.locator("#industry-panel img").getAttribute("src")).includes("hospitality"), "Industry image did not update");
  await page.getByRole("button", { name: "Retail & commerce", exact: true }).click();
  await page.locator(".faq-list summary").first().click();
  assert(await page.locator(".faq-list details").first().getAttribute("open") !== null, "FAQ did not open");
  await page.locator(".faq-list summary").first().click();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  assert(await page.getByRole("navigation", { name: "Mobile navigation" }).isVisible(), "Mobile menu did not open");
  await page.keyboard.press("Escape");
  assert(await page.getByRole("button", { name: "Open menu", exact: true }).getAttribute("aria-expanded") === "false", "Escape did not close menu");
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Services" }).click();
  assert(await page.getByRole("button", { name: "Open menu", exact: true }).getAttribute("aria-expanded") === "false", "Navigation did not close menu");

  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.getByLabel("Your name", { exact: true }).fill("");
  assert(!await page.locator(".enquiry-form form").evaluate((form) => form.checkValidity()), "Empty form should be invalid");
  await page.getByLabel("Your name", { exact: true }).fill("Template Test");
  await page.getByLabel("Email address", { exact: true }).fill("template@example.com");
  await page.getByLabel("What do you have in mind?").selectOption("Business system");
  await page.getByLabel("Indicative budget").selectOption("Not defined yet");
  await page.getByRole("combobox", { name: /Timeline/ }).selectOption("Exploring");
  await page.getByLabel("A little about your project").fill("Testing the template with a sample project description.");
  await page.reload();
  assert(await page.getByLabel("Your name", { exact: true }).inputValue() === "Template Test", "Draft did not survive reload");

  let submitted = 0;
  let failRequest = true;
  await page.route("https://formspree.io/**", async (route) => {
    if (route.request().method() === "OPTIONS") {
      await route.fulfill({ status: 204, headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*" } });
      return;
    }
    submitted++;
    const payload = route.request().postData() || "";
    assert(payload.includes("Template Test") && payload.includes("template-check"), "Missing submission context");
    await route.fulfill({
      status: failRequest ? 500 : 200,
      contentType: "application/json",
      headers: { "access-control-allow-origin": "*" },
      body: JSON.stringify(failRequest ? { errors: [{ code: "UNSPECIFIED_ERROR", message: "Test service unavailable" }] } : { ok: true, next: "/thanks" }),
    });
  });
  await page.getByRole("button", { name: "Send your enquiry" }).click();
  await page.locator(".form-error").first().waitFor();
  assert(await page.getByLabel("Your name", { exact: true }).inputValue() === "Template Test", "Failed send lost the draft");
  failRequest = false;
  await page.getByRole("button", { name: "Send your enquiry" }).click();
  await page.getByRole("heading", { name: "You’re on our radar." }).waitFor();
  assert(submitted === 2, "Expected two mocked form submissions");
  assert(await page.evaluate(() => localStorage.getItem("neuraforge_project_enquiry")) === null, "Successful send did not clear draft");
  await page.unroute("https://formspree.io/**");

  await page.reload();
  const motion = await page.evaluate(() => ({
    videoCount: document.querySelectorAll("#hero video, #hero button").length,
    animation: getComputedStyle(document.querySelector(".hero-art")).animationName,
  }));
  assert(motion.videoCount === 0, "Hero should not contain video or playback controls");
  assert(motion.animation === "none", "Reduced-motion artwork fallback failed");
  const images = await page.locator("img").evaluateAll((items) => Promise.all(items.map(async (image) => {
    image.loading = "eager";
    if (!image.complete) await new Promise((resolve) => { image.onload = resolve; image.onerror = resolve; });
    return { src: image.getAttribute("src"), loaded: image.naturalWidth > 0 };
  })));
  assert(images.every((image) => image.loaded), "A template image failed to load");
  const restricted = await page.context().newPage();
  const storageErrors = [];
  restricted.on("pageerror", (error) => storageErrors.push(error.message));
  await restricted.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new DOMException("Storage disabled", "SecurityError"); };
    Storage.prototype.setItem = () => { throw new DOMException("Storage disabled", "SecurityError"); };
  });
  await restricted.goto("http://127.0.0.1:5173/");
  await restricted.getByRole("heading", { name: "Tell us a little about it." }).waitFor();
  assert(storageErrors.length === 0, "Restricted storage crashed the contact form");
  await restricted.close();
  assert(errors.length === 0, "Browser errors: " + errors.join("; "));
  await page.evaluate(() => sessionStorage.removeItem("neuraforge_attribution"));
  console.log("PASS: responsive widths, anchors, projects, process, industries, FAQs, mobile menu, validation, draft persistence, mocked form error/success, restricted storage, imagery and reduced motion. No real enquiry sent.");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://127.0.0.1:5173/");
}

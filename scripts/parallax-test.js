async (page) => {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("http://127.0.0.1:5173/");
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: ".reveal, .enter { animation: none !important; }" });
  assert(await page.locator(".parallax-gradient").count() === 3, "Only the three requested sections should have parallax");

  for (const [name, width, height] of [["desktop", 1440, 1000], ["mobile", 390, 844]]) {
    await page.setViewportSize({ width, height });
    for (const id of ["process", "about", "faq"]) {
      const movement = await page.evaluate(async id => {
        const section = document.getElementById(id);
        const settle = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        section.scrollIntoView({ block: "center", behavior: "instant" });
        await settle();
        const before = getComputedStyle(section, "::before").transform;
        const afterLayerBefore = getComputedStyle(section, "::after").transform;
        scrollBy({ top: 140, behavior: "instant" });
        await settle();
        return { before, after: getComputedStyle(section, "::before").transform, afterLayerBefore, afterLayerAfter: getComputedStyle(section, "::after").transform, background: getComputedStyle(section, "::before").backgroundImage };
      }, id);
      assert(movement.before !== movement.after && movement.afterLayerBefore !== movement.afterLayerAfter, id + " background layers did not respond to scrolling");
      assert(movement.background.includes("radial-gradient"), id + " gradient is missing");
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "Horizontal overflow at " + width);
      await page.locator("#" + id).screenshot({ path: ".impeccable/review/gradient-" + id + "-" + name + ".png", style: ".site-header, .skip-link { visibility: hidden !important; }" });
    }
  }

  await page.getByRole("button", { name: "Build", exact: true }).click();
  assert((await page.locator(".process-copy").textContent()).includes("See the work"), "Process control stopped working");
  await page.locator(".faq-list summary").first().click();
  assert(await page.locator(".faq-list details").first().getAttribute("open") !== null, "FAQ stopped opening");
  await page.locator(".faq-list summary").first().click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(() => [...document.querySelectorAll(".parallax-gradient")].every(section => !section.style.getPropertyValue("--parallax-y")));
  for (const id of ["process", "about", "faq"]) {
    assert(await page.locator("#" + id).evaluate(section => getComputedStyle(section, "::before").transform === "none" && getComputedStyle(section, "::after").transform === "none"), "Reduced motion failed for " + id);
  }
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator("#process").scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector("#process").style.getPropertyValue("--parallax-y") !== "");
  assert(errors.length === 0, "Browser errors: " + errors.join("; "));
  await page.setViewportSize({ width: 1440, height: 900 });
  console.log("PASS: three gradient sections, two scroll-driven layers, desktop/mobile, no overflow, process/FAQ controls, reduced-motion switching, no browser errors.");
}

import { expect, test } from "@playwright/test";
import { getSessionTestUser } from "../../src/models/User";
import { HomePage } from "../../src/pages/HomePage";

test.describe("Authenticated User Home Page", () => {
  test(
    "should display session user name on the main application page",
    { tag: ["@auth", "@profile", "@happy-path"] },
    async ({ page }) => {
      const sessionUser = getSessionTestUser();
      const homePage = new HomePage(page);

      await homePage.goto();

      await expect(homePage.welcomeMessage).toContainText(
        `Welcome, ${sessionUser.displayName}`,
      );
    },
  );
});

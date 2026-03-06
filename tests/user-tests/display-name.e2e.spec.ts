import { expect, test } from "@playwright/test";
import { getSessionTestUser } from "../../src/models/User";
import { LoginPage } from "../../src/pages/LoginPage";
import { HomePage } from "../../src/pages/HomePage";
import { ProfilePage } from "../../src/pages/ProfilePage";

test.describe("Authenticated User Home Page", () => {
  test(
    "should display session user name on the main application page",
    { tag: ["@auth", "@profile", "@happy-path"] },
    async ({ page }) => {
      const sessionUser = getSessionTestUser();
      const homePage = new HomePage(page);
      const loginPage = new LoginPage(page);
      const profilePage = new ProfilePage(page);

      await homePage.goto();

      if (await loginPage.loginSubmitBtn.isVisible()) {
        await loginPage.login(sessionUser.email, sessionUser.password);
        await expect(page).toHaveURL(profilePage.PAGE_URL);
        await homePage.goto();
      }

      await expect(homePage.welcomeMessage).toContainText(
        `Welcome, ${sessionUser.displayName}`,
      );
    },
  );
});

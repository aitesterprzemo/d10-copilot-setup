import { expect, test } from "@playwright/test";
import { getSessionTestUser } from "../../src/models/User";
import { LoginPage } from "../../src/pages/LoginPage";
import { ProfilePage } from "../../src/pages/ProfilePage";
import { SESSION_STORAGE_STATE } from "../../playwright.config";

test.describe("Session Login Setup", () => {
  test(
    "should create storage state for session user",
    { tag: ["@auth", "@session", "@happy-path"] },
    async ({ page }) => {
      const user = getSessionTestUser();
      const loginPage = new LoginPage(page);
      const profilePage = new ProfilePage(page);

      await loginPage.goto();
      await loginPage.login(user.email, user.password);

      await expect(page).toHaveURL(profilePage.PAGE_URL);
      await page.context().storageState({ path: SESSION_STORAGE_STATE });
    },
  );
});

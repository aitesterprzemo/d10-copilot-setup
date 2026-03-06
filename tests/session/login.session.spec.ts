import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { getSessionTestUser } from "../../src/models/User";
import { LoginPage } from "../../src/pages/LoginPage";
import { ProfilePage } from "../../src/pages/ProfilePage";

const SESSION_STORAGE_DIR = "playwright/.auth";
const SESSION_STORAGE_FILE = `${SESSION_STORAGE_DIR}/session-user.json`;

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
      await mkdir(SESSION_STORAGE_DIR, { recursive: true });
      await page.context().storageState({ path: SESSION_STORAGE_FILE });
    },
  );
});

import { expect, test } from "@playwright/test";
import { StaffFieldsMainPage } from "../../src/pages/StaffFieldsMainPage";

function generateUniqueHerdName(prefix: string = "AutoHerd"): string {
  return `${prefix}-${Date.now()}`;
}

test.describe("Staff & Fields - Logged User", () => {
  test(
    "should create new herd in Staff & Fields view",
    { tag: ["@farm", "@crud", "@resources", "@happy-path"] },
    async ({ page }) => {
      const staffFieldsMainPage = new StaffFieldsMainPage(page);
      const herdName = generateUniqueHerdName();
      const herdCount = 25;

      await staffFieldsMainPage.goto();

      await staffFieldsMainPage.openAddHerdModal();
      await expect(staffFieldsMainPage.addHerdForm).toBeVisible();

      await staffFieldsMainPage.createHerd(herdName, herdCount);

      await expect(staffFieldsMainPage.addHerdForm).not.toBeVisible();

      await staffFieldsMainPage.searchHerd(herdName);
      await expect(staffFieldsMainPage.herdsList).toContainText(herdName);
      await expect(staffFieldsMainPage.herdsList).toContainText(String(herdCount));
    },
  );
});

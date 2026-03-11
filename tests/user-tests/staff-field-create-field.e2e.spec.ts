import { expect, test } from "@playwright/test";
import { StaffFieldsMainPage } from "../../src/pages/StaffFieldsMainPage";

function generateUniqueFieldName(prefix: string = "AutoField"): string {
  return `${prefix}-${Date.now()}`;
}

test.describe("Staff & Fields - Logged User", () => {
  test(
    "should create new field in Staff & Fields view",
    { tag: ["@farm", "@crud", "@resources", "@happy-path"] },
    async ({ page }) => {
      const staffFieldsMainPage = new StaffFieldsMainPage(page);
      const fieldName = generateUniqueFieldName();
      const fieldArea = 17;

      await staffFieldsMainPage.goto();

      await staffFieldsMainPage.openAddFieldModal();
      await expect(staffFieldsMainPage.addFieldForm).toBeVisible();

      await staffFieldsMainPage.createField(fieldName, fieldArea);

      await expect(staffFieldsMainPage.addFieldForm).not.toBeVisible();

      await staffFieldsMainPage.searchField(fieldName);
      await expect(staffFieldsMainPage.fieldsList).toContainText(fieldName);
      await expect(staffFieldsMainPage.fieldsList).toContainText(`${fieldArea} ha`);
    },
  );
});

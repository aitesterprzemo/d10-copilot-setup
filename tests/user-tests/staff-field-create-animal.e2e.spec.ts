import { expect, test } from "@playwright/test";
import { StaffFieldsMainPage } from "../../src/pages/StaffFieldsMainPage";

test.describe("Staff & Fields - Logged User", () => {
  test(
    "should create new animal herd in Staff & Fields view",
    { tag: ["@farm", "@crud", "@resources", "@happy-path"] },
    async ({ page }) => {
      const staffFieldsMainPage = new StaffFieldsMainPage(page);
      const animalTypeOption = "🐄 Cow";
      const expectedTypeName = "cow";
      const amount = 5;

      await staffFieldsMainPage.goto();

      await staffFieldsMainPage.openAddAnimalModal();
      await expect(staffFieldsMainPage.addAnimalForm).toBeVisible();

      await staffFieldsMainPage.createAnimal(animalTypeOption, amount);

      await expect(staffFieldsMainPage.addAnimalForm).not.toBeVisible();

      await staffFieldsMainPage.searchAnimal(expectedTypeName);
      await expect(staffFieldsMainPage.animalsList).toContainText(
        expectedTypeName,
      );
      await expect(staffFieldsMainPage.animalsList).toContainText(
        String(amount),
      );
    },
  );
});

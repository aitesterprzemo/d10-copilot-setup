import { expect, test } from "@playwright/test";
import { StaffFieldsMainPage } from "../../src/pages/StaffFieldsMainPage";

test.describe("Staff & Fields - Logged User", () => {
  test(
    "should create new animal herd in Staff & Fields view",
    { tag: ["@farm", "@crud", "@resources", "@happy-path"] },
    async ({ page }) => {
      const staffFieldsMainPage = new StaffFieldsMainPage(page);
      const animalType = "cow";
      const animalAmount = 25;

      await staffFieldsMainPage.goto();

      await staffFieldsMainPage.openAddAnimalModal();
      await expect(staffFieldsMainPage.addAnimalForm).toBeVisible();

      await staffFieldsMainPage.createAnimal(animalType, animalAmount);

      await expect(staffFieldsMainPage.addAnimalForm).not.toBeVisible();

      await staffFieldsMainPage.searchAnimal(animalType);
      await expect(staffFieldsMainPage.animalsList).toContainText(animalType);
      await expect(staffFieldsMainPage.animalsList).toContainText(
        String(animalAmount),
      );
    },
  );
});

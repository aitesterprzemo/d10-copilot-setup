import { Locator, Page } from "@playwright/test";
import { PAGE_URLS } from "../constants/pageUrls";
import { BasePage } from "./BasePage";

export class StaffFieldsMainPage extends BasePage {
  readonly PAGE_URL = PAGE_URLS.STAFF_FIELDS_MAIN;

  readonly openAddFieldModalBtn: Locator;
  readonly addFieldForm: Locator;
  readonly fieldNameInput: Locator;
  readonly fieldAreaInput: Locator;
  readonly addFieldSubmitBtn: Locator;
  readonly fieldsSearchInput: Locator;
  readonly fieldsList: Locator;

  readonly openAddAnimalModalBtn: Locator;
  readonly addAnimalModal: Locator;
  readonly addAnimalForm: Locator;
  readonly animalTypeSelect: Locator;
  readonly animalAmountInput: Locator;
  readonly addAnimalSubmitBtn: Locator;
  readonly animalsSearchInput: Locator;
  readonly animalsList: Locator;

  constructor(page: Page) {
    super(page);
    this.openAddFieldModalBtn = page.locator("#openAddFieldModal");
    this.addFieldForm = page.locator("#addFieldForm");
    this.fieldNameInput = page.locator("#fieldName");
    this.fieldAreaInput = page.locator("#fieldArea");
    this.addFieldSubmitBtn = this.addFieldForm.locator("button[type='submit']");
    this.fieldsSearchInput = page.locator("#fieldsSearch");
    this.fieldsList = page.locator("#fieldsList");

    this.openAddAnimalModalBtn = page.locator("#openAddAnimalModal");
    this.addAnimalModal = page.locator("#addAnimalModal");
    this.addAnimalForm = page.locator("#addAnimalForm");
    this.animalTypeSelect = page.locator("#animalType");
    this.animalAmountInput = page.locator("#animalAmount");
    this.addAnimalSubmitBtn = this.addAnimalForm.locator("button[type='submit']");
    this.animalsSearchInput = page.locator("#animalsSearch");
    this.animalsList = page.locator("#animalsList");
  }

  async openAddFieldModal() {
    await this.openAddFieldModalBtn.click();
  }

  async createField(fieldName: string, fieldArea: number) {
    await this.fieldNameInput.fill(fieldName);
    await this.fieldAreaInput.fill(String(fieldArea));
    await this.addFieldSubmitBtn.click();
  }

  async searchField(fieldName: string) {
    await this.fieldsSearchInput.fill(fieldName);
  }

  async openAddAnimalModal() {
    await this.openAddAnimalModalBtn.click();
  }

  async createAnimal(animalType: string, amount: number) {
    await this.animalTypeSelect.selectOption(animalType);
    await this.animalAmountInput.fill(String(amount));
    await this.addAnimalSubmitBtn.click();
  }

  async searchAnimal(query: string) {
    await this.animalsSearchInput.fill(query);
  }
}

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

  constructor(page: Page) {
    super(page);
    this.openAddFieldModalBtn = page.locator("#openAddFieldModal");
    this.addFieldForm = page.locator("#addFieldForm");
    this.fieldNameInput = page.locator("#fieldName");
    this.fieldAreaInput = page.locator("#fieldArea");
    this.addFieldSubmitBtn = this.addFieldForm.locator("button[type='submit']");
    this.fieldsSearchInput = page.locator("#fieldsSearch");
    this.fieldsList = page.locator("#fieldsList");
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
}

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
  readonly openAddHerdModalBtn: Locator;
  readonly addHerdForm: Locator;
  readonly herdNameInput: Locator;
  readonly herdCountInput: Locator;
  readonly addHerdSubmitBtn: Locator;
  readonly herdsSearchInput: Locator;
  readonly herdsList: Locator;

  constructor(page: Page) {
    super(page);
    this.openAddFieldModalBtn = page.locator("#openAddFieldModal");
    this.addFieldForm = page.locator("#addFieldForm");
    this.fieldNameInput = page.locator("#fieldName");
    this.fieldAreaInput = page.locator("#fieldArea");
    this.addFieldSubmitBtn = this.addFieldForm.locator("button[type='submit']");
    this.fieldsSearchInput = page.locator("#fieldsSearch");
    this.fieldsList = page.locator("#fieldsList");
    this.openAddHerdModalBtn = page.locator("#openAddHerdModal");
    this.addHerdForm = page.locator("#addHerdForm");
    this.herdNameInput = page.locator("#herdName");
    this.herdCountInput = page.locator("#herdCount");
    this.addHerdSubmitBtn = this.addHerdForm.locator("button[type='submit']");
    this.herdsSearchInput = page.locator("#herdsSearch");
    this.herdsList = page.locator("#herdsList");
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

  async openAddHerdModal() {
    await this.openAddHerdModalBtn.click();
  }

  async createHerd(herdName: string, herdCount: number) {
    await this.herdNameInput.fill(herdName);
    await this.herdCountInput.fill(String(herdCount));
    await this.addHerdSubmitBtn.click();
  }

  async searchHerd(herdName: string) {
    await this.herdsSearchInput.fill(herdName);
  }
}

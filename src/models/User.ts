import { ENV } from "../config/env.config";

export interface User {
  email: string;
  password: string;
  displayName: string;
}

/**
 * Returns a test user object populated from environment variables.
 * This helper is intended for use in tests and does **not** create a real
 * account in the application.
 * Partial overrides can be provided for customization.
 */
export function getTestUser(overrides: Partial<User> = {}): User {
  return {
    email: ENV.USER_EMAIL,
    password: ENV.USER_PASSWORD,
    displayName: ENV.USER_DISPLAY_NAME,
    ...overrides,
  };
}

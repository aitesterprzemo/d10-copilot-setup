import { ENV } from "../config/env.config";

export interface User {
  email: string;
  password: string;
  displayName: string;
}

/**
 * Returns a smoke test user object populated from environment variables.
 * This helper is intended for use in tests and does **not** create a real
 * account in the application.
 * Partial overrides can be provided for customization.
 */
export function getSmokeTestUser(overrides: Partial<User> = {}): User {
  return {
    email: ENV.SMOKE_USER_EMAIL,
    password: ENV.SMOKE_USER_PASSWORD,
    displayName: ENV.SMOKE_USER_DISPLAY_NAME,
    ...overrides,
  };
}

/**
 * Returns a session test user used by login-dependent suites.
 * This helper is intended for stateful flows that verify authenticated behavior.
 */
export function getSessionTestUser(overrides: Partial<User> = {}): User {
    return {
    email: ENV.SESSION_USER_EMAIL,
    password: ENV.SESSION_USER_PASSWORD,
    displayName: ENV.SESSION_USER_DISPLAY_NAME,
    ...overrides,
  };
}

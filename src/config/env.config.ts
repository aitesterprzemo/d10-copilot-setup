import "dotenv/config";

/**
 * Centralized environment variable configuration.
 * Validates that all required variables are set and non-empty at import time,
 * preventing silent failures during test execution.
 */

const REQUIRED_ENV_VARS = [
  "BASE_URL",
  "SMOKE_USER_EMAIL",
  "SMOKE_USER_PASSWORD",
  "SMOKE_USER_DISPLAY_NAME",
  "SESSION_USER_EMAIL",
  "SESSION_USER_PASSWORD",
  "SESSION_USER_DISPLAY_NAME",
] as const;

type EnvVarName = (typeof REQUIRED_ENV_VARS)[number];

function validateEnvVars(): Record<EnvVarName, string> {
  const missing: string[] = [];
  const resolved = {} as Record<EnvVarName, string>;

  for (const name of REQUIRED_ENV_VARS) {
    const value = process.env[name]?.trim();

    if (!value || value.trim() === "") {
      missing.push(name);
      continue;
    }

    resolved[name] = value;
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing or empty environment variable(s): ${missing.join(", ")}. ` +
        `Ensure these are defined in your .env/.env.ai file or CI environment.`,
    );
  }

  return resolved;
}

const validated = validateEnvVars();

export const ENV = {
  BASE_URL: validated.BASE_URL,
  SMOKE_USER_EMAIL: validated.SMOKE_USER_EMAIL,
  SMOKE_USER_PASSWORD: validated.SMOKE_USER_PASSWORD,
  SMOKE_USER_DISPLAY_NAME: validated.SMOKE_USER_DISPLAY_NAME,
  SESSION_USER_EMAIL: validated.SESSION_USER_EMAIL,
  SESSION_USER_PASSWORD: validated.SESSION_USER_PASSWORD,
  SESSION_USER_DISPLAY_NAME: validated.SESSION_USER_DISPLAY_NAME,
} as const;

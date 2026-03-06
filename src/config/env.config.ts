import "dotenv/config";

/**
 * Centralized environment variable configuration.
 * Validates that all required variables are set and non-empty at import time,
 * preventing silent failures during test execution.
 */

const REQUIRED_ENV_VARS = [
  "BASE_URL",
  "USER_EMAIL",
  "USER_PASSWORD",
  "USER_DISPLAY_NAME",
] as const;

type EnvVarName = (typeof REQUIRED_ENV_VARS)[number];

function resolveUserEnv(
  name: Exclude<EnvVarName, "BASE_URL">,
): string | undefined {
  const value = process.env[name]?.trim();

  if (value) {
    return value;
  }

  const legacyEnvNames: Record<Exclude<EnvVarName, "BASE_URL">, string[]> = {
    USER_EMAIL: ["SMOKE_USER_EMAIL", "SESSION_USER_EMAIL"],
    USER_PASSWORD: ["SMOKE_USER_PASSWORD", "SESSION_USER_PASSWORD"],
    USER_DISPLAY_NAME: ["SMOKE_USER_DISPLAY_NAME", "SESSION_USER_DISPLAY_NAME"],
  };

  return legacyEnvNames[name]
    .map((legacyName) => process.env[legacyName]?.trim())
    .find((legacyValue) => legacyValue);
}

function validateEnvVars(): Record<EnvVarName, string> {
  const missing: string[] = [];
  const resolved = {} as Record<EnvVarName, string>;

  for (const name of REQUIRED_ENV_VARS) {
    const value =
      name === "BASE_URL" ? process.env.BASE_URL?.trim() : resolveUserEnv(name);

    if (!value || value.trim() === "") {
      missing.push(name);
      continue;
    }

    resolved[name] = value;
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing or empty environment variable(s): ${missing.join(", ")}. ` +
        `Ensure these are defined in your .env/.env.ai file or CI environment. ` +
        `Legacy SMOKE_/SESSION_ user variables are also accepted as fallback inputs.`,
    );
  }

  return resolved;
}

const validated = validateEnvVars();

export const ENV = {
  BASE_URL: validated.BASE_URL,
  USER_EMAIL: validated.USER_EMAIL,
  USER_PASSWORD: validated.USER_PASSWORD,
  USER_DISPLAY_NAME: validated.USER_DISPLAY_NAME,
} as const;

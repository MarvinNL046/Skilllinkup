export const EMAIL_MAX_ATTEMPTS = 5;
export const EMAIL_LEASE_MS = 120_000;
export const EMAIL_TIMEOUT_MS = 20_000;
export function emailRetryDelay(attempt: number) {
  return [30_000, 120_000, 600_000, 1_800_000][Math.max(0, Math.min(3, attempt - 1))];
}

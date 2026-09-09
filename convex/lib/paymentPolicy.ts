/** Keep all monetary mutations disabled during the free private beta. */
export const PRIVATE_BETA_FREE = true;

export function requireLivePaymentsEnabled(action: string): void {
  throw new Error(`${action} is unavailable during the free private beta. No platform payment or credit movement is active.`);
}

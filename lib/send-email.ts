// Email sending utility for SkillLinkup
// Wraps Resend with graceful degradation when API key is not set

import { Resend } from 'resend';
import { render } from '@react-email/render';
import type { ReactElement } from 'react';

interface SendEmailOptions {
  to: string;
  subject: string;
  react: ReactElement;
  from?: string;
  replyTo?: string;
}

const DEFAULT_FROM = 'SkillLinkup <noreply@skilllinkup.com>';

/**
 * Send an email. Returns the Resend response or null if API key is not configured.
 * Throws on actual send errors.
 */
export async function sendEmail(options: SendEmailOptions) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[send-email] RESEND_API_KEY not set, skipping email to:', options.to);
    return null;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const html = await render(options.react);

  const result = await resend.emails.send({
    from: options.from ?? DEFAULT_FROM,
    to: options.to,
    subject: options.subject,
    html,
    replyTo: options.replyTo,
  });

  if (result.error) {
    throw new Error(`Resend error: ${result.error.message}`);
  }

  return result.data;
}

/**
 * Fire-and-forget email sending. Logs errors but never throws.
 * Use this in API routes where email failure should not block the response.
 */
export function sendEmailAsync(options: SendEmailOptions): void {
  sendEmail(options).catch((err) => {
    console.error('[send-email] Async send failed:', {
      to: options.to,
      subject: options.subject,
      error: err instanceof Error ? err.message : String(err),
    });
  });
}

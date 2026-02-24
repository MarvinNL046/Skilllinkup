import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { WelcomeEmail } from "@/emails/welcome";
import type { Locale } from "@/emails/translations";

// Use Edge runtime for production deployment
export const runtime = 'edge';

// Localized messages
const messages = {
 en: {
 invalidEmail: "Please provide a valid email address.",
 serviceUnavailable: "The newsletter service is temporarily unavailable. Please try again later.",
 subscribeError: "Failed to subscribe",
 success: "Successfully subscribed!",
 generalError: "An error occurred. Please try again later.",
 emailSubject: "Welcome to SkillLinkup!",
 },
 nl: {
 invalidEmail: "Vul een geldig e-mailadres in.",
 serviceUnavailable: "De nieuwsbrief service is tijdelijk niet beschikbaar. Probeer het later opnieuw.",
 subscribeError: "Aanmelden mislukt",
 success: "Je bent succesvol aangemeld!",
 generalError: "Er is een fout opgetreden. Probeer het later opnieuw.",
 emailSubject: "Welkom bij SkillLinkup!",
 },
};

export async function POST(request: Request) {
 try {
 const body = await request.json();
 const { email, locale: requestLocale } = body;

 // Determine locale (default to 'en' if not provided or invalid)
 const locale: Locale = (requestLocale === 'nl' || requestLocale === 'en') ? requestLocale : 'en';
 const t = messages[locale];

 // Validate email
 if (!email || !email.includes("@")) {
 return NextResponse.json(
 { message: t.invalidEmail },
 { status: 400 }
 );
 }

 // Check for required environment variables
 const RESEND_KEY = process.env.RESEND_API_KEY;
 const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

 if (!RESEND_KEY) {
 console.error("[Newsletter] Resend API key not configured");
 return NextResponse.json(
 { message: t.serviceUnavailable },
 { status: 503 }
 );
 }

 if (!AUDIENCE_ID) {
 console.error("[Newsletter] Resend Audience ID not configured");
 return NextResponse.json(
 { message: t.serviceUnavailable },
 { status: 503 }
 );
 }

 // Initialize Resend client
 const resend = new Resend(RESEND_KEY);

 // Subscribe to newsletter using Resend
 // Store locale as metadata for future mailings
 const data = await resend.contacts.create({
 email: email,
 audienceId: AUDIENCE_ID,
 // Note: Resend doesn't support custom fields yet, but when they do:
 // customFields: { locale: locale },
 });

 if (data.error) {
 console.error("Resend error:", data.error);
 return NextResponse.json(
 { message: data.error.message || t.subscribeError },
 { status: 500 }
 );
 }

 // Render the welcome email template with locale
 const emailHtml = await render(WelcomeEmail({ email, locale }));

 // Send welcome email in the user's language
 await resend.emails.send({
 from: "SkillLinkup <newsletter@skilllinkup.com>",
 to: email,
 subject: t.emailSubject,
 html: emailHtml,
 });

 return NextResponse.json(
 { message: t.success },
 { status: 200 }
 );
 } catch (error) {
 console.error("Newsletter subscription error:", error);
 // Default to English for catch-all errors
 return NextResponse.json(
 { message: "An error occurred. Please try again later." },
 { status: 500 }
 );
 }
}

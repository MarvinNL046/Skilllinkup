import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { ContactAdminEmail } from "@/emails/contact-admin";
import { ContactConfirmationEmail } from "@/emails/contact-confirmation";

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Please provide name, email, and message." },
        { status: 400 }
      );
    }

    // Validate email format
    if (!email.includes("@")) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("Resend API key not configured");
      return NextResponse.json(
        { message: "Contact form service is not configured yet. Please check back later." },
        { status: 503 }
      );
    }

    // Initialize Resend client
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email notification to admin using React Email template
    const adminHtml = await render(
      ContactAdminEmail({ name, email, subject, message })
    );

    const adminEmail = await resend.emails.send({
      from: "SkillLinkup Contact <contact@skilllinkup.com>",
      to: "info@staycoolairco.nl",
      replyTo: email,
      subject: `Contact Form: ${subject || 'New Message'}`,
      html: adminHtml,
    });

    if (adminEmail.error) {
      console.error("Resend error (admin):", adminEmail.error);
      return NextResponse.json(
        { message: adminEmail.error.message || "Failed to send message" },
        { status: 500 }
      );
    }

    // Send confirmation email to user using React Email template
    const confirmHtml = await render(
      ContactConfirmationEmail({ name, message })
    );

    await resend.emails.send({
      from: "SkillLinkup <contact@skilllinkup.com>",
      to: email,
      subject: "We received your message - SkillLinkup",
      html: confirmHtml,
    });

    return NextResponse.json(
      { message: "Message sent successfully! We'll get back to you soon." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

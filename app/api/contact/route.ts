import { NextResponse } from "next/server";
import { Resend } from "resend";

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

    // Send email notification to admin
    const adminEmail = await resend.emails.send({
      from: "SkillLinkup Contact <contact@skilllinkup.com>",
      to: "info@staycoolairco.nl", // Your admin email
      replyTo: email,
      subject: `Contact Form: ${subject || 'New Message'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">New Contact Form Submission</h1>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
          </div>

          <div style="background: #fff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p style="color: #666; font-size: 14px; margin-top: 32px;">
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    if (adminEmail.error) {
      console.error("Resend error (admin):", adminEmail.error);
      return NextResponse.json(
        { message: adminEmail.error.message || "Failed to send message" },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    await resend.emails.send({
      from: "SkillLinkup <contact@skilllinkup.com>",
      to: email,
      subject: "We received your message - SkillLinkup",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Thanks for reaching out!</h1>
          <p>Hi ${name},</p>
          <p>We've received your message and will get back to you as soon as possible.</p>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p>Best regards,<br>The SkillLinkup Team</p>

          <p style="color: #666; font-size: 14px; margin-top: 32px;">
            This is an automated confirmation. Please do not reply to this email.
          </p>
        </div>
      `,
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

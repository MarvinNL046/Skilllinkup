import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Subscribe to newsletter using Resend
    // Note: You'll need to set up a contact list in Resend first
    const data = await resend.contacts.create({
      email: email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
    });

    if (data.error) {
      console.error("Resend error:", data.error);
      return NextResponse.json(
        { message: data.error.message || "Failed to subscribe" },
        { status: 500 }
      );
    }

    // Send welcome email
    await resend.emails.send({
      from: "SkillLinkup <newsletter@skilllinkup.com>",
      to: email,
      subject: "Welcome to SkillLinkup Newsletter!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Welcome to SkillLinkup!</h1>
          <p>Thanks for subscribing to our newsletter. You'll now receive:</p>
          <ul>
            <li>Weekly platform reviews and comparisons</li>
            <li>Freelancing tips and success stories</li>
            <li>Exclusive insights and insider knowledge</li>
          </ul>
          <p>We're excited to help you find the perfect freelance platform!</p>
          <p style="color: #666; font-size: 14px; margin-top: 32px;">
            If you didn't subscribe to this list, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Successfully subscribed!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { message: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

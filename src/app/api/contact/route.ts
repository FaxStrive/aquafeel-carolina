import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      ownerRenter,
      occupants,
      message,
      source,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !city || !zip) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Build email-friendly text
    const text = [
      `New Water Consultation Request`,
      ``,
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Address: ${address || "N/A"}`,
      `City: ${city}`,
      `State: ${state || "NC"}`,
      `Zip: ${zip}`,
      `Owner/Renter: ${ownerRenter || "N/A"}`,
      `Occupants: ${occupants || "N/A"}`,
      ``,
      `Message:`,
      message || "(none)",
    ].join("\n");

    // Send to Make.com webhook
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL || "https://hook.us2.make.com/c1zdm1gsl4aobpln2fsvwgbe7849w5gw";
    {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          address,
          city,
          state,
          zip,
          ownerRenter,
          occupants,
          message,
          source: source || "aquafeel-carolina-website",
          submittedAt: new Date().toISOString(),
        }),
      });
    }

    // Option 2: Send email via Resend (if API key provided)
    const resendKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.NOTIFY_EMAIL || "info@aquafeelcarolina.com";
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Aquafeel Website <noreply@aquafeelcarolina.com>",
          to: [notifyEmail],
          subject: `New Consultation Request from ${firstName} ${lastName}`,
          text,
        }),
      });
    }

    // If no webhook or email configured, log for development
    if (!webhookUrl && !resendKey) {
      console.log("=== Contact Form Submission ===");
      console.log(text);
      console.log("===============================");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

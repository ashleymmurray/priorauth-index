export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return Response.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          reactivate_existing: true,
          send_welcome_email: true,
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return Response.json(
        { error: errorData?.message || "Subscription failed. Please try again." },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json({ success: true, data });
  } catch (err) {
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

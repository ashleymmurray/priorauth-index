export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ error: "A valid email address is required." });
    }

    const beehiivRes = await fetch(
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

    const data = await beehiivRes.json().catch(() => null);

    if (!beehiivRes.ok) {
      return res
        .status(beehiivRes.status)
        .json({ error: data?.message || "Subscription failed. Please try again." });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}

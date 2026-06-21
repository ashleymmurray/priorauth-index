export async function POST(req) {
  try {
    const body = await req.json();

    const email = body.email;

    if (!email) {
      return Response.json(
        {
          error: "Email required",
        },
        {
          status: 400,
        }
      );
    }

    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      return Response.json(
        {
          error:
            data.message ||
            "Beehiiv subscription failed",
        },
        {
          status: response.status,
        }
      );
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}
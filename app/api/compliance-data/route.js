export async function GET() {
  const res = await fetch(
    "https://artificerhealth.com/payer_publication_status.json",
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    return Response.json(
      { error: "Unable to load compliance data" },
      { status: res.status }
    );
  }

  const data = await res.json();

  return Response.json(data);
}

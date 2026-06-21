export function slugifyPayerName(name) {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function getAllPayerData(
  MA_2024,
  ACA_2024,
  CY2025_DATA
) {
  return [
    ...MA_2024.map((item) => ({
      ...item,
      dataset: "Medicare Advantage 2024",
    })),

    ...ACA_2024.map((item) => ({
      ...item,
      dataset: "ACA Marketplace 2024",
    })),

    ...CY2025_DATA.map((item) => ({
      ...item,
      dataset: "2025 CMS / Plan Reporting",
    })),
  ];
}

export function getUniquePayers(allData) {
  const seen = new Map();

  allData.forEach((item) => {
    const slug = slugifyPayerName(
      item.insurer
    );

    if (!seen.has(slug)) {
      seen.set(slug, {
        slug,
        insurer: item.insurer,
      });
    }
  });

  return Array.from(seen.values());
}

export function getPayerBySlug(
  slug,
  allData
) {
  return allData.filter(
    (item) =>
      slugifyPayerName(item.insurer) ===
      slug
  );
}
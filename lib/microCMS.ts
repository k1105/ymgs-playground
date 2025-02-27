// lib/microCMS.ts
export async function fetchWorkBySlug(slug: string) {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN!;
  const apiKey = process.env.MICROCMS_API_KEY!;

  if (!serviceDomain || !apiKey) {
    throw new Error(
      "Missing required environment variables: MICROCMS_SERVICE_DOMAIN or MICROCMS_API_KEY"
    );
  }

  const response = await fetch(
    `https://${serviceDomain}.microcms.io/api/v1/work?filters=slug[equals]${slug}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": apiKey,
      },
    }
  );

  const data = await response.json();
  const content = data.contents[0] as Work;

  // page配列があれば走査して image_row の各 image に width, height を付与
  if (content?.page) {
    content.page.forEach((pageItem) => {
      if (pageItem.fieldId === "image_page" && pageItem.image_row) {
        pageItem.images?.forEach((images: Image[]) => {
          images = images.map((img) => {
            return {
              ...img,
              width: img.width ?? 1600,
              height: img.height ?? 900,
            };
          });
        });
      }
    });
  }

  return content;
}

export async function fetchAllWorks() {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN!;
  const apiKey = process.env.MICROCMS_API_KEY!;

  const response = await fetch(
    `https://${serviceDomain}.microcms.io/api/v1/work?filters=category[contains]work&limit=30`,
    {
      headers: {
        "X-MICROCMS-API-KEY": apiKey,
      },
    }
  ).then((res) => res.json());

  // yearの降順でソート
  const sortedContents = response.contents.sort(
    (a: any, b: any) => b.year - a.year
  );

  return sortedContents; // ソートされたコンテンツの配列を返す
}

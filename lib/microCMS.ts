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

  console.log(response);

  const data = await response.json();
  return data.contents[0]; // 必要な作品データを返す
}

export async function fetchAllWorks() {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN!;
  const apiKey = process.env.MICROCMS_API_KEY!;

  const response = await fetch(
    `https://${serviceDomain}.microcms.io/api/v1/work`,
    {
      headers: {
        "X-MICROCMS-API-KEY": apiKey,
      },
      // App Routerで、SSGにする場合はキャッシュを有効化
      // 例: { next: { revalidate: 60 } } でISRも可能（60秒おきに再生成）
      next: { revalidate: 60 },
    }
  ).then((res) => res.json());

  return response.contents; // コンテンツの配列を返す
}

import { Profile } from "@/components/scene/Profile";
import { Carrier } from "@/components/scene/Carrier";
import { SceneManager } from "@/components/SceneManager";
import Layout from "@/components/Layout";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN!;
const apiKey = process.env.MICROCMS_API_KEY!;

if (!serviceDomain || !apiKey) {
  throw new Error(
    "Missing required environment variables: MICROCMS_SERVICE_DOMAIN or MICROCMS_API_KEY"
  );
}

type MicroCMSContent = {
  id: string;
  year: number;
  group: string[];
  content_ja: { fieldId: string; text: string }[];
  content_en: { fieldId: string; text: string }[];
};

type MicroCMSResponse = {
  contents: MicroCMSContent[];
  totalCount: number;
  offset: number;
  limit: number;
};

// ✅ `Promise` を明示的に返すことで Next.js 15 に適合
export async function generateStaticParams(): Promise<
  Array<{ locale: string }>
> {
  return [{ locale: "ja" }, { locale: "en" }];
}

// ✅ `params` を `Promise` 型に適合させる
export default async function Home({
  params,
}: {
  params: Awaited<Promise<{ locale: string }>>;
}) {
  const locale = params.locale || "ja"; // デフォルトを "ja" に設定
  const grantsAwards = await getGrantsAndAwardsData(locale);

  return (
    <Layout>
      <SceneManager
        scenes={[
          <Profile key="scene-profile" />,
          <Carrier
            key="scene-awards"
            items={grantsAwards}
            title="Grants and Awards"
          />,
          <Carrier
            key="scene-exhibitions"
            items={[]}
            title="Solo Exhibitions"
          />,
        ]}
        languageMode={locale}
      />
    </Layout>
  );
}

async function getGrantsAndAwardsData(locale: string) {
  const response = await fetch(
    `https://${serviceDomain}.microcms.io/api/v1/carrier?filters=group[contains]grants_and_awards`,
    {
      headers: { "X-MICROCMS-API-KEY": apiKey },
      next: { revalidate: false }, // SSG
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch grants and awards data");
  }

  const data: MicroCMSResponse = await response.json();

  return transformData(data, locale);
}

function transformData(data: MicroCMSResponse, locale: string) {
  const contentKey = locale === "ja" ? "content_ja" : "content_en";

  return data.contents.map((item) => ({
    id: item.id,
    year: item.year,
    content: item[contentKey].map((c) => c.text),
  }));
}

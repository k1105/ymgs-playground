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

export default async function Home({
  params,
}: {
  params: Record<string, string>;
}) {
  const locale = params.locale || "ja"; // デフォルトを日本語に
  const grantsAwards = await getGrantsAndAwardsData(locale);

  return (
    <Layout>
      <SceneManager
        scenes={[
          <Profile key="scene-profile" />,
          <Carrier
            key="scene-awards"
            items={grantsAwards} // APIから取得
            title="Grants and Awards"
          />,
          <Carrier
            key="scene-exhibitions"
            items={[]} // soloExhibitions は後で追加
            title="Solo Exhibitions"
          />,
        ]}
        languageMode={locale}
      />
    </Layout>
  );
}

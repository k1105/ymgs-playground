import { WorkList } from "@/components/scene/WorkList";
import { Carrier } from "@/components/scene/Carrier";
import { SceneManager } from "@/components/SceneManager";
import Layout from "@/components/Layout";
import { fetchAllWorks } from "@/lib/microCMS";
import styles from "./styles/Home.module.css";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN!;
const apiKey = process.env.MICROCMS_API_KEY!;

type Props = { params: Promise<{ locale: string }> };

if (!serviceDomain || !apiKey) {
  throw new Error(
    "Missing required environment variables: MICROCMS_SERVICE_DOMAIN or MICROCMS_API_KEY"
  );
}

type BioContent = {
  id: string;
  content_ja: string;
  content_en: string;
};

type CarrierContent = {
  id: string;
  year: number;
  group: string[];
  content: { fieldId: string; text_ja: string; text_en: string }[];
};

type CarrierResponse = {
  contents: CarrierContent[];
  totalCount: number;
  offset: number;
  limit: number;
};

type BioResponse = {
  content: BioContent;
};

export async function generateStaticParams(): Promise<
  Array<{ locale: string }>
> {
  return [{ locale: "ja" }, { locale: "en" }];
}

export default async function Home({ params }: Props) {
  const { locale } = await params; // デフォルトを "ja" に設定
  const grantsAwards = await getCarrierData(locale, "grants_and_awards");
  const soloExhibition = await getCarrierData(locale, "solo_exhibition");
  const groupExhibition = await getCarrierData(locale, "group_exhibition");
  const performance = await getCarrierData(locale, "performance");
  const carrier = await getCarrierData(locale, "carrier");
  const lecturesAndTalks = await getCarrierData(locale, "lectures_talks");
  const works = await fetchAllWorks();

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <SceneManager
            scenes={[
              <WorkList key="scene-profile" locale={locale} works={works} />,
              <Carrier
                key="scene-awards"
                items={grantsAwards}
                title="Grants and Awards"
              />,
              <Carrier
                key="scene-exhibitions"
                items={soloExhibition}
                title="Solo Exhibitions (Selection)"
              />,
              <Carrier
                key="group-exhibitions"
                items={groupExhibition}
                title="Group Exhibition (Selection)"
              />,
              <Carrier
                key="performance"
                items={performance}
                title="Performance"
              />,
              <Carrier
                key="lectures-and-talks"
                items={lecturesAndTalks}
                title="Lectures and Talks"
              />,
              <Carrier key="carrier" items={carrier} title="経歴 / Carrier" />,
            ]}
            languageMode={locale}
          />
        </div>
      </div>
    </Layout>
  );
}

async function getCarrierData(locale: string, group: string) {
  const response = await fetch(
    `https://${serviceDomain}.microcms.io/api/v1/carrier?filters=group[contains]${group}`,
    {
      headers: { "X-MICROCMS-API-KEY": apiKey },
      next: { revalidate: false }, // SSG
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${group} data`);
  }

  const data: CarrierResponse = await response.json();

  return transformCarrierData(data, locale);
}

function transformCarrierData(data: CarrierResponse, locale: string) {
  const contentKey = locale === "ja" ? "text_ja" : "text_en";

  return data.contents.map((item) => ({
    id: item.id,
    year: item.year,
    content: item.content ? item.content.map((c) => c[contentKey]) : [],
  }));
}

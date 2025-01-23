import { Profile } from "@/components/scene/Profile";
import { Carrier } from "@/components/scene/Carrier";
import { SceneManager } from "@/components/SceneManager";
import Layout from "@/components/Layout";
import { fetchAllWorks } from "@/lib/microCMS";

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
  const bio = await getBio(locale);
  const grantsAwards = await getCarrierData(locale, "grants_and_awards");
  const soloExhibition = await getCarrierData(locale, "solo_exhibition");
  const works = await fetchAllWorks();

  return (
    <Layout>
      <SceneManager
        scenes={[
          <Profile
            key="scene-profile"
            bio={bio.content}
            locale={locale}
            works={works}
          />,
          <Carrier
            key="scene-awards"
            items={grantsAwards}
            title="Grants and Awards"
          />,
          <Carrier
            key="scene-exhibitions"
            items={soloExhibition}
            title="Solo Exhibitions"
          />,
        ]}
        languageMode={locale}
      />
    </Layout>
  );
}

async function getBio(locale: string) {
  const response = await fetch(
    `https://${serviceDomain}.microcms.io/api/v1/bio`,
    {
      headers: { "X-MICROCMS-API-KEY": apiKey },
      next: { revalidate: false }, // SSG
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch bio`);
  }

  const data: BioResponse = await response.json();

  return transformBioData(data, locale);
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

function transformBioData(data: BioResponse, locale: string) {
  return {
    id: data.content.id,
    content:
      locale === "ja" ? data.content.content_ja : data.content.content_en,
  };
}

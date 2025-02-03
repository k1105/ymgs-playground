import styles from "./CV.module.scss";
import { Carrier } from "@/components/scene/bio/Carrier";
import { SceneManager } from "@/components/common/SceneManager";
import { Bio } from "@/components/scene/bio/Bio";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN!;
const apiKey = process.env.MICROCMS_API_KEY!;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  return {
    title: `CV | 森田 明日香`,
  };
}

const CV = async ({ params }: Props) => {
  const { locale } = await params; // デフォルトを "ja" に設定
  const bio = await getBio(locale);
  const grantsAwards = await getCarrierData(locale, "grants_and_awards");
  const soloExhibition = await getCarrierData(locale, "solo_exhibition");
  const groupExhibition = await getCarrierData(locale, "group_exhibition");
  const performance = await getCarrierData(locale, "performance");
  const carrier = await getCarrierData(locale, "carrier");
  const lecturesAndTalks = await getCarrierData(locale, "lectures_talks");
  return (
    <>
      <div className={styles.container}>
        <SceneManager
          scenes={[
            <Bio key="scene-bio" locale={locale} bio={bio.content} />,
            <Carrier
              key="scene-awards"
              dataGroups={[
                { title: "経歴 / Carrier", items: carrier },
                {
                  title: "Solo Exhibitions (Selection)",
                  items: soloExhibition,
                },
                {
                  title: "Group Exhibition (Selection)",
                  items: groupExhibition,
                },
                { title: "Grants and Awards", items: grantsAwards },
                { title: "Performance", items: performance },
                { title: "Lectures and Talks", items: lecturesAndTalks },
              ]}
            />,
          ]}
          languageMode={locale}
          pageTitle="CV・作家経歴"
        />
      </div>
    </>
  );
};

export default CV;

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

function transformBioData(data: BioResponse, locale: string) {
  return {
    id: data.content.id,
    content:
      locale === "ja" ? data.content.content_ja : data.content.content_en,
  };
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

import styles from "../styles/CV.module.scss";
import { Fragment } from "react";
import { Carrier } from "@/components/scene/Carrier";
import { SceneManager } from "@/components/SceneManager";
import { Bio } from "@/components/scene/Bio";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN!;
const apiKey = process.env.MICROCMS_API_KEY!;

type Props = { params: Promise<{ locale: string }> };

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

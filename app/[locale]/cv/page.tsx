import Layout from "@/components/Layout";
import styles from "../styles/CV.module.scss";
import { Fragment } from "react";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN!;
const apiKey = process.env.MICROCMS_API_KEY!;

type Props = { params: Promise<{ locale: string }> };

type BioContent = {
  id: string;
  content_ja: string;
  content_en: string;
};

type BioResponse = {
  content: BioContent;
};

const CV = async ({ params }: Props) => {
  const { locale } = await params; // デフォルトを "ja" に設定
  const bio = await getBio(locale);
  const paragraphs = bio.content.split("\n").map((line, index) => (
    <Fragment key={index}>
      {line}
      <br />
    </Fragment>
  ));
  return (
    <Layout>
      <div className={styles.container}>
        <p className={styles.name}>
          {locale === "ja" ? `森田 明日香 (もりた・あすか)` : `Asuka Morita`}
        </p>
        <div className={styles.profileContainer}>
          <p
            style={{
              fontSize: "0.9rem",
              marginBottom: "2rem",
              lineHeight: "1.8rem",
            }}
          >
            {paragraphs}
          </p>
        </div>
      </div>
    </Layout>
  );
};

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

export default CV;

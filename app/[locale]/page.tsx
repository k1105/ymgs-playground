import { WorkList } from "@/components/scene/WorkList";
import { SceneManager } from "@/components/common/SceneManager";
import styles from "./Home.module.scss";
import { fetchAllWorks } from "@/lib/microCMS";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN!;
const apiKey = process.env.MICROCMS_API_KEY!;

type Props = { params: Promise<{ locale: string }> };

if (!serviceDomain || !apiKey) {
  throw new Error(
    "Missing required environment variables: MICROCMS_SERVICE_DOMAIN or MICROCMS_API_KEY"
  );
}

export async function generateStaticParams(): Promise<
  Array<{ locale: string }>
> {
  return [{ locale: "ja" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `森田 明日香`,
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params; // デフォルトを "ja" に設定
  const works = await fetchAllWorks();

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <SceneManager
          scenes={[
            <WorkList key="scene-profile" locale={locale} works={works} />,
          ]}
          languageMode={locale}
          pageTitle="作品一覧"
        />
      </div>
    </div>
  );
}

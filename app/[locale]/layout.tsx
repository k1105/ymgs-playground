"use client";

import { poppins, zenKakuGothic } from "../font";
import { usePathname } from "next/navigation";
import { switchLocale } from "@/lib/i18n";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import {
  NameContainerProvider,
  useNameContainer,
} from "@/components/context/NameContainerContext";
import "./styles/globals.css";
import styles from "./Home.module.scss";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${poppins.variable} ${zenKakuGothic.variable}`}>
        <ThemeProvider>
          <NameContainerProvider>
            <NameContainer />
            {children}
          </NameContainerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

const NameContainer = () => {
  const { isHidden } = useNameContainer();
  const pathname = usePathname();
  const params = useParams();
  const locale = Array.isArray(params.locale)
    ? params.locale[0]
    : params.locale || "ja"; // `locale` を取得
  const customLocale = locale !== "ja" ? locale : "";

  return (
    <div className={`${styles.nameContainer} ${isHidden ? styles.hidden : ""}`}>
      <Link
        href={`/${customLocale}`}
        style={{ textDecoration: "none", color: "var(--text-color)" }}
      >
        <p className={`${styles.ja} ${styles.link}`}>もりたあすか</p>
      </Link>
      <Link href={`/${customLocale}`} className={styles.link}>
        works
      </Link>
      <Link href={`${customLocale}/cv`} className={styles.link}>
        cv
      </Link>
      <div className={styles.languageSwitcherContainer}>
        <div
          onClick={() => {
            switchLocale(pathname);
          }}
          className={`${styles.button} ${locale !== "en" && styles.active}`}
        >
          <p style={{ userSelect: "none" }}>Ja</p>
        </div>
        <div
          onClick={() => {
            switchLocale(pathname);
          }}
          className={`${styles.button} ${locale == "en" && styles.active}`}
        >
          <p style={{ userSelect: "none" }}>En</p>
        </div>
      </div>
    </div>
  );
};

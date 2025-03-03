"use client";

import Link from "next/link";
import styles from "./Header.module.scss";
import { useNameContainer } from "../context/NameContainerContext";
import { usePathname, useParams } from "next/navigation";
import { switchLocale } from "@/lib/i18n";

export const Header = () => {
  const { isHidden } = useNameContainer();
  const pathname = usePathname();
  const params = useParams();
  const locale = Array.isArray(params.locale)
    ? params.locale[0]
    : params.locale || "ja"; // `locale` を取得
  return (
    <div className={`${styles.nameContainer} ${isHidden ? styles.hidden : ""}`}>
      <Link
        href={`${locale == "ja" ? "/" : "/" + locale}`}
        style={{ textDecoration: "none", color: "var(--text-color)" }}
      >
        <p className={`${styles.ja} ${styles.link}`}>もりたあすか</p>
      </Link>
      <Link
        href={`${locale == "ja" ? "/" : "/" + locale}`}
        className={styles.link}
      >
        works
      </Link>
      <Link
        href={`${locale == "ja" ? "" : "/" + locale}/cv`}
        className={`${styles.link}`}
      >
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

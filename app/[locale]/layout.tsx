"use client";

import { usePathname } from "next/navigation";
import { getCurrentLocale, switchLocale } from "@/lib/i18n";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import {
  NameContainerProvider,
  useNameContainer,
} from "@/components/context/NameContainerContext";
import "./styles/globals.css";
import { useRef, useState } from "react";
import { FontTester } from "@/components/common/FontTester";
import { HambergerMenu } from "@/components/common/HambergerMenu";
import DynamicLink from "@/components/common/DynamicLink";
import styles from "./Home.module.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [jaIndex, setJaIndex] = useState<number>(0);
  const [enIndex, setEnIndex] = useState<number>(0);
  const jaFontRef = useRef<HTMLParagraphElement>(null);
  const enFontRef = useRef<HTMLParagraphElement>(null);

  return (
    <html>
      <body>
        <ThemeProvider>
          <NameContainerProvider>
            <FontTester
              jaIndex={jaIndex}
              enIndex={enIndex}
              jaFontRef={jaFontRef}
              enFontRef={enFontRef}
            >
              <HambergerMenu
                setJaIndex={setJaIndex}
                setEnIndex={setEnIndex}
                jaFontRef={jaFontRef}
                enFontRef={enFontRef}
              />
              <NameContainer />
              {children}
            </FontTester>
          </NameContainerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

const NameContainer = () => {
  const { isHidden } = useNameContainer();
  const pathname = usePathname();
  const currentLocale = getCurrentLocale(pathname);

  return (
    <div className={`${styles.nameContainer} ${isHidden ? styles.hidden : ""}`}>
      <DynamicLink
        href={`/`}
        style={{ textDecoration: "none", color: "var(--text-color)" }}
      >
        <p className={`${styles.ja} ${styles.link}`}>もりたあすか</p>
      </DynamicLink>
      <DynamicLink href="/" className={styles.link}>
        works
      </DynamicLink>
      <DynamicLink href="/cv" className={styles.link}>
        cv
      </DynamicLink>
      <div className={styles.languageSwitcherContainer}>
        <div
          onClick={() => {
            switchLocale(pathname);
          }}
          className={`${styles.button} ${
            currentLocale !== "en" && styles.active
          }`}
        >
          Ja
        </div>
        <div
          onClick={() => {
            switchLocale(pathname);
          }}
          className={`${styles.button} ${
            currentLocale == "en" && styles.active
          }`}
        >
          En
        </div>
      </div>
    </div>
  );
};

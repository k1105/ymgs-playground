"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import {
  NameContainerProvider,
  useNameContainer,
} from "@/components/context/NameContainerContext";
import "./styles/globals.css";
import { useRef, useState } from "react";
import { FontTester } from "@/components/FontTester";
import { HambergerMenu } from "@/components/HambergerMenu";
import DynamicLink from "@/components/DynamicLink";
import styles from "./styles/Home.module.scss";

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

  return (
    <div className={`${styles.nameContainer} ${isHidden ? styles.hidden : ""}`}>
      <DynamicLink
        href={`/`}
        style={{ textDecoration: "none", color: "var(--text-color)" }}
      >
        <p className={`${styles.ja} ${styles.link}`}>もりたあすか</p>
      </DynamicLink>
      <p className={styles.link}>works</p>
      <p className={styles.link}>cv</p>
    </div>
  );
};

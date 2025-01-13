import { SetStateAction, useState, Dispatch, RefObject } from "react";
import { usePathname } from "next/navigation";
import { getCurrentLocale, switchLocale } from "@/lib/i18n";
import { RoundAutorenew } from "./icones/RoundAutoRenew";
import styles from "./HambergerMenu.module.scss";
import DynamicLink from "./DynamicLink";

export const HambergerMenu = ({
  setJaIndex,
  setEnIndex,
  jaFontRef,
  enFontRef,
}: {
  setJaIndex: Dispatch<SetStateAction<number>>;
  setEnIndex: Dispatch<SetStateAction<number>>;
  jaFontRef: RefObject<HTMLParagraphElement | null>;
  enFontRef: RefObject<HTMLParagraphElement | null>;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const currentLocale = getCurrentLocale(pathname);
  return (
    <>
      <p
        className={styles.toggleButton}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {isOpen ? "Hide" : "Show"}
      </p>
      <div className={`${styles.container} ${isOpen && styles.active}`}>
        <DynamicLink
          href={`/`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className={styles.nameContainer}>
            <p className={styles.ja}>morita asuka</p>
            <p className={styles.en}>森田 明日香</p>
          </div>
        </DynamicLink>

        <div className={styles.workList}>
          <div className={styles.workTitleContainer}>
            <DynamicLink
              href={"/where-is-kirimochi"}
              className={styles.link}
              style={{ textDecoration: "none", color: "black" }}
            >
              きりもちの所在<span className={styles.year}>(2024)</span>
            </DynamicLink>
          </div>
          <div className={styles.workTitleContainer}>
            <p>
              <s>Observing Variation: in Sliced Loin Hams</s>
              <span className={styles.year}>(2023)</span>
            </p>
          </div>
          <div className={styles.workTitleContainer}>
            <p>
              <s>Lag</s>
              <span className={styles.year}>(2022)</span>
            </p>
          </div>
          <div className={styles.workTitleContainer}>
            <p>
              <s>Gap</s>
              <span className={styles.year}>(2021)</span>
            </p>
          </div>
          <div className={styles.workTitleContainer}>
            <p>
              <s>minim</s>
              <span className={styles.year}>(2020)</span>
            </p>
          </div>
        </div>

        <div className={styles.styleTester}>
          <div className={styles.fontTester}>
            <h3 className={styles.title}>Font</h3>
            <div className={styles.fontInformation}>
              <p ref={jaFontRef} />
              <button
                className={styles.renewButton}
                onClick={() => setJaIndex((prev) => prev + 1)}
              >
                <RoundAutorenew />
              </button>
            </div>
            <div className={styles.fontInformation}>
              <p ref={enFontRef} />
              <button
                className={styles.renewButton}
                onClick={() => setEnIndex((prev) => prev + 1)}
              >
                <RoundAutorenew />
              </button>
            </div>
          </div>
          <h3 className={styles.title}>
            <s>Color Theme</s>
          </h3>
          <div className={styles.colorTipsContainer}>
            <div className={`${styles.colorTip} ${styles.black}`} />
            <div className={`${styles.colorTip} ${styles.white}`} />
          </div>
          <h3 className={styles.title}>Language</h3>
          <p>
            {currentLocale == "ja" ? (
              <s>JA</s>
            ) : (
              <span
                onClick={() => {
                  switchLocale(pathname);
                }}
              >
                JA
              </span>
            )}{" "}
            |{" "}
            {currentLocale == "en" ? (
              <s>EN</s>
            ) : (
              <span
                onClick={() => {
                  switchLocale(pathname);
                }}
              >
                EN
              </span>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

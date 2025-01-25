import { SetStateAction, useState, Dispatch, RefObject } from "react";
import { usePathname } from "next/navigation";
import { getCurrentLocale, switchLocale } from "@/lib/i18n";
import { RoundAutorenew } from "./icones/RoundAutoRenew";
import styles from "./HambergerMenu.module.scss";
import DynamicLink from "./DynamicLink";
import { ListBulleted } from "./icones/ListBulleted";

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
      <div className={`${styles.nameContainer} ${isOpen && styles.open}`}>
        <DynamicLink
          href={`/`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <p className={styles.ja}>morita asuka</p>
        </DynamicLink>
      </div>

      <div className={styles.headerContainer}>
        <p
          className={`${styles.toggleButton} ${isOpen && styles.open}`}
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <ListBulleted style={{ width: "1.5rem", height: "1.5rem" }} />
          <span className={styles.smallCaption}>
            {isOpen ? "きえる" : "でる"}
          </span>
        </p>
      </div>

      <div className={`${styles.container} ${isOpen && styles.active}`}>
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
          <div className={styles.inlineContainer}>
            <h3 className={styles.title}>
              <s>Color Theme</s>
            </h3>
            <div className={styles.colorTipsContainer}>
              <div className={`${styles.colorTip} ${styles.black}`} />
              <div className={`${styles.colorTip} ${styles.white}`} />
            </div>
          </div>
          <div className={styles.inlineContainer}>
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
      </div>
    </>
  );
};

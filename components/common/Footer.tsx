import { useNameContainer } from "../context/NameContainerContext";
import styles from "./Footer.module.scss";
import { useSceneProps } from "./SceneManager";
import { usePathname } from "next/navigation";

export const Footer = ({ pageTitle }: { pageTitle: string }) => {
  const { currentSegmentIndex, segmentsLength, sceneIndex, sceneLength } =
    useSceneProps();
  const { isHidden } = useNameContainer();
  useNameContainer(); // 現在のパスを取得
  const pathname = usePathname();
  const isWorkPath = pathname.startsWith("/work");
  console.log("isWorkPath", isWorkPath);

  return (
    <div className={styles.footer}>
      <p>{pageTitle}</p>

      <div
        style={{
          opacity: isHidden || !isWorkPath ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        {sceneLength > 1 ? (
          <p>
            {sceneIndex + 1}
            <span className={styles.small}>
              {segmentsLength > 1 && "・" + (currentSegmentIndex + 1)}
            </span>
            {"     "} / {sceneLength}
          </p>
        ) : (
          <p>
            {segmentsLength > 1 && currentSegmentIndex + 1}
            {"     "} / {segmentsLength > 1 && segmentsLength}
          </p>
        )}
      </div>
    </div>
  );
};

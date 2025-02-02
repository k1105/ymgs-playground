import styles from "./Footer.module.scss";
import { useSceneProps } from "./SceneManager";

export const Footer = ({ pageTitle }: { pageTitle: string }) => {
  const { currentSegmentIndex, segmentsLength, sceneIndex, sceneLength } =
    useSceneProps();
  return (
    <div className={styles.footer}>
      <p>{pageTitle}</p>
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
  );
};

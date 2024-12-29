import { useEffect, useRef, useState } from "react";
import { Carieer } from "./scene/Carieer";
import { Profile } from "./scene/Profile";

export const SceneManager = ({ scene }: { scene: number }) => {
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const [mountScene, setMountScene] = useState<number>(scene);
  const [sceneState, setSceneState] = useState<
    "mounting" | "unmounting" | "mounted" | "unmounted" | undefined
  >();
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
    } else {
      setSceneState("unmounting");
      setTimeout(() => {
        setSceneState("unmounted");
      }, 1000);
    }
  }, [scene]);

  useEffect(() => {
    if (sceneState == "unmounted") {
      //子コンポーネントのunmountが完了したら
      setMountScene(scene); //新しいシーンに遷移
    }
  }, [sceneState]);
  return (
    <>
      {mountScene == 0 && <Carieer sceneState={sceneState} />}
      {mountScene == 1 && <Profile sceneState={sceneState} />}
    </>
  );
};

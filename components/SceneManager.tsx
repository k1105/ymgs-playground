import { useEffect, useRef, useState, cloneElement, ReactElement } from "react";

type SceneManagerProps = {
  scenes: ReactElement<any>[]; // ここをReactNode[]でもOKだが、後述の注意あり
  languageMode: "ja" | "en";
};

export const SceneManager = ({ scenes, languageMode }: SceneManagerProps) => {
  const [sceneIndex, setSceneIndex] = useState<number>(0);
  const [transitionProgress, setTransitionProgress] = useState<number>(0);
  const [isEasing, setIsEasing] = useState<boolean>(false);
  const [isAutoTransition, setIsAutoTransition] = useState<boolean>(false);
  const [isTouching, setIsTouching] = useState<boolean>(false);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState<number>(0);
  const [segmentsLength, setSegmentsLength] = useState<number>(0);

  // transitionProgress : -∞～+∞
  //  * -100以下 → 前のシーンへ
  //  * +100以上 → 次のシーンへ
  //  * -100～100 の範囲内 → 50ms 変化が無ければイージングで 0 に戻す

  // ▼ 「最後に wheel で transitionProgress を更新した時刻」を保持
  const [lastWheelTime, setLastWheelTime] = useState<number>(0);
  // ▼ タッチ系で使用：指を置いた時の Y 座標を保持
  const touchStartYRef = useRef<number>(0);

  // ▼ 「イージングアニメーション中かどうか」フラグ

  // ▼ transitionProgress 監視
  useEffect(() => {
    // (A) 閾値を超えたらシーンを切り替え
    const threshold = 80;
    if (!isAutoTransition && !isTouching) {
      if (transitionProgress > threshold) {
        console.log(currentSegmentIndex);
        if (currentSegmentIndex >= segmentsLength - 1) {
          // 次のシーンへ
          setSceneIndex((prev) => (prev + 1) % scenes.length);
          setCurrentSegmentIndex(0);
          setSegmentsLength(0);
        } else {
          setCurrentSegmentIndex((prev) => prev + 1);
        }

        resetTransition();
      } else if (transitionProgress < -threshold) {
        if (currentSegmentIndex <= 0) {
          // 前のシーンへ
          setSceneIndex((prev) => (prev + scenes.length - 1) % scenes.length);
          setSegmentsLength(0);
        } else {
          setCurrentSegmentIndex((prev) => prev - 1);
        }

        resetTransition();
      } else {
        // (B) -100 ～ 100 の範囲内なら、50ms 後にイージング開始するかチェック
        // まず現在の時刻を記録 (最終更新時刻はすでに setされている)

        // すでにオートトランジション中でないなら
        const timer = setTimeout(() => {
          // 50ms 後に「まだ (今の値) と同じかどうか」を確認
          const elapsed = performance.now() - lastWheelTime;
          if (elapsed >= 50 || isTouching) {
            // 50ms 以上変化なし → イージングスタート
            startEasingToZero({});
          }
        }, 50);

        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [transitionProgress, isTouching, currentSegmentIndex, segmentsLength]);

  useEffect(() => {
    if (!isTouching) setLastWheelTime(performance.now());
  }, [isTouching]);

  useEffect(() => {
    // wheel イベント
    const handleWheel = (e: WheelEvent) => {
      // オートトランジション中やイージング中は無視
      if (isAutoTransition || isEasing) return;

      setTransitionProgress((prev) =>
        Math.max(-110, Math.min(110, prev + e.deltaY))
      );
      setLastWheelTime(performance.now());
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    // (2) スマホ向け: touchstart / touchend
    const handleTouchStart = (e: TouchEvent) => {
      // 1本目の指の Y座標を記録
      touchStartYRef.current = e.touches[0].clientY;
      setIsTouching(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isAutoTransition || isEasing) return;

      // 指を離したときの座標
      const endY = e.changedTouches[0].clientY;
      const diff = endY - touchStartYRef.current;
      // 下スワイプ -> diff > 0
      // 上スワイプ -> diff < 0

      setTransitionProgress(Math.max(-110, Math.min(110, -diff)));
      setLastWheelTime(performance.now());
    };

    const handleTouchEnd = (e: TouchEvent) => {
      setIsTouching(false);
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    // window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isAutoTransition, isEasing]);

  useEffect(() => {
    setCurrentSegmentIndex(0); //更新時に初期化
  }, [languageMode]);

  // ▼ シーン切り替え時などに呼ぶリセット処理
  const resetTransition = () => {
    setIsAutoTransition(true);
    startEasingToZero({ duration: 400 });
    setTimeout(() => {
      setIsAutoTransition(false);
    }, 500); // 1秒後に再度スクロール受付可
  };

  // ▼ イージングアニメーションを開始する
  const startEasingToZero = ({ duration = 200 }: { duration?: number }) => {
    setIsEasing(true);

    const startValue = transitionProgress;
    const endValue = 0;

    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0～1

      const current = startValue + (endValue - startValue) * progress;
      setTransitionProgress(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // 完了
        setIsEasing(false);
      }
    };

    requestAnimationFrame(animate);
  };
  return (
    <>
      {/* <div className="state-list">
        {scenes.map((_, i) => (
          <div
            key={`list-icon-${i}`}
            className={`list-icon ${sceneIndex === i ? "active" : ""}`}
          />
        ))}
      </div> */}
      <div className="scene-status">
        <p>
          {sceneIndex + 1} / {scenes.length}
        </p>
      </div>

      {/* いま表示すべきシーンだけ描画する */}
      {scenes.map((scene, i) => {
        if (i !== sceneIndex) return null;

        // すでに scene が <Profile /> のようなJSXの場合、
        // cloneElement で props を差し替える
        return cloneElement(scene, {
          transitionProgress,
          currentSegmentIndex,
          setSegmentsLength,
          languageMode,
          key: `scene-${i}`,
        });
      })}

      <style jsx>{`
        .scene-status {
          font-size: 1rem;
          color: white;
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
        }

        .state-list {
          position: fixed;
          top: 50vh;
          left: 1rem;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .list-icon {
          width: 0.5rem;
          height: 0.5rem;
          border: 1px solid white;
          border-radius: 50%;
        }

        .list-icon.active {
          background: white;
        }
      `}</style>
    </>
  );
};

"use client";

import { useEffect, useRef, useState, cloneElement, ReactElement } from "react";
import { useRouter } from "next/navigation";

type SceneManagerProps = {
  scenes: ReactElement<any>[];
  languageMode: string;
  redirectNextTo?: string;
  redirectPrevTo?: string;
};

export const SceneManager = ({
  scenes,
  languageMode,
  redirectNextTo,
  redirectPrevTo,
}: SceneManagerProps) => {
  const router = useRouter();

  // シーンのインデックスやセグメント管理など
  const [sceneIndex, setSceneIndex] = useState<number>(0);
  const [transitionProgress, setTransitionProgress] = useState<number>(0);
  const [isEasing, setIsEasing] = useState<boolean>(false);
  const [isAutoTransition, setIsAutoTransition] = useState<boolean>(false);
  const [isTouching, setIsTouching] = useState<boolean>(false);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState<number>(0);
  const [segmentsLength, setSegmentsLength] = useState<number>(0);

  const [lastWheelTime, setLastWheelTime] = useState<number>(0);
  const touchStartYRef = useRef<number>(0);

  /**
   * ここがポイント
   *  - リダイレクトが必要な場合は、即座に `router.push()` を呼ばず
   *    まずは「次にリダイレクトすべきURL」を state に保存する。
   */
  const [pendingRedirect, setPendingRedirect] = useState<string | null>(null);

  /**
   * リダイレクト実行専用の useEffect
   * - pendingRedirect に何か入っていたら push して、再度 null に戻す
   * - こうすることで「レンダリング中に Router を更新してしまう」問題を回避
   */
  useEffect(() => {
    if (pendingRedirect) {
      router.push(pendingRedirect);
      setPendingRedirect(null); // 再度リダイレクトしないようにクリア
    }
  }, [pendingRedirect, router]);

  useEffect(() => {
    // シーン切り替え判定
    const threshold = 80;
    if (!isAutoTransition && !isTouching) {
      if (transitionProgress > threshold) {
        // ▼ 最終セグメントにいる場合はシーン自体を切り替え
        if (currentSegmentIndex >= segmentsLength - 1) {
          // 最終シーンならさらにその次へ行こうとする → redirectNextTo or 一周
          if (sceneIndex === scenes.length - 1) {
            if (redirectNextTo) {
              setPendingRedirect(redirectNextTo);
            } else {
              setSceneIndex(0); // リダイレクトがない場合は一周
            }
          } else {
            setSceneIndex(sceneIndex + 1);
          }
          setCurrentSegmentIndex(0);
          setSegmentsLength(0);
          resetTransition();
        } else {
          // セグメントをひとつ進める
          setCurrentSegmentIndex((prev) => prev + 1);
          resetTransition();
        }
      } else if (transitionProgress < -threshold) {
        // ▼ 先頭セグメントにいる場合はシーン自体を切り替え
        if (currentSegmentIndex <= 0) {
          // 先頭シーンからさらに前に行こうとする → redirectPrevTo or 一周
          if (sceneIndex === 0) {
            if (redirectPrevTo) {
              setPendingRedirect(redirectPrevTo);
            } else {
              setSceneIndex(scenes.length - 1);
            }
          } else {
            setSceneIndex(sceneIndex - 1);
          }
          setSegmentsLength(0);
          resetTransition();
        } else {
          // セグメントをひとつ戻す
          setCurrentSegmentIndex((prev) => prev - 1);
          resetTransition();
        }
      } else {
        // スクロール微小量のとき：一定時間後にイージングで 0 に戻す
        const timer = setTimeout(() => {
          const elapsed = performance.now() - lastWheelTime;
          if (elapsed >= 50 || isTouching) {
            startEasingToZero({});
          }
        }, 50);
        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [
    transitionProgress,
    isTouching,
    isAutoTransition,
    currentSegmentIndex,
    segmentsLength,
    sceneIndex,
    redirectNextTo,
    redirectPrevTo,
    lastWheelTime,
    scenes.length,
  ]);

  useEffect(() => {
    if (!isTouching) {
      setLastWheelTime(performance.now());
    }
  }, [isTouching]);

  useEffect(() => {
    // wheelイベント
    const handleWheel = (e: WheelEvent) => {
      if (isAutoTransition || isEasing) return;
      setTransitionProgress((prev) =>
        Math.max(-110, Math.min(110, prev + e.deltaY))
      );
      setLastWheelTime(performance.now());
    };

    // touchイベント
    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
      setIsTouching(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isAutoTransition || isEasing) return;
      const endY = e.changedTouches[0].clientY;
      const diff = endY - touchStartYRef.current;
      // 上スワイプ => diff < 0, 下スワイプ => diff > 0
      setTransitionProgress(Math.max(-110, Math.min(110, -diff)));
      setLastWheelTime(performance.now());
    };

    const handleTouchEnd = () => {
      setIsTouching(false);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isAutoTransition, isEasing]);

  // 言語切り替え時にセグメント初期化
  useEffect(() => {
    setCurrentSegmentIndex(0);
  }, [languageMode]);

  // シーン切り替え等の際に呼ぶ関数
  const resetTransition = () => {
    setIsAutoTransition(true);
    startEasingToZero({ duration: 400 });
    setTimeout(() => {
      setIsAutoTransition(false);
    }, 500);
  };

  // イージングで transitionProgress を 0 に戻す
  const startEasingToZero = ({ duration = 200 }: { duration?: number }) => {
    setIsEasing(true);

    const startValue = transitionProgress;
    const endValue = 0;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = startValue + (endValue - startValue) * progress;
      setTransitionProgress(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsEasing(false);
      }
    };

    requestAnimationFrame(animate);
  };

  // 現在のシーンだけ描画
  return (
    <>
      {scenes.map((scene, i) => {
        if (i !== sceneIndex) return null;
        return cloneElement(scene, {
          transitionProgress,
          currentSegmentIndex,
          setSegmentsLength,
          languageMode,
          key: `scene-${i}`,
        });
      })}
    </>
  );
};

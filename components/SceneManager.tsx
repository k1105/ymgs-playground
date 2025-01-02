import { useEffect, useRef, useState } from "react";
import { Profile } from "./scene/Profile";
import { Carrier } from "./scene/Carrier";
import { grantsAwards, soloExhibitions } from "@/public/carrierContents";

export const SceneManager = () => {
  const [mountScene, setMountScene] = useState<number>(0);

  // オートトランジション（シーン切り替え中）フラグ
  const [isAutoTransition, setIsAutoTransition] = useState<boolean>(false);
  const [isTouching, setIsTouching] = useState<boolean>(false);

  // transitionProgress : -∞～+∞
  //  * -100以下 → 前のシーンへ
  //  * +100以上 → 次のシーンへ
  //  * -100～100 の範囲内 → 50ms 変化が無ければイージングで 0 に戻す
  const [transitionProgress, setTransitionProgress] = useState<number>(0);

  // ▼ 「最後に wheel で transitionProgress を更新した時刻」を保持
  const [lastWheelTime, setLastWheelTime] = useState<number>(0);
  // ▼ タッチ系で使用：指を置いた時の Y 座標を保持
  const touchStartYRef = useRef<number>(0);

  // ▼ 「イージングアニメーション中かどうか」フラグ
  const [isEasing, setIsEasing] = useState(false);

  useEffect(() => {
    // wheel イベント
    const handleWheel = (e: WheelEvent) => {
      // オートトランジション中やイージング中は無視
      if (isAutoTransition || isEasing) return;

      setTransitionProgress((prev) => prev + e.deltaY);
      setLastWheelTime(performance.now());
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isAutoTransition, isEasing]);

  // ▼ transitionProgress 監視
  useEffect(() => {
    // (A) 閾値を超えたらシーンを切り替え
    const threshold = 100;
    if (!isAutoTransition && !isTouching) {
      if (transitionProgress > threshold) {
        // 次のシーンへ
        setMountScene((prev) => (prev + 1) % 3);
        resetTransition();
      } else if (transitionProgress < -threshold) {
        // 前のシーンへ
        setMountScene((prev) => (prev + 3 - 1) % 3);
        resetTransition();
      } else {
        // (B) -100 ～ 100 の範囲内なら、50ms 後にイージング開始するかチェック
        // まず現在の時刻を記録 (最終更新時刻はすでに setされている)

        // すでにオートトランジション中でないなら
        const timer = setTimeout(() => {
          // 50ms 後に「まだ (今の値) と同じかどうか」を確認
          const elapsed = performance.now() - lastWheelTime;
          if (elapsed >= 50) {
            // 50ms 以上変化なし → イージングスタート
            startEasingToZero();
          }
        }, 50);

        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [transitionProgress]);

  // ▼ シーン切り替え時などに呼ぶリセット処理
  const resetTransition = () => {
    setIsAutoTransition(true);
    startEasingToZero();
    setTimeout(() => {
      setIsAutoTransition(false);
    }, 1000); // 1秒後に再度スクロール受付可
  };

  // ▼ イージングアニメーションを開始する
  const startEasingToZero = () => {
    setIsEasing(true);

    const startValue = transitionProgress;
    const endValue = 0;
    const duration = 200; // 200ms かけてイージング

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

  useEffect(() => {
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
      const diff = (endY - touchStartYRef.current) / 100;
      // 下スワイプ -> diff > 0
      // 上スワイプ -> diff < 0

      setTransitionProgress((prev) => prev + diff);
      setLastWheelTime(performance.now());
    };

    const handleTouchEnd = (e: TouchEvent) => {
      setIsTouching(false);
    };

    // 必要に応じて touchmove でリアルタイム更新も可
    // const handleTouchMove = (e: TouchEvent) => {
    //   if (isAutoTransition || isEasing) return;
    //   const currentY = e.touches[0].clientY;
    //   const diff = currentY - touchStartYRef.current;
    //   // ここで setTransitionProgress(...) すると「指を動かすごと」に更新される
    // };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    // window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      // window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isAutoTransition, isEasing]);

  return (
    <>
      {/* デバッグ表示 */}
      <div
        style={{
          color: "white",
          position: "fixed",
          top: "10px",
          right: "30px",
        }}
      >
        <p>Scene: {mountScene}</p>
        <p>transitionProgress: {transitionProgress.toFixed(2)}</p>
        <p>isAutoTransition: {String(isAutoTransition)}</p>
        <p>isEasing: {String(isEasing)}</p>
      </div>

      {mountScene === 0 && <Profile transitionProgress={transitionProgress} />}
      {mountScene === 1 && (
        <Carrier
          transitionProgress={transitionProgress}
          items={grantsAwards}
          title="Grants and Awards"
        />
      )}
      {mountScene === 2 && (
        <Carrier
          transitionProgress={transitionProgress}
          items={soloExhibitions}
          title="Solo Exhibitions"
        />
      )}
    </>
  );
};

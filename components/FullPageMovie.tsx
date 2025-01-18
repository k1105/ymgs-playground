"use client";

import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import ReactPlayer from "react-player";

export const FullPageMovie = ({
  transitionProgress = 0,
}: {
  transitionProgress?: number;
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (iframeRef.current) {
      const player = new Player(iframeRef.current);

      player.on("play", () => setIsPlaying(true));
      player.on("pause", () => setIsPlaying(false));

      // 動画の長さ（総時間）を取得
      player.getDuration().then((duration) => {
        setDuration(duration);
      });

      return () => {
        player.off("play");
        player.off("pause");
      };
    }
  }, []);

  // スマホ対応: タップでUI表示し、一定時間後に消える
  const handleTouch = () => {
    setShowControls(true);
    setTimeout(() => setShowControls(false), 3000); // 3秒後に非表示
  };

  return (
    <>
      <div style={{ position: "relative", width: "50vw", height: "28.125vw" }}>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=45QuCjxYq-s`}
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
          playing={true} // 自動再生オフ
          controls={false} // コントロールバー非表示
          modestbranding={"true"} // ロゴを最小限に
          rel={"false"} // 関連動画を非表示
          config={{
            youtube: {
              playerVars: {
                controls: 0, // コントロールバーを消す
                modestbranding: true, // YouTube ロゴを最小化
                rel: false, // 関連動画を非表示
                fs: 0, // フルスクリーンボタンを無効化
                playsinline: 1, // iOS でインライン再生
              },
            },
          }}
        />
      </div>

      <style jsx>{`
        .video-container {
          width: 100vw;
          height: 100vh;
          opacity: ${1 - Math.abs(transitionProgress) / 100};
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .video-wrapper {
          position: relative;
          width: 80vw; /* 画面の80%を使用 */
          //   max-width: 800px;
          height: 45vw; /* 16:9のアスペクト比 */
          //   max-height: 450px;
        }

        .video-frame {
          width: 100%;
          height: 100%;
          display: block;
          border: none;
          background: black;
        }

        .video-controls {
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 0, 0, 0.5);
          padding: 8px 12px;
          border-radius: 5px;
          transition: all 0.5s ease;
        }

        .video-controls.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .control-button {
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
        }

        .control-link {
          color: white;
          text-decoration: none;
          font-size: 14px;
        }

        .duration {
          margin-top: 1rem;
          display: block;
          color: white;
          width: 100%;
          text-align: right;
        }

        @media screen and (max-width: 600px) {
          .video-wrapper {
            width: 100vw;
            height: 56.25vw;
          }

          .duration {
          margin-top: 0.5rem;
          padding-right: 0.5rem;
        }
      `}</style>
    </>
  );
};

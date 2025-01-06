import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";

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
      <div className="video-container" onTouchStart={handleTouch}>
        <div
          className="video-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <iframe
            ref={iframeRef}
            src="https://player.vimeo.com/video/755421753?badge=0&autopause=0&player_id=0&app_id=58479&controls=0&autoplay=1&loop=1"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            className="video-frame"
            title="rhizome cycling"
          ></iframe>

          <div
            className={`video-controls ${
              !(isHovered || showControls) && "hidden"
            }`}
          >
            <button
              onClick={() => {
                if (iframeRef.current) {
                  const player = new Player(iframeRef.current);
                  isPlaying ? player.pause() : player.play();
                }
              }}
              className="control-button"
            >
              {isPlaying ? "■" : "▶"}
            </button>

            <a
              href="https://vimeo.com/755421753"
              target="_blank"
              rel="noopener noreferrer"
              className="control-link"
            >
              Vimeoで視聴
            </a>
          </div>
          <p className="duration">
            {duration !== 0 &&
              `${Math.floor(duration / 60)} : ${duration % 60}`}
          </p>
        </div>
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

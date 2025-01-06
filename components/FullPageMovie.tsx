export const FullPageMovie = ({
  transitionProgress = 0,
}: {
  transitionProgress?: number;
}) => {
  return (
    <>
      <div className="image-container">
        <iframe
          width={"100%"}
          height={"70%"}
          src="https://www.youtube.com/embed/V0X_12KvI8Q?si=p301uh6o8ysxnHWp&amp;controls=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <style jsx>{`
        .image-container {
          width: 100vw;
          height: 100vh;
          iframe {
            transform: translate(0%, 30%);
          }
          opacity: ${1 - Math.abs(transitionProgress) / 100};
        }
      `}</style>
    </>
  );
};

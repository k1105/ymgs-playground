export const FullPageMultiImage = ({
  transitionProgress = 0,
}: {
  transitionProgress?: number;
}) => {
  return (
    <>
      <div className="image-container">
        <img src="/img/lag/lag1.jpg" />
        <img src="/img/lag/lag2.jpg" />
      </div>
      <style jsx>{`
        .image-container {
          width: 92vw;
          height: 100vh;
          overflow: hidden;
          display: flex;
          gap: 2vw;
          margin: 0 auto;
          img {
            width: 45vw;
            height: 100%;
            object-fit: contain;
          }
          opacity: ${1 - Math.abs(transitionProgress) / 100};
        }

        @media screen and (max-width: 600px) {
          .image-container {
            flex-direction: column;
            transform: translate(0, 50%);
            height: auto;
            gap: 2rem;
            img {
              width: 100%;
            }
          }
        }
      `}</style>
    </>
  );
};

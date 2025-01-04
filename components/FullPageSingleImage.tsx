export const FullPageSingleImage = ({
  transitionProgress = 0,
}: {
  transitionProgress?: number;
}) => {
  return (
    <>
      <div className="image-container">
        <img src="/img/lag/lag1.jpg" />
      </div>
      <style jsx>{`
        .image-container {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
          opacity: ${1 - Math.abs(transitionProgress) / 100};
        }
      `}</style>
    </>
  );
};

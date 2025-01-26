"use client";

export const FullPageMultiImage = ({
  transitionProgress = 0,
  images,
}: {
  transitionProgress?: number;
  images: {
    fieldId: string;
    image: {
      url: string;
      height: number;
      width: number;
    }[];
  }[];
}) => {
  return (
    <>
      <div className="page-wrapper">
        <div className={`image-container`}>
          {images.map((imageRow) =>
            imageRow.image.map((image, index) => (
              <img key={`image-${index}`} src={`${image.url}?w=1200`} />
            ))
          )}
        </div>
      </div>
      <style jsx>{`
        .page-wrapper {
          height: 100vh;
          display: flex;
          vertical-align: middle;
        }
        .image-container {
          width: 92vw;
          max-height: 80vh;
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          margin: auto;
          transition: all 0.5s;
          img {
            width: 45vw;
            height: 100%;
            object-fit: contain;
          }
          opacity: ${1 - Math.abs(transitionProgress) / 100};
        }

        @media screen and (max-width: 600px) {
          .image-container {
            width: 100%;
            flex-direction: column;
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

import { InkFilter } from "./InkFilter";

const TitlePage = ({
  transitionProgress = 0,
}: {
  transitionProgress?: number;
}) => {
  return (
    <>
      <InkFilter blurIntensity={transitionProgress}>
        <>
          <div className="title-container">
            <h1>きりもちの所在</h1>
            <p className="year">(2024)</p>
          </div>
          <style jsx>{`
            .title-container {
              margin-left: 10vw;
              margin-top: 40vh;
              color: white;
            }

            .year {
              font-size: 1rem;
            }
          `}</style>
        </>
      </InkFilter>
    </>
  );
};

export default TitlePage;

import { InkFilter } from "../InkFilter";

export const Carrier = ({
  transitionProgress = 0,
  title,
  items,
}: {
  transitionProgress?: number;
  title: string;
  items: { year: number; items: string[] }[];
}) => {
  return (
    <>
      <InkFilter blurIntensity={transitionProgress}>
        <div className="container">
          <h2 style={{ marginBottom: "3rem" }}>{title}</h2>
          <div className="carrier-container">
            {items.map((elem, i) => {
              return (
                <div className="carrier-item" key={`carrier-item-${i}`}>
                  <p className="year">{elem.year}</p>
                  <div className="item">
                    {elem.items.map((item, itemId) => {
                      return <p key={`item-${i}-${itemId}`}>{item}</p>;
                    })}
                  </div>
                </div>
              );
            })}
            <div className="carrier-item">
              <p></p>
            </div>
          </div>
        </div>
      </InkFilter>
      <style jsx>{`
        .container {
          width: 80vw;
          margin: 18rem auto 0;
          display: flex;
          justify-content: space-between;
        }
        .carrier-container {
          width: 60vw;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          column-gap: 1rem;
          row-gap: 1rem;
        }
        .carrier-item {
          width: 400px;
          display: flex;
          gap: 2rem;
        }
        .year {
          font-weight: 700;
        }
        .item {
          line-height: 1.8rem;
          font-size: 0.9rem;
        }

        @media screen and (max-width: 600px) {
          .profile-container,
          .carrier-container {
            width: auto;
          }

          .container {
            width: 90vw;
            margin-top: 5rem;
            margin-bottom: 10rem;
            flex-direction: column;
            gap: 1rem;
          }

          .carrier-item {
            flex-direction: column;
            gap: 0.5rem;
            width: auto;
          }
        }
      `}</style>
    </>
  );
};

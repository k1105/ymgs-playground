"use client";

import styles from "./Carrier.module.css";
import { InkFilter } from "@/components/common/filter/InkFilter";
import { CarrierItem } from "./CarrierItem";
import { convertCssUnitToPx } from "@/lib/convertCssUnitToPx";
import { measureTextHeight } from "@/lib/measureTextHeight";
import { useSceneProps } from "@/components/common/SceneManager";

export const Carrier = ({
  dataGroups,
}: {
  dataGroups: { title: string; items: { year: number; content: string[] }[] }[];
}) => {
  // 30rem幅, 40vh高さの領域(px換算)
  const size = {
    w: convertCssUnitToPx("20rem"),
    h: convertCssUnitToPx("80vh"),
  };

  const { transitionProgress } = useSceneProps();

  // ページネーション処理
  const paginatedDataGroups = paginateDataGroups(dataGroups, size);

  // 各ページ内の items を年の降順でソートする（念のため）
  paginatedDataGroups.forEach((page) => {
    page.forEach((group) => {
      group.items.sort((a, b) => b.year - a.year);
    });
  });

  return (
    <>
      <InkFilter blurIntensity={transitionProgress}>
        <div className={styles.container}>
          {paginatedDataGroups.map((page, i) => (
            <div
              className={styles.columnContainer}
              key={`carrier-${i}`}
              style={{ width: size.w, height: size.h }}
            >
              {page.map((group, j) => (
                <div key={`group-${j}`}>
                  {group.title.length > 0 && (
                    <h2 className={styles.carrierName}>{group.title}</h2>
                  )}

                  <div className={styles.carrierContainer}>
                    {group.items.map((elem, k) => (
                      <CarrierItem index={k} elem={elem} key={`item-${k}`} />
                    ))}
                  </div>
                  {group.includeEndSpace && (
                    <div style={{ marginBottom: "5rem" }} />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </InkFilter>
    </>
  );
};

//
// 型定義：各ページにおけるグループ単位の情報
//
interface PaginatedDataGroup {
  title: string;
  includeEndSpace: boolean;
  items: { year: number; content: string[] }[];
}

/**
 * 各アイテムの高さを、テキスト計測で求める補助関数。
 * － 年の表示と複数の内容行があると仮定。
 */
const measureItemHeight = (
  elem: { year: number; content: string[] },
  width: number
): number => {
  // ここではタイトルと同じスタイル（1.2rem）を想定。必要に応じて変更してください。
  const lineHeight = convertCssUnitToPx("1.3rem");
  const fontSize = convertCssUnitToPx("0.8rem");
  let height = 0;

  // 各テキスト行の高さを合計
  for (const text of elem.content) {
    height += measureTextHeight(text, width, lineHeight, fontSize);
  }
  // 適宜、余白分を加算（ここでは1rem分）
  // height += convertCssUnitToPx("1rem");
  return height;
};

/**
 * dataGroups を指定されたサイズ (w, h) に収まるように分割する関数
 *
 * ・各グループは次の構成:
 *    - タイトル（1ページ目に表示）
 *    - 複数の CarrierItem
 *    - 最後に Spacer（追加可能なら）
 *
 * ・タイトルの高さは measureTextHeight で求め、追加で余白を加算する。
 * ・各アイテムの高さは measureItemHeight を用いて計算する。
 * ・Spacer は固定で 5rem とする。
 */
const paginateDataGroups = (
  dataGroups: { title: string; items: { year: number; content: string[] }[] }[],
  size: { w: number; h: number }
) => {
  let pageIndex = 0;
  const paginatedDataGroups: PaginatedDataGroup[][] = [];
  paginatedDataGroups.push([]);
  let groupIndex = 0;
  let currentHeight = 0;
  let targetGroupIndex = 0;

  // 新規ページ作成時の処理
  const addPage = () => {
    paginatedDataGroups.push([]);
    pageIndex++;
    currentHeight = 0;
    groupIndex = 0;
    // 初期グループを作成
    paginatedDataGroups[pageIndex].push({
      title: "",
      items: [],
      includeEndSpace: false,
    });
  };

  // 初期ページの初期グループを作成
  paginatedDataGroups[pageIndex].push({
    title: "",
    items: [],
    includeEndSpace: false,
  });

  while (targetGroupIndex < dataGroups.length) {
    // タイトルの高さを計測（余白として3remを加算）
    const titleHeight =
      measureTextHeight(
        dataGroups[targetGroupIndex].title,
        size.w,
        convertCssUnitToPx("1rem"),
        convertCssUnitToPx("1rem")
      ) + convertCssUnitToPx("2rem");
    currentHeight += titleHeight;
    if (currentHeight < size.h) {
      paginatedDataGroups[pageIndex][groupIndex].title =
        dataGroups[targetGroupIndex].title;
    } else {
      addPage();
      continue; // 新規ページに切り替えたので、再度タイトル処理へ
    }

    let targetItemIndex = 0;
    // dataGroups[targetGroupIndex] の items を順次追加
    while (targetItemIndex < dataGroups[targetGroupIndex].items.length) {
      const itemHeight =
        measureItemHeight(
          dataGroups[targetGroupIndex].items[targetItemIndex],
          size.w * 0.75
        ) + convertCssUnitToPx("1rem");
      currentHeight += itemHeight;
      if (currentHeight < size.h) {
        paginatedDataGroups[pageIndex][groupIndex].items.push(
          dataGroups[targetGroupIndex].items[targetItemIndex]
        );
        targetItemIndex++;
      } else {
        addPage();
        if (targetItemIndex == 0) {
          paginatedDataGroups[pageIndex - 1].pop();
          paginatedDataGroups[pageIndex][groupIndex].title =
            dataGroups[targetGroupIndex].title;
        }
      }
    }

    // items の末尾まで追加できたら Spacer を検証（固定5rem）
    const spacerHeight = convertCssUnitToPx("3rem");
    currentHeight += spacerHeight;
    if (currentHeight < size.h) {
      paginatedDataGroups[pageIndex][groupIndex].includeEndSpace = true;
      // 次のグループとして空のグループを追加
      paginatedDataGroups[pageIndex].push({
        title: "",
        items: [],
        includeEndSpace: false,
      });
      groupIndex++;
    } else {
      addPage();
    }

    targetGroupIndex++;
  }

  return paginatedDataGroups;
};

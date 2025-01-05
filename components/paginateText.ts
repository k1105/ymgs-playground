/**
 * バイナリサーチで「先頭からどこまでが1ページに収まるか」を探し、全ページを返す。
 * @param text 全文
 * @param width ページ幅
 * @param height ページ高さ
 * @param lineHeight 行高さ
 * @param fontSize 文字の大きさ
 * @returns ページ文字列配列
 */
export function paginateByBinarySearch(
  text: string,
  width: number,
  height: number,
  lineHeight: number,
  fontSize: number
): string[] {
  const pages: string[] = [];
  let restText = text;

  while (restText.length > 0) {
    // そのページに入る最大文字数を探す
    const fitCount = adjustToWordBoundary(
      restText,
      findFitCount(restText, width, height, lineHeight, fontSize)
    );

    // もし1文字も入らない = レイアウトの関係で絶対入らないケース
    if (fitCount <= 0) {
      // 無限ループ対策で、最低1文字は進める or 例外を出す
      pages.push(restText.slice(0, 1));
      restText = restText.slice(1);
    } else {
      // fitCount文字分を1ページとしてpush
      pages.push(restText.slice(0, fitCount));
      // 残りへ
      restText = restText.slice(fitCount);
    }
  }

  return pages;
}

/**
 * restTextの先頭から何文字までが「width x height」内に収まるかを
 * バイナリサーチで探る。
 * CSSの自動改行・禁則を最大限活かすために、文字列をそのままdivに流し込んで
 * overflowしているか確認する。
 */
function findFitCount(
  restText: string,
  width: number,
  height: number,
  lineHeight: number,
  fontSize: number
): number {
  let low = 0;
  let high = restText.length;
  let best = 0;

  console.log("width: " + width);
  console.log("height: " + height);

  // 計測用コンテナを一時作成
  const measureContainer = document.createElement("div");
  measureContainer.style.position = "absolute";
  measureContainer.style.visibility = "hidden";
  measureContainer.style.overflow = "hidden";
  measureContainer.style.width = `${width}px`;
  measureContainer.style.height = `${height}px`;
  measureContainer.style.lineHeight = `${lineHeight}px`;
  measureContainer.style.fontSize = `${fontSize}px`;
  measureContainer.style.whiteSpace = "pre-wrap";
  measureContainer.style.lineBreak = "strict"; // ブラウザがサポートしていれば禁則に近い動き
  measureContainer.style.wordBreak = "break-word";
  measureContainer.style.boxSizing = "border-box";

  document.body.appendChild(measureContainer);

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    // mid文字までテスト
    const candidate = restText.slice(0, mid);
    measureContainer.textContent = candidate;
    console.log(candidate);
    console.log("scrollHeight: " + measureContainer.scrollHeight);
    console.log("clientHeight: " + measureContainer.clientHeight);
    console.log("scrollWidth: " + measureContainer.scrollWidth);
    console.log("clientWidth: " + measureContainer.clientWidth);
    console.log("height: " + height);

    // overflowしてるか判定
    // scrollHeight > clientHeight or scrollWidth > clientWidth
    if (measureContainer.scrollHeight - measureContainer.clientHeight > 0) {
      // 入らない -> 文字数を減らす
      high = mid - 1;
    } else {
      // 入る -> さらに増やせるか試す
      best = mid;
      low = mid + 1;
    }
  }

  document.body.removeChild(measureContainer);
  return best; // 0なら1文字も入らない
}

function adjustToWordBoundary(fullText: string, fitCount: number) {
  // fitCount文字で切ったら単語途中かどうか判定
  if (fitCount <= 0 || fitCount >= fullText.length) {
    return fitCount; // 何も後退できない
  }

  // もし末尾がアルファベットで、かつ 次の文字もアルファベットなら
  // → 単語途中で切れてる可能性が高いので後退
  let endChar = fullText[fitCount - 1];
  let nextChar = fullText[fitCount];

  // 例: [a-zA-Z], or [\p{L}] (Unicode文字としての「文字」)
  const alphaRegex = /[a-zA-Z]/;

  while (
    fitCount > 0 &&
    alphaRegex.test(endChar) &&
    alphaRegex.test(nextChar)
  ) {
    fitCount--;
    endChar = fullText[fitCount - 1] || "";
    nextChar = fullText[fitCount] || "";
  }

  // ここで fitCount が単語の区切りっぽい場所まで後退したか
  // さらに " " (半角スペース) の手前まで後退するなどもあり
  // 例: while (fitCount > 0 && !/\s/.test(fullText[fitCount])) { fitCount--; }

  return fitCount;
}

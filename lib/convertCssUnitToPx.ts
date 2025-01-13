/**
 * デベロッパーが指定したCSS的な数値 (px, vw, vh, rem) を、
 * 現在のブラウザ環境における「px値」に変換する。
 * - 例: "100px" -> 100
 * - 例: "50vw"  -> window.innerWidth * 0.5
 * - 例: "2rem"  -> ルートhtmlのfont-sizeが16pxなら 32
 * - 例: "50vh"  -> window.innerHeight * 0.5
 *
 * @param cssValue  number or string
 * @returns pxに変換した数値 (小数点含みうる)
 */
export function convertCssUnitToPx(cssValue: number | string): number {
  // もし number なら、それは px とみなす
  if (typeof cssValue === "number") {
    return cssValue;
  }

  // 文字列をパースする
  const val = cssValue.trim().toLowerCase(); // "50vw" "2.5rem"など

  // 数値部分を取り出し(先頭からfloatとして読む)
  const numericVal = parseFloat(val);
  if (Number.isNaN(numericVal)) {
    // パースできない場合は 0 とする or エラーを投げる
    console.warn(`Invalid numeric value: "${cssValue}"`);
    return 0;
  }

  // 単位を判定 (末尾2～3文字など)
  if (val.endsWith("px")) {
    return numericVal; // "100px" -> 100
  } else if (val.endsWith("vw")) {
    // ビューポートの幅を基準に計算
    const viewportWidth = window.innerWidth;
    return (viewportWidth * numericVal) / 100;
  } else if (val.endsWith("vh")) {
    // ビューポートの高さを基準に計算
    const viewportHeight = window.innerHeight;
    return (viewportHeight * numericVal) / 100;
  } else if (val.endsWith("rem")) {
    // ルート(html) 要素の font-size に依存
    const rootFontSize = parseFloat(
      window.getComputedStyle(document.documentElement).fontSize
    );
    return rootFontSize * numericVal;
  } else {
    console.warn(
      `Unsupported or missing unit in value: "${cssValue}". Assuming px.`
    );
    return numericVal;
  }
}

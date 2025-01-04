/**
 * 指定の幅(width)、lineHeight、fontSizeを用いたテキストボックスに
 * `text` を流し込んだ際の高さ(px)を計測する関数。
 *
 * @param text       テキスト文字列
 * @param width      テキストボックスの横幅(px)
 * @param lineHeight 行高さ(px) or 行間 (number で px 相当を想定)
 * @param fontSize   フォントサイズ(px)
 * @returns          テキストを流し込んだときの高さ(px)
 */
export function measureTextHeight(
  text: string,
  width: number,
  lineHeight: number,
  fontSize: number
): number {
  // 1. 計測用の一時コンテナを作成
  const container = document.createElement("div");

  // 2. 必要なスタイルを設定
  container.style.position = "absolute";
  container.style.visibility = "hidden"; // 画面に見えないように
  container.style.boxSizing = "border-box";

  container.style.width = `${width}px`;
  container.style.lineHeight = `${lineHeight}px`;
  container.style.fontSize = `${fontSize}px`;

  // テキストの折り返しを考慮
  container.style.whiteSpace = "pre-wrap"; // 改行(\n)をそのまま扱い、必要に応じて折り返し
  container.style.wordBreak = "break-word"; // 長い単語や文字列も幅内で折り返す

  // 3. テキストを設定
  container.innerText = text;

  // 4. DOMに追加してサイズ測定
  document.body.appendChild(container);
  const measuredHeight = container.scrollHeight;

  // 5. 後片付け
  document.body.removeChild(container);

  return measuredHeight;
}

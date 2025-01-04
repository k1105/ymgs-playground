import { convertCssUnitToPx } from "@/components/convertCssUnitToPx";
import { TextPager } from "@/components/TextPager";
import { useEffect, useState } from "react";
import { paginateByBinarySearch } from "@/components/paginateText";

export default function LinePager() {
  const sampleText = `しかし、先ほどの禁則処理も関連しますが、cssのplain textであればそのあたり、よしなに改行できますよね。もとをただせば、問題になっていたのは一行に含めるテキストを厳格に一行区切りで配列に含めていたためだと考えられます。そこで、今のように一行区切りの配列を作るのではなく、「改行」「空行」「要素高さに収まらなかったテキストの切れ目」で一つの要素とするような配列を作ることで、cssによるスタイリングの恩恵を受けたいと思います。ただこの場合、現状のロジックのように行単位で積み上げていって判定するとなると、禁則を適用した上での「要素高さに収まらなかったテキストの切れ目」をうまく判別できませんよね。そこで、改行や空行も含めたplain textを引数に、バイナリサーチによって１ページに収まるテキストの切れ目を見つけるロジックを構築できないでしょうか。

  単語途中の切れ目を回避するには、大きく3パターン:

単語単位でレイアウト（1単語まるごと入らない場合は何らかの強制処理）
単語が長すぎる場合はハイフンを挿入して分割
バイナリサーチ後に “単語境界まで後退” する（バックトラック）
もっと厳密にやるなら、辞書ベースのハイフネーションも検討し、禁則処理と組み合わせる必要があります。

CSSだけで overflow-wrap: break-word 等を使うと、単語途中で中割れすることがありますが、今回のように「ページ単位でテキストを区切る」という場面では、JavaScript側で意図的に単語境界を優先するロジックを入れるしかありません。

いずれの手段をとるにしても、「単語をどう見なすか」「長すぎる単語への対処」が根本の課題となります。
最もシンプルなのは、バイナリサーチ結果でまずfitCount を得たら、
① 単語境界を探して後退する
② 後退しすぎたら、丸ごと次ページへ送る or 強制ハイフン
のような混合アプローチがおすすめです。
`;
  const [pages, setPages] = useState<string[]>([]);
  const [boxSize, setBoxSize] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0,
  });
  const [fontSize, setFontSize] = useState<number>(0);
  const [lineHeight, setLineHeight] = useState<number>(0);

  // ここでページ分割ロジックを一度だけ実行
  useEffect(() => {
    setBoxSize({
      w: convertCssUnitToPx("20rem"),
      h: convertCssUnitToPx("20rem"),
    });
    setFontSize(convertCssUnitToPx("0.8rem"));
    setLineHeight(convertCssUnitToPx("1.6rem"));
  }, []);

  useEffect(() => {
    if (document && boxSize.w > 0)
      setPages(
        paginateByBinarySearch(
          sampleText,
          boxSize.w,
          boxSize.h,
          lineHeight,
          fontSize
        )
      );
  }, [boxSize]);

  return (
    <div style={{ color: "white" }}>
      <TextPager
        pages={pages}
        width={boxSize.w}
        height={boxSize.h}
        fontSize={fontSize}
        lineHeight={2}
      />
    </div>
  );
}

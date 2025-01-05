import { FontTester } from "@/components/FontTester";
import { FullPageText } from "@/components/FullPageText";
import { SceneManager } from "@/components/SceneManager";
import TitlePage from "@/components/TitlePage";
import { information } from "@/public/workInformation";
import { useState } from "react";

const OnlyText = () => {
  const [languageMode, setLanguageMode] = useState<"ja" | "en">("ja");
  return (
    <>
      <FontTester>
        <SceneManager
          scenes={[
            <TitlePage />,
            <FullPageText
              textJa={`ある日、きりもちを焼き忘れてしまい
翌日まるで玉手箱を開けたかのように 
カピカピになった姿で「きりもち」が発見された。
そのとき発見されたきりもちは 
明らかに元のきりもちではない何かであった。 

私のよく知るあのきりもちはどこに行ってしまったのか。 
このひびだらけのきりもちを仮に「ひびもち」と呼ぼう。 
ひびもちを見つめていてもどうにも食欲がわかない。 
ひびもちは食という目的から解放されてただの物質になった。 
遥か遠くの野生味を取り戻した今、キッチンの異物として佇んでいる。 

はて、そもそも食べられる/ないは何で線引きしていたか。 
一つに、それは「腐っている / いない」だが 
ひびもちは別にカビが生えているわけではない。 
干からびた、たったそれだけである。 
他には、「食欲」という基準も考えられる。 
食欲をそそるか否かは、食べ物と判断する上で非常に重要な動物的本能である。 
きりもちをみれば、焼かれて膨れ上がる姿や 
きな粉と戯れる想像をして食欲を感じさせるが、 
ひびもちにはどうにもその欲を感じさせない。 
では、きりもちのどこに欲情していたというのか。 
きりもちからひびもちへの変化を比較したとき 
大きく変わったことといえば 
体格が5ミリほど縮んだことである。
きりもちの体型が欲の源だったのかもしれない。 
ところできりもちの体型比率は、
黄金比(１：2/１＋√５)であることを、ご存知だろうか。 
体型が食欲の発生源だったとするならば、この比率が重要だったことになる。 
きりもちからひびもちの輪郭を引いて残った 
この窓枠のような差分にきりもちの魂が宿っていたのかもしれない。
もしくは水分の方だろうか。 
料理撮影において湯気や照りは食欲を引き出すシズル感として 
重要人物のように大事にされる。 
だがこの重要人物なるものを形成しているのは 
つまるところ「水」である。 
そうすると実は食欲の源は水だったかのように思えてくる。 
きりもち本体を見ているのではなく 
水に欲情していたんだろうか。 
では、きりもちは分散して今空気に姿を変え、ひっそり漂っているんだろうか。 
`}
              textEn={"hogehogefugafuga"}
            />,
          ]}
          languageMode={languageMode}
        />
      </FontTester>
    </>
  );
};

export default OnlyText;

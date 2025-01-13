type Image = { src: string; alt: string; width: string; height: string };
type Text = { ja: string; en: string };

export const information: {
  workTitle: Text;
  outline: Text;
  credit: Text;
  content: Text[];
} = {
  workTitle: { ja: "きりもちの所在", en: "Where is Kirimochi?" },
  outline: {
    ja: `人々が日常的に繰り返す「歩く」という行為（=「歩容」）は、表面上、単調で均質なもののように見える。しかし、その何気ない行為には、誰もが密かに固有性を抱えている。歩容は、時代や様式の移ろいとともに形を変えていく。その背後に浮かび上がるわずかな動きの差異。そこには、目に留まらない小さな事件が息を潜めているのかもしれない。
本作では、「歩容における差異」を抽出することに挑んだ。歩容は年齢や性別、性格、情動をも映し出し、個人の特定さえ可能なほど多面的な情報を有する。そのうち、あえて注目したのが“ゆらぎ”という、歩容における微妙な動きのズレである。これらのズレは、均一性を装う歩行フォームの裏で密やかに起こる「小さな事件」を私たちに示唆しており、モニター上に表示される文字列は、その“ゆらぎ”を翻訳した暗号文とも言える。日常のなかに埋もれた個々の秘密を、私は文字という形へ変換し、密やかに解読している。
`,
    en: `The walk that people repeat on a daily basis appears to be monotonous and homogeneous. However, everyone's casual act secretly has its own peculiarities. Gait changes its form with the passing of time and style. Slight differences in movement emerge in the background. There may be small incidents lurking in the background that do not catch the eye.
In this work, we took on the challenge of extracting “differences in gait. Gait reflects age, gender, personality, and emotions, and has such multifaceted information that it is even possible to identify individuals. Of these, we ventured to focus on “fluctuations,” or subtle deviations in gait movement. These discrepancies suggest to us the “small incidents” that occur secretly behind the pretense of a uniform gait form, and the strings of text displayed on the monitor can be said to be a cipher text that translates the “fluctuations. The strings of letters displayed on the monitor can be said to be a cipher text that translates these “fluctuations.” I am secretly deciphering the individual secrets buried in our daily lives by translating them into the form of letters.`,
  },
  credit: {
    ja: `Canon IJ ScanGear / Lightroom Classic / Photoshop / Premiere Pro / After Effects / ウインナーソーセージ / 電子レンジ / モニター / スピーカー / ウーファー

協力:飛谷 謙介 ( 長崎県立大学准教授 )

秋田文化創造館 展示室 A 2 階(2022年2月)
`,
    en: "",
  },
  content: [
    {
      ja: `ある日、きりもちを焼き忘れてしまい 
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
`,
      en: `One day, I forgot to bake Kirimochi. 
The next day, “Kirimochi” was found shiny and crispy, as if it had been opened from a jade box. 
The next day, Kirimochi was found shiny and crispy, as if it had been opened from a jade box.
The Kirimochi found at that time 
It was clear that the Kirimochi found at that time was something other than the original Kirimochi. 

Where had the Kirimochi I knew so well gone? 
Let's call this cracked Kirimochi “hibimochi. 
I could not feel any appetite when staring at the cracked rice cakes. 
Hibimochi has been freed from the purpose of food and has become a mere substance. 
Now that it has regained its faraway wild taste, it stands as a foreign object in the kitchen. 

What was the line between edible and inedible in the first place? 
For one thing, it is “rotten/not rotten. 
Cracked rice is not moldy. 
It is just dried up, that's all. 
Another possible criterion is “appetite. 
Whether or not something is appetizing is a very important animal instinct in judging food. 
When we look at kirimochi, we can imagine the image of them swelling up after being baked or playing with kinako (soybean flour). 
and the image of kinako (soybean flour) playing with it, it gives us a sense of appetite, 
Hibimochi, on the other hand, does not seem to evoke the same desire. 
What was it about Kirimochi that made him feel such lust? 
When we compare the change from Kirimochi to Hibimochi 
The major changes are 
Kirimochi's physique has shrunk by about 5mm.
Kirimochi's body size may have been the source of his greed. 
By the way, what is the ratio of Kirimochi's body size?
Do you know that Kirimochi's body shape ratio is the golden ratio (1:2/1 + √5)? 
If the body shape was the source of appetite, then this ratio was important. 
The contour of hibimochi was subtracted from kirimochi, and the remainder 
The soul of Kirimochi may have resided in this window-frame-like difference.
Or perhaps it was the moisture. 
In food photography, steam and light are considered important as a sizzling sensation that draws out the appetite. 
They are regarded as important characters. 
However, what forms this important character 
is water. 
This makes it seem as if the source of appetite is actually water. 
We are not looking at Kirimochi itself. 
but was it lusting after the water? 
Then, Kirimochi may have been dispersed, transformed into air, and is now quietly drifting in the air.
`,
    },
  ],
};

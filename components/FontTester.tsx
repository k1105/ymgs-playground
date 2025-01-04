import { SceneManager } from "@/components/SceneManager";
import { ReactNode, useState } from "react";
import {
  BIZ_UDMincho,
  Hina_Mincho,
  Noto_Serif_JP,
  Shippori_Mincho_B1,
  Zen_Old_Mincho,
  Radley,
  Crimson_Text,
  EB_Garamond,
  Sorts_Mill_Goudy,
  Goudy_Bookletter_1911,
  Castoro,
} from "next/font/google";

// 日本語フォントの定義
const hinaMincho = Hina_Mincho({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hinaMincho",
});
const notoSerif = Noto_Serif_JP({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-notoSerif",
});
const bizUdMincho = BIZ_UDMincho({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bizUdMincho",
});
const zenOldMincho = Zen_Old_Mincho({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-zenOldMincho",
});
const shipporiMincho = Shippori_Mincho_B1({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-shipporiMincho",
});

const crismonText = Crimson_Text({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-crimsonText",
});

const EBGaramond = EB_Garamond({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-EBGaramond",
});

const sortsMillGoudy = Sorts_Mill_Goudy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sortsMillGoudy",
});

// 欧文フォントの定義
const radley = Radley({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-radley",
});

const goudyBookletter1911 = Goudy_Bookletter_1911({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-goudyBookletter1911",
});

const castoro = Castoro({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-castoro",
});

// 書体リスト
const jaFonts = [
  { name: "Hina Mincho", variable: "--font-hinaMincho" },
  { name: "Noto Serif JP", variable: "--font-notoSerif" },
  { name: "BIZ UDMincho", variable: "--font-bizUdMincho" },
  { name: "Zen Old Mincho", variable: "--font-zenOldMincho" },
  { name: "Shippori Mincho B1", variable: "--font-shipporiMincho" },
];

const enFonts = [
  { name: "Radley", variable: "--font-radley" },
  { name: "Crimson Text", variable: "--font-crimsonText" },
  { name: "EB Garamond", variable: "--font-EBGaramond" },
  { name: "Sorts Mill Goudy", variable: "--font-sortsMillGoudy" },
  { name: "Goudy Bookletter 1911", variable: "--font-goudyBookletter1911" },
];

export const FontTester = ({ children }: { children: ReactNode }) => {
  const [jaIndex, setJaIndex] = useState<number>(0);
  const [enIndex, setEnIndex] = useState<number>(0);
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "2rem",
          right: "2rem",
          zIndex: 99,
          textAlign: "right",
        }}
      >
        <button
          onClick={() => setJaIndex((prev) => (prev + 1) % jaFonts.length)}
        >
          和文書体を変更
        </button>
        <button
          onClick={() => setEnIndex((prev) => (prev + 1) % enFonts.length)}
        >
          欧文書体を変更
        </button>
        <p style={{ color: "white" }}>和文： {jaFonts[jaIndex].name}</p>
        <p style={{ color: "white" }}>欧文： {enFonts[enIndex].name}</p>
      </div>

      <main
        className={`${hinaMincho.variable} ${notoSerif.variable} ${bizUdMincho.variable} ${zenOldMincho.variable} ${shipporiMincho.variable} ${radley.variable} ${crismonText.variable} ${EBGaramond.variable} ${sortsMillGoudy.variable} ${goudyBookletter1911.variable} ${castoro.variable}`}
        style={{
          fontFamily: `var(${enFonts[enIndex].variable}), var(${jaFonts[jaIndex].variable}), sans-serif`,
        }}
      >
        {children}
      </main>
    </>
  );
};

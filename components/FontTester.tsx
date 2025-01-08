import { ReactNode, RefObject, useEffect, useState } from "react";
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
  Zen_Kaku_Gothic_New,
  Sawarabi_Gothic,
  Kosugi,
  M_PLUS_2,
  Poppins,
  Nunito_Sans,
  Outfit,
  Montserrat_Alternates,
  Parkinsans,
  Ysabeau_SC,
  Averia_Libre,
  Wix_Madefor_Text,
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
const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-zenKakuGothicNew",
});
const sawarabiGothic = Sawarabi_Gothic({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sawarabiGothic",
});
const kosugi = Kosugi({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-kosugi",
});
const mPlus2 = M_PLUS_2({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mPlus2",
});

// 欧文フォントの定義
const radley = Radley({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-radley",
});
const crimsonText = Crimson_Text({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-crimsonText",
});
const ebGaramond = EB_Garamond({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ebGaramond",
});
const sortsMillGoudy = Sorts_Mill_Goudy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sortsMillGoudy",
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
const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poppins",
});
const nunitoSans = Nunito_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-nunitoSans",
});
const outfit = Outfit({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-outfit",
});
const montserratAlternates = Montserrat_Alternates({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-montserratAlternates",
});
const parkinsans = Parkinsans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-parkinsans",
});
const ysabeauSC = Ysabeau_SC({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ysabeauSC",
});
const averiaLibre = Averia_Libre({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-averiaLibre",
});
const wixMadeforText = Wix_Madefor_Text({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-wixMadeforText",
});

// 書体リスト
const jaFonts = [
  { name: "Hina Mincho", variable: "--font-hinaMincho" },
  { name: "Noto Serif JP", variable: "--font-notoSerif" },
  { name: "BIZ UDMincho", variable: "--font-bizUdMincho" },
  { name: "Zen Old Mincho", variable: "--font-zenOldMincho" },
  { name: "Shippori Mincho B1", variable: "--font-shipporiMincho" },
  { name: "Zen Kaku Gothic New", variable: "--font-zenKakuGothicNew" },
  { name: "Sawarabi Gothic", variable: "--font-sawarabiGothic" },
  { name: "Kosugi", variable: "--font-kosugi" },
  { name: "M PLUS 2", variable: "--font-mPlus2" },
];

const enFonts = [
  { name: "Radley", variable: "--font-radley" },
  { name: "Crimson Text", variable: "--font-crimsonText" },
  { name: "EB Garamond", variable: "--font-ebGaramond" },
  { name: "Sorts Mill Goudy", variable: "--font-sortsMillGoudy" },
  { name: "Goudy Bookletter 1911", variable: "--font-goudyBookletter1911" },
  { name: "Poppins", variable: "--font-poppins" },
  { name: "Nunito Sans", variable: "--font-nunitoSans" },
  { name: "Outfit", variable: "--font-outfit" },
  { name: "Montserrat Alternates", variable: "--font-montserratAlternates" },
  { name: "Parkinsans", variable: "--font-parkinsans" },
  { name: "Ysabeau SC", variable: "--font-ysabeauSC" },
  { name: "Averia Libre", variable: "--font-averiaLibre" },
  { name: "Wix Madefor Text", variable: "--font-wixMadeforText" },
];

export const FontTester = ({
  jaIndex,
  enIndex,
  jaFontRef,
  enFontRef,
  children,
}: {
  jaIndex: number;
  enIndex: number;
  jaFontRef: RefObject<HTMLParagraphElement | null>;
  enFontRef: RefObject<HTMLParagraphElement | null>;
  children: ReactNode;
}) => {
  const [jaDisplayIndex, setJaDisplayIndex] = useState<number>(0);
  const [enDisplayIndex, setEnDisplayIndex] = useState<number>(0);
  useEffect(() => {
    setJaDisplayIndex(jaIndex % jaFonts.length);
  }, [jaIndex]);

  useEffect(() => {
    jaFontRef.current!.innerText = jaFonts[jaDisplayIndex].name;
  }, [jaDisplayIndex]);

  useEffect(() => {
    enFontRef.current!.innerText = enFonts[enDisplayIndex].name;
  }, [enDisplayIndex]);
  useEffect(() => {
    setEnDisplayIndex(enIndex % enFonts.length);
  }, [enIndex]);
  return (
    <>
      <main
        className={`${hinaMincho.variable} ${notoSerif.variable} ${bizUdMincho.variable} ${zenOldMincho.variable} ${shipporiMincho.variable} ${radley.variable} ${crimsonText.variable} ${ebGaramond.variable} ${sortsMillGoudy.variable} ${goudyBookletter1911.variable} ${castoro.variable} ${zenKakuGothicNew.variable} ${sawarabiGothic.variable} ${kosugi.variable} ${mPlus2.variable} ${poppins.variable} ${nunitoSans.variable} ${outfit.variable} ${montserratAlternates.variable} ${parkinsans.variable} ${ysabeauSC.variable} ${averiaLibre.variable} ${wixMadeforText.variable}`}
        style={{
          fontFamily: `var(${enFonts[enDisplayIndex].variable}), var(${jaFonts[jaDisplayIndex].variable}), sans-serif`,
        }}
      >
        {children}
      </main>
    </>
  );
};

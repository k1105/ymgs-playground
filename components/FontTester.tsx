"use client";

import { ReactNode, RefObject, useEffect, useState } from "react";
import localFont from "next/font/local";

// 日本語フォントの定義
const hinaMincho = localFont({
  src: "../public/fonts/Hina_Mincho/HinaMincho-Regular.ttf",
  variable: "--font-hinaMincho",
});
const notoSerif = localFont({
  src: "../public/fonts/Noto_Serif_JP/NotoSerifJP-VariableFont_wght.ttf",
  variable: "--font-notoSerif",
});
const bizUdMincho = localFont({
  src: "../public/fonts/BIZ_UDMincho/BIZUDMincho-Regular.ttf",
  variable: "--font-bizUdMincho",
});
const zenOldMincho = localFont({
  src: "../public/fonts/Zen_Old_Mincho/ZenOldMincho-Regular.ttf",
  variable: "--font-zenOldMincho",
});
const shipporiMincho = localFont({
  src: "../public/fonts/Shippori_Mincho_B1/ShipporiMinchoB1-Regular.ttf",
  variable: "--font-shipporiMincho",
});
const zenKakuGothicNew = localFont({
  src: "../public/fonts/Zen_Kaku_Gothic_New/ZenKakuGothicNew-Regular.ttf",
  variable: "--font-zenKakuGothicNew",
});
const sawarabiGothic = localFont({
  src: "../public/fonts/Sawarabi_Gothic/SawarabiGothic-Regular.ttf",
  variable: "--font-sawarabiGothic",
});

// 欧文フォントの定義
const radley = localFont({
  src: "../public/fonts/Radley/Radley-Regular.ttf",
  variable: "--font-radley",
});
const crimsonText = localFont({
  src: "../public/fonts/Crimson_Text/CrimsonText-Regular.ttf",
  variable: "--font-crimsonText",
});
const ebGaramond = localFont({
  src: "../public/fonts/EB_Garamond/EBGaramond-VariableFont_wght.ttf",
  variable: "--font-ebGaramond",
});
const sortsMillGoudy = localFont({
  src: "../public/fonts/Sorts_Mill_Goudy/SortsMillGoudy-Regular.ttf",
  variable: "--font-sortsMillGoudy",
});
const goudyBookletter1911 = localFont({
  src: "../public/fonts/Goudy_Bookletter_1911/GoudyBookletter1911-Regular.ttf",
  variable: "--font-goudyBookletter1911",
});
const castoro = localFont({
  src: "../public/fonts/Castoro/Castoro-Regular.ttf",
  variable: "--font-castoro",
});
const poppins = localFont({
  src: "../public/fonts/Poppins/Poppins-Regular.ttf",
  variable: "--font-poppins",
});
const nunitoSans = localFont({
  src: "../public/fonts/Nunito_Sans/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf",
  variable: "--font-nunitoSans",
});
const outfit = localFont({
  src: "../public/fonts/Outfit/Outfit-VariableFont_wght.ttf",
  variable: "--font-outfit",
});
const parkinsans = localFont({
  src: "../public/fonts/Parkinsans/Parkinsans-VariableFont_wght.ttf",
  variable: "--font-parkinsans",
});
const ysabeauSC = localFont({
  src: "../public/fonts/Ysabeau_SC/YsabeauSC-VariableFont_wght.ttf",
  variable: "--font-ysabeauSC",
});
const wixMadeforText = localFont({
  src: "../public/fonts/Wix_Madefor_Display/WixMadeforDisplay-VariableFont_wght.ttf",
  variable: "--font-wixMadeforText",
});

// 書体リスト
const jaFonts = [
  { name: "Zen Kaku Gothic New", variable: "--font-zenKakuGothicNew" },
  { name: "Hina Mincho", variable: "--font-hinaMincho" },
  { name: "Noto Serif JP", variable: "--font-notoSerif" },
  { name: "BIZ UDMincho", variable: "--font-bizUdMincho" },
  { name: "Zen Old Mincho", variable: "--font-zenOldMincho" },
  { name: "Shippori Mincho B1", variable: "--font-shipporiMincho" },
  { name: "Sawarabi Gothic", variable: "--font-sawarabiGothic" },
];

const enFonts = [
  { name: "Poppins", variable: "--font-poppins" },
  { name: "Radley", variable: "--font-radley" },
  { name: "Crimson Text", variable: "--font-crimsonText" },
  { name: "EB Garamond", variable: "--font-ebGaramond" },
  { name: "Sorts Mill Goudy", variable: "--font-sortsMillGoudy" },
  { name: "Goudy Bookletter 1911", variable: "--font-goudyBookletter1911" },
  { name: "Nunito Sans", variable: "--font-nunitoSans" },
  { name: "Outfit", variable: "--font-outfit" },
  { name: "Montserrat Alternates", variable: "--font-montserratAlternates" },
  { name: "Parkinsans", variable: "--font-parkinsans" },
  { name: "Ysabeau SC", variable: "--font-ysabeauSC" },
  // { name: "Averia Libre", variable: "--font-averiaLibre" },
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
  const [jaDisplayIndex, setJaDisplayIndex] = useState<number>(
    () => jaIndex % jaFonts.length
  );
  const [enDisplayIndex, setEnDisplayIndex] = useState<number>(
    () => enIndex % enFonts.length
  );

  useEffect(() => {
    jaFontRef.current!.innerText = `JP: ${jaFonts[0].name}`;
    enFontRef.current!.innerText = `EN: ${enFonts[0].name}`;
  }, []);

  useEffect(() => {
    setJaDisplayIndex(jaIndex % jaFonts.length);
  }, [jaIndex]);

  useEffect(() => {
    jaFontRef.current!.innerText = `JP: ${jaFonts[jaDisplayIndex].name}`;
  }, [jaDisplayIndex]);

  useEffect(() => {
    enFontRef.current!.innerText = `EN: ${enFonts[enDisplayIndex].name}`;
  }, [enDisplayIndex]);
  useEffect(() => {
    setEnDisplayIndex(enIndex % enFonts.length);
  }, [enIndex]);
  return (
    <>
      <main
        className={`${hinaMincho.variable} ${notoSerif.variable} ${bizUdMincho.variable} ${zenOldMincho.variable} ${shipporiMincho.variable} ${radley.variable} ${crimsonText.variable} ${ebGaramond.variable} ${sortsMillGoudy.variable} ${goudyBookletter1911.variable} ${castoro.variable} ${zenKakuGothicNew.variable} ${sawarabiGothic.variable} ${poppins.variable} ${nunitoSans.variable} ${outfit.variable} ${parkinsans.variable} ${ysabeauSC.variable} ${wixMadeforText.variable}`}
        style={{
          fontFamily: `var(${enFonts[enDisplayIndex].variable}), var(${jaFonts[jaDisplayIndex].variable}), sans-serif`,
        }}
      >
        {children}
      </main>
    </>
  );
};

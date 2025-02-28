// app/fonts.ts
import localFont from "next/font/local";

export const poppins = localFont({
  src: [
    {
      path: "../public/fonts/Poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins/Poppins-Medium.ttf",
      weight: "700",
      style: "bold",
    },
    // ほかにBold等あるなら同様に追加
  ],
  variable: "--font-poppins", // カスタムプロパティとして定義
});

export const zenKakuGothic = localFont({
  src: [
    {
      path: "../public/fonts/Zen_Kaku_Gothic_New/ZenKakuGothicNew-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Zen_Kaku_Gothic_New/ZenKakuGothicNew-Bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-zen-kaku-gothic",
});

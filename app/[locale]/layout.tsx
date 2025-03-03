import { poppins, zenKakuGothic } from "../font";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { NameContainerProvider } from "@/components/context/NameContainerContext";
import "./styles/globals.css";
import { Header } from "@/components/common/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon512_maskable.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${poppins.variable} ${zenKakuGothic.variable}`}>
        <ThemeProvider>
          <NameContainerProvider>
            <Header />
            {children}
          </NameContainerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

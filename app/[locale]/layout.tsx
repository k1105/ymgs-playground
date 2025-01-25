import { ThemeProvider } from "@/components/ThemeProvider";
import "./styles/globals.css";

export const metadata = {
  title: "morita asuka",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

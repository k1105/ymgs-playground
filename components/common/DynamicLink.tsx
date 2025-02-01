"use client";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function DynamicLink({
  href,
  children,
  style,
  className,
}: {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties; // `style` プロパティを受け取る
  className?: string; // `className` も受け取る
}) {
  const params = useParams();
  const locale = Array.isArray(params.locale)
    ? params.locale[0]
    : params.locale || "ja"; // `locale` を取得

  return (
    <Link href={`/${locale}${href}`} style={style} className={className}>
      {children}
    </Link>
  );
}

import { InkFilter } from "./InkFilter";

interface TextPagerProps {
  pages: string[];
  width: number;
  height: number;
  fontSize: number;
  lineHeight: number;
}

export const TextPager: React.FC<TextPagerProps> = ({
  pages,
  width,
  height,
  fontSize,
  lineHeight,
}) => {
  return (
    <div style={{ margin: "1rem", display: "flex", gap: "1rem" }}>
      {pages.map((text, pageIndex) => (
        <div
          key={pageIndex}
          style={{
            width,
            height,
            fontSize,
            lineHeight: lineHeight.toString(),
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            marginBottom: "1rem",
            boxSizing: "border-box",
          }}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

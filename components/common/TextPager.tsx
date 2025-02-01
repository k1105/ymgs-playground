interface TextPagerProps {
  text: string;
  size: { w: number; h: number };
  fontSize: number;
  lineHeight: number;
}

export const TextPager: React.FC<TextPagerProps> = ({
  text,
  size,
  fontSize,
  lineHeight,
}) => {
  return (
    <div
      style={{
        width: size.w + "px",
        height: size.h + "px",
        fontSize: fontSize + "px",
        lineHeight: lineHeight + "px",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        marginBottom: "1rem",
        boxSizing: "border-box",
      }}
    >
      {text}
    </div>
  );
};

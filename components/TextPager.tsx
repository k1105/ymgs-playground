interface TextPagerProps {
  text: string;
  pageIndex: number;
  width: number;
  height: number;
  fontSize: number;
  lineHeight: number;
}

export const TextPager: React.FC<TextPagerProps> = ({
  text,
  pageIndex,
  width,
  height,
  fontSize,
  lineHeight,
}) => {
  return (
    <div
      key={pageIndex}
      style={{
        width: width + "px",
        height: height + "px",
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

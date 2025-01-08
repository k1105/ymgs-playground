import { ReactNode, useRef } from "react";
import { useState } from "react";
import { FontTester } from "@/components/FontTester";
import { HambergerMenu } from "@/components/HambergerMenu";

const Layout = ({ children }: { children: ReactNode }) => {
  const [jaIndex, setJaIndex] = useState<number>(0);
  const [enIndex, setEnIndex] = useState<number>(0);
  const jaFontRef = useRef<HTMLParagraphElement>(null);
  const enFontRef = useRef<HTMLParagraphElement>(null);
  return (
    <>
      <div className="font-tester">
        <button onClick={() => setJaIndex((prev) => prev + 1)}>
          和文書体を変更
        </button>
        <button onClick={() => setEnIndex((prev) => prev + 1)}>
          欧文書体を変更
        </button>
        <p ref={jaFontRef} />
        <p ref={enFontRef} />
      </div>

      <HambergerMenu />
      <FontTester
        jaIndex={jaIndex}
        enIndex={enIndex}
        jaFontRef={jaFontRef}
        enFontRef={enFontRef}
      >
        {children}
      </FontTester>
      <style jsx>{`
        .font-tester {
          color: white;
        }
      `}</style>
    </>
  );
};

export default Layout;

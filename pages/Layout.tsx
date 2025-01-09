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
      <FontTester
        jaIndex={jaIndex}
        enIndex={enIndex}
        jaFontRef={jaFontRef}
        enFontRef={enFontRef}
      >
        <HambergerMenu
          setJaIndex={setJaIndex}
          setEnIndex={setEnIndex}
          jaFontRef={jaFontRef}
          enFontRef={enFontRef}
        />
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

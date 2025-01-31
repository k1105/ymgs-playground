import React, { createContext, useContext, useState } from "react";

interface NameContainerContextProps {
  isHidden: boolean;
  setIsHidden: (hidden: boolean) => void;
}

const NameContainerContext = createContext<
  NameContainerContextProps | undefined
>(undefined);

export const NameContainerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <NameContainerContext.Provider value={{ isHidden, setIsHidden }}>
      {children}
    </NameContainerContext.Provider>
  );
};

export const useNameContainer = () => {
  const context = useContext(NameContainerContext);
  if (!context) {
    throw new Error(
      "useNameContainer must be used within a NameContainerProvider"
    );
  }
  return context;
};

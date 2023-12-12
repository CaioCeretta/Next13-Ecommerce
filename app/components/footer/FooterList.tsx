import { ReactNode } from "react";

interface FooterListProps {
  children: ReactNode;
}

const FooterList = ({ children }: FooterListProps) => {
  return (
    <div
      className="
      w-full
      sm:w-1/6
      md:w-1/4
      lg:w-1/2
      mb-6
      flex
      flex-col
      gap-2
     "
    >
      {children}
    </div>
  );
};

export { FooterList };

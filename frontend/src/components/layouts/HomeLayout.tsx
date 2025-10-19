import type { ReactNode } from "react";

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return <div className="h-screen bg-gray-100">{children}</div>;
};

export default HomeLayout;

import { ReactNode } from "react";
import { Inter } from "next/font/google";
import SideBar from "./SideBar";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className={`flex ${inter.className}`}>
      <SideBar />

      <div className="w-[calc(100%-25rem)] py-16 px-32 ml-[25rem]">
        {children}
      </div>
    </main>
  );
}

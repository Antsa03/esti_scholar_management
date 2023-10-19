import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { Provider } from "./provider";
import TopbarContainer from "@/components/topbar/topbar";
import Sidebar from "@/views/divers/sidebar";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scholar management",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans} bg-custom-secondary-white `}>
        <Provider>
          <TopbarContainer />
          <main className="flex flex-row gap-2 relative mt-2">
            <Sidebar />
            <section className="flex flex-col flex-grow gap-2 relative bg-custom-primary-white rounded-md">
              {children}
            </section>
          </main>
        </Provider>
      </body>
    </html>
  );
}
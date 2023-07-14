import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Provider from "@/components/Provider";
import ContextProvider from "@/store/ContextProvider";
export const metadata = {
  title: "Zwigato",
  description: "This is a Zomato clone app",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <Provider>
        <ContextProvider>
          <body className={inter.className}>{children}</body>
        </ContextProvider>
      </Provider>
    </html>
  );
}

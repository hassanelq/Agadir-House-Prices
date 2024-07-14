import { Merriweather_Sans } from "next/font/google";
import "./globals.css";

const Merriweather = Merriweather_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Agadir house prices",
  description: "house prices prediction in Agadir using machine learning",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={Merriweather.className}>{children}</body>
    </html>
  );
}

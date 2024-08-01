import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Agadir house prices",
  description: "house prices prediction in Agadir using machine learning",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}

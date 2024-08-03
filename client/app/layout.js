import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Estimation des Prix Immobiliers à Agadir",
  description:
    "Outil avancé de prédiction des prix immobiliers à Agadir basé sur Machine Learning (Regression).",
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

import { Inter } from "next/font/google";
import { LanguageProvider } from "./context/LanguageContext";
import "./globals.css";
import "../assets/css/style.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/feather.css";
import "../assets/css/bootstrap.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "e-ESJ",
  description: "e-ESJ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <LanguageProvider>
        <body className={inter.className}>
          {children}
        </body>
      </LanguageProvider>
    </html>
  );
}

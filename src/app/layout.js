// import { Inter } from "next/font/google";
// import "./globals.css";
// const inter = Inter({ subsets: ["latin"] });
// import {getLangDir} from 'rtl-detect';
// export const metadata = {
//   title: "e-ESJ",
//   description: "e-ESJ",
// };

// export default function RootLayout( {
//   children,
//   params: { locale }}) {
//     const direction = getLangDir(locale);
//     console.log(direction)
//     console.log(locale)
//   return (
//     <html lang={locale} dir="rtl">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }
export default function RootLayout({
  children,
}) {
  return children;
}
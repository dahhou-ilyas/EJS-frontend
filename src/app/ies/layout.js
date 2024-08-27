import { Inter } from "next/font/google";
import "./another-globals.css";

// CSS, Bootstrap & FontAwesome
import "../../../public/ies/assets/css/bootstrap.min.css";
import "../../../public/ies/assets/css/style.css";
import "../../../public/ies/assets/css/select2.min.css";
import "../../../public/ies/assets/css/font-awesome.min.css";

import '../../../node_modules/alertifyjs/build/css/alertify.min.css';
import Alertify_Wrapper from "@/components/ies/utility/alertifyjs-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "e-ESJ - IES",
  description: "Espace Information et Education pour la Santé",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Alertify_Wrapper />
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

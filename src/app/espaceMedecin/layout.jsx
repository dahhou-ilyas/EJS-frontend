import "../../assets/css/style.css";
import "../../assets/css/bootstrap.min.css";
import Header from "../../components/espaceMedecin/Header";
import Script from 'next/script';

export const metadata = {
  title: "Espace Médecins et Professionnelles de Santé",
  description:
    "Connecter les médecins pour des soins meilleurs et plus rapides",
  icons: {
    icon: "/favicon.png",
  },
  themeColor: "#000000",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  charset: "utf-8",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Header section="eESJ" />
        {children}
        <Script
          src="https://kit.fontawesome.com/a790242b27.js"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
};
export default RootLayout;
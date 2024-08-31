import "../../assets/css/style.css";
import "../../assets/css/bootstrap.min.css";
import Header from "../../components/espaceMedecin//Header";
import Script from 'next/script';


export const metadata = {
  title: "Espace Médecins et Professionnelles de Santé",
  description:
    "Connecter les médecins pour des soins meilleurs et plus rapides",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" />
        <script
          src="https://kit.fontawesome.com/a790242b27.js"
          crossOrigin="anonymous"
          async />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,500;0,600;0,700;1,400&display=swap"
        />
        <title>{metadata.title}</title>
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;

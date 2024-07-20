import "@/assets/css/style.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/font-awesome.min.css";
import Header from "../components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Dossier Medicale",
  description: "Profile Patient Numerique votre portail digitale de sante",
};


const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content = {metadata.description} />
        <title>{metadata.title}</title>
         {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://kit.fontawesome.com/a790242b27.js" crossOrigin="anonymous"></script>
      </head>
      <body>
        <Header />
        <Sidebar activeClassName="patients" />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;

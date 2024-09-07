import Header from "@/components/espaceMedecin/Header";
import Sidebar from "@/components/espaceMedecin/Sidebar1";

// export const metadata = {
//   title: "ppn",
//   description:
//     "Acces Rapide a les informations medicals des patients",
// };

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" />
        {/* <title>{metadata.title}</title> */}
      </head>
      <body>
        <div id="main-wrapper">
          <Header section="ppn" />
          <Sidebar activeClassName = "ppn"/>
          <div className="page-wrapper">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;

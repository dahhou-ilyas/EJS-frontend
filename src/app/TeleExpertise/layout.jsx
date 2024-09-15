
import Header from "@/components/espaceMedecin/Header";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "TéléExpertise",
  description:
    "Connecter les médecins pour des soins meilleurs et plus rapides",
};

const RootLayout = ({ children }) => {
  return (
    <>
      <Header section="TéléExpertise" />
      <Toaster
          position="top-center"
          reverseOrder={false}
      />
      {children}
    </>
  );
};

export default RootLayout;

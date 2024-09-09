"use client";
import "@/assets/css/style.css";
import { useEffect, useState, useRef } from "react";
import Sidebar from "@/components/TeleExpertise/Sidebar";
import Link from "next/link";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PrintableComponent from "@/components/TeleExpertise/CompteRendu";
import { createCompteRendu, getDiscussion } from "@/services/discussionService";
import { useRouter } from "next/navigation";
import { decodeToken } from "@/utils/docodeToken";
import toast from "react-hot-toast";

const Report = ({ params }) => {
  const componentRef = useRef();
  const [caseCreation, setCaseCreation] = useState("lorem ipsum");
  const [caseClosure, setCaseClosure] = useState("lorem ipsum");
  const [discussion, setDiscussion] = useState(null);
  const [conclusion, setConclusion] = useState("");
  const [isReportReady, setIsReportReady] = useState(false);
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("access-token")
        const decodedToken = decodeToken(token)
        const userId = decodedToken.claims.id
        const res = await getDiscussion(token, params.discussionId);
        
        if(res.status !== "TERMINEE" ) {
          router.push("/TeleExpertise")
        }

        if(res.compteRendu) {
          setIsReportReady(true)
          setConclusion(res.compteRendu.conclusion)
        }

        if(res.medcinConsulte.id !== userId) {
          if(res.participants.map(p => p.id).includes(userId) || res.medcinResponsable.id === userId) {
            setIsReportReady(true)
          } else {
            router.push("/TeleExpertise")
          }
        }
        
        setDiscussion(res)
      } catch (error) {
        router.push("/TeleExpertise")
        console.log(error.message)
      }
    }
    fetchData()
  }, [])

  const handleExport = async () => {
    const element = componentRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: true,
      allowTaint: false,
      scrollX: 0,
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("tele_expertise_report.pdf");
  };

  const handleConfirm = async  () => {
    const token = localStorage.getItem("access-token")
    const compteRendu = {
      conclusion: conclusion,
      discussionId: params.discussionId
    }
    try {
      await createCompteRendu(token, compteRendu)
      toast.success("Le compte rendu est crée")
      setIsReportReady(true); 
    } catch (error) {
      toast.error("Quelque chose s'est mal passé, veuillez réessayer")
    }
  };

  return (
    <>
      <Sidebar activeClassName="chat" />
      <>
        <div className="page-wrapper">
          <div className="content">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/espaceMedecin">Page d&#39;accueil </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <FeatherIcon icon="chevron-right" />
                    </li>
                    <li className="breadcrumb-item">
                      <Link href="/TeleExpertise">Télé-Expertise</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <FeatherIcon icon="chevron-right" />
                    </li>
                    <li className="breadcrumb-item">
                      <Link href="/TeleExpertise/Discussions">Disscusions</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <FeatherIcon icon="chevron-right" />
                    </li>
                    <li className="breadcrumb-item active">Compte Rendu</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row justify-content-center">
              <div className="col-md-8 mx-auto">
                <div className="card">
                  <div className="card-body">
                    {!isReportReady && (
                      <div className="form-group text-center">
                        <label htmlFor="conclusion">
                          Conclusion et recommandation:
                        </label>
                        <textarea
                          className="form-control mx-auto p-3"
                          style={{ width: "80%" }}
                          id="conclusion"
                          value={conclusion}
                          onChange={(e) => setConclusion(e.target.value)}
                        ></textarea>
                        <button
                          onClick={handleConfirm}
                          type="button"
                          className="btn btn-primary mt-3"
                        >
                          Confirmer
                        </button>
                      </div>
                    )}
                    {isReportReady && (
                      <>
                        <PrintableComponent
                          ref={componentRef}
                          description={discussion.descriptionEtatClinique}
                          patientName={discussion.prenomPatient}
                          patientLastName={discussion.nomPatient}
                          age={discussion.age}
                          patientID={discussion.identifiantPatient}
                          patientCIN={discussion.cinPatient}
                          patientMassar={discussion.codeMassarPatient}
                          caseCreation={caseCreation}
                          caseClosure={caseClosure}
                          requestingDoctor={discussion.medcinResponsable}
                          consultedDoctor={discussion.medcinConsulte}
                          //discussion={discussion}
                          conclusion={conclusion}
                        />
                        
                      </>
                    )}
                  </div>
                </div>
                {
                  isReportReady ?
                  <div className="text-center">
                    <button
                      onClick={handleExport}
                      type="button"
                      className="btn btn-primary"
                      style={{
                        width: "180px",
                        borderRadius: "5px",
                        marginBottom: "10px"
                      }}
                    >
                      Télécharger le rapport
                    </button>
                  </div>
                  : null
                }
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Report;

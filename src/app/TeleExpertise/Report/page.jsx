"use client";
import "@/assets/css/style.css";
import { useEffect, useState, useRef } from "react";
import Sidebar from "@/components/TeleExpertise/Sidebar";
import Link from "next/link";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PrintableComponent from "@/components/TeleExpertise/CompteRendu";
import Select from "react-select";

const Report = () => {
  const componentRef = useRef();
  const [title, setTitle] = useState("Rapport de Télé-expertise");
  const [description, setDescription] = useState("lorem ipsum");
  const [patientName, setPatientName] = useState("lorem ipsum");
  const [patientLastName, setPatientLastName] = useState("lorem ipsum");
  const [patientDOB, setPatientDOB] = useState("lorem ipsum");
  const [patientID, setPatientID] = useState("lorem ipsum");
  const [patientCIN, setPatientCIN] = useState("lorem ipsum");
  const [patientMassar, setPatientMassar] = useState("lorem ipsum");
  const [caseCreation, setCaseCreation] = useState("lorem ipsum");
  const [caseClosure, setCaseClosure] = useState("lorem ipsum");
  const [requestingDoctorName, setRequestingDoctorName] =
    useState("lorem ipsum");
  const [requestingDoctorLastName, setRequestingDoctorLastName] =
    useState("lorem ipsum");
  const [requestingDoctorWorkplace, setRequestingDoctorWorkplace] =
    useState("lorem ipsum");
  const [requestingDoctorSpecialty, setRequestingDoctorSpecialty] =
    useState("lorem ipsum");
  const [consultedDoctorName, setConsultedDoctorName] = useState("lorem ipsum");
  const [consultedDoctorLastName, setConsultedDoctorLastName] =
    useState("lorem ipsum");
  const [consultedDoctorWorkplace, setConsultedDoctorWorkplace] =
    useState("lorem ipsum");
  const [consultedDoctorSpecialty, setConsultedDoctorSpecialty] =
    useState("lorem ipsum");
  const [discussion, setDiscussion] = useState("lorem ipsum");
  const [conclusion, setConclusion] = useState("lorem ipsum");
  const [isReportReady, setIsReportReady] = useState(false);

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
  const handleConfirm = () => {
    setIsReportReady(true);
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
                          title={title}
                          description={description}
                          patientName={patientName}
                          patientLastName={patientLastName}
                          patientDOB={patientDOB}
                          patientID={patientID}
                          patientCIN={patientCIN}
                          patientMassar={patientMassar}
                          caseCreation={caseCreation}
                          caseClosure={caseClosure}
                          requestingDoctorName={requestingDoctorName}
                          requestingDoctorLastName={requestingDoctorLastName}
                          requestingDoctorWorkplace={requestingDoctorWorkplace}
                          requestingDoctorSpecialty={requestingDoctorSpecialty}
                          consultedDoctorName={consultedDoctorName}
                          consultedDoctorLastName={consultedDoctorLastName}
                          consultedDoctorWorkplace={consultedDoctorWorkplace}
                          consultedDoctorSpecialty={consultedDoctorSpecialty}
                          discussion={discussion}
                          conclusion={conclusion}
                        />
                        <div className="mt-3 text-center">
                          <button
                            onClick={handleExport}
                            type="button"
                            className="btn btn-primary"
                          >
                            Télécharger le rapport
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Report;

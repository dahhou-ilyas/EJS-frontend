"use client"
import NavigationHeader from "@/components/NavigationHeader";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";
import "@/assets/css/style.css";
import "@/assets/css/links.css";
import "@/assets/css/patient.css";

import FeatherIcon from "feather-icons-react";

// import "@/assets/css/font-awesome.min.css";
// import "@/assets/css/customized.css";  
import {
  blogimg2,
  medalicon03,
  medalicon,
  medalicon02,
  callicon1
} from "@/components/imagepath";
import {dossier} from "@/assets/dumpdata";
import jsPDF from "jspdf";

export function handleGenerateDocument(){   
  const doc = new jsPDF()
  doc.text(`Date: ${dossier.date}`, 10, 10);
  doc.text(`Espace: ${dossier.location}`, 10, 20);
  doc.text(`Consultation: ${dossier.title}`, 10, 30);//(text,x,y);x and y are coordinates
  doc.text(`Motif: ${dossier.motif}`, 10, 40);
  doc.text(`Docteur: ${dossier.doctor}`, 10, 50);
  doc.text(`Ordonnance: ${dossier.info}`, 10, 60);
  doc.save(`${dossier.title}.pdf`);
}

const patient = ({params}) => {
  const id = params.id

  const [patient, setPatient] = useState();
  const search = useSearchParams();
  // const {from} = router.back;
  const from = search.get('from');

  useEffect(() => {
    console.log(search);
    if (id) {
      // Remplacez l'URL par celle de votre API ou de votre backend
      fetch(`http://localhost:8080/jeunes/` + id)
        .then(response => response.json())
        .then(data => setPatient(data))
        .catch(error => console.error('Error fetching patient:', error));
    }
  }, [id]);

  if (!patient) {
    return <p>Loading...</p>;
  }
  

  return (
    <div id="root">
      <div className="page-wrapper">
        <div className="content">
          {/* <NavigationHeader pages={pages} currentPage="Patient" /> */}
          <div className="row center-layout">
            <div className="col-sm-6 col-md-6 col-xl-5">
              <div className="blog grid-blog customized-blog">
                <div className="blog-content">
                  <div className="blog-grp-blk">
                    <div className="blog-img-blk">
                      <Link href="/blog">
                        <Image className="img-fluid" src={blogimg2} alt="#" />
                      </Link>
                      <div className="content-blk-blog ms-2 customized-subtittle">
                        <h3>
                          <Link href="/"> {patient.nom} {patient.prenom}</Link>
                        </h3>
                        <h5>{patient.sexe}, {patient.age}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="about-me-list subcontent">
                    <ul className="list-space">
                      <li>
                        <h4>NIP</h4>
                        <span>{patient.identifiantPatient}</span>
                      </li>
                      <li>
                        <h4>CIN</h4>
                        <span>{patient.cin}</span>
                      </li>
                      <li>
                        <h4>Date de Naissance</h4>
                        <span>{patient.dateNaissance}</span>
                      </li>
                      <li>
                        <h4>Adresse</h4>
                        <span>13 Rue Elwahda, Sale</span>
                      </li>
                      <li>
                        <h4>Adresse Email</h4>
                        <span>patient@gmail.com</span>
                      </li>
                      <li>
                        <h4>Numéro de Téléphone</h4>
                        <span>0365516161</span>
                      </li>
                      <li>
                        <h4>Scolarisation</h4>
                        <span>{patient.scolarise ? "Oui" : "Non"}</span>
                      </li>
                      <li>
                        <h4>Niveau d'etude</h4>
                        <span>Lycee</span>
                      </li>
                      <li>
                        <h4>CNE</h4>
                        <span>H1309818912</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3">
              <div className="doctor-personals-grp">
                <div className="card">
                  <div className="card-body">
                    {/* <div className="heading-detail">
                      <h4>Speciality</h4>
                    </div> */}
                    <Link href={`${id}/Consultation/Ajouter`} className="personal-activity">
                      <div className="personal-icons status-grey">
                        <Image src={medalicon} alt="" />
                      </div>
                      <div className="views-personal">
                        <h4>Consultations</h4>
                        <h5>Ajouter Une Nouvelle Consultation </h5>
                      </div>
                    </Link>
                    <Link href={`${id}/Historique`} className="personal-activity">
                      <div className="personal-icons status-green">
                        <Image src={medalicon02} alt="" />
                      </div>
                      <div className="views-personal">
                        <h4>Historique</h4>
                        <h5>L&#39;historique de Consultation</h5>
                      </div>
                    </Link>
                    <Link href="../TeleExpertise" className="personal-activity">
                      <div className="personal-icons status-blue">
                        <Image src={callicon1} alt="" />
                      </div>
                      <div className="views-personal">
                        <h4>TeleExpertise</h4>
                        <h5>Se Mettre en Contact</h5>
                      </div>
                    </Link>
                    
                    <div className="personal-activity generate mb-0"
                      onClick={handleGenerateDocument}
                    >
                      <div className="personal-icons status-orange">
                        <Image src={medalicon03} alt="" />
                      </div>
                      <div className="views-personal">
                        <h4>Compte Rendu</h4>
                        <h5>Generer son Compte Rendu</h5>
                      </div>
                    </div >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default patient;
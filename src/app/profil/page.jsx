"use client"
import Header from "@/components/espaceMedecin/Header";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "@/assets/css/style.css";
import {jwtDecode} from 'jwt-decode';
import axios from "axios";
import FeatherIcon from "feather-icons-react";

import {
  blogimg2,
  medalicon03,
  medalicon,
  medalicon02,
  callicon1
} from "@/components/imagepath";
import {dossier} from "@/assets/json/dumpdata_ppn";
import jsPDF from "jspdf";
import { SPRINGBOOT_API_URL } from "@/config";

const Profil = () => {
  
  
  const [patient, setPatient] = useState([]);
  const [patientDetail, setPatientDetail] = useState([]);
  const [id,setId] = useState(-1);
  const search = useSearchParams();
  const from = search.get('from');
  
  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');
    const decodedAccessToken = jwtDecode(accessToken);
    setId(decodedAccessToken.claims.id);

    axios.get(SPRINGBOOT_API_URL+"/jeunes/"+decodedAccessToken.claims.id, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
        .then(data => {setPatient(data.data);})
        .catch(error => console.error('Error fetching patient:', error));
    axios.get(SPRINGBOOT_API_URL+"/jeune/"+decodedAccessToken.claims.id, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
        .then(data => {setPatientDetail(data.data);})
        .catch(error => console.error('Error fetching patient details:', error));
    
  }, []);
  
  //OLD CODE HAS BEEN DELETED 

  return (
    
        <div className="content">
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
                        <span>{patient.id}</span>
                      </li>
                      <li>
                        <h4>CIN</h4>
                        <span>{patient.cin}</span>
                      </li>
                      <li>
                        <h4>Date de Naissance</h4>
                        <span>{
                          new Date(patient.dateNaissance).toLocaleDateString('fr-FR', 
                                  {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  })
                          }
                        </span>
                      </li>
                      <li>
                        <h4>Adresse Email</h4>
                        <span>{patient.mail}</span>
                      </li>
                      <li>
                        <h4>Numéro de Téléphone</h4>
                        <span>{patient.numTele}</span>
                      </li>
                      <li>
                        <h4>Scolarisation</h4>
                        <span>{patient.niveauEtudesActuel != "" ? "Oui" : "Non"}</span>
                      </li>
                      <li>
                        <h4>Niveau d&apos;etude</h4>
                        <span>{patient.niveauEtudesActuel}</span>
                      </li>
                      <li>
                        <h4>Maladies declarées</h4>
                        <span>
                        {patientDetail?.dossierMedial?.antecedentsPersonnels?.length > 0 &&
                        patientDetail.dossierMedial.antecedentsPersonnels[0]?.maladies?.length > 0
                          ? patientDetail.dossierMedial.antecedentsPersonnels[0].maladies.join(', ')
                          : 'Aucune maladie declarée'}
                        </span>
                      </li>
                      {/* Médicaments */}
                      <li>
                        <h4>Médicaments</h4>
                        <span>
                          {patientDetail?.dossierMedial?.antecedentsPersonnels?.length > 0 &&
                          patientDetail.dossierMedial.antecedentsPersonnels[0]?.utiliseMedicaments &&
                          patientDetail.dossierMedial.antecedentsPersonnels[0]?.medicaments?.length > 0
                            ? patientDetail.dossierMedial.antecedentsPersonnels[0].medicaments.join(', ')
                            : 'Aucun médicament utilisé'}
                        </span>
                      </li>

                      {/* Chirurgies */}
                      <li>
                        <h4>Chirurgies</h4>
                        <span>
                          {patientDetail?.dossierMedial?.antecedentsPersonnels?.length > 0 &&
                          patientDetail.dossierMedial.antecedentsPersonnels[0]?.chirurgicaux &&
                          patientDetail.dossierMedial.antecedentsPersonnels[0]?.operationsChirurgicales
                            ? `Opération: ${patientDetail.dossierMedial.antecedentsPersonnels[0].operationsChirurgicales.typeOperation} (${patientDetail.dossierMedial.antecedentsPersonnels[0].operationsChirurgicales.anneeOperation})`
                            : 'Aucune chirurgie'}
                        </span>
                      </li>

                      {/* Habitudes */}
                      <li>
                        <h4>Habitudes</h4>
                        <span>
                          {patientDetail?.dossierMedial?.antecedentsPersonnels?.length > 0 &&
                          patientDetail.dossierMedial.antecedentsPersonnels[0]?.habitudes?.length > 0
                            ? patientDetail.dossierMedial.antecedentsPersonnels[0].habitudes.join(', ')
                            : 'Aucune habitude déclarée'}
                        </span>
                      </li>

                      {/* Cigarettes par jour */}
                      <li>
                        <h4>Cigarettes par jour</h4>
                        <span>
                          {patientDetail?.dossierMedial?.antecedentsPersonnels?.length > 0 &&
                          patientDetail.dossierMedial.antecedentsPersonnels[0]?.cigarettesParJour
                            ? `${patientDetail.dossierMedial.antecedentsPersonnels[0].cigarettesParJour} cigarettes par jour`
                            : 'Aucune consommation de cigarettes'}
                        </span>
                      </li>

                      {/* Durée de fumée */}
                      <li>
                        <h4>Durée de fumée</h4>
                        <span>
                          {patientDetail?.dossierMedial?.antecedentsPersonnels?.length > 0 &&
                          patientDetail.dossierMedial.antecedentsPersonnels[0]?.dureeFumee
                            ? `${patientDetail.dossierMedial.antecedentsPersonnels[0].dureeFumee} ans de fumée`
                            : 'Pas d’information sur la durée de fumée'}
                        </span>
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
                    <Link href={`/profil/historique?id=${id}`} className="personal-activity">
                      <div className="personal-icons status-green">
                        <Image src={medalicon02} alt="" />
                      </div>
                      <div className="views-personal">
                        <h4>Historique</h4>
                        <h5>L&#39;historique de Consultation</h5>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <Profil />
    </Suspense>
  );
}
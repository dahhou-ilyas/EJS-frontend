"use client";
import "@/assets/css/style.css";
import Sidebar from "@/components/espaceMedecin/Sidebar1";
import { useEffect, useState } from "react";
import axios from 'axios';
import 'boxicons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import html2pdf from 'html2pdf.js';
import { SPRINGBOOT_API_URL } from "@/config";

const Page = ({ params }) => {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const token = localStorage.getItem('access-token');

  const [patient, setPatient] = useState(null);
  
  const [antecedentPersonnelMedicaux, setAntecedentPersonnelMedicaux] = useState(null);
  const [antecedentPersonnelChirurgicaux, setAntecedentPersonnelChirurgicaux] = useState(null);
  const [antecedentPersonnelHabitudes, setAntecedentPersonnelHabitudes] = useState(null);

  const [antecedentFamilial, setAntecedentFamilial] = useState(null);

  const [consultations, setConsultation] = useState(null);

  const [observation, setObservation] = useState(null);

  const [analysePatient, setAnalysePatient] = useState('');
  const [message, setMessage] = useState(null);

  const getDossierMedicalInformations = () => {
    axios.get(SPRINGBOOT_API_URL+'/jeune/dossier-medical/' + params.id, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      setPatient(res.data);
      setMessage(`"${res.data}"
        Je suis médecin et j'analyse le dossier médical du patient. Je vous demande de me fournir des recommandations pour améliorer sa santé et son bien-être, ainsi que des suggestions sur les types de médicaments qui pourraient être envisagés pour les conditions mentionnées dans le dossier médical. Agissez comme un médecin en structurant votre réponse comme suit :
        #### Recommandations générales: (Écrivez ici vos recommandations pour améliorer la santé et le bien-être du patient.)
        #### Médicaments potentiels: (Énumérez ici les médicaments qui pourraient être envisagés pour les conditions médicales spécifiques mentionnées dans le dossier.)
        Conclusion: (Veuillez inclure une synthèse brève de vos recommandations et suggestions médicamenteuses.)
        NB: Donner moi la réponse sans ces phrases: "Il est important de rappeler que je ne suis pas un médecin", "Il est crucial de consulter un médecin" et "il est important de consulter un médecin".`);
      setAntecedentPersonnelMedicaux(res.data[16].split('#'));
      setAntecedentPersonnelChirurgicaux(res.data[17].split('#'));
      setAntecedentPersonnelHabitudes(res.data[18].split('#'));
      setAntecedentFamilial(res.data[19].split('#'));
      setObservation(res.data[20].split('#'));
      setConsultation(res.data[21].split('#').map(item => item.split(';')));
    })
    .catch(err => {
      console.log(err);
    })
  };

  const fetchMessage = async () => {
    if (model != null) {
      const result = await model?.generateContent([message]);
      setAnalysePatient(result?.response?.text());
    }
  }

  const generatePdf = () => {
    const element = document.getElementById('contentToPrint');
    html2pdf(element, {
      margin: 1,
      filename: patient[2] + '_' + patient[1] + '.pdf',
      image: { type: 'jpeg', quality: 0.20 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'p' },
    });
  };

  useEffect(() => {
    getDossierMedicalInformations();
    fetchMessage();
  }, [message]);

  return (
    <div id="root">
      <div className="page-wrapper">
        <div className="content">
          <Sidebar activeClassName="MesPatient" />
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-5">
              <div className="blog grid-blog customized-blog">
                <div className="blog-content" id="contentToPrint">
                  <div className="blog-grp-blk">
                    <div className="blog-img-blk">
                      <img className="img-fluid" src={ patient && patient[6] } alt="#" />
                      <div className="content-blk-blog ms-2 customized-subtittle">
                        <h3>{ patient && ( patient[2] + ' ' + patient[1] ) }</h3>
                        <h5>{ patient && patient[7] + ', ' + patient[8]} Ans</h5>
                      </div>
                    </div>
                  </div>
                  <div className="about-me-list subcontent">
                    <h4 style={{ marginBottom: '20px', color: '#2E37A4', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <box-icon type='solid' name='user-badge' color='#2E37A4'></box-icon>
                      <div style={{ marginLeft: '5px' }}>Informations du patient</div>
                    </h4>
                    <ul className="list-space">
                      <li>
                        <h4>NIP</h4>
                        <span>{ patient && patient[11] }</span>
                      </li>
                      <li>
                        <h4>CIN</h4>
                        <span>{ patient && patient[5] }</span>
                      </li>
                      <li>
                        <h4>Date de Naissance</h4>
                        <span>{ patient && patient[10] }</span>
                      </li>
                      <li>
                        <h4>Adresse</h4>
                        <span>{ patient && patient[9] }</span>
                      </li>
                      <li>
                        <h4>Adresse Email</h4>
                        <span>{ patient && patient[3] }</span>
                      </li>
                      <li>
                        <h4>Numéro de Teléphone</h4>
                        <span>{ patient && patient[4] }</span>
                      </li>
                      <li>
                        <h4>Scolarisation</h4>
                        <span>{ patient && patient[12] ? 'Oui' : 'Non' }</span>
                      </li>
                      <li>
                        <h4>Niveau études</h4>
                        <span>{ patient && patient[13] }</span>
                      </li>
                      <li>
                        <h4>CNE</h4>
                        <span>{ patient && patient[14] }</span>
                      </li>
                    </ul>
                    <h4 style={{ marginBottom: '20px', marginTop: '20px', color: '#2E37A4', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <box-icon type='solid' name='user' color='#2E37A4'></box-icon>
                      <div style={{ marginLeft: '5px' }}>Antécédents personnels</div>
                    </h4>
                    <ul className="list-space">
                      <li style={{alignItems: 'start'}}>
                        <h4>Chirurgicaux</h4>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          {
                            antecedentPersonnelChirurgicaux && antecedentPersonnelChirurgicaux.map((item, index) => (
                              <span key={index}>{ item }</span>
                            ))
                          }
                        </div>
                      </li>
                      <li>
                        <h4>Medicaux</h4>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          {
                            antecedentPersonnelMedicaux && antecedentPersonnelMedicaux.map((item, index) => (
                              <span key={index}>{ item }</span>
                            ))
                          }
                        </div>
                      </li>
                      <li>
                        <h4>Habitudes</h4>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          {
                            antecedentPersonnelHabitudes && antecedentPersonnelHabitudes.map((item, index) => (
                              <span key={index}>{ item }</span>
                            ))
                          }
                        </div>
                      </li>
                    </ul>
                    <h4 style={{ marginBottom: '20px', marginTop: '20px', color: '#2E37A4', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <box-icon name='group' type='solid' color='#2E37A4'></box-icon>
                      <div style={{ marginLeft: '5px' }}>Antécédents familiaux</div>
                    </h4>
                    <ul className="list-space">
                      <li style={{alignItems: 'start'}}>
                        <h4>Maladies familiales</h4>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          {
                            antecedentFamilial && antecedentFamilial.map((item, index) => (
                              <span key={index}>{ item }</span>
                            ))
                          }
                        </div>
                      </li>
                    </ul>
                    <h4 style={{ marginBottom: '20px', marginTop: '20px', color: '#2E37A4', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <box-icon type='solid' name='calendar' color='#2E37A4'></box-icon>
                      <div style={{ marginLeft: '5px' }}>Consultations</div>
                    </h4>
                    {
                      consultations && consultations.map((item, index) => (
                        <div key={index}>
                          <h4 style={{ marginBottom: '20px', marginTop: '20px', textAlign: 'center' }}>Consultations { index + 1 }</h4>
                          <ul className="list-space">
                            <li style={{alignItems: 'start'}}>
                              <h4>Date consultation</h4>
                              <div style={{display: 'flex', flexDirection: 'column'}}>
                                <span>{ item[0] }</span>
                              </div>
                            </li>
                            <li style={{alignItems: 'start', marginTop: '-20px'}}>
                              <h4>Motif consultation</h4>
                              <div style={{display: 'flex', flexDirection: 'column'}}>
                                <span>{ item[1] }</span>
                              </div>
                            </li>
                            <li style={{alignItems: 'start', marginTop: '-20px'}}>
                              <h4>Diagnostic</h4>
                              <div style={{display: 'flex', flexDirection: 'column'}}>
                                <span>{ item[2] }</span>
                              </div>
                            </li>
                            <li style={{alignItems: 'start', marginTop: '-20px'}}>
                              <h4>Traitement</h4>
                              <div style={{display: 'flex', flexDirection: 'column'}}>
                                <span>{ item[3] }</span>
                              </div>
                            </li>
                            <li style={{alignItems: 'start', marginTop: '-20px'}}>
                              <h4>Recommandation</h4>
                              <div style={{display: 'flex', flexDirection: 'column'}}>
                                <span>{ item[4] }</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div style={{textAlign: 'center', marginBottom: '50px'}}>
                <button class="btn btn-primary" onClick={generatePdf}>Générer un PDF</button>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="doctor-personals-grp">
                <div className="card">
                  <div className="card-body">
                    <div className="personal-activity">
                      <div className="personal-icons status-grey">
                        {/* <Image src={medalicon} alt="" /> */}
                        <box-icon type='solid' name='info-circle' color='#2E37A4'></box-icon>
                      </div>
                      <div className="views-personal">
                        <h4>Observations</h4>
                        <h5>Observations sur le patient</h5>
                      </div>
                    </div>
                    <ul>
                      {
                        observation && observation.map((item, index) => (
                          <li key={index}>{ item }</li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>
              <div className="doctor-personals-grp">
                <div className="card">
                  <div className="card-body">
                    <div className="personal-activity">
                      <div className="personal-icons status-grey">
                        {/* <Image src={medalicon} alt="" /> */}
                        <box-icon type='solid' name='notepad' color='#2E37A4'></box-icon>
                      </div>
                      <div className="views-personal">
                        <h4>Analyse du patient</h4>
                        <h5>Suggestions pour améliorer sa santé et son bien-être</h5>
                      </div>
                    </div>
                    <div>
                      { 
                        analysePatient.length == 0 ? 
                        <div class="text-center">
                          <div class="spinner-border text-secondary" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </div>
                        :
                        <div>
                          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                            {analysePatient}
                          </ReactMarkdown>
                        </div>
                      }
                    </div>
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

export default Page;

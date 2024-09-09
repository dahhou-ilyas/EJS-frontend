"use client";
//page dediee a la creation d'une nouvelle consultion (pour afficher ou modifier une consultation aller a /historique/id)

//LIBRARIES
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import bootstrapBundleMin from "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// ASSETS
import "@/assets/css/ppn/consultation.css";
//These might be necessarry for style if so, use them via : https://github.com/Usmaexe/PPN/tree/main/src/assets/css
// import "@/assets/css/links.css";
// import "@/assets/css/consultation.css";


import {
  motifs,
  antecedants,
  medicaments,
  habitudes,
  alcoolFrequency,
  tabacQuantity,
  tempsEcran,
  biologicalTests,
  radiologicalTests,
  antFamilial
} from "@/assets/json/dumpdata_ppn";

//IMAGES
import { printer } from "@/components/imagepath";

// COMPONENTS
import Header from "@/components/espaceMedecin/Header";
//import Sidebar from "@/components/espaceMedecin/Sidebar1";
import NavigationHeader from "@/components/ppn/NavigationHeader";//USED TO NAVIGATE BETWEEN INTERN PAGES OF MEDICAL FOLDER
import SelectInput from "@/components/ppn/SelectInput";
import TextAreaInput from "@/components/ppn/TextAreaInput";
import TextInput from "@/components/ppn/TextInput";
import { SPRINGBOOT_API_URL } from "@/config";


const Consultation = ({params}) => {
  const id = params.id

  const pages = ["patients", id, "consultation"];
  const defaultOption = [{ value: "0", label: "Choisir.." }];
  const router = useRouter();
  let pathName = usePathname();
  pathName = pathName.toLowerCase();
  
  let actionName = "";
  let buttonName = "Enregistrer";
  
  const [decodedAccessToken,setDecodedAccessToken] = useState("");
  const [patient, setPatient] = useState(null); // Initialisé à null
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(null); // Gestion des erreurs

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        setLoading(true); // Début du chargement
        try {
          const accessToken = localStorage.getItem('access-token');
          if (!accessToken) {
            throw new Error('No access token found');
          }
          // const decodedAccessToken = jwtDecode(accessToken);
          setDecodedAccessToken(jwtDecode(accessToken))
           // Ensure the token is decoded correctly
          // console.log('Decoded token:', decodedAccessToken);
          
          axios.get(SPRINGBOOT_API_URL+"/jeunes/"+id, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
              // .then(response => response.json()) pas besoin de conversion json pour axios ;)
              .then(response => {setPatient(response.data);console.log(response.data)})
              .catch(error => console.error('Error fetching patient:', error));
          
        } catch (error) {
          console.error('Error fetching patient:', error);
          setError(error.message); // Enregistrement de l'erreur
        } finally {
          setLoading(false); // Fin du chargement
        }
      }
    };

    fetchPatient(); // Appeler la fonction async
  }, [id]);


  // -------STATES-------
  const [selectedOption, setSelectedOption] = useState("Choisir");//VERY IMPORTANT ALLOW US TO TRACK AND HANDLE CHANGES ON SELECT INPUT
  const [habitudesChoice, setHabitudesChoice] = useState(habitudes);
  const [choiceChirHab, setChoiceChirHab] = useState("");
  const [chirTitle, setChirTitle] = useState("");
  const [antPersonnelTitle, setAntPersonnel] = useState("");
  const [antPersonnelOptions, setAntPersonnelOptions] = useState(defaultOption);
  const [examenCliniqueBio, setExamenCliniqueBio] = useState("");
  const [examenCliniqueRad, setExamenCliniqueRad] = useState("");
  const [otherTitleFam, setOtherTitleFam] = useState("Autre.."); //Pour le champ qui s'affiche lors de choix : autre
  const [otherTitlePer, setOtherTitlePer] = useState("Autre.."); //Pour le champ qui s'affiche lors de choix : autre
  const [isPersonnelsChecked, setIsPersonnelsChecked] = useState(false);
  const [isFamilialsChecked, setIsFamilialsChecked] = useState(false);
  const [isRadiologie, setIsRadiologie] = useState(false);
  const [isBiologie, setIsBiologie] = useState(false);
  const [motif, setMotif] = useState({ value: '', label: '' });
  
  // Ant pers
  const [type,setType] = useState("");
  const [specification, setSpecification] = useState("");
  const [specificationAutre, setSpecificationAutre] = useState("");
  const [nombreAnnee, setNombreAnnee] = useState("");
  // ant fam
  const [typeAntFam, setTypeAntFam] = useState("");
  const [autre, setAutre] = useState("");
  const [interrogatoire, setInterrogatoire] = useState("");
  const [conseils, setConseils] = useState("");
  // examen medical
  const [examenMedicals, setExamenMedicals] = useState([
    { typeExamen: "biologique", specificationExamen: "", autreSpecification: "" },
    { typeExamen: "radiologique", specificationExamen: "", autreSpecification: "" }
  ]);

  

  // -------FUNCTIONS-------
  //PERMET D'AFFCIHER TYPE D'ANTECEDANTS PERSONNELS
  function DisplayPersonnels(action) {
    const type = document.querySelector("div[id='type-ant']");
    const selectInput = document.querySelector("div[id='type-ant-selected']");
    const autreInput = document.querySelector("div[id='type-autre-input-pers']");
    const autreInput2 = document.querySelector("div[id='type-autre-input-fam']");
    const habitudesChoicesInput = document.querySelector("div[id='type-habitude']");
    const habitudesInput = document.querySelector("div[id='type-ant-habitudes']");
    const radioBox = document.querySelector("div[id='type-chir-radio']");
    radioBox.classList.add("hideInput");
    autreInput.classList.add("hideInput");
    autreInput2.classList.add("hideInput");
    habitudesChoicesInput.classList.add("hideInput");
    habitudesInput.classList.add("hideInput");
    selectInput.classList.add("hideInput");

    if (action) {
      type.classList.remove("hideInput");
    } 
    else {
      type.classList.add("hideInput");
    }
  }
  
  //PERMET D'AFFCIHER TYPE D'ANTECEDANTS Familials
  function DisplayFamilials(action) {
    const famInput = document.querySelector("div[id='type-fam']");
    const autreInput = document.querySelector("div[id='type-autre-input-fam']");

    autreInput.classList.add("hideInput");

    if (action) {
      famInput.classList.remove("hideInput");
    }
    else{
      famInput.classList.add("hideInput");
    }
  }


  //PERMET D'AFFICHER UNE LISTE DEROULANTE OU UN CHAMP TEXTE
  function DisplayTypeAntPer(selectedOption) {
    setAntPersonnel(selectedOption["value"]);
    
    const types = ["Medical", "Habitudes"];
    const allergies = ["Allergies Médicales", "Allergies Alimentaires"];


    const allergiesInput = document.querySelector("div[id = 'type-ant-allergies']");
    const medicalInput = document.querySelector("div[id='type-ant-selected']");
    const habitudesInput = document.querySelector("div[id='type-ant-habitudes']");
    const autreInput = document.querySelector("div[id='type-autre-input-pers']");

    autreInput.classList.add('hideInput');
    habitudesInput.classList.add('hideInput');

    console.log(selectedOption["value"]);
    //LE CAS OU l'OPTION SELECTIONNE EST MEDICAL OU HABITUDES
    if (types.includes(selectedOption["value"])) {
      if (selectedOption["value"]=="Medical") {
        medicalInput.classList.remove("hideInput");
        habitudesInput.classList.add("hideInput");
      }
      else {
        habitudesInput.classList.remove("hideInput");
        medicalInput.classList.add("hideInput");
      }
      
      if (!allergiesInput.classList.contains("hideInput"))
        allergiesInput.classList.add("hideInput");
    } 
    
    //LE CAS OU l'OPTION SELECTIONNE EST ALLERGIES
    else if (allergies.includes(selectedOption["value"])) {
      if (allergiesInput) {
        allergiesInput.classList.remove("hideInput");
      }
      if (!medicalInput.classList.contains("hideInput")) {
        medicalInput.classList.add("hideInput");
      }
    } 
    else {
      allergiesInput.classList.add("hideInput");
      medicalInput.classList.add("hideInput");
    }
  }

  function chirurgicalHandle(action) {
    const radioBox = document.querySelector("div[id='type-chir-radio']");

    if (action) {
      radioBox.classList.remove("hideInput");
      setChirTitle("Avez-vous effectué une opération ?");
    } 
    else {
      radioBox.classList.add("hideInput");
    }
  }

  // RESPONSABLE SUR LE CONTROLE DES ELEMENTS(LISTE OU CHAMPS DE TEXTES) AFFICHER SELON LE CHOIX D'UTILISATEUR
  function HandleAntPersonnel(selectedOption) {
    DisplayTypeAntPer(selectedOption);

    chirurgicalHandle(false);

    if (selectedOption["value"] == "Medical") {
      setAntPersonnel("Medical");
      setAntPersonnelOptions(medicaments);
    }
    else if (selectedOption["value"] == "Habitudes") {
      setAntPersonnel("Habitudes");
      setAntPersonnelOptions(habitudes);
    } 
    else if (selectedOption["value"] == "Chirurgical") {
      chirurgicalHandle(true);
      return;
    }
  }

  function handleChir(isYes){
    const autreInput = document.querySelector("div[id='type-autre-input-pers']");
    setOtherTitlePer("Specifier");
    if(isYes){
      autreInput.classList.remove("hideInput");
    }
    else{
      autreInput.classList.add("hideInput");
    }
  }

  function HandleMedical(selectedOption){
    setSpecification(selectedOption.value);
    const autreInput = document.querySelector('div[id="type-autre-input-pers"]');
    autreInput.classList.remove('hideInput');
    if(selectedOption["value"]=="AUTRE"){
      setOtherTitlePer("Specifier Autre");
    }
    else{
      setOtherTitlePer(selectedOption['value']);
    }
  }

  //GERER LE CAS OU LE CHOIX D'ANT PERS ET HABITUDES
  function HandleHabitudesType(selectedOption) {
    setSpecification(selectedOption.value)
    const otherInput = document.querySelector("div[id='type-autre-input-pers']");
    const habitudesChoices = ["Alcool", "Tabac", "Temps d'écran"];
    const habitudesChoicesInput = document.querySelector("div[id='type-habitude']");
    
    if (habitudesChoices.includes(selectedOption["value"])) {
      habitudesChoicesInput.classList.remove("hideInput");
      otherInput.classList.add("hideInput");
      if (selectedOption["value"] == "Alcool") {
        setHabitudesChoice(alcoolFrequency);
        setChoiceChirHab("Alcool");
      } 
      else if (selectedOption["value"] == "Tabac") {
        otherInput.classList.remove("hideInput");
        setOtherTitlePer("Préciser la durée d'utilisation");
        setHabitudesChoice(tabacQuantity);
        setChoiceChirHab("Tabac");
      } 
      else {
        setHabitudesChoice(tempsEcran);
        setChoiceChirHab("Temps d'ecran");
      }
    } 

    else if(selectedOption["value"]=="Sport"){
      setOtherTitlePer("Specifier sport");
      otherInput.classList.remove("hideInput");
      habitudesChoicesInput.classList.add("hideInput");
    }

    else if (selectedOption["value"] == "AUTRE") {
      setOtherTitlePer("Specifier Autre");
      otherInput.classList.remove("hideInput");
      habitudesChoicesInput.classList.add("hideInput");
    }
  }


  function HandleAntFamilial(selectedOption) {
    setTypeAntFam(selectedOption.value)
    const otherInput = document.querySelector('div[id="type-autre-input-fam"]');
    setOtherTitleFam("Specifier Autre Antecedants Familiaux");
    if (selectedOption["value"] == "AUTRE") {
      otherInput.classList.remove("hideInput");
    } else {
      otherInput.classList.add("hideInput");
    }
  }

  // POUR AFFICHER LA LISTE DES EXAMEN SELON LE CHOIX BIOLOGIQUE OU RADIOLOGIQUE
  function DisplayExamenBio(isBio) {
    const bio = document.querySelector("div[id='examen-bio']");
    const inputOfExamen = document.querySelector("div[id='examen-autre-bio']");
    if (inputOfExamen) {
      inputOfExamen.classList.add("hideInput");
    }
    if (isBio) {
      bio.classList.remove("hideInput");
    } 
    else {
      bio.classList.add("hideInput");
    }
  }
  // POUR AFFICHER LA LISTE DES EXAMEN SELON LE CHOIX BIOLOGIQUE OU RADIOLOGIQUE
  function DisplayExamenRad(isRad) {
    const rad = document.querySelector("div[id='examen-rad']");
    const inputOfExamen = document.querySelector("div[id='examen-autre-rad']");
    if (inputOfExamen) {
      inputOfExamen.classList.add("hideInput");
    }
    if (isRad) {
      rad.classList.remove("hideInput");
    } 
    else {
      rad.classList.add("hideInput");
    }
  }

  //POUR AFFICHER LE CHAMP DE TEXTE
  function handleExamenChangeBio(selectedOption) {
    handleExamenMedicalChange(0, "specificationExamen", selectedOption.value);
    const inputOfExamen = document.querySelector("div[id='examen-autre-bio']");
    if (inputOfExamen) {
      inputOfExamen.classList.remove("hideInput");
    } else {
      console.log("Element introuvable");
    }
    if (selectedOption["value"] == "0") {
      inputOfExamen.classList.add("hideInput");
    } else if (selectedOption["value"] == "AUTRE") {
      setExamenCliniqueBio("Specifier autre -Biologique-");
    } else {
      setExamenCliniqueBio(selectedOption["value"]);
    }
  }
  //POUR AFFICHER LE CHAMP DE TEXTE
  function handleExamenChangeRad(selectedOption) {
    handleExamenMedicalChange(1, "specificationExamen", selectedOption.value);
    const inputOfExamen = document.querySelector("div[id='examen-autre-rad']");
    if (inputOfExamen) {
      inputOfExamen.classList.remove("hideInput");
    } else {
      console.log("Element introuvable");
    }
    if (selectedOption["value"] == "0") {
      inputOfExamen.classList.add("hideInput");
    } else if (selectedOption["value"] == "AUTRE") {
      setExamenCliniqueRad("Specifier autre -Radiologie-");
    } else {
      setExamenCliniqueRad(selectedOption["value"]);
    }
  }

  function hideAlert(){
    const alertMessage = document.querySelector("div[id='alert-message']");
    alertMessage.classList.add('hideInput');
  }

  function settingOtherSpecification(selectedOption){
    setSpecificationAutre(selectedOption.value)
  }

  function settingMotif(selectedOption){
    setMotif(selectedOption.value)
  }

  function settingType(selectedOption){
    setType(selectedOption.value)
  }

  function handleCancel() {
    router.push("/patients/"+id);
  }


  const handleExamenMedicalChange = (index, key, value) => {
    const updatedExamenMedicals = examenMedicals.map((examen, i) =>
      i === index ? { ...examen, [key]: value } : examen
    );
    setExamenMedicals(updatedExamenMedicals);
  };
  
 



  // -------DATA-------
  if (loading) {
    // CECI EST TEMPORAAIRE POUR AFFICHER LE FRONT END

    return (
      <div id="root">
        <Header/>
        <div className="page-wrapper">
          <div className="content">
            Data Not available at this moment
          </div>
        </div>
      </div>
    ); // Afficher un message ou un spinner de chargement
  }

  if (error) {
    return <div>Error: {error}</div>; // Afficher un message d'erreur
  }

  if (!patient) {
    return <div>No patient data available</div>; // Afficher un message si les données ne sont pas disponibles
  }

  const currentDate = new Date(); // Crée un nouvel objet Date avec la date et l'heure actuelles
  const year = currentDate.getFullYear(); // Récupère l'année
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Récupère le mois (ajoute 1 car les mois commencent à 0)
  const day = String(currentDate.getDate()).padStart(2, '0'); // Récupère le jour du mois

  const date = `${year}-${month}-${day}`;

  const handleSubmit = async (e) => {
    const submitButton = document.querySelector("button[id='submit-button']");
    e.preventDefault()
    const medecinId = decodedAccessToken.claims.id;
    const antecedentPersonnel = { type, specification, specificationAutre,nombreAnnee };
    const antecedentFamilial = {typeAntFam, autre};

    // WHEN THE USER FORGET TO ENTER THE INFORMATION ON A REQUIRED INPUT AN ALERT IS TRIGGERED
    if(
      (motif=={ value: '', label: '' })||
      (antecedentPersonnel.type==""&&antecedentFamilial.typeAntFam=="")||
      (interrogatoire=="")||
      (examenMedicals[0].specificationExamen==""&&examenMedicals[1].specificationExamen=="")||
      (conseils)==""
    ){
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const alertMessage = document.querySelector("div[id='alert-message']");
      alertMessage.classList.remove('hideInput');
      return;
    }

    const consultation = {
      date, motif, antecedentPersonnel,antecedentFamilial,interrogatoire, examenMedicals,conseils,medecinId
    }

    // HERE WHERE THE DATA IS BEEN SENT TO THE END POINT : /jeunes/[id]/consultations
    try {
      const res = await axios.post(`${SPRINGBOOT_API_URL}/jeunes/${id}/consultations`, consultation);
    
      // IF THE RESPONSE IS OK THEN THE DOCTOR IS REDIRECTED TO PATIENTS PAGE
      if (res.status === 200) {
        // Using Bootstrap's Modal API to show the modal
        const successModal = new bootstrapBundleMin.Modal(document.getElementById('success-alert-modal'));
        successModal.show();
    
        //Redirect after some delay
        setTimeout(() => {
          router.push(`/patients/${id}`);
        }, 5000);
      } 
    } catch (error) {
      // Handle the error and redirect to 404 page
      router.push('/404');
    }
  }


  return (
    <div className="content">
      
      {/* ___________THIS MODAL IS TRIGGRED WHEN "CONSULTATION" IS SAVED SUCCESSFULLY */}
      <div id="success-alert-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content modal-filled bg-success">
                <div class="modal-body p-4">
                    <div class="text-center">
                        <i class="dripicons-checkmark h1 text-white"></i>
                        <h3 class="mt-2 text-white">Consultation Enregistree avec succes!</h3>
                        {/* <p class="mt-3 text-white">Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p> */}
                        <button type="button" class="btn btn-light my-2" data-bs-dismiss="modal">Continue</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
      <NavigationHeader pages={pages} currentPage="Nouvelle Consultation" />
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <div id='alert-message' className="alert alert-danger alert-dismissible fade show hideInput" role="alert">
                {/* <strong>Error!</strong> A <Link href="#" className="alert-link">problem</Link> has been occurred while submitting your data. */}
                <strong>Erreur!</strong> Merci de remplir tous les champs marqués d&apos;un (*).
                <button type="button" className="btn-close" onClick={hideAlert} aria-label="Close">
                  <span aria-hidden="true"> </span>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 mb-4">
                    <div className="form-heading mb-7">
                      <h3>{actionName} une consultation pour {patient.nom} {patient.prenom}</h3>
                    </div>
                  </div>

                  <div className="form-heading">
                    <h4>1. Informations Géneral</h4>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>
                        NIP<span className="login-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={patient.identifiantPatient}
                        readOnly="readonly"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>
                        Sexe <span className="login-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={patient.sexe}
                        readOnly="readonly"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="form-group local-forms">
                      <label>
                        Age <span className="login-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder=""
                        readOnly="readonly"
                        value={patient.age}
                      />
                    </div>
                  </div>

                  <div className="form-heading">
                    <h4>2. Motif de Consultation</h4>
                  </div>
                  <SelectInput 
                    columnSize = {[12,12,12]}
                    label = ""
                    default = {defaultOption}
                    options = {motifs}
                    id = "motif"
                    hide = {false}
                    functions = {[setSelectedOption,settingMotif]}   
                  />
                  {console.log(motif)}
                  
                  

                  <div className="form-heading">
                    <h4>3. Antécédents</h4>
                  </div>
                  <div className="col-12 col-md-12 col-xl-12 mb-4">
                    <div className="form-group select-gender">
                      <label className="gen-label">
                        Antécédents{"  "}
                        <span className="login-danger">*</span>
                      </label>
                      <div className="form-check-inline">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            name="Antecedants-P"
                            className="form-check-input"
                            checked={isPersonnelsChecked}
                            onChange={() => {
                              DisplayPersonnels(!isPersonnelsChecked);
                              setIsPersonnelsChecked(!isPersonnelsChecked);
                            }}
                          />
                          Personnels
                        </label>
                      </div>
                      <div className="form-check-inline">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            name="Antecedants-F"
                            className="form-check-input"
                            checked={isFamilialsChecked}
                            onChange={() => {
                              DisplayFamilials(!isFamilialsChecked);
                              setIsFamilialsChecked(!isFamilialsChecked);
                            }}
                          />
                          Familiaux
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* SELECT OF ANTECEDANTS PERSONNELS */}
                  <SelectInput 
                    columnSize = {[12,6,4]}
                    label = "ant-p"
                    idDiv = "type-ant"
                    id = "ant-personnel"
                    default = {defaultOption}
                    options = {antecedants}
                    hide = {true}
                    functions = {[HandleAntPersonnel, settingType]}   
                  />




                  {/* RADIO BOX */}
                  <div className="col-4 col-md-4 col-xl-4 mb-4 hideInput"
                    id = "type-chir-radio"
                  >
                    <div className="form-group select-gender">
                      <label className="gen-label">
                        {chirTitle}{"  "}
                        <span className="login-danger">*</span>
                      </label>
                      <div className="form-check-inline">
                        <label className="form-check-label">
                          <input
                            type="radio"
                            name="Chirirugical"
                            className="form-check-input"
                            onChange={() => {
                              handleChir(true);
                              setSpecification("oui");
                              console.log(specification)
                            }}
                          />
                          Oui
                        </label>
                      </div>
                      <div className="form-check-inline">
                        <label className="form-check-label">
                          <input
                            type="radio"
                            name="Chirirugical"
                            className="form-check-input"l
                            // checked={isFamilialsChecked}
                            onChange={() => {
                              handleChir(false)
                              setSpecification("non");
                              console.log(specification)
                            }}
                          />
                          Non
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* SELECT OF MEDICALS*/}
                  <SelectInput 
                    columnSize = {[12,6,4]}
                    label = {antPersonnelTitle}
                    idDiv = "type-ant-selected"
                    id = "type-ant-personnel"
                    default = {defaultOption}
                    options = {antPersonnelOptions}
                    hide = {true}
                    functions = {[HandleMedical]}   
                  />
                  
                  {/* SELECT OF HABITUDES*/}
                  <SelectInput 
                    columnSize = {[12,6,4]}
                    label = {antPersonnelTitle}
                    idDiv = "type-ant-habitudes"
                    id = "select-habitudes"
                    default = {defaultOption}
                    options = {antPersonnelOptions}
                    hide = {true}
                    functions = {[HandleHabitudesType]}   
                  />

                  {/* SELECT OF TABAC,ALCOL OR TEMPS ECRAN */}
                  <SelectInput 
                    columnSize = {[12,6,4]}
                    label = {choiceChirHab}
                    idDiv = "type-habitude"
                    id = "select-type-habitude"
                    default = {defaultOption}
                    options = {habitudesChoice}
                    hide = {true} 
                    functions = {[settingOtherSpecification]}
                  />
                  
                  
                  {/* SPECIFY TEXT INPUT FOR ANT ALLERGIES */}
                  <TextInput
                    columnSize = {[12,6,4]}
                    label = {antPersonnelTitle}
                    hide = {true}
                    idDiv = "type-ant-allergies"
                    placeholder="Saisir.."
                    onChange = {(event) => {
                      setSpecification(event.target.value)
                      console.log(specification)
                    }}
                  />      

                  {/* SPECIFY TEXT INPUT FOR AUTRE */}
                  <TextInput
                    columnSize = {[12,6,4]}
                    label = {otherTitlePer}
                    hide = {true}
                    idDiv = "type-autre-input-pers"
                    placeholder="Saisir.."
                    onChange = {(event) => {
                      setSpecificationAutre(event.target.value)
                    }}
                  /> 

                  {/* SELECT INPUT OF ANT FAMILIALS */}
                  <SelectInput 
                    columnSize = {[12,6,6]}
                    label = "ant-f"
                    idDiv = "type-fam"
                    id = "select-ant-fam"
                    default = {defaultOption}
                    options = {antFamilial}
                    hide = {true}
                    functions = {[HandleAntFamilial]}   
                  />

                  
                  {/* SPECIFY OTHER TEXT INPUT FOR ANT FAM*/}
                  <TextInput
                    columnSize = {[12,6,4]}
                    label = {otherTitleFam}
                    hide = {true}
                    idDiv = "type-autre-input-fam"
                    placeholder="Saisir.."
                    onChange = {(event) => {
                      setAutre(event.target.value);
                      console.log(autre);
                    }}
                  />

                  <div className="form-heading">
                    <h4>4. Interrogatoire</h4>
                  </div>
                  
                  <TextAreaInput 
                    columnSize={[12,12,12]}
                    idDiv = "Inter"
                    rows={3}
                    cols={30}
                    placeholder={"Veuillez décrire brièvement l'histoire de la maladie .."}
                    onChange = {(event) => {
                      setInterrogatoire(event.target.value);
                    }}
                  />

                  <div className="form-heading">
                    <h4>5. Examen Clinique Biologique et Radiologique</h4>
                  </div>
                  <div className="col-12 col-md-4 col-xl-4 mb-4">
                    <div className="form-group select-gender">
                      <label className="gen-label">
                        Examen Médicaux {"  "}
                        <span className="login-danger">*</span>
                      </label>
                      <div className="form-check-inline">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            name="radiologie"
                            className="form-check-input"
                            onChange={() => {
                              DisplayExamenBio(!isBiologie);
                              setIsBiologie(!isBiologie);
                            }}
                          />
                          Biologique
                        </label>
                      </div>
                      <div className="form-check-inline">
                        <label className="form-check-label">
                          <input
                            type="checkbox"
                            name="radiologie"
                            className="form-check-input"
                            onChange={() => {
                              DisplayExamenRad(!isRadiologie);
                              setIsRadiologie(!isRadiologie);
                            }}
                          />
                          Radiologique
                        </label>
                      </div>
                    </div>
                  </div>

                  <SelectInput 
                    columnSize = {[12,4,4]}
                    label = "Examen Biologique"
                    default = {defaultOption}
                    options = {biologicalTests}
                    idDiv = "examen-bio"
                    id = "select-examen-bio"
                    hide = {true}
                    functions = {[setSelectedOption,handleExamenChangeBio]}   
                  />

                  <SelectInput 
                    columnSize = {[12,4,4]}
                    label = "Examen Radiologique"
                    default = {defaultOption}
                    options = {radiologicalTests}
                    idDiv = "examen-rad"
                    id = "select-examen-rad"
                    hide = {true}
                    functions = {[setSelectedOption,handleExamenChangeRad]}   
                  />

                  {/* SPECIFY TEXT INPUT FOR ANY BIO EXAMEN */}
                  <TextInput
                    columnSize = {[12,4,4]}
                    label = {examenCliniqueBio}
                    hide = {true}
                    idDiv = "examen-autre-bio"
                    placeholder="Saisir.."
                    onChange = {(e) => {
                      handleExamenMedicalChange(0, "autreSpecification", e.target.value);
                    }}
                  />     

                  {/* SPECIFY TEXT INPUT FOR ANY RAD EXAMEN */}
                  <TextInput
                    columnSize = {[12,4,4]}
                    label = {examenCliniqueRad}
                    hide = {true}
                    idDiv = "examen-autre-rad"
                    placeholder="Saisir.."
                    onChange = {(e) => {
                      handleExamenMedicalChange(1, "autreSpecification", e.target.value);
                    }}
                  />        

                  <div className="form-heading">
                    <h4>6. Conseils et recommandations </h4>
                  </div>
                  <TextAreaInput 
                    columnSize={[12,12,12]}
                    idDiv = "conseils"
                    rows={4}
                    cols={30}
                    placeholder={
                      "Veuillez entrer vos conseils et recommandations .."
                    }
                    onChange = {(event) => {
                      setConseils(event.target.value);
                    }}
                  />

                  <div className="col-12">
                    <div className="doctor-submit text-end">
                      <button
                        id = "submit-button"
                        type = "submit"
                        className="btn me-1 customizedBtn save"
                        // data-bs-toggle="modal" data-bs-target="#success-alert-modal"
                      >Enregistrer
                        {/* <Link
                          className="dropdown-item"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#delete_patient"
                        >
                          {buttonName}
                        </Link> */}
                        
                      </button>
                      <button
                        type="button"
                        className="btn me-1 customizedBtn cancel"
                        onClick={handleCancel}
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  id="delete_patient"
                  className="modal fade delete-modal"
                  role="dialog"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-body text-center">
                        <Image
                          src={printer}
                          alt="#"
                          width={50}
                          height={46}
                        />
                        <h3>Voulez-vous Imprimer La consultation?</h3>
                        <div className="m-t-20">
                          {" "}
                          <Link
                            href="#"
                            className="btn btn-white me-2 plus-tard"
                            data-bs-dismiss="modal"
                          >
                            plus tard
                          </Link>
                          <button
                            type="submit"
                            className="btn btn-success imprimer"
                          >
                            Imprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Consultation;
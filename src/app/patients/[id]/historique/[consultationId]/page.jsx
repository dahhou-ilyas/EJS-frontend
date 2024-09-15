/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import "@/assets/css/ppn/links.css";
import "@/assets/css/ppn/consultation.css";
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

import { printer } from "@/components/imagepath";
import SelectInput from "@/components/ppn/SelectInput";
import Header from "@/components/espaceMedecin/Header";
import NavigationHeader from "@/components/ppn/NavigationHeader";
import TextAreaInput from "@/components/ppn/TextAreaInput";
import TextInput from "@/components/ppn/TextInput";
import { SPRINGBOOT_API_URL } from "@/config";
import axios from 'axios';


const modifierConsultation = ({params}) => {
  const id = params.id
  const consultationId = params.consultationId;
  const pages = ["patients", id, "historique", consultationId];
  const defaultOption = [{ value: "0", label: "Choisir.." }];
  const router = useRouter();
  let pathName = usePathname();
  pathName = pathName.toLowerCase();
  
  const [consultation, setConsultation] = useState({});
  const [patient, setPatient] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  // form states
  const [motifM, setMotifM] = useState("");
  
  // Ant pers
  const [typeM,setTypeM] = useState("");
  const [specificationM, setSpecificationM] = useState("");
  const [specificationAutreM, setSpecificationAutreM] = useState("");
  const [nombreAnneeM, setNombreAnneeM] = useState("");
  // ant fam
  const [typeAntFamM, setTypeAntFamM] = useState("");
  const [autreM, setAutreM] = useState("");

  const [interrogatoireM, setInterrogatoireM] = useState("");
  
  const [conseilsM, setConseilsM] = useState("");

  // examen medical
  const [examenMedicalsM, setExamenMedicalsM] = useState("");
  
  const [decodedAccessToken, setDecodedAccessToken] = useState("");

  useEffect(() => {
    const fetchConsultation = async () => {
      const accessToken = localStorage.getItem('access-token');
      if (consultationId) {
        setLoading(true);
        try {
          const response = await axios.get(`${SPRINGBOOT_API_URL}/jeune/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          console.log("this is the response",response)
          setPatient(response.data)

          const list = response.data.dossierMedial?.historiqueConsultations;
          console.log("this is the list ", list);

          const data = list.find(
            (cons) => cons.id == consultationId 
          );

          setConsultation(data);

          // Use `data` directly here
          setMotifM(data.motif);
          setTypeM(data.antecedentPersonnel?.type);
          setSpecificationM(data.antecedentPersonnel?.specification);
          setSpecificationAutreM(data.antecedentPersonnel?.specificationAutre);
          setNombreAnneeM(data.antecedentPersonnel?.nombreAnnee);
          setExamenMedicalsM(data.examenMedicals);
          setTypeAntFamM(data.antecedentFamilial?.typeAntFam);
          setAutreM(data.antecedentFamilial?.autre);
          setInterrogatoireM(data.interrogatoire);
          setConseilsM(data.conseils);

        } catch (error) {
          console.error('Error fetching consultation:', error);
          setError(error.message);
        } finally {
          setLoading(false);
          console.log("loading done");
        }
      }
    };

    fetchConsultation();
  }, [consultationId, id]);
 
  useEffect(() => {
    if (loading) return;
    if (typeAntFamM !== "") {
      setIsFamilialsChecked(true);
      DisplayFamilials(true); // Display familials if checked
      console.log("apres display familial")
      console.log({value: typeAntFamM , label: typeAntFamM})
      HandleAntFamilial({value: typeAntFamM , label: typeAntFamM})
    }
  }, [typeAntFamM]);

  useEffect(() => {
    if (loading) return;
    if (consultation.antecedentPersonnel?.type !== "") {
      setIsPersonnelsChecked(true);
      
      HandleAntPersonnel({value: consultation.antecedentPersonnel?.type , label: consultation.antecedentPersonnel?.type})
      console.log(`consultation.antecedentPersonnel?.type est ${consultation.antecedentPersonnel?.type}`)
      if(consultation.antecedentPersonnel?.type == "Medical"){
        HandleMedical({value: consultation.antecedentPersonnel?.specification , label: consultation.antecedentPersonnel?.specification})
      }
      if(consultation.antecedentPersonnel?.type == "Habitudes"){
        HandleHabitudesType({value: consultation.antecedentPersonnel?.specification , label: consultation.antecedentPersonnel?.specification})
      }
      if(consultation.antecedentPersonnel?.type == "Chirurgical"){
        if(consultation.antecedentPersonnel?.specification == "oui"){
          handleChir(true)
        }
        else{
          handleChir(false)
        }
      }
    }
  }, [consultation.antecedentPersonnel]);

  useEffect(() => {
    if (loading) return;
    if (consultation.examenMedicals && consultation.examenMedicals.length > 0 && consultation.examenMedicals[0].specificationExamen !== "") {
      setIsBiologie(true);
      DisplayExamenBio(true);
      handleExamenChangeBio({value:consultation.examenMedicals[0].specificationExamen, label:consultation.examenMedicals[0].specificationExamen})
    }
    if (consultation.examenMedicals && consultation.examenMedicals.length > 0 && consultation.examenMedicals[1].specificationExamen !== "") {
      setIsRadiologie(true);
      DisplayExamenRad(true);
      handleExamenChangeRad({value:consultation.examenMedicals[1].specificationExamen, label:consultation.examenMedicals[1].specificationExamen})
    }
    
  }, [consultation.examenMedicals]);
  

  


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
    
    
    const checkBox = document.querySelector("input[name='Antecedants-F']");
    
    console.log(checkBox.ariaChecked);
    console.log("displayfamilial is triggered")
    console.log(action)
    
    const famInput = document.querySelector("div[id='type-fam']");

    console.log(famInput.classList)

    const autreInput = document.querySelector("div[id='type-autre-input-fam']");

    autreInput.classList.add("hideInput");

    if (action || autreInput != "") {
      famInput.classList.remove("hideInput");
      console.log('its always me');
    }
    else{
      famInput.classList.add("hideInput");
      console.log('hhh');
      
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
      if (selectedOption["value"]=="Medical" || selectedOption["value"]=="medical" ) {
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

    if (selectedOption["value"] == "Medical" || selectedOption["value"] == "medical" ) {
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
    setSpecificationM(selectedOption.value);
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
    setSpecificationM(selectedOption.value)
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
    console.log(selectedOption)
    setTypeAntFamM(selectedOption.value)
    const otherInput = document.querySelector('div[id="type-autre-input-fam"]');
    setOtherTitleFam("Specifier Autre Antecedants Familiaux");
    if (selectedOption["value"] == "AUTRE") {
      console.log("on a autre")
      otherInput.classList.remove("hideInput");
    } else {
      console.log("on n'a pas autre")
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
    setSpecificationAutreM(selectedOption.value)
  }

  function settingMotif(selectedOption){
    setMotifM(selectedOption.value)
    console.log(motifM)
  }

  function settingType(selectedOption){
    setTypeM(selectedOption.value)
  }

  function handleCancel() {
    router.push("/Patients/Patient");
  }

  

  const handleExamenMedicalChange = (index, key, value) => {
    const updatedExamenMedicals = examenMedicalsM.map((examen, i) =>
      i === index ? { ...examen, [key]: value } : examen
    );
    setExamenMedicalsM(updatedExamenMedicals);
  };
  
 



  // -------DATA-------
  if (loading) {
    // return <div>Loading...</div>; // Afficher un message ou un spinner de chargement
    
    return(<div id="root">
      <Header/>
      <div className="page-wrapper">
        <div className="content">
          Data Not available at this moment
        </div>
      </div>
    </div>);
  }

  const currentDate = new Date(); // Crée un nouvel objet Date avec la date et l'heure actuelles
  const year = currentDate.getFullYear(); // Récupère l'année
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Récupère le mois (ajoute 1 car les mois commencent à 0)
  const day = String(currentDate.getDate()).padStart(2, '0'); // Récupère le jour du mois

  const date = `${year}-${month}-${day}`;

  const handleSubmit = async (e) => {
    const submitButton = document.querySelector("button[id='submit-button']");
    e.preventDefault()
    
    const antecedentPersonnel = { 
      type: typeM, 
      specification:specificationM, 
      specificationAutre:specificationAutreM,
      nombreAnnee:nombreAnneeM 
    };
    const antecedentFamilial = {
      typeAntFam:typeAntFamM, 
      autre:autreM};

    // WHEN THE USER FORGET TO ENTER THE INFORMATION ON A REQUIRED INPUT AN ALERT IS TRIGGERED
    if(
      (motifM=={ value: '', label: '' })||
      (antecedentPersonnel.typeM==""&&antecedentFamilial.typeAntFamM=="")||
      (interrogatoireM=="")||
      (examenMedicalsM[0].specificationExamen==""&&examenMedicalsM[1].specificationExamen=="")||
      (conseilsM)==""
    ){
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const alertMessage = document.querySelector("div[id='alert-message']");
      alertMessage.classList.remove('hideInput');
      return;
    }

    const consultationM = {
      date: date,
      motif: motifM,
      antecedentPersonnel: antecedentPersonnel,
      antecedentFamilial: antecedentFamilial,
      interrogatoire: interrogatoireM,
      examenMedicals: examenMedicalsM,
      conseils: conseilsM
  };

    // HERE WHERE THE DATA IS BEEN SENT TO THE END POINT : /consultations/[consultationId]
    const res = await axios.put(
      `${SPRINGBOOT_API_URL}/jeunes/${id}/consultations/${consultationId}`,
      consultationM, // This is the body (data being sent)
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    //IF THE RESPONSE IS OK THEN THE DOCTOR IS REDIRECTED TO PATIENTS PAGE 
    if (res.status === 200 ){;
      router.push(`/patients/${id}/historique`); 
    }
    else{
      //the error page
      router.push('/404')
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
                <strong>Erreur!</strong> Merci de remplir tous les champs marqués d&apos;un (*).
                <button type="button" className="btn-close" onClick={hideAlert} aria-label="Close">
                  <span aria-hidden="true"> </span>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 mb-4">
                    <div className="form-heading mb-7">
                      <h3>Modifier une consultation pour {patient.infoUser?.nom} {patient.infoUser?.prenom} </h3>
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
                    default = {{ value: motifM, label:motifM}}
                    options = {motifs}
                    id = "motif"
                    hide = {false}
                    
                    functions = {[setSelectedOption,settingMotif]}   
                  />
                  
                  
                  

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
                    default = {{value:typeM,label:typeM}}
                    options = {antecedants}
                    hide = {!isPersonnelsChecked}
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
                            checked={specificationM === "oui"}
                            onChange={() => {
                              handleChir(true);
                              setSpecificationM("oui");
                              console.log(specificationM)
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
                            checked={specificationM === "non"}
                            onChange={() => {
                              handleChir(false)
                              setSpecificationM("non");
                              console.log(specificationM)
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
                    default = {{value: specificationM,label:specificationM}}
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
                    default = {{value: specificationM,label:specificationM}}
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
                    default = {{value: specificationAutreM, label: specificationAutreM}}
                    options = {habitudesChoice}
                    hide = {true} 
                    functions = {[settingOtherSpecification]}
                  />
                  
                  
                  {/* SPECIFY TEXT INPUT FOR ANT ALLERGIES */}
                  <TextInput
                    columnSize = {[12,6,4]}
                    label = {antPersonnelTitle}
                    hide = {true}
                    default = {specificationM}
                    idDiv = "type-ant-allergies"
                    placeholder="Saisir.."
                    onChange = {(event) => {
                      setSpecificationM(event.target.value)
                      console.log(specificationM)
                    }}
                  />      

                  {/* SPECIFY TEXT INPUT FOR AUTRE */}
                  <TextInput
                    columnSize = {[12,6,4]}
                    label = {otherTitlePer}
                    hide = {true}
                    default= {specificationAutreM}
                    idDiv = "type-autre-input-pers"
                    placeholder="Saisir.."
                    onChange = {(event) => {
                      setSpecificationAutreM(event.target.value)
                    }}
                  /> 

                  {/* SELECT INPUT OF ANT FAMILIALS */}
                  <SelectInput 
                    columnSize = {[12,6,6]}
                    label = "ant-f"
                    idDiv = "type-fam"
                    id = "select-ant-fam"
                    default = {{ value:typeAntFamM , label:typeAntFamM}}
                    options = {antFamilial}
                    hide = {!isFamilialsChecked}
                    functions = {[HandleAntFamilial]}   
                  />

                  
                  {/* SPECIFY OTHER TEXT INPUT FOR ANT FAM*/}
                  <TextInput
                    columnSize = {[12,6,4]}
                    label = {otherTitleFam}
                    hide = {true}
                    idDiv = "type-autre-input-fam"
                    placeholder="Saisir.."
                    default={autreM}
                    onChange = {(event) => {
                      setAutreM(event.target.value);
                      console.log(autreM);
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
                    value={interrogatoireM}
                    placeholder="Veuillez décrire brièvement l'histoire de la maladie .."
                    onChange = {(event) => {
                      setInterrogatoireM(event.target.value);
                      console.log("interrogatoireM est :"+ interrogatoireM)
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
                            checked={isBiologie}
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
                            checked={isRadiologie}
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
                    default={examenMedicalsM[0] ? {value: examenMedicalsM[0].specificationExamen, label: examenMedicalsM[0].specificationExamen} : defaultOption}
                    options = {biologicalTests}
                    idDiv = "examen-bio"
                    id = "select-examen-bio"
                    hide = {!isBiologie}
                    functions = {[setSelectedOption,handleExamenChangeBio]}   
                  />
{/* testing */}
                  <SelectInput 
                    columnSize = {[12,4,4]}
                    label = "Examen Radiologique"
                    default={examenMedicalsM[1] ? {value: examenMedicalsM[1].specificationExamen, label: examenMedicalsM[1].specificationExamen} : defaultOption}
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
                    default = {examenMedicalsM[0] ? examenMedicalsM[0].autreSpecification : ""}
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
                    default = {examenMedicalsM[1] ? examenMedicalsM[1].autreSpecification : ""}
                    hide = {true}
                    idDiv = "examen-autre-rad"
                    placeholder="Saisir.."
                    onChange = {(e) => {
                      handleExamenMedicalChange(1, "autreSpecification", e.target.value);
                    }}
                  />        

                  <div className="form-heading">
                    <h4>6. Conseils et recommondations </h4>
                  </div>
                  <TextAreaInput 
                    columnSize={[12,12,12]}
                    idDiv = "conseils"
                    rows={4}
                    cols={30}
                    value={conseilsM}
                    placeholder={
                      "Veuillez entrer vos conseils et recommondations .."
                    }
                    onChange = {(event) => {
                      setConseilsM(event.target.value);
                    }}
                  />

                  <div className="col-12">
                    <div className="doctor-submit text-end">
                      <button
                        id = "submit-button"
                        type = "submit"
                        className="btn me-1 customizedBtn save"
                      >Modifier
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

export default modifierConsultation;
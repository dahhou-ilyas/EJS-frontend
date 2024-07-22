"use client";

//LIBRARIES
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Select from "react-select";
import Link from "next/link";
import Image from "next/image";

// ASSETS
import "@/assets/css/links.css";
import "@/assets/css/consultation.css";
import {
  motif,
  antecedants,
  medicaments,
  habitudes,
  Chirurgical,
  alcoolFrequency,
  tabacQuantity,
  tempsEcran,
  biologicalTests,
  radiologicalTests,
  antFamilial
} from "@/assets/dumpdata.js";

// COMPONENTS
import NavigationHeader from "@/components/NavigationHeader";
import { printer } from "@/components/imagepath";

const NouvelleConsultation = (props) => {
  const pages = ["Patients", "Patient", "Consultation"];
  const defaultOption = [{ value: "0", label: "Choisir.." }];
  const router = useRouter();
  let pathName = usePathname();
  pathName = pathName.toLowerCase();
  
  let actionName = "";
  let buttonName = "Enregistrer";

  useEffect(() => {
    console.log("Action:", pathName);
    if (!pathName.includes('ajouter') && !pathName.includes('modifier')) {
      router.push('/error'); // Redirect to error page if the action is invalid
    }
  }, [pathName, router]);
  if(pathName.includes("modifier")){
    actionName = buttonName = "Modifier";
  }
  else{
    actionName = "Ajouter";
  }

  // -------STATES-------
  const [ChirurgicalOrHabitudes, setChirurgicalOrHabitudes] = useState(Chirurgical);
  const [choiceChirHab, setChoiceChirHab] = useState("");
  const [antPersonnelTitle, setAntPersonnel] = useState("");
  const [antPersonnelOptions, setAntPersonnelOptions] = useState(defaultOption);
  const [examenCliniqueBio, setExamenCliniqueBio] = useState("");
  const [examenCliniqueRad, setExamenCliniqueRad] = useState("");
  const [otherTitleFam, setOtherTitleFam] = useState("Autre.."); //Pour le champ qui s'affiche lors de choix : autre
  const [otherTitlePer, setOtherTitlePer] = useState("Autre.."); //Pour le champ qui s'affiche lors de choix : autre
  const [isOrdonannce, setIsOrdannance] = useState("");
  const [isPersonnelsChecked, setIsPersonnelsChecked] = useState(false);
  const [isFamilialsChecked, setIsFamilialsChecked] = useState(false);
  const [isRadiologie, setIsRadiologie] = useState(false);
  const [isBiologie, setIsBiologie] = useState(false);
  // const [options, setOptions] = useState(defaultOption);

  // -------FUNCTIONS-------
  //PERMET D'AFFCIHER TYPE D'ANTECEDANTS PERSONNELS
  function DisplayPersonnels(action) {
    const type = document.querySelector("div[id='type-ant']");
    const selectInput = document.querySelector("div[id='type-ant-selected']");
    const autreInput = document.querySelector("div[id='type-autre-input-pers']");
    const autreInput2 = document.querySelector("div[id='type-autre-input-fam']");
    const habitudesChoicesInput = document.querySelector(
      "div[id='type-chirg-habitudes']"
    );

    autreInput.classList.add("hideInput");
    autreInput2.classList.add("hideInput");
    habitudesChoicesInput.classList.add("hideInput");
    selectInput.classList.add("hideInput");

    if (action) {
      type.classList.remove("hideInput");
      // selectInput.classList.remove("hideInput");
    } 
    else {
      type.classList.add("hideInput");
    }
  }
  
  //PERMET D'AFFCIHER TYPE D'ANTECEDANTS Familials
  function DisplayFamilials(action) {
    const famInput = document.querySelector("div[id='type-fam']");
    const autreInput = document.querySelector("div[id='type-autre-input-fam']");
    const chirgHabInput = document.querySelector("div[id='type-chirg-habitudes']");
    autreInput.classList.add("hideInput");
    console.log("this is " + action);
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

    const allergiesInput = document.querySelector(
      "div[id = 'type-ant-allergies']"
    );
    const typesInput = document.querySelector("div[id='type-ant-selected']");

    if (types.includes(selectedOption["value"])) {
      if (typesInput) typesInput.classList.remove("hideInput");
      else console.log("Element introuvable");
      if (!allergiesInput.classList.contains("hideInput"))
        allergiesInput.classList.add("hideInput");
    } else if (allergies.includes(selectedOption["value"])) {
      if (allergiesInput) {
        allergiesInput.classList.remove("hideInput");
      }
      if (!typesInput.classList.contains("hideInput")) {
        console.log("hhhh");
        typesInput.classList.add("hideInput");
      }
    } else {
      allergiesInput.classList.add("hideInput");
      typesInput.classList.add("hideInput");
    }
  }

  function chirurgicalHandle(action) {
    const otherInput = document.querySelector("div[id='type-autre-input-pers']");
    const typeInput = document.querySelector("div[id='type-chirg-habitudes']");
    if (action) {
      setOtherTitlePer("Type de Maladie Chirurgical");
      otherInput.classList.remove("hideInput");
      typeInput.classList.remove("hideInput");
    } else {
      setChoiceChirHab("Nombre Année des soins");
      otherInput.classList.add("hideInput");
      typeInput.classList.add("hideInput");
    }
  }

  // PERMET DE CHANGER LA LISTE DEROULANTES DE ANTECEDANTS PERSONNELS TYPE SELON LES CHOIX
  function HandleAntPersonnel(selectedOption) {
    DisplayTypeAntPer(selectedOption);
    const otherInput = document.querySelector("div[id='type-autre-input-pers']");

    chirurgicalHandle(false);
    if (selectedOption["value"] == "Medical") {
      setAntPersonnel("Medical");
      setAntPersonnelOptions(medicaments);
    } else if (selectedOption["value"] == "Habitudes") {
      setAntPersonnel("Habitudes");
      setAntPersonnelOptions(habitudes);
    } else if (selectedOption["value"] == "Chirurgical") {
      chirurgicalHandle(true);
      return;
    } else if (selectedOption["value"] == "AUTRE") {
      otherInput.classList.remove("hideInput");
    }
  }

  function HandleAntPersonnelChoice(selectedOption) {
    const otherInput = document.querySelector("div[id='type-autre-input-pers']");
    const habitudesChoices = ["Alcool", "Tabac", "Temps d'écran"];
    const habitudesChoicesInput = document.querySelector(
      "div[id='type-chirg-habitudes']"
    );

    setOtherTitlePer("Specifier Autre");
    if (habitudesChoices.includes(selectedOption["value"])) {
      habitudesChoicesInput.classList.remove("hideInput");
      if (selectedOption["value"] == "Alcool") {
        setChirurgicalOrHabitudes(alcoolFrequency);
        setChoiceChirHab("Alcool");
      } else if (selectedOption["value"] == "Tabac") {
        setChirurgicalOrHabitudes(tabacQuantity);
        setChoiceChirHab("Tabac");
      } else {
        setChirurgicalOrHabitudes(tempsEcran);
        setChoiceChirHab("Temps d'ecran");
      }
      otherInput.classList.add("hideInput");
    } else if (selectedOption["value"] == "AUTRE") {
      otherInput.classList.remove("hideInput");
      habitudesChoicesInput.classList.add("hideInput");
    } else {
      otherInput.classList.add("hideInput");
      habitudesChoicesInput.classList.add("hideInput");
    }
  }

  // PERMET DE CACHER LES CHAMP CONCERNANT PERSONNELS
  function CheckPersonnels() {
    const allergiesInput = document.querySelector(
      "div[id = 'type-ant-allergies']"
    );
    const typesInput = document.querySelector("div[id='type-ant-selected']");
    if (allergiesInput) {
      allergiesInput.classList.add("hideInput");
    }
    if (typesInput) {
      typesInput.classList.add("hideInput");
    }
  }

  function HandleAntFamilial(selectedOption) {
    const otherInput = document.querySelector('div[id="type-autre-input-fam"]');
    setOtherTitleFam("Specifier Autre Antecedants Familials");
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
    const inputOfExamen = document.querySelector("div[id='examen-autre-bio']");
    if (inputOfExamen) {
      inputOfExamen.classList.remove("hideInput");
    } else {
      console.log("Element introuvable");
    }
    if (selectedOption["value"] == "0") {
      inputOfExamen.classList.add("hideInput");
    } else if (selectedOption["value"] == "AUTRE") {
      setExamenCliniqueBio("Specifier autre");
    } else {
      setExamenCliniqueBio(selectedOption["value"]);
    }
  }
  //POUR AFFICHER LE CHAMP DE TEXTE
  function handleExamenChangeRad(selectedOption) {
    const inputOfExamen = document.querySelector("div[id='examen-autre-rad']");
    if (inputOfExamen) {
      inputOfExamen.classList.remove("hideInput");
    } else {
      console.log("Element introuvable");
    }
    if (selectedOption["value"] == "0") {
      inputOfExamen.classList.add("hideInput");
    } else if (selectedOption["value"] == "AUTRE") {
      setExamenCliniqueRad("Specifier autre");
    } else {
      setExamenCliniqueRad(selectedOption["value"]);
    }
  }

  function handleCancel() {
    router.push("/Patients/Patient");
  }

  // -------DATA-------
  const [selectedOption, setSelectedOption] = useState("Choisir");

  return (
    <div id="root">
      <div className="page-wrapper">
        <div className="content">
          <NavigationHeader pages={pages} currentPage="Nouvelle Consultation" />
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-12 mb-4">
                        <div className="form-heading mb-7">
                          <h3>{actionName} une consultation pour M. Yamine Lamal</h3>
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
                            value="I32783782"
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
                            value="Homme"
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
                            value="17 Ans"
                          />
                        </div>
                      </div>

                      <div className="form-heading">
                        <h4>2. Motif</h4>
                      </div>
                      <div className="col-12 col-md-12 col-xl-12">
                        <div className="form-group local-forms">
                          <label>
                            Motif <span className="login-danger">*</span>
                          </label>
                          <Select
                            menuPortalTarget={document.body}
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 })
                            }}
                            defaultValue={defaultOption}
                            onChange={setSelectedOption}
                            options={motif}
                            id="motif"
                            components={{
                              IndicatorSeparator: () => null
                            }}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused
                                  ? "none"
                                  : "2px solid rgba(46, 55, 164, 0.1);",
                                boxShadow: state.isFocused
                                  ? "0 0 0 1px #2e37a4"
                                  : "none",
                                "&:hover": {
                                  borderColor: state.isFocused
                                    ? "none"
                                    : "2px solid rgba(46, 55, 164, 0.1)"
                                },
                                borderRadius: "10px",
                                fontSize: "14px",
                                minHeight: "45px"
                              }),
                              dropdownIndicator: (base, state) => ({
                                ...base,
                                transform: state.selectProps.menuIsOpen
                                  ? "rotate(-180deg)"
                                  : "rotate(0)",
                                transition: "250ms",
                                width: "35px",
                                height: "35px"
                              })
                            }}
                          />
                        </div>
                      </div>

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
                                  // setIsFamilialsChecked(false);
                                  // setIsPersonnelsChecked(true);
                                  // console.log(isPersonnelsChecked);
                                  DisplayPersonnels(!isPersonnelsChecked);
                                  // DisplayFamilials(false);
                                  // console.log(isPersonnelsChecked);
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
                                  // setIsPersonnelsChecked(false);
                                  // setIsFamilialsChecked(true);
                                  // DisplayPersonnels(false);
                                  DisplayFamilials(!isFamilialsChecked);
                                  // CheckPersonnels();
                                  setIsFamilialsChecked(!isFamilialsChecked);
                                }}
                              />
                              Familiales
                            </label>
                          </div>
                        </div>
                      </div>

                      <div
                        className="col-12 col-md-6 col-xl-4 hideInput"
                        id="type-ant"
                      >
                        <div className="form-group local-forms ">
                          <label>
                            Antécédents Personnels
                            <span className="login-danger">*</span>
                          </label>
                          <Select
                            menuPortalTarget={document.body}
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 })
                            }}
                            defaultValue={defaultOption}
                            onChange={HandleAntPersonnel}
                            options={antecedants}
                            id="ant-personnel"
                            components={{
                              IndicatorSeparator: () => null
                            }}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused
                                  ? "none"
                                  : "2px solid rgba(46, 55, 164, 0.1);",
                                boxShadow: state.isFocused
                                  ? "0 0 0 1px #2e37a4"
                                  : "none",
                                "&:hover": {
                                  borderColor: state.isFocused
                                    ? "none"
                                    : "2px solid rgba(46, 55, 164, 0.1)"
                                },
                                borderRadius: "10px",
                                fontSize: "14px",
                                minHeight: "45px"
                              }),
                              dropdownIndicator: (base, state) => ({
                                ...base,
                                transform: state.selectProps.menuIsOpen
                                  ? "rotate(-180deg)"
                                  : "rotate(0)",
                                transition: "250ms",
                                width: "35px",
                                height: "35px"
                              })
                            }}
                          />
                        </div>
                      </div>

                      {/* TYPE APRES LE CHOIX D'ANTECEDANTS PERSONNELS */}
                      <div
                        className="col-12 col-md-6 col-xl-4 hideInput"
                        id="type-ant-selected"
                      >
                        <div className="form-group local-forms">
                          <label>
                            {antPersonnelTitle}{" "}
                            <span className="login-danger">*</span>
                          </label>
                          <Select
                            menuPortalTarget={document.body}
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 })
                            }}
                            defaultValue={defaultOption}
                            onChange={HandleAntPersonnelChoice}
                            options={antPersonnelOptions}
                            id="type-ant-personnel"
                            components={{
                              IndicatorSeparator: () => null
                            }}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused
                                  ? "none"
                                  : "2px solid rgba(46, 55, 164, 0.1);",
                                boxShadow: state.isFocused
                                  ? "0 0 0 1px #2e37a4"
                                  : "none",
                                "&:hover": {
                                  borderColor: state.isFocused
                                    ? "none"
                                    : "2px solid rgba(46, 55, 164, 0.1)"
                                },
                                borderRadius: "10px",
                                fontSize: "14px",
                                minHeight: "45px"
                              }),
                              dropdownIndicator: (base, state) => ({
                                ...base,
                                transform: state.selectProps.menuIsOpen
                                  ? "rotate(-180deg)"
                                  : "rotate(0)",
                                transition: "250ms",
                                width: "35px",
                                height: "35px"
                              })
                            }}
                          />
                        </div>
                      </div>

                      <div
                        className="col-12 col-md-6 col-xl-4 hideInput"
                        id="type-ant-allergies"
                      >
                        <div className="form-group local-forms ">
                          <label>
                            {antPersonnelTitle}{" "}
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Saisir.."
                          />
                        </div>
                      </div>

                      <div
                        className="col-12 col-md-6 col-xl-4 hideInput"
                        id="type-autre-input-pers"
                      >
                        <div className="form-group local-forms ">
                          <label>
                            {otherTitlePer} <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Saisir.."
                          />
                        </div>
                      </div>
                      <div
                        className="col-12 col-md-6 col-xl-4 hideInput"
                        id="type-chirg-habitudes"
                      >
                        <div className="form-group local-forms ">
                          <label>
                            {choiceChirHab}{" "}
                            <span className="login-danger">*</span>
                          </label>
                          <Select
                            menuPortalTarget={document.body}
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 })
                            }}
                            defaultValue={defaultOption}
                            // onChange={HandleAntPersonnelChoice}
                            options={ChirurgicalOrHabitudes}
                            id="select-type-chirg-habitudes"
                            components={{
                              IndicatorSeparator: () => null
                            }}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused
                                  ? "none"
                                  : "2px solid rgba(46, 55, 164, 0.1);",
                                boxShadow: state.isFocused
                                  ? "0 0 0 1px #2e37a4"
                                  : "none",
                                "&:hover": {
                                  borderColor: state.isFocused
                                    ? "none"
                                    : "2px solid rgba(46, 55, 164, 0.1)"
                                },
                                borderRadius: "10px",
                                fontSize: "14px",
                                minHeight: "45px"
                              }),
                              dropdownIndicator: (base, state) => ({
                                ...base,
                                transform: state.selectProps.menuIsOpen
                                  ? "rotate(-180deg)"
                                  : "rotate(0)",
                                transition: "250ms",
                                width: "35px",
                                height: "35px"
                              })
                            }}
                          />
                        </div>
                      </div>
                      
                      <div
                        className="col-12 col-md-6 col-xl-6 hideInput"
                        id="type-fam"
                      >
                        <div className="form-group local-forms ">
                          <label>
                            Antécédents Familials{" "}
                            <span className="login-danger">*</span>
                          </label>
                          <Select
                            menuPortalTarget={document.body}
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 })
                            }}
                            defaultValue={defaultOption}
                            onChange={HandleAntFamilial}
                            options={antFamilial}
                            id="select-ant-fam"
                            components={{
                              IndicatorSeparator: () => null
                            }}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused
                                  ? "none"
                                  : "2px solid rgba(46, 55, 164, 0.1);",
                                boxShadow: state.isFocused
                                  ? "0 0 0 1px #2e37a4"
                                  : "none",
                                "&:hover": {
                                  borderColor: state.isFocused
                                    ? "none"
                                    : "2px solid rgba(46, 55, 164, 0.1)"
                                },
                                borderRadius: "10px",
                                fontSize: "14px",
                                minHeight: "45px"
                              }),
                              dropdownIndicator: (base, state) => ({
                                ...base,
                                transform: state.selectProps.menuIsOpen
                                  ? "rotate(-180deg)"
                                  : "rotate(0)",
                                transition: "250ms",
                                width: "35px",
                                height: "35px"
                              })
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className="col-12 col-md-6 col-xl-4 hideInput"
                        id="type-autre-input-fam"
                      >
                        <div className="form-group local-forms ">
                          <label>
                            {otherTitleFam} <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Saisir.."
                          />
                        </div>
                      </div>

                      <div className="form-heading">
                        <h4>4. Historique Clinique</h4>
                      </div>

                      <div className="col-12 col-sm-12">
                        <div className="form-group local-forms">
                          <label>
                            <span className="login-danger">*</span>
                          </label>
                          <textarea
                            className="form-control"
                            rows={3}
                            cols={30}
                            placeholder={
                              "Veuillez décrire brièvement l'histoire de la maladie .."
                            }
                          />
                        </div>
                      </div>

                      <div className="form-heading">
                        <h4>5. Examen Clinique</h4>
                      </div>
                      <div className="col-12 col-sm-12">
                        <div className="form-group local-forms">
                          <label>
                            <span className="login-danger">*</span>
                          </label>
                          <textarea
                            className="form-control"
                            rows={3}
                            cols={30}
                            placeholder={
                              "Veuillez décrire brièvement l'examen clinique effectué aujourd'hui .."
                            }
                          />
                        </div>
                      </div>

                      <div className="form-heading">
                        <h4>6. Examen Médicaux</h4>
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

                      <div
                        className="col-12 col-md-4 col-xl-4 hideInput"
                        id="examen-bio"
                      >
                        <div className="form-group local-forms">
                          <label>
                            Examen Biologique{" "}
                            <span className="login-danger">*</span>
                          </label>
                          <Select
                            menuPortalTarget={document.body}
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 })
                            }}
                            defaultValue={defaultOption}
                            onChange={handleExamenChangeBio}
                            options={biologicalTests}
                            id="select-examen-bio"
                            components={{
                              IndicatorSeparator: () => null
                            }}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused
                                  ? "none"
                                  : "2px solid rgba(46, 55, 164, 0.1);",
                                boxShadow: state.isFocused
                                  ? "0 0 0 1px #2e37a4"
                                  : "none",
                                "&:hover": {
                                  borderColor: state.isFocused
                                    ? "none"
                                    : "2px solid rgba(46, 55, 164, 0.1)"
                                },
                                borderRadius: "10px",
                                fontSize: "14px",
                                minHeight: "45px"
                              }),
                              dropdownIndicator: (base, state) => ({
                                ...base,
                                transform: state.selectProps.menuIsOpen
                                  ? "rotate(-180deg)"
                                  : "rotate(0)",
                                transition: "250ms",
                                width: "35px",
                                height: "35px"
                              })
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className="col-12 col-md-4 col-xl-4 hideInput"
                        id="examen-rad"
                      >
                        <div className="form-group local-forms">
                          <label>
                            Examen Radiologique{" "}
                            <span className="login-danger">*</span>
                          </label>
                          <Select
                            menuPortalTarget={document.body}
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 })
                            }}
                            defaultValue={defaultOption}
                            onChange={handleExamenChangeRad}
                            options={radiologicalTests}
                            id="select-examen-rad"
                            components={{
                              IndicatorSeparator: () => null
                            }}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused
                                  ? "none"
                                  : "2px solid rgba(46, 55, 164, 0.1);",
                                boxShadow: state.isFocused
                                  ? "0 0 0 1px #2e37a4"
                                  : "none",
                                "&:hover": {
                                  borderColor: state.isFocused
                                    ? "none"
                                    : "2px solid rgba(46, 55, 164, 0.1)"
                                },
                                borderRadius: "10px",
                                fontSize: "14px",
                                minHeight: "45px"
                              }),
                              dropdownIndicator: (base, state) => ({
                                ...base,
                                transform: state.selectProps.menuIsOpen
                                  ? "rotate(-180deg)"
                                  : "rotate(0)",
                                transition: "250ms",
                                width: "35px",
                                height: "35px"
                              })
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className="col-12 col-md-4 col-xl-4 hideInput"
                        id="examen-autre-bio"
                      >
                        <div className="form-group local-forms ">
                          <label>
                            {examenCliniqueBio}{" "}
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Saisir.."
                          />
                        </div>
                      </div>
                      <div
                        className="col-12 col-md-4 col-xl-4 hideInput"
                        id="examen-autre-rad"
                      >
                        <div className="form-group local-forms ">
                          <label>
                            {examenCliniqueRad}{" "}
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Saisir.."
                          />
                        </div>
                      </div>

                      <div className="form-heading">
                        <h4>7. Diagnostic Positif </h4>
                      </div>
                      <div className="col-12 col-md-5 col-xl-5">
                        <div className="form-group select-gender">
                          <label className="gen-label">
                            Diagnostic Positif {"  "}
                            <span className="login-danger">*</span>
                          </label>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                type="radio"
                                name="diagnostic"
                                className="form-check-input"
                              />
                              Oui
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                type="radio"
                                name="diagnostic"
                                className="form-check-input"
                              />
                              Non
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                type="radio"
                                name="diagnostic"
                                className="form-check-input"
                              />
                              Correspondance
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <input
                                type="radio"
                                name="diagnostic"
                                className="form-check-input"
                              />
                              Télé Expertise
                            </label>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-12 col-md-7 col-xl-7"
                        id="specify-diagnostic"
                      >
                        <div className="form-group local-forms">
                          <label>
                            Specifier Le diagnostic
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Saisir.."
                          />
                        </div>
                      </div>

                      <div className="form-heading">
                        <h4>8. Ordonnance Médicale </h4>
                      </div>
                      <div
                        className="col-12 col-md-12 col-xl-12"
                        id="ordanance"
                      >
                        <div className="form-group local-forms">
                          <label>
                            {isOrdonannce}
                            <span className="login-danger">*</span>
                          </label>
                          <textarea
                            className="form-control"
                            rows={4}
                            cols={30}
                            placeholder={
                              "Veuillez entrer l'ordonnance de consultation .."
                            }
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="doctor-submit text-end">
                          <button
                            type="submit"
                            className="btn me-1 customizedBtn save"
                          >
                            <Link
                              className="dropdown-item"
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#delete_patient"
                            >
                              {buttonName}
                            </Link>
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
      </div>
    </div>
  );

};

export default NouvelleConsultation;
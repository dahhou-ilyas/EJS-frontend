/* eslint-disable react/no-unescaped-entities */
"use client";
import "@/assets/css/style.css";
import { useEffect, useState } from "react";
import { Form, Input, DatePicker, TimePicker } from "antd";
import Sidebar from "@/components/TeleExpertise/Sidebar";
import Link from "next/link";
import Select from "react-select";
import moment from "moment";
import MyFileInput from "@/components/TeleExpertise/MyFileInput";
import DoctorSelectionForm from "@/components/TeleExpertise/DoctorSelectionForm";
import { decodeToken } from "@/utils/docodeToken";
import { createDiscussion } from "@/services/discussionService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Formulaire = () => {
  const router = useRouter()
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedHabitudes, setSelectedHabitudes] = useState([]);
  const [selectedMotifTele, setSelectedMotifTele] = useState([]);
  const [selectedMedicaux, setSelectedMedicaux] = useState([]);
  const [selectedFamiliaux, setSelectedFamiliaux] = useState([]);

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [sexe, setSexe] = useState("");
  const [identifiant, setIdentifiant] = useState("");
  const [cin, setCin] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [autreMotifTele, setAutreMotiftele] = useState("");
  const [autreMedicaux, setAutreMedicaux] = useState("");
  const [detailsHabitudes, setDetailsHabitudes] = useState("");
  const [autreFamiliaux, setAutrFamiliaux] = useState("");
  const [Chirurgicaux, setChirurgicaux] = useState("");
  const [Description, setDescription] = useState("");
  const [titre, setTitre] = useState("");
  const [MotifDiscussion, setMotifDiscusion] = useState("");
  const [CommentaireFichiers, setCommentaireFichiers] = useState("");

  const disabledDate = (current) => {
    if (!current || !current.isValid()) {
      return false;
    }
    const dayOfWeek = current.day();
    const isNotWedOrFri = dayOfWeek !== 3 && dayOfWeek !== 5;
    const isBeforeToday = current && current < moment().startOf("day");
    const isToday = current.isSame(moment(), "day");
    const isPast1130 = moment().isAfter(moment().set({ hour: 11, minute: 30 }));

    return isNotWedOrFri || isBeforeToday || (isToday && isPast1130);
  };
  const disabledHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      if (i < 9 || i > 12) {
        hours.push(i);
      }
    }
    return hours;
  };
  const showMoreInfoMedicaux = selectedMedicaux.some(
    (option) => option.value === 7
  );
  const showMoreInfoFamiliaux = selectedFamiliaux.some(
    (option) => option.value === 6
  );
  const showMoreInfoMotifTele = selectedMotifTele.some(
    (option) => option.value === 8
  );
  const [MotifTele, setMotifTele] = useState([
    { value: 1, label: "Ophtalmique" },
    { value: 2, label: "Bucco-dentaire" },
    { value: 3, label: "O.R.L" },
    { value: 4, label: "Pleuropulmonaire" },
    { value: 5, label: "Cardio-vasculaire" },
    { value: 6, label: "Digestif" },
    { value: 7, label: "Loco-moteur" },
    { value: 8, label: "Autre (à préciser en description)" },
  ]);
  const [TypeDiscussion, setTypeDiscussion] = useState([
    { value: 1, label: "Appel Video" },
    { value: 2, label: "Chat" },
  ]);
  const [Habitudes, setHabitudes] = useState([
    { value: 1, label: "Tabac" },
    { value: 2, label: "Sport" },
    { value: 3, label: "Alcool" },
    { value: 4, label: "Temps d'écran élevé" },
  ]);
  const [Specialites, setSpecialites] = useState([
    { value: 1, label: "Pédiatre" },
    { value: 2, label: "Dermatologue" },
    { value: 3, label: "Gynécologue" },
    { value: 4, label: "Médecin généraliste" },
    { value: 5, label: "Ophtalmologue" },
    { value: 6, label: "Psychiatre" },
  ]);
  const [Medicaux, setMedicaux] = useState([
    { value: 1, label: "Asthme" },
    { value: 2, label: "Diabète" },
    { value: 3, label: "Epilepsie" },
    { value: 4, label: "Troubles du spectre de l'autisme(TSA)" },
    { value: 5, label: "Troubles de Sommeil" },
    { value: 6, label: "Aucune" },
    { value: 7, label: "Autre (à préciser en description)" },
  ]);
  const [Familiaux, setFamiliaux] = useState([
    { value: 1, label: "Diabète" },
    { value: 2, label: "Hypertension Artérielle" },
    { value: 3, label: "Maladie Cardiovasculaire" },
    { value: 4, label: "Cancer" },
    { value: 5, label: "Aucune" },
    { value: 6, label: "Autre (à préciser en description)" },
  ]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [genre, setGenre] = useState("PRIVEE")
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [selectedConsultedDoctor, setSelectedConsultedDoctor] = useState({})

  const [discussion, setDiscussion] = useState({})
  
  useEffect(() => {
    const handleSuivant1 = () => {
      document.querySelector('[href="#bottom-justified-tab2"]').click();
    };
    const handleSuivant2 = () => {
      document.querySelector('[href="#bottom-justified-tab3"]').click();
    };
    const handleSuivant3 = () => {
      document.querySelector('[href="#bottom-justified-tab4"]').click();
    };

    const suivant1Element = document.getElementById("suivant1");
    const suivant2Element = document.getElementById("suivant2");
    const suivant3Element = document.getElementById("suivant3");

    if (suivant1Element) {
      suivant1Element.addEventListener("click", handleSuivant1);
    }
    if (suivant2Element) {
      suivant2Element.addEventListener("click", handleSuivant2);
    }
    if (suivant3Element) {
      suivant3Element.addEventListener("click", handleSuivant3);
    }

    return () => {
      const suivant1ElementCleanup = document.getElementById("suivant1");
      const suivant2ElementCleanup = document.getElementById("suivant2");
      const suivant3ElementCleanup = document.getElementById("suivant3");

      if (suivant1ElementCleanup) {
        suivant1ElementCleanup.removeEventListener("click", handleSuivant1);
      }
      if (suivant2ElementCleanup) {
        suivant2ElementCleanup.removeEventListener("click", handleSuivant2);
      }
      if (suivant3ElementCleanup) {
        suivant3ElementCleanup.removeEventListener("click", handleSuivant3);
      }
    };
  }, []);

  const handleCheckboxChange = () => {
    setIsConsentChecked(!isConsentChecked);
  };

  const handleBirthdateChange = (event) => {
    setBirthdate(event.target.value);
  };

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(birthdate);

  const suivant1 = () => {
    const antecedentsMedicaux = selectedMedicaux.map(selected => {
      if (selected.value === 7) {
        return autreMedicaux
      } else {
        return selected.label
      }
    })
    
    const antecedentsFamiliaux = selectedFamiliaux.map(selected => {
      if (selected.value === 6) {
        return autreFamiliaux
      } else {
        return selected.label
      }
    })

    let motifDeTeleExpertise = null
    if (selectedMotifTele[0]) {
      motifDeTeleExpertise = selectedMotifTele[0].value === 8 ? autreMotifTele : selectedMotifTele[0].label
    }
    
    const data = {
      nomPatient: nom,
      prenomPatient: prenom,
      sexe: sexe === "Homme" ? "MASCULIN" : "FEMININ",
      age: age,
      identifiantPatient: identifiant,
      cinPatient: age <= 16 ? null : cin,
      codeMassarPatient:  age <= 16 ? cin : null,
      motifDeTeleExpertise: motifDeTeleExpertise,
      antecedentsMedicaux: antecedentsMedicaux,
      antecedentsChirurgicaux: Chirurgicaux,
      habitudes: selectedHabitudes.map(h => h.label),
      descriptionDesHabitudes: detailsHabitudes,
      antecedentsFamiliaux: antecedentsFamiliaux,
      descriptionEtatClinique: Description,
      titre: titre,
      motif: MotifDiscussion
    }
    setDiscussion(data)
  }

  const suivant2 = () => {
    const data = {
      ...discussion,
      commentaireFichiers: CommentaireFichiers
    }
    /* setDiscussion((prev) => ({
      ...prev,
      commentaireFichiers: CommentaireFichiers
    })) */
   setDiscussion(data)
  }

  const suivant3 = () => {
    let type = null
    if (selectedOption) {
      type = selectedOption.value === 1 ? "APPEL_VIDEO" : "CHAT"
    }
    const specialitesDemandees = selectedOptions.map(op => op.label)
    
    const date1 = new Date(date)
    date1.setHours(new Date(time).getHours())
    date1.setMinutes(new Date(time).getMinutes())
    date1.setSeconds(new Date(time).getSeconds())
  
    const timeHours = (new Date(time).getHours()).toString().length === 1 ? ("0" + new Date(time).getHours()) : "" + new Date(time).getHours()
    const timeMinutes = (new Date(time).getMinutes()).toString().length === 1 ? ("0" + new Date(time).getMinutes()) : "" + new Date(time).getMinutes()

    const token = localStorage.getItem("access-token")
    const decodedToken = decodeToken(token)

    const medcinConsulteId = selectedConsultedDoctor.id;
    let medecinsInvitesIds = genre === "PRIVEE" ? selectedDoctors.map(doc => doc.id) : [];
    if (medcinConsulteId && !medecinsInvitesIds.includes(medcinConsulteId)) {
        medecinsInvitesIds.push(medcinConsulteId);
    }

    const data = {
        ...discussion,
        genre: genre,
        type: type,
        specialitesDemandees: genre === "OUVERTE" ? specialitesDemandees : [],
        medecinsInvitesIds: medecinsInvitesIds,
        date: date1,
        heure: timeHours + ":" + timeMinutes,
        medcinResponsableId: decodedToken.claims.id,
        medcinConsulteId: medcinConsulteId,
    };
    console.log(data)
    setDiscussion(data);

  }

  const handleCreateDiscussion = async () => {
    const token = localStorage.getItem("access-token")
    try {
      const res = await createDiscussion(token, discussion)
      await handleUpload(res.id)
      toast.success("La discussion est bien créé")
      router.push("/TeleExpertise/Discussions")
    } catch (error) {
      toast.error("Quelque chose s'est mal passé, veuillez réessayer")
    }
  }

  const handleUpload = async (id) => {
    if (selectedFiles.length === 0) {
        console.log("No files selected for upload.");
        return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
        formData.append("files", file);
    });

    const response = await fetch(`/api/upload?id=${id}`, {
        method: "POST",
        body: formData,
    });

    const result = await response.json();
    if (result.success) {
        console.log("Files uploaded successfully!");
    } else {
        console.log("Failed to upload the files.");
    }
  };

  
  

  return (
    <div id="root" style={{ backgroundColor: "white" }}>
      <Sidebar activeClassName="dashboard" />
      <div className="page-wrapper">
        <div className="col-md-9 mx-auto">
          <div className="card" style={{ border: "none" }}>
            <div className="card-body">
              <ul className="nav nav-tabs nav-tabs-bottom nav-justified">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    href="#bottom-justified-tab1"
                    data-bs-toggle="tab"
                  >
                    Info Générales
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="#bottom-justified-tab2"
                    data-bs-toggle="tab"
                  >
                    Données Cliniques
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="#bottom-justified-tab3"
                    data-bs-toggle="tab"
                  >
                    Planification
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="#bottom-justified-tab4"
                    data-bs-toggle="tab"
                  >
                    Consentement
                  </Link>
                </li>
              </ul>
              <div className="tab-content">
                <div
                  className="tab-pane show active"
                  id="bottom-justified-tab1"
                >
                  <div className="col-md-14">
                    <div className="card-box">
                      <div className="card-titles">
                        <h4
                          className="card-title"
                          style={{
                            marginBottom: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          Info Générales
                        </h4>
                        <h4
                          className="card-title"
                          style={{
                            marginBottom: "50px",
                            color: "#BDC0E3",
                            textAlign: "center",
                          }}
                        >
                          Remplissons les informations de base sur le patient et
                          la discussion
                        </h4>
                      </div>
                      <form action="#">
                        <div className="row">
                          <div className="col-md-5 mx-auto">
                            <label className="col-md-6 col-form-label">
                              Prénom du Patient*
                            </label>
                            <div
                              className="form-group row"
                              style={{ marginBottom: "22px" }}
                            >
                              <div className="col-md-9">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={prenom}
                                  onChange={(e) => setPrenom(e.target.value)}
                                />
                              </div>
                            </div>
                            <label className="col-md-3 col-form-label">
                              Sexe*
                            </label>
                            <div
                              className="form-group row"
                              style={{ marginBottom: "37px" }}
                            >
                              <div className="col-md-9">
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    id="gender_male"
                                    value="Homme"
                                    checked={sexe === "Homme"}
                                    onChange={() => setSexe("Homme")}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="gender_male"
                                  >
                                    Homme
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    id="gender_female"
                                    value="Femme"
                                    checked={sexe === "Femme"}
                                    onChange={() => setSexe("Femme")}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="gender_female"
                                  >
                                    Femme
                                  </label>
                                </div>
                              </div>
                            </div>
                            <label className="col-md-6 col-form-label">
                              Identifiant*
                            </label>
                            <div className="form-group row">
                              <div className="col-md-9">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={identifiant}
                                  onChange={(e) =>
                                    setIdentifiant(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <label className="col-md-6 col-form-label">
                              Nom du Patient*
                            </label>
                            <div className="form-group row">
                              <div className="col-md-9">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={nom}
                                  onChange={(e) => setNom(e.target.value)}
                                />
                              </div>
                            </div>
                            <label
                              htmlFor="birthdate"
                              className="col-md-6 col-form-label"
                            >
                              Date de naissance*
                            </label>
                            <div className="form-group row">
                              <div className="col-md-9">
                                <input
                                  id="birthdate"
                                  type="date"
                                  className="form-control"
                                  value={birthdate}
                                  onChange={handleBirthdateChange}
                                />
                              </div>
                            </div>
                            <label className="col-md-6 col-form-label">
                              {age < 16 ? "Code Massar*" : "CIN*"}
                            </label>
                            <div className="form-group row">
                              <div className="col-md-9">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={cin}
                                  onChange={(e) => setCin(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-10 mx-auto">
                          <label className="col-md-10 col-form-label">
                            Motif de la TéléExpertise*
                          </label>
                          <div className="form-group row">
                            <div
                              className="custom-width-11-5"
                              style={{ marginBottom: "20px" }}
                            >
                              <Select
                                isMulti
                                value={selectedMotifTele}
                                onChange={setSelectedMotifTele}
                                options={MotifTele}
                              />
                            </div>
                            {showMoreInfoMotifTele && (
                              <div className="custom-width-11-5">
                                <input
                                  id="more info motif"
                                  type="text"
                                  className="form-control"
                                  value={autreMotifTele}
                                  onChange={(e) =>
                                    setAutreMotiftele(e.target.value)
                                  }
                                  placeholder="Merci de fournir plus de Détails sur le motif."
                                ></input>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-10 mx-auto">
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <label className="col-md-10 col-form-label">
                              Antécédents Personnels
                            </label>
                            <label
                              className="col-form-label col-md-6"
                              style={{ fontSize: "13px", color: "#2F38A3" }}
                            >
                              1-Medicaux
                            </label>
                          </div>
                          <div className="form-group row">
                            <div
                              className="custom-width-11-5"
                              style={{ marginBottom: "20px" }}
                            >
                              <Select
                                isMulti
                                value={selectedMedicaux}
                                onChange={setSelectedMedicaux}
                                options={Medicaux}
                                style={{ marginBottom: "10px" }}
                              />
                            </div>
                            {showMoreInfoMedicaux && (
                              <div className="custom-width-11-5">
                                <input
                                  id="more info medicaux"
                                  type="text"
                                  className="form-control"
                                  placeholder="Merci de fournir plus de Détails sur les antécédents medicaux."
                                  value={autreMedicaux}
                                  onChange={(e) =>
                                    setAutreMedicaux(e.target.value)
                                  }
                                ></input>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-10 mx-auto">
                          <label
                            className="col-md-10 col-form-label"
                            style={{ fontSize: "13px", color: "#2F38A3" }}
                          >
                            2-Chirurgicaux
                          </label>
                          <div className="form-group row">
                            <div className="custom-width-11-5">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Merci de fournir les types et les années des chirurgies du patient, le cas échéant."
                                value={Chirurgicaux}
                                onChange={(e) =>
                                  setChirurgicaux(e.target.value)
                                }
                              ></input>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-10 mx-auto">
                          <label
                            className="col-md-10 col-form-label"
                            style={{ fontSize: "13px", color: "#2F38A3" }}
                          >
                            3-Habitudes
                          </label>
                          <div className="form-group row">
                            <div className="custom-width-11-5">
                              <Select
                                isMulti
                                value={selectedHabitudes}
                                onChange={setSelectedHabitudes}
                                options={Habitudes}
                                style={{ marginBottom: "10px" }}
                              />
                            </div>
                          </div>
                          {selectedHabitudes.length > 0 && (
                            <div
                              className="custom-width-11-5"
                              style={{ marginBottom: "20px" }}
                            >
                              <input
                                id="more info habitudes"
                                type="text"
                                className="form-control"
                                placeholder="Merci de fournir plus de Détails sur les habitudes sélectionnées."
                                value={detailsHabitudes}
                                onChange={(e) =>
                                  setDetailsHabitudes(e.target.value)
                                }
                              ></input>
                            </div>
                          )}
                        </div>
                        <div className="col-md-10 mx-auto">
                          <label className="col-md-10 col-form-label">
                            Antécédents Familiaux
                          </label>
                          <div className="form-group row">
                            <div
                              className="custom-width-11-5"
                              style={{ marginBottom: "20px" }}
                            >
                              <Select
                                isMulti
                                value={selectedFamiliaux}
                                onChange={setSelectedFamiliaux}
                                options={Familiaux}
                                style={{ marginBottom: "10px" }}
                              />
                            </div>
                            {showMoreInfoFamiliaux && (
                              <div className="custom-width-11-5">
                                <input
                                  id="more info familiaux"
                                  type="text"
                                  className="form-control"
                                  placeholder="Merci de fournir plus de Détails sur les antécédents familiaux."
                                  value={autreFamiliaux}
                                  onChange={(e) =>
                                    setAutrFamiliaux(e.target.value)
                                  }
                                ></input>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-md-10 mx-auto">
                          <label className="col-form-label col-md-6">
                            Description de l'état clinique
                          </label>
                          <div className="form-group row">
                            <div className="custom-width-11-5">
                              <textarea
                                rows={5}
                                cols={5}
                                className="form-control"
                                placeholder="Description"
                                defaultValue={""}
                                value={Description}
                                onChange={(e) => setDescription(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-10 mx-auto">
                          <label className="col-form-label col-md-6">
                            Titre de la Discussion
                          </label>
                          <div className="form-group row">
                            <div className="custom-width-11-5">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Donnez la raison de la TéléExpertise en une phrase"
                                value={titre}
                                onChange={(e) => setTitre(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-10 mx-auto">
                          <label className="col-form-label col-md-6">
                            Motif de Discussion
                          </label>
                          <div className="form-group row">
                            <div className="custom-width-11-5">
                              <textarea
                                rows={5}
                                cols={5}
                                className="form-control"
                                placeholder="Posez 2 ou 3 questions qui seront l'objet de la TéléExpertise"
                                defaultValue={""}
                                value={MotifDiscussion}
                                onChange={(e) =>
                                  setMotifDiscusion(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div  className="text-end">
                          <button
                            id="suivant1"
                            type="button"
                            style={{
                              color: "white",
                              backgroundColor: "darkblue",
                              padding: "5px 10px",
                              borderRadius: "5px",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "14px",
                              transition: "background-color 0.3s ease",
                            }}
                            onClick={suivant1}
                          >
                            Suivant
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="bottom-justified-tab2">
                  <div className="col-md-14">
                    <div className="card-box">
                      <div className="card-titles">
                        <h4
                          className="card-title"
                          style={{
                            marginBottom: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          Données Cliniques
                        </h4>
                        <h4
                          className="card-title"
                          style={{
                            marginBottom: "50px",
                            color: "#BDC0E3",
                            textAlign: "center",
                          }}
                        >
                          Importez tout fichier qui serait utile aux autres
                          medecins
                        </h4>
                      </div>
                      <form action="#">
                        <MyFileInput selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
                        <div className="col-md-10 mx-auto">
                          <label className="col-form-label col-md-6">
                            Commentez Vos Fichiers Importés
                          </label>
                          <div className="form-group row">
                            <div className="custom-width-11-5">
                              <textarea
                                rows={5}
                                cols={5}
                                className="form-control"
                                placeholder="Commentaires"
                                defaultValue={""}
                                value={CommentaireFichiers}
                                onChange={(e) =>
                                  setCommentaireFichiers(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="text-end">
                          <button
                            type="button"
                            id="suivant2"
                            style={{
                              color: "white",
                              backgroundColor: "darkblue",
                              padding: "5px 10px",
                              borderRadius: "5px",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "14px",
                              transition: "background-color 0.3s ease",
                            }}
                            onClick={suivant2}
                          >
                            Suivant
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="bottom-justified-tab3">
                  <div className="col-md-14">
                    <div className="card-box">
                      <div className="card-titles">
                        <h4
                          className="card-title"
                          style={{
                            marginBottom: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          Inviter des Médecins
                        </h4>
                        <h4
                          className="card-title"
                          style={{
                            marginBottom: "20px",
                            color: "#BDC0E3",
                            textAlign: "center",
                          }}
                        >
                          Choisissez les médecins à inviter à la discussion et
                          la date et l'heure convenables
                        </h4>
                      </div>
                      <div
                        className="col-md-4 mx-auto"
                        style={{ margin: 0, padding: "10px" }}
                      >
                        <div className="card" style={{ margin: 0 }}>
                          <div
                            className="card-body"
                            style={{ padding: "10px" }}
                          >
                            <ul
                              className="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified"
                              style={{ fontSize: "14px", marginBottom: 0 }}
                            >
                              <li
                                className="nav-item"
                                style={{ padding: "5px" }}
                                onClick={() => setGenre("PRIVEE")}
                              >
                                <Link
                                  className="nav-link active"
                                  href="#solid-rounded-justified-tab1"
                                  data-bs-toggle="tab"
                                  style={{ padding: "5px 10px" }}
                                >
                                  Privée
                                </Link>
                              </li>
                              <li
                                className="nav-item"
                                style={{ padding: "5px" }}
                                onClick={() => setGenre("OUVERTE")}
                              >
                                <Link
                                  className="nav-link"
                                  href="#solid-rounded-justified-tab2"
                                  data-bs-toggle="tab"
                                  style={{ padding: "5px 10px" }}
                                >
                                  Ouverte
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="tab-content" style={{ marginTop: 0 }}>
                        <div
                          className="tab-pane show active"
                          id="solid-rounded-justified-tab1"
                        >
                          <div
                            style={{
                              fontSize: "13px",
                              marginTop: "-20px",
                              textAlign: "center",
                            }}
                          >
                            Seulement les médecins que vous sélectionnerez
                            seront invités.
                          </div>
                          <hr
                            className="divider"
                            style={{ width: "100%" }}
                          ></hr>
                          <DoctorSelectionForm 
                            selectedDoctors={selectedDoctors} 
                            setSelectedDoctors={setSelectedDoctors}
                            selectedConsultedDoctor={selectedConsultedDoctor}
                            setSelectedConsultedDoctor={setSelectedConsultedDoctor}
                            isPrivee={true}
                          />
                          <div className="col-md-12 mx-auto">
                            <label className="col-md-10 col-form-label">
                              Type de Discussion
                            </label>
                            <div className="form-group row">
                              <div className="col-md-12">
                                <Select
                                  value={selectedOption}
                                  onChange={setSelectedOption}
                                  options={TypeDiscussion}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="card-box">
                                <Form layout="vertical">
                                  <div className="form-row">
                                    <Form.Item
                                      label="Date"
                                      className="form-item"
                                    >
                                      <DatePicker
                                        className="form-control"
                                        disabledDate={disabledDate}
                                        value={date}
                                        format="YYYY-MM-DD"
                                        onChange={(e) =>
                                          setDate(e)
                                        }
                                      />
                                    </Form.Item>
                                    <Form.Item
                                      label="Heure"
                                      className="form-item"
                                    >
                                      <TimePicker
                                        className="form-control"
                                        use12Hours
                                        format="h:mm a"
                                        disabledHours={disabledHours}
                                        value={time}
                                        onChange={(e) =>
                                          setTime(e)
                                        }
                                      />
                                    </Form.Item>
                                  </div>
                                </Form>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane"
                          id="solid-rounded-justified-tab2"
                        >
                          <div
                            style={{
                              fontSize: "13px",
                              marginTop: "-20px",
                              textAlign: "center",
                            }}
                          >
                            La discussion sera affichée aux médecins spécialisés
                            dont vous avez besoin. Ils peuvent demander à
                            rejoindre la discussion et vous pourrez les accepter
                            ou non.
                          </div>
                          <hr
                            className="divider"
                            style={{ width: "100%" }}
                          ></hr>
                          <DoctorSelectionForm 
                            selectedDoctors={selectedDoctors} 
                            setSelectedDoctors={setSelectedDoctors}
                            selectedConsultedDoctor={selectedConsultedDoctor}
                            setSelectedConsultedDoctor={setSelectedConsultedDoctor}
                            isPrivee={false}
                          />
                          <div
                            className="col-md-12"
                            style={{ marginTop: "35px" }}
                          >
                            <label
                              className="col-md-10 col-form-label"
                              style={{ fontSize: "16px", marginBottom: "10px" }}
                            >
                              Choisissez les Spécialités:
                            </label>
                            <div className="form-group row">
                              <div className="col-md-12">
                                <Select
                                  isMulti
                                  value={selectedOptions}
                                  onChange={setSelectedOptions}
                                  options={Specialites}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 mx-auto">
                            <label className="col-md-10 col-form-label">
                              Type de Discussion
                            </label>
                            <div className="form-group row">
                              <div className="col-md-12">
                                <Select
                                  value={selectedOption}
                                  onChange={setSelectedOption}
                                  options={TypeDiscussion}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="card-box">
                                <Form layout="vertical">
                                  <div className="form-row">
                                    <Form.Item
                                      label="Date"
                                      className="form-item"
                                    >
                                      <DatePicker
                                        className="form-control"
                                        disabledDate={disabledDate}
                                        format="YYYY-MM-DD"
                                        value={date}
                                        onChange={(e) =>
                                          setDate(e)
                                        }
                                      />
                                    </Form.Item>
                                    <Form.Item
                                      label="Heure"
                                      className="form-item"
                                    >
                                      <TimePicker
                                        className="form-control"
                                        use12Hours
                                        format="h:mm a"
                                        disabledHours={disabledHours}
                                        value={time}
                                        onChange={(e) =>
                                          setTime(e)
                                        }
                                      />
                                    </Form.Item>
                                  </div>
                                </Form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <form action="#">
                        <div className="text-end">
                          <button
                            id="suivant3"
                            type="button"
                            style={{
                              color: "white",
                              backgroundColor: "darkblue",
                              padding: "5px 10px",
                              borderRadius: "5px",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "14px",
                              transition: "background-color 0.3s ease",
                            }}
                            onClick={suivant3}
                          >
                            Suivant
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="tab-pane" id="bottom-justified-tab4">
                  <div className="col-md-14 d-flex justify-content-center align-items-center">
                    <div className="card-box">
                      <div className="card-titles">
                        <h4
                          className="card-title"
                          style={{
                            marginBottom: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          Consentement
                        </h4>
                        <h4
                          className="card-title"
                          style={{
                            marginBottom: "50px",
                            color: "#BDC0E3",
                            textAlign: "center",
                          }}
                        >
                          Lisez les conditions de la TéléExpertise et Acceptez.
                        </h4>
                      </div>
                      <div className="consent-component">
                        <div
                          className="consent-paragraph"
                          style={{
                            maxHeight: "350px",
                            maxWidth: "600px",
                            overflowY: "auto",
                            borderColor: "#2F38A3",
                            borderRadius: "10px",
                            padding: "15px",
                            border: "1px solid #2F38A3",
                            color: "#333",
                            fontSize: "14px",
                            lineHeight: "1.6",
                          }}
                        >
                          <span>
                            En soumettant ce formulaire, vous acceptez les
                            termes et conditions suivants:
                            <ol>
                              <li>
                                <strong>Objet du Consentement:</strong> Vous
                                consentez à ce que les informations que vous
                                fournissez soient utilisées dans le cadre de
                                votre consultation médicale et pour améliorer la
                                qualité des soins médicaux.
                              </li>
                              <li>
                                <strong>Confidentialité des Données:</strong>{" "}
                                Vos données personnelles seront traitées de
                                manière confidentielle et ne seront partagées
                                qu'avec les professionnels de santé impliqués
                                dans votre prise en charge.
                              </li>
                              <li>
                                <strong>Droits des Patients:</strong> Vous avez
                                le droit de demander l'accès, la rectification
                                ou la suppression de vos données personnelles à
                                tout moment. Vous pouvez également retirer votre
                                consentement sans que cela n'affecte la légalité
                                du traitement effectué avant le retrait.
                              </li>
                              <li>
                                <strong>Utilisation des Données:</strong> Vos
                                données peuvent être utilisées à des fins de
                                santé publique sous réserve de votre anonymat.
                              </li>
                              <li>
                                <strong>Durée du Consentement:</strong> Ce
                                consentement est valable jusqu'à ce que vous
                                décidiez de le révoquer.
                              </li>
                            </ol>
                            <span
                              style={{ fontWeight: "bold", color: "#2F38A3" }}
                            >
                              En cochant la case ci-dessous, vous reconnaissez
                              avoir lu et compris les informations ci-dessus et
                              vous acceptez de participer à cette consultation
                              sous ces conditions.
                            </span>
                          </span>
                        </div>
                        <div
                          className="form-check"
                          style={{ marginTop: "25px" }}
                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="consentCheckbox"
                            checked={isConsentChecked}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="consentCheckbox"
                          >
                            J'accepte les termes et conditions.
                          </label>
                        </div>
                        <div className="text-end">
                          <button
                            type="submit"
                            disabled={!isConsentChecked}
                            style={{
                              marginTop: "20px",
                              color: "white",
                              backgroundColor: "darkblue",
                              padding: "5px 10px",
                              borderRadius: "5px",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "14px",
                              transition: "background-color 0.3s ease",
                            }}
                            onClick={handleCreateDiscussion}
                          >
                            Soumettre
                          </button>
                        </div>
                      </div>
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

export default Formulaire;
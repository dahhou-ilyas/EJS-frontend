"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import FeatherIcon from "feather-icons-react";
import Sidebar from "../../../components/espaceMedecin/Sidebar1";
import { Profileuser, cameraicon } from "../../../components/espaceMedecin/imagepath";
import "../../../assets/css/style.css";
import { ToastContainer, toast } from "react-toastify";
import { Button, Card, Form, Input, Space, Typography } from 'antd';
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SPRINGBOOT_API_URL } from "@/config";

const ModifierProfil = () => {
  const router = useRouter();
  const [medecin, setMedecin] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    specialite: "",
    sexe: "",
    about: "",
    mail: "",
    image_url: "",
    password: "",
    confirmPassword: "",
    estGeneraliste: false,
    estMedcinESJ: false,
    linkedin: "",
    cin: "",
    inpe: "",
    ppr: "",
    medicalStudies: [{ annee: "", diplome: "", institut: "" }],
    medicalExperience: [{ annee: "", hopital: "", poste: "" }],
  });
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('access-token');
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const t = localStorage.getItem('access-token');
    if (isTokenInvalidOrNotExist(t)) {
      router.push('/auth/medecins');
    } else {
      const decodedToken = jwtDecode(t);
      setUser(decodedToken);
      fetchMedecin();
    }
  }, [user && user.claims.id]);

  const getMedecinData = (id) => {
    if (id != null) {
      axios.get(SPRINGBOOT_API_URL+'/medecins/' + id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          setMedecin(res.data);
          setFormData({
            prenom: res.data?.prenom,
            nom: res.data?.nom,
            cin: res.data?.cin,
            inpe: res.data?.inpe,
            ppr: res.data?.ppr,
            specialite: res.data?.specialite,
            mail: res.data?.mail,
            sexe: res.data?.sexe,
            linkedin: res.data?.linkedin,
            image_url: res.data?.image_url,
            about: res.data?.about,
            password: res.data?.password,
            estGeneraliste: res.data?.estGeneraliste,
            estMedcinESJ: res.data?.estMedcinESJ,
            medicalStudies: res.data?.medicalStudies || [{ annee: "", diplome: "", institut: "" }],
            medicalExperience: res.data?.medicalExperience || [{ annee: "", hopital: "", poste: "" }],
          });
        })
        .catch(err => {
          console.log(err);
          router.push('/auth/medecins');
        })
    }
  }

  function isTokenInvalidOrNotExist(token) {
    if (typeof token !== 'string' || token.trim() === '') {
      console.error('Token is invalid or does not exist');
      return true;
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  }

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducations = [...formData.medicalStudies];
    updatedEducations[index][name] = value;
    setFormData({ ...formData, medicalStudies: updatedEducations });
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperiences = [...formData.medicalExperience];
    updatedExperiences[index][name] = value;
    setFormData({ ...formData, medicalExperience: updatedExperiences });
  };

  const addEducationField = () => {
    setFormData(prevState => ({
      ...prevState,
      medicalStudies: [...prevState.medicalStudies, { annee: "", diplome: "", institut: "" }]
    }));
  };

  const removeEducationField = (index) => {
    const updatedEducations = formData.medicalStudies.filter((_, i) => i !== index);
    setFormData({ ...formData, medicalStudies: updatedEducations });
  };

  const addExperienceField = () => {
    setFormData(prevState => ({
      ...prevState,
      medicalExperience: [...prevState.medicalExperience, { annee: "", hopital: "", poste: "" }]
    }));
  };

  const removeExperienceField = (index) => {
    const updatedExperiences = formData.medicalExperience.filter((_, i) => i !== index);
    setFormData({ ...formData, medicalExperience: updatedExperiences });
  };

  const updateMedecin = (id, medecinData) => {
    console.log(medecinData);
    axios.patch(
      `${SPRINGBOOT_API_URL}/medecins/${id}`,
      medecinData,
      {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      }
    )
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
        } else {
          throw new Error("Failed to update medecin data");
        }
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  };

  const fetchMedecin = () => {
    try {
      setLoading(true);
      getMedecinData(user && user.claims.id);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch medecin data", error);
      toast.error("Failed to fetch medecin data.");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(SPRINGBOOT_API_URL+'/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      const imageUrl = response.data.url;
      setFormData((prevState) => ({
        ...prevState,
        image_url: imageUrl,
      }));
      setPreviewUrl(imageUrl);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Failed to upload image", error);
      toast.error("Failed to upload image.");
    }
  };

  const validateForm = () => {
    const { prenom, nom, mail, password, confirmPassword } = formData;
    if (!prenom || !nom || !mail) {
      toast.error("Prénom, Nom, and Email are required.");
      return false;
    }
    if (password && password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const updateData = { ...formData };
      delete updateData.confirmPassword;
      if (!formData.password) {
        delete updateData.password;
      }
      updateMedecin(user && user.claims.id, updateData);
      toast.success("Profile updated successfully!");
      setLoading(true);
    } catch (error) {
      console.error("Failed to update medecin data", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Sidebar
        id="menu-item1"
        id1="menu-items1"
        activeClassName="doctorprofile"
      />
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="doctors.html">Medecins</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right">
                    </i>
                  </li>
                  <li className="breadcrumb-item active">Profil Medecin</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="about-info">
                        <h4>
                          Profil du Docteur
                        </h4>
                      </div>
                      <div className="doctor-profile-head">
                        <div className="row">
                          <div className="profile-user-box">
                            <div className="profile-user-img">
                              <img
                                src={previewUrl || medecin?.image_url || Profileuser.src}
                                alt="Profile"
                              />{" "}
                              <div className="form-group doctor-up-files profile-edit-icon mb-0">
                                <div className="uplod d-flex">
                                  <label className="file-upload profile-upbtn mb-0">
                                    <img src={cameraicon.src} alt="Profile" />
                                    <input
                                      type="file"
                                      onChange={handleFileChange}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="names-profiles">
                              <h4>
                                {medecin?.prenom} {medecin?.nom}
                              </h4>
                              <h5>{medecin?.specialite}</h5>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "15px",
                                justifyContent: "flex-end",
                                width: "100%",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  justifyContent: "flex-end",
                                }}
                              >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-12 mt-4">
                            <h4 style={{ marginBottom: '40px' }}>Paramètres du compte</h4>
                            <div className="form-group">
                              <label>À propos de moi</label>
                              <textarea
                                className="form-control"
                                name="about"
                                rows="4"
                                value={formData.about || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>Prénom</label>
                              <input
                                disabled
                                type="text"
                                className="form-control"
                                name="prenom"
                                value={formData.prenom || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>Nom</label>
                              <input
                                disabled
                                type="text"
                                className="form-control"
                                name="nom"
                                value={formData.nom || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>Spécialité</label>
                              <input
                                type="text"
                                className="form-control"
                                name="specialite"
                                value={formData.specialite || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>Sexe</label>
                              <select
                                className="form-control"
                                name="sexe"
                                value={formData.sexe || ""}
                                onChange={handleInputChange}
                              >
                                <option value="M">Homme</option>
                                <option value="F">Femme</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>Email</label>
                              <input
                                type="email"
                                className="form-control"
                                name="mail"
                                disabled
                                value={formData.mail || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>CIN</label>
                              <input
                                type="text"
                                className="form-control"
                                disabled
                                name="cin"
                                value={formData.cin || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>PPR</label>
                              <input
                                type="text"
                                className="form-control"
                                name="ppr"
                                value={formData.ppr || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>INPE</label>
                              <input
                                type="text"
                                className="form-control"
                                disabled
                                name="inpe"
                                value={formData.inpe || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          {/* <div className="col-12">
                            <div className="form-group">
                              <label>Mot de passe</label>
                              <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="********"
                                value={formData.password || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>Confirmer le mot de passe</label>
                              <input
                                type="password"
                                className="form-control"
                                placeholder="********"
                                name="confirmPassword"
                                value={formData.confirmPassword || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div> */}
                          <div className="col-12">
                            <div className="form-group">
                              <label>LinkedIn username</label>
                              <input
                                type="text"
                                className="form-control"
                                name="linkedin"
                                value={formData.linkedin || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-6 col-xxl-9">
                            <label className="gen-label">
                              <label>Éducation</label>
                            </label>
                            {formData.medicalStudies.map((education, index) => (
                              <div key={index} className="form-group row align-items-center">
                                <div className="col-md-3">
                                  {index === 0 && (
                                    <label className="gen-label">
                                      <p style={{ fontSize: '15px' }}>Année
                                      <span style={{color:'white',
                                       visibility: 'hidden',
                                       userSelect: 'none',}}>ettFormation</span></p>
                                    </label>
                                  )}
                                  <input
                                    type="text"
                                    value={education.annee}
                                    onChange={(e) => handleEducationChange(index, e)}
                                    className="form-control"
                                    name="annee"
                                    placeholder="Année"
                                  />
                                </div>
                                <div className="col-md-3">
                                  {index === 0 && (
                                    <label className="gen-label">
                                      <p style={{ fontSize: '15px' }}>Diplôme/Formation</p>
                                    </label>
                                  )}
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="diplome"
                                    placeholder="Diplôme"
                                    value={education.diplome}
                                    onChange={(e) => handleEducationChange(index, e)}
                                  />
                                </div>
                                <div className="col-md-3">
                                  {index === 0 && (
                                    <label className="gen-label">
                                      <p style={{ fontSize: '15px' }}>Institut<span style={{color:'white',
                                       visibility: 'hidden',
                                       userSelect: 'none',}}>etFormation</span></p>
                                    </label>
                                  )}
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="institut"
                                    placeholder="Institut"
                                    value={education.institut}
                                    onChange={(e) => handleEducationChange(index, e)}
                                  />
                                </div>
                                <div className="col-md-3">
                                  {index === 0 && (
                                    <label className="gen-label">
                                    <span style={{color:'white',
                                       visibility: 'hidden',
                                       userSelect: 'none',}}>etFormationnnnn</span>
                                    </label>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => removeEducationField(index)}
                                    style={{
                                      backgroundColor: '#f0941f', // Orange color
                                      color: '#fff',
                                      border: 'none',
                                      padding: '8px 8px',
                                      borderRadius: '5px',
                                      fontSize: '15px',
                                      cursor: 'pointer',
                                      transition: 'all 0.3s ease',
                                    }}
                                    onMouseDown={(e) => {
                                      e.currentTarget.style.boxShadow = '0 2px #c0392b';
                                      e.currentTarget.style.transform = 'translateY(2px)';
                                    }}
                                    onMouseUp={(e) => {
                                      e.currentTarget.style.boxShadow = '0 4px #c0392b';
                                      e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                  >
                                    Remove
                                  </button>

                                </div>
                              </div>
                            ))}

                            <div className="col-md-4">
                              <button
                                type="button"
                                onClick={addEducationField}
                                style={{
                                  border: '2px dashed black',
                                  paddingTop: '6px',
                                  paddingBottom: '6px',
                                  paddingLeft: '120px',
                                  paddingRight: '120px',
                                  borderRadius: '10px',
                                  fontSize: '15px',
                                  marginTop: '10px',
                                  marginBottom: '20px'
                                }}
                              >
                                +Diplôme
                              </button>
                            </div>
                          </div>


                          <div className="col-12 col-md-6 col-xxl-9">
                            <label className="gen-label">
                              <label>Expérience</label>
                            </label>
                            {formData.medicalExperience.map((experience, index) => (
                              <div key={index} className="form-group row">
                                <div className="col-md-3">
                                  {index === 0 && (
                                    <label className="gen-label">
                                      <p style={{ fontSize: '15px' }}>Année
                                      <span style={{color:'white',
                                       visibility: 'hidden',
                                       userSelect: 'none',}}>etFormationn</span></p>
                                    </label>
                                  )}
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="annee"
                                    placeholder="Année"
                                    value={experience.annee}
                                    onChange={(e) => handleExperienceChange(index, e)}
                                  />
                                </div>
                                <div className="col-md-3">
                                  {index === 0 && (
                                    <label className="gen-label">
                                      <p style={{ fontSize: '15px' }}>Poste
                                      <span style={{color:'white',
                                       visibility: 'hidden',
                                       userSelect: 'none',}}>etFormationn</span>
                                      </p>
                                    </label>
                                  )}
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="poste"
                                    placeholder="Poste"
                                    value={experience.poste}
                                    onChange={(e) => handleExperienceChange(index, e)}
                                  />
                                </div>
                                <div className="col-md-3">
                                  {index === 0 && (
                                    <label className="gen-label">
                                      <p style={{ fontSize: '15px' }}>Lieu de travail
                                      <span style={{color:'white',
                                       visibility: 'hidden',
                                       userSelect: 'none',}}>etFn</span>
                                      </p>
                                    </label>
                                  )}
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="hopital"
                                    placeholder="Lieu de travail"
                                    value={experience.hopital}
                                    onChange={(e) => handleExperienceChange(index, e)}
                                  />
                                </div>
                                <div className="col-md-3">
                                  {index === 0 && (
                                    <label className="gen-label">
                                    <span style={{color:'white',
                                       visibility: 'hidden',
                                       userSelect: 'none',
                                       marginRight:'1px'}}>etFormationnnnn</span>
                                    </label>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => removeExperienceField(index)}
                                    style={{
                                      backgroundColor: '#f0941f', // Orange color
                                      color: '#fff',
                                      border: 'none',
                                      padding: '8px 8px',
                                      borderRadius: '5px',
                                      fontSize: '15px',
                                      cursor: 'pointer',
                                      transition: 'all 0.3s ease',
                                    }}
                                    onMouseDown={(e) => {
                                      e.currentTarget.style.boxShadow = '0 2px #c0392b';
                                      e.currentTarget.style.transform = 'translateY(2px)';
                                    }}
                                    onMouseUp={(e) => {
                                      e.currentTarget.style.boxShadow = '0 4px #c0392b';
                                      e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                            <div className="col-md-4">
                              <button
                                type="button"
                                onClick={addExperienceField}
                                style={{
                                  border: '2px dashed black',
                                  paddingTop: '6px',
                                  paddingBottom: '6px',
                                  paddingLeft: '120px',
                                  paddingRight: '120px',
                                  borderRadius: '10px',
                                  fontSize: '15px',
                                  marginTop: '10px',
                                  marginBottom: '30px'
                                }}
                              >
                                +Expérience
                              </button>
                            </div>
                          </div>
                          <h4 style={{ marginBottom: '40px' }}>Paramètres de sécurité </h4>
                          <div className="col-12">
                            <div className="form-group">
                              <label>Mot de passe</label>
                              <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="********"
                                value={formData.password || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>Confirmer le mot de passe</label>
                              <input
                                type="password"
                                className="form-control"
                                placeholder="********"
                                name="confirmPassword"
                                value={formData.confirmPassword || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          {/* <div className="col-12">
                            <div className="form-group form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="estGeneraliste"
                                name="estGeneraliste"
                                checked={formData.estGeneraliste}
                                onChange={handleCheckboxChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="estGeneraliste"
                              >
                                Généraliste
                              </label>
                            </div>

                            <div className="form-group form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="estMedcinESJ"
                                name="estMedcinESJ"
                                checked={formData.estMedcinESJ}
                                onChange={handleCheckboxChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="estMedcinESJ"
                              >
                                Médecin ESJ
                              </label>
                            </div>
                          </div> */}
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Mettre à jour
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default ModifierProfil;

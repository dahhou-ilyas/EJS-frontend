"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Sidebar from "../../../components/espaceMedecin/Sidebar1";
import { Profileuser } from "../../../components/espaceMedecin/imagepath";
import "../../../assets/css/style.css";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SPRINGBOOT_API_URL } from "@/config";

const Page = () => {
  const router = useRouter();
  const [medecin, setMedecin] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [user, setUser]=useState(null);
  let token = null;

  useEffect(() => {
    token = localStorage.getItem('access-token')

    if (isTokenInvalidOrNotExist(token)) {
      router.push('/auth/medecins');
    } else {
      const decodedToken = jwtDecode(token);
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const fetchMedecin = () => {
    try {
      getMedecinData(user && user.claims.id);
    } catch (error) {
      console.error("Failed to fetch medecin data", error);
    }
  };

  if (!medecin) {
    return <div>Loading...</div>;
  }

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
                    <Link href="doctors.html">Medecins </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right"></i>
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
                          Profil du Docteur{" "}
                        </h4>
                      </div>
                      <div className="doctor-profile-head">
                        <div className="row">
                          <div className="profile-user-box">
                            <div className="profile-user-img">
                              <img
                                src={medecin?.image_url || Profileuser.src}
                                alt="Profile"
                              />
                              <div className="form-group doctor-up-files profile-edit-icon mb-0">
                                <div className="uplod d-flex">
                                  <label className="file-upload profile-upbtn mb-0">
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="names-profiles">
                              <h4>
                                {medecin.nom} {medecin.prenom}
                              </h4>
                              <h5>{medecin.specialite}</h5>
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
                                {/* LinkedIn Link */}
                                <a
                                  className="btn"
                                  href={'https://www.linkedin.com/' + medecin.linkedin} 
                                  style={{
                                    borderColor: "transparent",
                                    color: "black",
                                    padding: "6px 12px",
                                    fontSize: "14px",
                                    backgroundColor: "transparent",
                                    display: "flex",
                                    alignItems: "center",
                                    textDecoration: "none",
                                  }}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <div
                                    className="personal-icons"
                                    style={{ marginRight: "8px" }}
                                  >
                                    <FontAwesomeIcon
                                      icon={faLinkedin}
                                      style={{
                                        color: "#0077B5",
                                        fontSize: "24px",
                                      }}
                                    />
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="doctor-personals-grp">
                  <div className="card">
                    <div className="card-body mt-1">
                      <div className="personal-list-out">
                        <div className="row">
                          <div className="card-body">
                            <div className="heading-detail">
                              <h4 className="mb-3">À propos de moi</h4>
                              <p>{medecin.about}</p>
                            </div>
                          </div>
                          <div className="grey-br" />
                          <div className="col-xl-3 col-md-6">
                            <div className="detail-personal">
                              <h2>Nom complet</h2>
                              <h3>
                                {medecin.prenom}&nbsp;{medecin.nom}
                              </h3>
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="detail-personal">
                              <h2>Spécialité</h2>
                              <h3>{medecin.specialite}</h3>
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6 ">
                            <div className="detail-personal">
                              <h2>Sexe</h2>
                              <h3>{medecin.sexe}</h3>
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6">
                            <div className="detail-personal">
                              <h2>Email</h2>
                              <h3>{medecin.mail}</h3>
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6 mt-3">
                            <div className="detail-personal">
                              <h2>Généraliste </h2>
                              <h3>{medecin.estGeneraliste ? "Oui" : "Non"}</h3>
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6 mt-3">
                            <div className="detail-personal">
                              <h2>Médecin ESJ </h2>
                              <h3>{medecin.estMedcinESJ ? "Oui" : "Non"}</h3>
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6 mt-3">
                            <div className="detail-personal">
                              <h2>CIN</h2>
                              <h3>{medecin.cin}</h3>
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6 mt-3">
                            <div className="detail-personal">
                              <h2>PPR</h2>
                              <h3>{medecin.ppr}</h3>
                            </div>
                          </div>
                          <div className="col-xl-3 col-md-6 mt-3">
                            <div className="detail-personal">
                              <h2>INPE</h2>
                              <h3>{medecin.inpe}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="hello-park">
                        <h5>Éducation</h5>
                        <div className="table-responsive">
                          <table className="table mb-0 border-0 custom-table profile-table">
                            <thead>
                              <tr>
                                <th>Année</th>
                                <th>Diplôme</th>
                                <th>Institut</th>
                              </tr>
                            </thead>
                            <tbody>
                              {medecin.medicalStudies &&
                                medecin.medicalStudies.map((edu, index) => (
                                  <tr key={index}>
                                    <td>{edu.annee}</td>
                                    <td>{edu.diplome}</td>
                                    <td>{edu.institut}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="hello-park mb-2">
                        <h5>Expérience</h5>
                        <div className="table-responsive">
                          <table className="table mb-0 border-0 custom-table profile-table">
                            <thead>
                              <tr>
                                <th>Année</th>
                                <th>Lieu de travail</th>
                                <th>Poste</th>
                              </tr>
                            </thead>
                            <tbody>
                              {medecin.medicalExperience &&
                                medecin.medicalExperience.map((exp, index) => (
                                  <tr key={index}>
                                    <td>{exp.annee}</td>
                                    <td>{exp.hopital}</td>
                                    <td>{exp.poste}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
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

export default Page;
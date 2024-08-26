"use client";

import React from 'react'
import { Profileuser, cameraicon, doctor, imagesend, medalicon, medalicon02, medalicon03, menuicon16, profilebg } from "../../../components/imagepath";
import Link from 'next/link';
import "../../../assets/css/style.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Sidebar from "../../../components/espaceMedecin/Sidebar1";
import Header from '@/components/espaceMedecin/Header';
import FeatherIcon from "feather-icons-react";

const page = () => {
  return (
    <div>
      <>
        <Header />
        <Sidebar />
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><Link href="doctors.html">Medecins </Link></li>
                    <li className="breadcrumb-item"><i className="feather-chevron-right">
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
                            Profil du Docteur{" "}

                          </h4>
                        </div>
                        <div className="doctor-profile-head">

                          <div className="row">
                            <div>
                              <div className="profile-user-box">
                                <div className="profile-user-img">
                                  <img
                                    src={Profileuser.src}
                                    alt="Profile"
                                  />
                                  <div className="form-group doctor-up-files profile-edit-icon mb-0">
                                    <div className="uplod d-flex">
                                      <label className="file-upload profile-upbtn mb-0">
                                        <img
                                          src={cameraicon.src}
                                          alt="Profile"
                                        />
                                        <input type="file" />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="names-profiles">
                                  <h4>Dr. Bruce Willis</h4>
                                  <h5>Médecin Senior</h5>
                                </div>
                                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', width: '100%' }}>
                                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                    <a
                                      className="btn"
                                      href="https://linkedin.com"
                                      style={{
                                        borderColor: 'transparent',
                                        color: 'black',
                                        fontSize: '14px',
                                        backgroundColor: 'transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        textDecoration: 'none',
                                        width: '30px',
                                        width: 'auto',
                                        padding: '0'
                                      }}
                                      target='_blank'
                                    >

                                      <FontAwesomeIcon icon={faLinkedin} style={{ color: '#0077B5', width: '40px' , height:'40px'}} />

                                    </a>

                                    <a
                                      className="btn"
                                      href="https://X.com"
                                      style={{
                                        borderColor: 'transparent',
                                        color: 'grey',
                                        fontSize: '14px',
                                        backgroundColor: 'transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        textDecoration: 'none',
                                        width: '30px',
                                        width: 'auto',
                                        padding: '0',
                                        marginRight: '29px'
                                      }}
                                      target='_blank'
                                    >

                                      <FontAwesomeIcon icon={faXTwitter} style={{
                                        color: '#000000', fontSize: '24px', width: '38px'
                                      }} />

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
                </div>
                <div className="row">

                  <div >
                    <div className="doctor-personals-grp">
                      <div className="card">
                        <div className="card-body mt-1">
                          <div className="personal-list-out">
                            <div className="row">
                              <div className="card-body ">
                                <div className="heading-detail ">
                                  <h4 className="mb-3">À propos de moi</h4>
                                  <p>
                                    Bonjour, je suis Dr. Bruce Willis, un gynécologue à l'hôpital Sanjivni de Surat.
                                    J'aime travailler avec tout le personnel de mon hôpital et les médecins seniors.
                                  </p>
                                </div>

                                <div className="col-xl-3 col-md-6">
                                  <div className="detail-personal mb-4">
                                    <h2>Nom complet</h2>
                                    <h3>Dr.Bruce Willis</h3>
                                  </div>
                                  <div className="detail-personal mb-4">
                                    <h2>Désignation</h2>
                                    <h3>Médecin Senior</h3>
                                  </div>


                                  <div className="detail-personal mb-4">


                                    <h2>Sexe</h2>
                                    <h3>Femme</h3>
                                  </div>
                                  
                                </div>
                                <div className="col-xl-3 col-md-6 mb-4">
                                  <div className="detail-personal">
                                    <h2>Mobile</h2>
                                    <h3>264-625-2583</h3>
                                  </div>
                                </div>
                                <div className="col-xl-3 col-md-6 mb-4">
                                  <div className="detail-personal">
                                    <h2>Email</h2>
                                    <h3>bruce@email.com</h3>
                                  </div>
                                </div>
                                <div className="col-xl-3 col-md-6">
                                  <div className="detail-personal">
                                    <h2>Localisation</h2>
                                    <h3>Los Angeles</h3>
                                  </div>
                                </div>
                              </div>



                            </div>
                          </div>

                          <div className="hello-park mb-2">
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
                                  <tr>
                                    <td>2002-2005</td>
                                    <td>M.D. en Médecine</td>
                                    <td>Université du Wyoming</td>

                                  </tr>
                                  <tr>
                                    <td>2005-2014</td>
                                    <td>MBBS</td>
                                    <td>Netherland Medical College</td>

                                  </tr>
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
                                    <th>Poste</th>
                                    <th>Hôpital</th>

                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>2002-2005</td>
                                    <td>Médecin Senior</td>
                                    <td>Clinique Médicale Midtown</td>

                                  </tr>
                                  <tr>
                                    <td>2005-2014</td>
                                    <td>Professeur Associé</td>
                                    <td>Netherland Medical College</td>

                                  </tr>
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

      </>
    </div>
  )
}

export default page

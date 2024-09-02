"use client";
import "@/assets/css/style.css";
import { useEffect, useState } from "react";
import React from "react";
import Sidebar from "@/components/TeleExpertise/Sidebar";
import pdfIcon from "@/assets/img/icons/pdf-icon.png";
import docIcon from "@/assets/img/icons/doc-icon.png";
import Link from "next/link";
import Image from "next/image";
import {
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
  ProfileUser,
  call,
  call01,
  call02,
  call03,
  callicon1,
  callicon2,
  callicon3,
  chaticon1,
  chaticon2,
  chaticon3,
  plusicon,
  videoicon1,
  videoicon2,
  videoicon3,
} from "@/components/imagepath";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
const discussion = {
  Titre: "Irritation Cutanée",
  CasDuPatient: "Maladie Rare",
  AntecedentsMedicaux: ["Diabète", "Epilepsie"],
  AntecedentsChirurgicaux: "Ablation de la vésicule biliaire en 2007",
  Habitudes: ["Sport"],
  AntecedentsFamiliaux: ["Hypertension artérielle (tension)"],
  Motif:
    "Discutons du cas d'un patient souffrant d'une irritation cutanée. Cette discussion abordera les causes potentielles, les symptômes et les traitements de l'irritation.",

  Traitement:
    "1. Application de crème hydratante\n2. Utilisation d'antihistaminiques\n3. Éviter les irritants connus\n4. Consultation avec un dermatologue",
  Fichiers: [
    {
      name: "Poumon-X-Rays.jpg",
      type: "image/png",
      src: "/Xrays.jpg",
    },
    {
      name: "Poumon-X-Rays2.jpeg",
      type: "image/png",
      src: "/Xrays2.jpeg",
    },
  ],
};

const renderPreviews = () => {
  return discussion.Fichiers.map((file, index) => (
    <div key={index} className="file-preview2">
      {file.type.match("image/*") ? (
        <Image
          src={file.src}
          alt={`Preview of ${file.name}`}
          objectFit="cover"
          width={300}
          height={300}
        />
      ) : (
        <div className="file-link">
          <Image
            src={file.type === "application/pdf" ? pdfIcon : docIcon}
            alt="File icon"
            width={file.type === "application/pdf" ? 35 : 52}
            height={file.type === "application/pdf" ? 47 : 47}
          />
          <a href={file.src} target="_blank" rel="noopener noreferrer">
            {file.name}
          </a>
        </div>
      )}
    </div>
  ));
};

const AppelVideo = () => {
  return (
    <div id="root">
      <Sidebar activeClassName="discussions" />
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/TeleExpertise/Discussions">Discussions </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <FeatherIcon icon="chevron-right" />
                  </li>
                  <li className="breadcrumb-item active">Appel Video</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/*Page Header*/}
        <div className="row">
          <div
            className="col-xl-3"
            style={{
              backgroundColor: "white",
              borderRadius: "30px",
              display: "flex",
              flexDirection: "column",
              padding: "40px",
              maxHeight: "900px",
              overflowY: "auto",
              marginBottom: "20px",
              marginLeft: "50px",
            }}
          >
            <div className="DiscussionTitle">{discussion.Titre}</div>
            <div className="DiscussionCas">{discussion.CasDuPatient}</div>
            <div className="DiscussionMotif">{discussion.Motif}</div>
            {discussion.AntecedentsMedicaux.length > 0 && (
              <div>
                <div className="Traitements">Antécédents Médicaux</div>
                {discussion.AntecedentsMedicaux.map((antecedent, index) => (
                  <div key={index} className="DiscussionMotif">
                    {index + 1}. {antecedent}
                  </div>
                ))}
              </div>
            )}
            {discussion.AntecedentsChirurgicaux != "" && (
              <div>
                <div className="Traitements">Antécédents Chirurgicaux</div>
                <div className="DiscussionMotif">
                  {discussion.AntecedentsChirurgicaux}
                </div>
              </div>
            )}
            {discussion.Habitudes.length > 0 && (
              <div>
                <div className="Traitements">Habitudes</div>
                {discussion.Habitudes.map((habitude, index) => (
                  <div key={index} className="DiscussionMotif">
                    {index + 1}. {habitude}
                  </div>
                ))}
              </div>
            )}
            {discussion.AntecedentsFamiliaux.length > 0 && (
              <div>
                <div className="Traitements">Antécédents Familiaux</div>
                {discussion.AntecedentsFamiliaux.map((antecedent, index) => (
                  <div key={index} className="DiscussionMotif">
                    {index + 1}. {antecedent}
                  </div>
                ))}
              </div>
            )}
            <div className="Traitements">Traitements</div>
            <div className="DiscussionTraitement">{discussion.Traitement}</div>
            {discussion.Fichiers.length > 0 && (
              <div>
                <div className="Fichiers">Fichiers Attachés</div>
                <div className="preview-container2">{renderPreviews()}</div>
              </div>
            )}
          </div>
          <div className="col-xl-8">
            {/*Video Call Header*/}
            <div className="card chat-box ">
              <div className=" chat-search-group ">
                <div className="chat-user-group clinic-user mb-0 d-flex align-items-center">
                  <div className="img-users call-user">
                    <Link href="#">
                      <Image src={Avatar1} alt="img" />
                    </Link>
                    <span className="active-users bg-info" />
                  </div>
                  <div className="chat-users">
                    <div className="user-titles">
                      <h5> Forest Kroch</h5>
                    </div>
                    <div className="user-text">
                      <p>Lorem ipsum dolor sit amet...</p>
                    </div>
                  </div>
                  <ul className="call-list-add">
                    <li>
                      <Link href="#">
                        <Image src={ProfileUser} alt="img" />
                        32
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Image src={plusicon} alt="img" />
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="chat-search-list">
                  <ul>
                    <li>
                      <Link href="/video-call">
                        <Image src={chaticon1} alt="img" />
                      </Link>
                    </li>
                    <li>
                      <Link href="/voice-call">
                        <Image src={chaticon2} alt="img" />
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Image src={chaticon3} alt="img" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Video Call Header */}
            <div className="card chat-box ">
              {/* Join Call */}
              <div className="page-content">
                <div className="meeting">
                  <div className="meeting-wrapper">
                    <div className="meeting-list">
                      {/* Horizontal View */}
                      <div className="join-contents horizontal-view fade-whiteboard">
                        <div className="join-video user-active">
                          <Image
                            src="/doctorVideo.png"
                            className="img-fluid call-imgs"
                            alt="Logo"
                            width={722}
                            height={354}
                          />
                          <div className="video-avatar">
                            <div className="text-avatar">
                              <div className="text-box">S</div>
                            </div>
                          </div>
                          <div className="part-name">
                            <h4 className="d-flex align-items-center">
                              <Image
                                src={videoicon3}
                                className="me-2"
                                alt="img"
                              />
                              Laura Strattenberg
                            </h4>
                          </div>
                          <div className="more-icon">
                            <Link href="#" className="handraise-on me-2">
                              <i className="fas fa-thumbtack" />
                            </Link>
                            <Link href="#" className="mic-off">
                              <i className="feather-mic-off"></i>
                            </Link>
                          </div>
                        </div>
                        <div className="join-video single-user">
                          <Image
                            src={call01}
                            className="img-fluid call-imgs"
                            alt="Logo"
                          />
                          <div className="part-name">
                            <h4 className="d-flex align-items-center">
                              <Image
                                src={videoicon3}
                                className="me-2"
                                alt="img"
                              />
                              Stephen Williams
                            </h4>
                          </div>
                          <div className="more-icon">
                            <Link href="#">
                              <i className="feather-mic-off"></i>
                            </Link>
                          </div>
                        </div>
                        <div className="join-video single-user">
                          <Image
                            src={call02}
                            className="img-fluid call-imgs"
                            alt="Logo"
                          />
                          <div className="part-name">
                            <h4 className="d-flex align-items-center">
                              <Image
                                src={videoicon3}
                                className="me-2"
                                alt="img"
                              />
                              Galaviz Lalema
                            </h4>
                          </div>
                          <div className="more-icon">
                            <Link href="#">
                              <i className="feather-mic-off"></i>
                            </Link>
                          </div>
                        </div>
                        <div className="join-video single-user">
                          <Image
                            src={call03}
                            className="img-fluid call-imgs"
                            alt="Logo"
                          />
                          <div className="part-name">
                            <h4 className="d-flex align-items-center">
                              <img
                                src={videoicon3}
                                className="me-2"
                                alt="img"
                              />
                              Smith Bruklin
                            </h4>
                          </div>
                          <div className="more-icon">
                            <Link href="#">
                              <i className="feather-mic-off"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* /Horizontal View */}
                    </div>
                    {/* Meet Footer */}
                    <div className="meet-footer">
                      <div className="meet-icons">
                        <div className="met-icons">
                          <ul className="meet-items">
                            <li className="meet-item">
                              <Link href="#" className="mute-bt">
                                <Image src={callicon3} alt="img" />
                              </Link>
                            </li>
                            <li className="meet-item">
                              <Link href="#" className="mute-video">
                                <i className="feather-video"></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="end-call-chat">
                          <Link href="#" className="btn btn-primary">
                            End Call
                          </Link>
                        </div>
                        <div className="end-calls">
                          <ul className="meet-items">
                            <li className="meet-item">
                              <Link href="#" className="hand-raise">
                                <Image src={callicon1} alt="img" />
                              </Link>
                            </li>
                            <li className="meet-item">
                              <Link href="#" className="showInviteList">
                                <Image src={callicon2} alt="img" />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* /Meet Footer */}
                  </div>
                </div>
              </div>
              {/* /Join Call */}
            </div>
            {/* /Chat */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppelVideo;

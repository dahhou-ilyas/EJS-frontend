"use client";
import "@/assets/css/style.css";
import { useEffect, useState } from "react";
import Sidebar from "@/components/TeleExpertise/Sidebar";
import Link from "next/link";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import Image from "next/image";
import Conversation from "@/components/TeleExpertise/Conversation";
import {
  Avatar1,
  Avatar3,
  Avatar2,
  Avatar5,
  chaticon4,
  chaticon5,
  chaticon6,
  chaticon8,
} from "@/components/TeleExpertise/imagepath";

const ChatMeeting = ({ params }) => {
  const discussion = {
    id: 1,
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
      { name: "Poumon-X-Rays.jpg", type: "image/png", src: "/Xrays.jpg" },
      { name: "Poumon-X-Rays2.jpeg", type: "image/png", src: "/Xrays2.jpeg" },
      { name: "Poumon-X-Rays2.jpeg", type: "image/png", src: "/Xrays2.jpeg" },
    ],
    user: "Dr. John Doe",
    messages: [
      {
        id: 1,
        type: "received",
        avatar: Avatar5,
        name: "Williams Bruk",
        message:
          "How likely are you to recommend our company to your friends and family?",
        time: "06:00 PM, 30 Sep 2022",
        attachments: [],
      },
      {
        id: 2,
        type: "sent",
        avatar: null,
        name: "",
        message:
          "How likely are you to recommend our company to your friends and family?",
        time: "06:00 PM, 30 Sep 2022",
        attachments: [],
      },
      {
        id: 3,
        type: "received",
        avatar: Avatar3,
        name: "Galaviz Lalema",
        message: "non tellus dignissim",
        time: "06:32 PM Yesterday",
        attachments: [
          { icon: chaticon4, name: "Explainer Video.avi", size: "30.0 MB" },
          { icon: chaticon5, name: "Ayush Therapy.mp3", size: "4.0 MB" },
          { icon: chaticon6, name: "The liver.img", size: "520KB" },
        ],
      },
      {
        id: 4,
        type: "sent",
        avatar: null,
        name: "",
        message: "Vivamus sed dictum dictum ligula, cursus blandit risus",
        extraMessage: "Vivamus sed dictum",
        time: "06:50 PM Today",
        attachments: [
          { icon: chaticon4, name: "Explainer Video.avi", size: "30.0 MB" },
          { icon: chaticon5, name: "Ayush Therapy.mp3", size: "4.0 MB" },
          { icon: chaticon6, name: "The liver.img", size: "520KB" },
        ],
      },
      {
        id: 5,
        type: "received",
        avatar: Avatar1,
        name: "21 savage",
        message: "aliquam ut a ex",
        time: "5min Ago",
        attachments: [],
      },
    ],
  };

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
                  <li className="breadcrumb-item active">Réunion Chat</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="col-xl-3"
            style={{
              backgroundColor: "white",
              borderRadius: "30px",
              display: "flex",
              flexDirection: "column",
              padding: "40px",
              maxHeight: "530px",
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
                <div className="preview-container2">
                  {discussion.Fichiers.map((file, index) => (
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
                            src={
                              file.type === "application/pdf"
                                ? pdfIcon
                                : docIcon
                            }
                            alt="File icon"
                            width={file.type === "application/pdf" ? 35 : 52}
                            height={file.type === "application/pdf" ? 47 : 47}
                          />
                          <a
                            href={file.src}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {file.name}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Conversation messages={discussion.messages} user={discussion.user} />
        </div>
      </div>
    </div>
  );
};

export default ChatMeeting;

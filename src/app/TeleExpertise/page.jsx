/* eslint-disable react/no-unescaped-entities */
"use client";
import "@/assets/css/style.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import Sidebar from "@/components/TeleExpertise/Sidebar";
import { morning_img_02 } from "@/components/TeleExpertise/imagepath";
import { useRouter } from "next/navigation";

import Discussion from "@/components/TeleExpertise/Discussion";

const discussions = [
  {
    id: 1,
    title: "Irritation cutanée",
    description:
      "Discutons du cas d'un patient souffrant d'une irritation cutanée. Cette discussion abordera les causes potentielles, les symptômes et les traitements",
    doctor: "Aymane El bazi",
    doctorSpeciality: "Chirurgien",
    neededSpecialities: ["Dermatologue", "Infectiologue"],
    date: "21/02/2024",
    time: "11:00",
  },
  {
    id: 2,
    title: "Microbe dentaire",
    description:
      "Discutons du cas d'un patient souffrant d'une irritation cutanée. Cette discussion abordera les causes potentielles.",
    doctor: "Elbachir Janah",
    doctorSpeciality: "Chirurgien",
    neededSpecialities: ["Dentiste"],
    date: "21/08/2024",
    time: "10:30",
  },
  {
    id: 3,
    title: "Microbe dentaire",
    description:
      "Discutons du cas d'un patient souffrant d'une irritation cutanée. Cette discussion abordera les causes potentielles, les symptômes et les traitements de l'irritation.",
    doctor: "Issam Elmonakhi",
    doctorSpeciality: "Dermatologue",
    neededSpecialities: ["Dentiste", "Cardiologue"],
    date: "10/09/2024",
    time: "10:00",
  },
  {
    id: 4,
    title: "Microbe dentaire",
    description:
      "Discutons du cas d'un patient souffrant d'une irritation cutanée. Cette discussion abordera les causes potentielles, les symptômes et les traitements de l'irritation.",
    doctor: "Salma Elmonakhi",
    doctorSpeciality: "Cardiologue",
    neededSpecialities: ["Dentiste", "Cardiologue"],
    date: "10/09/2024",
    time: "10:00",
  },
];

const Home = () => {
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleCreateDiscussion = () => {
    router.push("/TeleExpertise/Formulaire");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="root">
      <Sidebar activeClassName="dashboard" />
      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div
            className="page-header"
            style={isSmallScreen ? { marginBottom: "70px" } : {}}
          >
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/TeleExpertise">Page d'accueil </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <FeatherIcon icon="chevron-right" />
                  </li>
                  <li className="breadcrumb-item active">tableau de bord</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Page Header */}

          <div className="topSection" style={{ marginTop: "-40px" }}>
            {!isSmallScreen && (
              <div className="buttons-section text-end mb-4">
                <button
                  onClick={handleCreateDiscussion}
                  type="button"
                  className="btn me-1 button-creation"
                  style={{
                    borderColor: "#2F38A3",
                    backgroundColor: "#2F38A3",
                    borderRadius: "20px",
                    color: "white",
                    width: "220px",
                    fontSize: "15px",
                  }}
                >
                  Créer une discussion
                </button>
              </div>
            )}

            {/* Bonjour Section */}
            <div className="good-morning-blk">
              <div className="row">
                <div className="col-md-6">
                  <div className="morning-user">
                    <h2>
                      Bonjour, <span>Dr.Ahmed Berada </span>
                    </h2>
                    <p>Bonne journée au travail</p>
                  </div>
                </div>
                <div className="col-md-6 position-blk">
                  <div className="morning-img z-index-0">
                    <Image src={morning_img_02} alt="" />
                  </div>
                </div>
              </div>
            </div>
            {/* Bonjour Section */}
          </div>

          {isSmallScreen && (
            <div className="buttons-section text-center mb-4">
              <button
                onClick={handleCreateDiscussion}
                type="button"
                className="btn btn-primary button-creation"
                style={{
                  borderColor: "#2F38A3",
                  backgroundColor: "#2F38A3",
                  borderRadius: "20px",
                }}
              >
                Créer une discussion
              </button>
            </div>
          )}

          {/* Discussion Section */}
          <div className="discussion-section mt-5">
            <h3>Pour Vous</h3>
            <div className="discussion-list mt-3">
              {discussions.map((discussion) => (
                <Discussion
                  key={discussion.id}
                  title={discussion.title}
                  description={discussion.description}
                  doctor={discussion.doctor}
                  doctorSpeciality={discussion.doctorSpeciality}
                  doctorPhoto={discussion.doctorPhoto}
                  neededSpecialities={discussion.neededSpecialities}
                  date={discussion.date}
                  time={discussion.time}
                />
              ))}
            </div>
          </div>
          {/* Discussion Section */}
        </div>
      </div>
    </div>
  );
};

export default Home;

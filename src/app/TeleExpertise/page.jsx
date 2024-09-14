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
import { format } from 'date-fns';
import Discussion from "@/components/TeleExpertise/Discussion";
import { decodeToken } from "@/utils/docodeToken";
import { getOuverteDiscussion } from "@/services/discussionService";

const Home = () => {
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [name, setName] = useState("")
  const [userId, setUserId] = useState()
  const [discussions, setDiscussions] = useState([])

  const handleCreateDiscussion = () => {
    router.push("/TeleExpertise/Formulaire");
  };

  useEffect(() => {
    async function fetchData () {
      const token = localStorage.getItem("access-token")
      const decodedToken = decodeToken(token)
      setName(decodedToken.claims.nom+ " " + decodedToken.claims.prenom)
      setUserId(decodedToken.claims.id)
      const data = await getOuverteDiscussion(token)
      setDiscussions(data)
    }
    fetchData()
  }, [])

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
      <Sidebar/>
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
                    <Link href="/espaceMedecin">Page d&#39;accueil </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <FeatherIcon icon="chevron-right" />
                  </li>
                  <li className="breadcrumb-item active">Télé-Expertise</li>
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
                      Bonjour, <span>Dr.{name} </span>
                    </h2>
                    <p>Bonne journée au travail</p>
                  </div>
                </div>
                {/* <div className="col-md-6 position-blk">
                  <div className="morning-img z-index-0">
                    <Image src={morning_img_02} alt="" />
                  </div>
                </div> */}
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
          {
            discussions.length > 0 &&
            <div className="discussion-section mt-5">
              <h3>Pour Vous</h3>
              <div className="discussion-list mt-3">
                {discussions.map((discussion) => (
                  discussion.medcinResponsable.nom + " " + discussion.medcinResponsable.prenom != name && 
                  !discussion.participants.some(participant => participant.id === userId) &&
                  <Discussion
                    key={discussion.id}
                    id={discussion.id}
                    title={discussion.titre}
                    description={discussion.motifDeTeleExpertise}
                    doctor={discussion.medcinResponsable.nom + " " + discussion.medcinResponsable.prenom}
                    doctorSpeciality={discussion.medcinResponsable.specialite}
                    doctorPhoto={discussion.doctorPhoto}
                    neededSpecialities={discussion.specialitesDemandees}
                    date={format(discussion.date , 'yyyy-MM-dd')}
                    time={discussion.heure}
                    setDiscussions={setDiscussions}
                  />
                ))}
              </div>
            </div>
          }
          {/* Discussion Section */}
        </div>
      </div>
    </div>
  );
};

export default Home;

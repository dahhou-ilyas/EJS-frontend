/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/TeleExpertise/Sidebar";
import "@/assets/css/style.css";
import Link from "next/link";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import DiscussionCree from "@/components/TeleExpertise/DiscussionCree";
import DiscussionPlanifiee from "@/components/TeleExpertise/DiscussionPlanifiee";
import DiscussionTerminee from "@/components/TeleExpertise/DiscussionTerminee";
import Invitation from "@/components/TeleExpertise/Invitation";
import Pagination from 'react-bootstrap/Pagination';
import { getInvitations, getMyCreatedDiscussions, getPlanifiedDiscussions, getTerminedDiscussions } from "@/services/discussionService";

const Discussions = () => {
  const [discussionsCrees, setDiscussionsCrees] = useState()
  const [discussionsPlanifiees, setDiscussionsPlanifiees] = useState()
  const [discussionsTerminees, setDiscussionsTerminees] = useState()
  const [invitations, setInvitations] = useState([])

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("access-token")
      setDiscussionsCrees((await getMyCreatedDiscussions(token)))
      setDiscussionsPlanifiees((await getPlanifiedDiscussions(token)))
      setDiscussionsTerminees((await getTerminedDiscussions(token)))
      setInvitations(await getInvitations(token))
    }
    fetchData()
  }, [])


  const handlePageChangeCreated = async (pageNumber) => {
    const token = localStorage.getItem("access-token")
    setDiscussionsCrees((await getMyCreatedDiscussions(token, pageNumber)))
  };

  const handlePageChangePlanified = async (pageNumber) => {
    const token = localStorage.getItem("access-token")
    setDiscussionsPlanifiees((await getPlanifiedDiscussions(token, pageNumber)))
  };

  const handlePageChangeTermined = async (pageNumber) => {
    const token = localStorage.getItem("access-token")
    setDiscussionsTerminees((await getTerminedDiscussions(token, pageNumber)))
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
                    <Link href="/espaceMedecin">Page d&#39;accueil </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <FeatherIcon icon="chevron-right" />
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/TeleExpertise">Télé-Expertise</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <FeatherIcon icon="chevron-right" />
                  </li>
                  <li className="breadcrumb-item active">Discussions</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Page Header */}
          <div className="col-md-12 mx-auto">
            <div className="card">
              <div className="card-body">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      href="#solid-rounded-justified-tab1"
                      data-bs-toggle="tab"
                    >
                      Crées
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      href="#solid-rounded-justified-tab2"
                      data-bs-toggle="tab"
                    >
                      Planifiées
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      href="#solid-rounded-justified-tab3"
                      data-bs-toggle="tab"
                    >
                      Terminées
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      href="#solid-rounded-justified-tab4"
                      data-bs-toggle="tab"
                    >
                      Invitations
                      {invitations.length !== 0 ? (
                        <span className="badge bg-danger rounded-pill ms-2">{invitations.length}</span>
                      ) : null}
                    </Link>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className="tab-pane show active"
                    id="solid-rounded-justified-tab1"
                  >
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Titre</th>
                          <th>Spécialités Demandées</th>
                          <th>Invitations Acceptées</th>
                          <th>Invitations Rejetées</th>
                          <th>Date</th>
                          <th>Heure</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {discussionsCrees && discussionsCrees.content.map((discussion) => (
                          <DiscussionCree
                            key={discussion.id}
                            id={discussion.id}
                            title={discussion.titre}
                            neededSpecialities={discussion.specialitesDemandees}
                            acceptedInvitations={
                              discussion.invitations
                                .filter(invitation => invitation.status === 'ACCEPTE')
                                .map(invitation => "Dr. " + invitation.medecinInvite.nom)
                            }
                            rejectedInvitations={
                              discussion.invitations
                                .filter(invitation => invitation.status === 'REFUSE')
                                .map(invitation => "Dr. " + invitation.medecinInvite.nom)
                            }
                            date={discussion.date}
                            time={discussion.heure}
                            status={discussion.status}
                            type={discussion.type}
                          />
                        ))}
                      </tbody>
                    </table>

                    {
                      discussionsCrees &&
                      discussionsCrees.totalPages > 1 &&
                      <Pagination>
                        {[...Array(discussionsCrees.totalPages)].map((_, index) => (
                          <Pagination.Item
                            key={index + 1}
                            active={index === discussionsCrees.currentPage}
                            onClick={() => handlePageChangeCreated(index)}
                            style={{margin: index === 0 ? "0 0 0 auto" : index === discussionsCrees.totalPages -1 ? "0 auto 0 0" : "" }}
                          >
                            {index + 1}
                          </Pagination.Item>
                        ))}
                      </Pagination>
                    }

                  </div>
                  <div className="tab-pane" id="solid-rounded-justified-tab2">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Titre</th>
                          <th>Lancée Par</th>
                          <th>Spécialités Demandées</th>
                          <th>Date</th>
                          <th>Heure</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          discussionsPlanifiees &&
                          discussionsPlanifiees.content.map((discussion) => (
                            <DiscussionPlanifiee
                              key={discussion.id}
                              discussionId={discussion.id}
                              title={discussion.titre}
                              MainDoctor={"Dr. " + discussion.medcinResponsable.nom + " " + discussion.medcinResponsable.prenom}
                              neededSpecialities={discussion.specialitesDemandees}
                              date={discussion.date}
                              time={discussion.heure}
                              type={discussion.type}
                              status={discussion.status}
                          />
                        ))}
                      </tbody>
                    </table>
                    {
                      discussionsPlanifiees &&
                      discussionsPlanifiees.totalPages > 1 &&
                      <Pagination>
                        {[...Array(discussionsPlanifiees.totalPages)].map((_, index) => (
                          <Pagination.Item
                            key={index + 1}
                            active={index === discussionsPlanifiees.currentPage}
                            onClick={() => handlePageChangePlanified(index)}
                            style={{margin: index === 0 ? "0 0 0 auto" : index === discussionsPlanifiees.totalPages -1 ? "0 auto 0 0" : "" }}
                          >
                            {index + 1}
                          </Pagination.Item>
                        ))}
                      </Pagination>
                    }
                  </div>
                  <div className="tab-pane" id="solid-rounded-justified-tab3">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Titre</th>
                          <th>Lancée Par</th>
                          <th>Participants</th>
                          <th>Date</th>
                          <th>Heure</th>
                          <th>Compte Rendu</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          discussionsTerminees &&
                          discussionsTerminees.content.map((discussion) => (
                            <DiscussionTerminee
                              key={discussion.id}
                              discussionId={discussion.id}
                              title={discussion.titre}
                              MainDoctor={"Dr. " + discussion.medcinResponsable.nom + " " + discussion.medcinResponsable.prenom}
                              DoctorsWhoAttended={
                                discussion.participants
                                  .map(participant => "Dr. " + participant.nom)
                              }
                              date={discussion.date}
                              time={discussion.heure}
                            />
                        ))}
                      </tbody>
                    </table>
                    {
                      discussionsTerminees &&
                      discussionsTerminees.totalPages > 1 &&
                      <Pagination>
                        {[...Array(discussionsTerminees.totalPages)].map((_, index) => (
                          <Pagination.Item
                            key={index + 1}
                            active={index === discussionsTerminees.currentPage}
                            onClick={() => handlePageChangeTermined(index)}
                            style={{margin: index === 0 ? "0 0 0 auto" : index === discussionsTerminees.totalPages -1 ? "0 auto 0 0" : "" }}
                          >
                            {index + 1}
                          </Pagination.Item>
                        ))}
                      </Pagination>
                    }
                  </div>
                  <div
                    className="tab-pane"
                    id="solid-rounded-justified-tab4"
                    style={{ borderRadius: "30px", background: "#F5F5F6" }}
                  >
                    <div className="discussion-section mt-5">
                      <div className="discussion-list mt-3">
                        {invitations.map((invitation) => (
                          <Invitation
                            key={invitation.discussion.id}
                            invitationId={invitation.id}
                            title={invitation.discussion.titre}
                            description={invitation.discussion.motifDeTeleExpertise}
                            doctor={invitation.discussion.medcinResponsable.nom + " " + invitation.discussion.medcinResponsable.prenom}
                            doctorSpeciality={invitation.discussion.medcinResponsable.specialite}
                            //doctorPhoto={invitation.discussion.doctorPhoto}
                            date={invitation.discussion.date}
                            time={invitation.discussion.heure}
                            setInvitations={setInvitations}
                          />
                        ))}
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

export default Discussions;

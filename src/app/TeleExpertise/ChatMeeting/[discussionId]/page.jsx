"use client";
import "@/assets/css/style.css";
import { useEffect, useState } from "react";
import Sidebar from "@/components/TeleExpertise/Sidebar";
import Link from "next/link";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import Image from "next/image";
import Conversation from "@/components/TeleExpertise/Conversation";
import { useWebSocket } from "@/hooks/useWebSocket";
import { endDiscussion, getDiscussion } from "@/services/discussionService";
import { decodeToken } from "@/utils/docodeToken";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import toast from "react-hot-toast";
import pdfIcon from "@/assets/img/icons/pdf-icon.png";
import docIcon from "@/assets/img/icons/doc-icon.png";

const ChatMeeting = ({ params }) => {
  const router = useRouter()
  const { connect, isConnected, stompClient } = useWebSocket()
  const [userId, setUserId] = useState()
  const [discussion, setDiscussion] = useState()
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState("")
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (isConnected && stompClient) {
      const subscription1 = stompClient.subscribe(
        `/topic/discussion/${params.discussionId}`,
        (message) => {
          const messageBody = JSON.parse(message.body);
          console.log(messageBody)
          const receivedMessage = {
            id: Math.random(),
            type: messageBody.sender.id+"" !== userId+"" ? "received" : "sent",
            name: messageBody.sender.nom + " " + messageBody.sender.prenom,
            message: messageBody.content,
            time: format(new Date(), "hh:mm a, dd MMM yyyy"), 
            attachments: [],
          }
          setMessages((prevMessages) => [...prevMessages, receivedMessage])
        }
      );

      const subscription2 = stompClient.subscribe(
        `/topic/discussion/${params.discussionId}/ended`,
        (message) => {
          const messageBody = JSON.parse(message.body);
          if (userId === messageBody.medcinConsulteId) {
            toast.success("La discussion est terminée.")
            router.push(`/TeleExpertise/Report/${params.discussionId}`)
          } else {
            toast.success("La discussion est terminée. Veuillez patienter quelques minutes pour que le médecin consulté termine le rapport.")
            router.push("/TeleExpertise/Discussions")
          }
        }
      );

      return () => {
        subscription1.unsubscribe();
        subscription2.unsubscribe();
      };
    }
  }, [isConnected, stompClient]);

  const fetchFiles = async () => {
    const response = await fetch(`/api/upload?id=${params.discussionId}`);
    const data = await response.json();
    setFileList(data.files);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("access-token")
        const decodedToken = decodeToken(token)
        setUserId(decodedToken.claims.id)
        await connect(token);
        const res = await getDiscussion(token, params.discussionId);
        setDiscussion(res)
        if (res.status !== "EN_COURS") {
          router.push("/TeleExpertise")
        } else {
          fetchFiles()
        }
      } catch (error) {
        router.push("/TeleExpertise")
        console.log(error.message)
      }
    }
    fetchData()
  }, [])

  const sendMessage = () => {
    if (stompClient && isConnected) {
      const chatMessage = {
        senderId: userId,
        discussionId: params.discussionId,
        content: value,
        type: "CHAT",
      };
      stompClient.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(chatMessage),
      });
      setValue("");
    } else {
      console.error("Cannot send message: STOMP client is not connected.");
    }
  };

  const sendEndedDiscussionMessage = () => {
    if (stompClient && isConnected) {
      stompClient.publish({
        destination: "/app/chat.endDiscussion",
        body: JSON.stringify(params.discussionId),
      });
    } else {
      console.error("Cannot send message: STOMP client is not connected.");
    }
  }

  const terminerDiscussion = async () => {
    const confirmed = window.confirm('Etes-vous sûr de vouloir terminer cette discussion ?');
    if (confirmed) {
      try {
        const token = localStorage.getItem("access-token");
  
        await endDiscussion(token, params.discussionId);
  
        sendEndedDiscussionMessage()
  
        const deleteResponse = await fetch(`/api/upload?id=${params.discussionId}`, {
          method: 'DELETE',
        });
  
        const deleteResult = await deleteResponse.json();
  
        if (deleteResponse.ok) {
            console.log("Files deleted successfully:", deleteResult);
        } else {
          console.error("Failed to delete files:", deleteResult.message);
          //throw new Error(deleteResult.message);
        }
        router.push("/TeleExpertise")
      } catch (error) {
        console.log(error.message);
        toast.error("Quelque chose s'est mal passé, veuillez réessayer");
      }
    }
  };

  const leaveDiscussion = () => {
    const confirmed = window.confirm('Etes-vous sûr de vouloir quitter cette discussion ?');
    if (confirmed) {
      router.push("/TeleExpertise")
    }
  }

  if(
    (discussion && userId) && 
    ((!discussion.participants.some(participant => participant.id === userId) && !(discussion.medcinResponsable.id === userId)) ||
    discussion.status !== "EN_COURS" ||
    discussion.type !== "CHAT")
  ) {
    router.push("/TeleExpertise")
    return;
  }

  return (
    <div id="root">
      <Sidebar activeClassName="discussions" />
      {
        discussion && 
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
                    <li className="breadcrumb-item">
                      <Link href="/TeleExpertise/Discussions">Discussions</Link>
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
              <div className="DiscussionTitle">{discussion.titre}</div>
              <div className="DiscussionCas">{discussion.CasDuPatient}</div>
              <div className="DiscussionMotif">{discussion.motif}</div>
              {discussion.antecedentsMedicaux.length > 0 && (
                <div>
                  <div className="Traitements">Antécédents Médicaux</div>
                  {discussion.antecedentsMedicaux.map((antecedent, index) => (
                    <div key={index} className="DiscussionMotif">
                      {index + 1}. {antecedent}
                    </div>
                  ))}
                </div>
              )}
              {discussion.antecedentsChirurgicaux != "" && (
                <div>
                  <div className="Traitements">Antécédents Chirurgicaux</div>
                  <div className="DiscussionMotif">
                    {discussion.antecedentsChirurgicaux}
                  </div>
                </div>
              )}
              {discussion.habitudes.length > 0 && (
                <div>
                  <div className="Traitements">habitudes</div>
                  {discussion.habitudes.map((habitude, index) => (
                    <div key={index} className="DiscussionMotif">
                      {index + 1}. {habitude}
                    </div>
                  ))}
                </div>
              )}
              {discussion.antecedentsFamiliaux.length > 0 && (
                <div>
                  <div className="Traitements">Antécédents Familiaux</div>
                  {discussion.antecedentsFamiliaux.map((antecedent, index) => (
                    <div key={index} className="DiscussionMotif">
                      {index + 1}. {antecedent}
                    </div>
                  ))}
                </div>
              )}
              {fileList.length > 0 && (
                <div>
                  <div className="Fichiers">Fichiers Attachés</div>
                  <div className="preview-container2">
                    {fileList.map((file, index) => (
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
                    {discussion.commentaireFichiers != "" && (
                      <div>
                        <div className="Traitements">Commentaire Fichiers</div>
                        <div className="DiscussionMotif">
                          {discussion.commentaireFichiers}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="col-xl-8">
              <Conversation 
                messages={messages} 
                value={value} 
                setValue={setValue} 
                sendMessage={sendMessage}
                //targetDate={discussion.date}
                targetDate={new Date(new Date().getTime() + 30 * 60 * 1000)}
              />
              <div className="w-100">
                {
                  discussion.medcinResponsable.id === userId ?
                  <button 
                    className="btn btn-danger d-block mx-auto"
                    onClick={terminerDiscussion}
                  >
                    Terminer la discussion
                  </button>
                  :
                  <button 
                    className="btn btn-danger d-block mx-auto"
                    onClick={leaveDiscussion}
                  >
                    Quitter la discussion
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ChatMeeting;

/* eslint-disable react/no-unescaped-entities */
"use client";
import "@/assets/css/style.css";
import { useEffect, useState } from "react";
import Sidebar from "@/components/TeleExpertise/Sidebar";
import Link from "next/link";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import ChatSideContent from "@/components/TeleExpertise/ChatSideContent";
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
import { useWebSocket } from "@/hooks/useWebSocket";
import axios from "axios";
import { decodeToken } from "@/utils/docodeToken";
import { getMessages } from "@/services/chatService";
import { format } from "date-fns";
import { getMedecinById } from "@/services/medecinService";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState("")
  const { connect, isConnected, stompClient } = useWebSocket()
  const [otherUser, setOtherUser] = useState({})
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("access-token")
    const decodedToken = decodeToken(token)
    if (isConnected && stompClient) {
      const subscription = stompClient.subscribe(`/user/${decodedToken.claims.id}/queue/messages`, onMessageReceived);

      return () => {
        subscription.unsubscribe();
      };
    } 
  }, [stompClient, isConnected])

  useEffect(() => {
    const token = localStorage.getItem("access-token")
    const decodedToken = decodeToken(token)
    async function fetchData() {
      try {
        const res = await getMessages(token, decodedToken.claims.id, params.userId)
        const other = await getMedecinById(token, params.userId)
        setMessages(res.map(message => ({
          ...message,
          type: message.senderId === decodedToken.claims.id ? "sent" : "received",
          message: message.content,
          time: format(message.timestamp, "hh:mm a, dd MMM yyyy"),
          name: message.senderId === decodedToken.claims.id ? decodedToken.claims.nom + " " + decodedToken.claims.prenom : other.nom + " " + other.prenom,
          attachments: []
        })))
        setOtherUser(await getMedecinById(token, params.userId))
        connect(token)
      } catch (error) {
        router.push("/TeleExpertise/Chat")
        console.log(error.message)
      }
    }
    fetchData()
  }, [])


  const onMessageReceived = (payload) => {
    const token = localStorage.getItem("access-token")
    const decodedToken = decodeToken(token)
    const messageBody = JSON.parse(payload.body);
    console.log("Message received: ", messageBody)
    if(messageBody.senderId === Number(params.userId)) {
      setMessages(prev => [
        ...prev,
        {
          ...messageBody,
          type: "received",
          message: messageBody.content,
          time: format(messageBody.timestamp, "hh:mm a, dd MMM yyyy"),
          name: otherUser.nom + " " + otherUser.prenom,
          attachments: []
        }
      ])
    }
  }

  const sendMessage = () => {
    const token = localStorage.getItem("access-token")
    const decodedToken = decodeToken(token)
    const chatMessage = {
      senderId: decodedToken.claims.id,
      recipientId: params.userId,
      content: value,
      timestamp: new Date()
    };
    stompClient.publish({
      destination: "/app/chat",
      body: JSON.stringify(chatMessage),
    });
    
    setMessages(prev => [
      ...prev,
      {
        id: Math.random(),
        type: "sent",
        message: value,
        time: format(new Date(), "hh:mm a, dd MMM yyyy"),
        name: decodedToken.claims.nom + " " + decodedToken.claims.prenom,
        attachments: []
      }
    ])
    setValue("")
  }


  return (
    <>
      <Sidebar activeClassName="chat" />
      <>
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
                    <li className="breadcrumb-item active">Chat</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            {/* Chat Main */}
            <div className="row">
              <ChatSideContent userId={params.userId} />
              <div className="col-lg-8 col-sm-12">
                <Conversation 
                  messages={messages} 
                  value={value} 
                  setValue={setValue} 
                  sendMessage={sendMessage}
                  targetDate={new Date(new Date().getTime() + 30 * 60 * 1000)}
                />
              </div>
            </div>
            {/* Chat Main */}
          </div>
        </div>
      </>
    </>
  );
};

export default Page;

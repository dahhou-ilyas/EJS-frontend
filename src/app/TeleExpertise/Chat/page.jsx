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
const Chat = () => {
  const users = [
    {
      id: 1,
      name: "William Stephin",
      avatar: Avatar5,
      lastMessageTime: "10:22 AM",
      lastMessage: "Lorem ipsum dolor sit amet...",
      unreadCount: 3,
      active: true,
    },
    {
      id: 2,
      name: "Mark Hay Smith",
      avatar: Avatar2,
      lastMessageTime: "2hrs ago",
      lastMessage: "Lorem ipsum dolor sit amet...",
      unreadCount: 0,
      active: false,
    },
    {
      id: 3,
      name: "William Stephin",
      avatar: Avatar3,
      lastMessageTime: "11:35 AM",
      lastMessage: "Lorem ipsum dolor sit amet...",
      unreadCount: 4,
      active: false,
    },
    {
      id: 4,
      name: "hamza",
      avatar: Avatar1,
    },
  ];
  const messages = [];
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
                      <Link href="/TeleExpertise">Page d'accueil </Link>
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
              <ChatSideContent users={users} />
            </div>
            {/* Chat Main */}
          </div>
        </div>
      </>
    </>
  );
};

export default Chat;

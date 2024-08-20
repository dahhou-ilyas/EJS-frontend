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

const page = ({ params }) => {
  const users = [
    {
      id: 1,
      name: "William Stephin",
      avatar: Avatar5,
      lastMessageTime: "10:22 AM",
      lastMessage: "Lorem ipsum dolor sit amet...",
      unreadCount: 3,
      active: true,
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
            {
              icon: chaticon4,
              name: "Explainer Video.avi",
              size: "30.0 MB",
            },
            {
              icon: chaticon5,
              name: "Ayush Therapy.mp3",
              size: "4.0 MB",
            },
            {
              icon: chaticon6,
              name: "The liver.img",
              size: "520KB",
            },
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
            {
              icon: chaticon4,
              name: "Explainer Video.avi",
              size: "30.0 MB",
            },
            {
              icon: chaticon5,
              name: "Ayush Therapy.mp3",
              size: "4.0 MB",
            },
            {
              icon: chaticon6,
              name: "The liver.img",
              size: "520KB",
            },
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
    },
    {
      id: 2,
      name: "Mark Hay Smith",
      avatar: Avatar2,
      lastMessageTime: "2hrs ago",
      lastMessage: "Lorem ipsum dolor sit amet...",
      unreadCount: 0,
      active: false,
      messages: [],
    },
    {
      id: 3,
      name: "William Stephin",
      avatar: Avatar3,
      lastMessageTime: "11:35 AM",
      lastMessage: "Lorem ipsum dolor sit amet...",
      unreadCount: 4,
      active: false,
      messages: [],
    },
    {
      id: 4,
      name: "hamza",
      avatar: Avatar1,
      active: false,
      messages: [],
    },
  ];
  const messages = [
    {
      id: 1,
      type: "received",
      avatar: Avatar5,
      message:
        "How likely are you to recommend our company to your friends and family?",
      time: "06:00 PM, 30 Sep 2022",
      attachments: [],
    },
  ];
  // const messages = [
  //   {
  //     id: 1,
  //     type: "received",
  //     avatar: Avatar5,
  //     name: "Williams Bruk",
  //     message:
  //       "How likely are you to recommend our company to your friends and family?",
  //     time: "06:00 PM, 30 Sep 2022",
  //     attachments: [],
  //   },
  //   {
  //     id: 2,
  //     type: "sent",
  //     avatar: null,
  //     name: "",
  //     message:
  //       "How likely are you to recommend our company to your friends and family?",
  //     time: "06:00 PM, 30 Sep 2022",
  //     attachments: [],
  //   },
  //   {
  //     id: 3,
  //     type: "received",
  //     avatar: Avatar3,
  //     name: "Galaviz Lalema",
  //     message: "non tellus dignissim",
  //     time: "06:32 PM Yesterday",
  //     attachments: [
  //       {
  //         icon: chaticon4,
  //         name: "Explainer Video.avi",
  //         size: "30.0 MB",
  //       },
  //       {
  //         icon: chaticon5,
  //         name: "Ayush Therapy.mp3",
  //         size: "4.0 MB",
  //       },
  //       {
  //         icon: chaticon6,
  //         name: "The liver.img",
  //         size: "520KB",
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     type: "sent",
  //     avatar: null,
  //     name: "",
  //     message: "Vivamus sed dictum dictum ligula, cursus blandit risus",
  //     extraMessage: "Vivamus sed dictum",
  //     time: "06:50 PM Today",
  //     attachments: [
  //       {
  //         icon: chaticon4,
  //         name: "Explainer Video.avi",
  //         size: "30.0 MB",
  //       },
  //       {
  //         icon: chaticon5,
  //         name: "Ayush Therapy.mp3",
  //         size: "4.0 MB",
  //       },
  //       {
  //         icon: chaticon6,
  //         name: "The liver.img",
  //         size: "520KB",
  //       },
  //     ],
  //   },
  //   {
  //     id: 5,
  //     type: "received",
  //     avatar: Avatar1,
  //     name: "21 savage",
  //     message: "aliquam ut a ex",
  //     time: "5min Ago",
  //     attachments: [],
  //   },
  // ];
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
              <Conversation messages={messages} user={params.userId} />
            </div>
            {/* Chat Main */}
          </div>
        </div>
      </>
    </>
  );
};

export default page;

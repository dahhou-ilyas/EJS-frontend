"use client"
import Chat from "@/components/Chat"
import "@/assets/css/style.css";
import "@/assets/css/links.css";

import 
{
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
}
from "@/components/imagepath";
import { message } from "antd";

export default function TeleExpertise(){
  
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
    // {
    //   id: 4,
    //   name: "hamza",
    //   avatar: Avatar1,
    // },
  ];
  return (
    <div id="root">
      <div className="page-wrapper">
        <div className="content">
          <Chat messages={messages} user={users[0]}/>
        </div>
      </div>
    </div>
    
  )
}
'use client'


import { useState, useEffect, useRef } from 'react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './chatbot.css';
import { chatbot } from '../imagepath';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import Message from './Message';
import Input from './Input';
import axios from 'axios';
import Header from '../espaceMedecin/Header';
import Sidebar from '../espaceMedecin/Sidebar1';
import { FLASK_API_URL } from '@/config';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from "next/navigation";

const Chat = () => {
    const greetings = {
        role: 'assistant',
        content: "Bonjour, je suis e-ESJ chatbot, comment puis-je vous aider aujourd'hui ?",
    };
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([greetings]);
    const [token , setToken] = useState(null);
    const messagesEndRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        // Retrieve token from localStorage
        const token = localStorage.getItem('access-token');
        if (token) {
            const decodeToken=jwtDecode(token);
            const isMedcins=(decodeToken.claims.role=="ROLE_MEDECIN");
            if(!isMedcins){
                router.push("/espaceMedecin");
                return;
            }
            setToken(token);
        }
    }, []);

    const handleSubmit = async () => {
        if (input.trim()) {
            const message = input;
            setInput('');
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'user', content: message },
            ]);

            try {
                const response = await axios.post(FLASK_API_URL+'/chatbot/ask', {
                    message: message,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                });

                if (response.data.response) {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { role: 'assistant', content: response.data.response },
                    ]);
                } else if (response.data.error) {
                    console.error('Error from server:', response.data.error);
                }
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <>
            <Header section="ChatBot" />
           <Sidebar activeClassName='chatbot' />
            <div className="page-wrapper">
                <div className="content">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link href="/">Page d&#39;accueil </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <FeatherIcon icon="chevron-right" />
                                    </li>
                                    <li className="breadcrumb-item active">Chatbot</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}
                    <div className="row">
                        <div className="card chat-box">
                            <div className="chat-search-group">
                                <div className="chat-user-group mb-0 d-flex align-items-center">
                                    <div className="img-users call-user">
                                        <Link href="#">
                                            <Image src={chatbot} alt="img" />
                                        </Link>
                                    </div>
                                    <div className="chat-users">
                                        <div className="user-titles">
                                            <h5>e-ESJ chatbot</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Chat */}
                        <div className="card chat-message-box">
                            <div className="card-body p-0">
                                {/* Chat Messages */}
                                <div className="chat-body fullscreen">
                                    <ul className="list-unstyled chat-message">
                                        {messages.map((message, id) => (
                                            <li
                                                key={id}
                                                className={`media d-flex ${
                                                    message.role === 'user' ? 'sent' : 'received'
                                                }`}
                                            >
                                                <Message content={message.content} />
                                            </li>
                                        ))}
                                        <div ref={messagesEndRef}></div>
                                    </ul>
                                </div>
                                {/* /Chat Messages */}
                            </div>
                            {/* Chat Input */}
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onClick={handleSubmit}
                                onKeyDown={handleKeyDown}
                            />
                            {/* /Chat Input */}
                        </div>
                        {/* /Chat */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;

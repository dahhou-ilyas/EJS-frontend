'use client'


import { useState, useEffect, useRef } from 'react';
import React from 'react';
import Header from '@/components/TeleExpertise/Header';
import Image from 'next/image';
import Link from 'next/link';
import './chatbot.css';
import { chatbot } from '../imagepath';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import Message from './Message';
import Input from './Input';
import axios from 'axios';
import Sidebar from '../TeleExpertise/Sidebar';

const Chat = () => {
    const greetings = {
        role: 'assistant',
        content: "Bonjour, je suis e-ESJ chatbot, comment puis-je vous aider aujourd'hui ?",
    };
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([greetings]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSubmit = async () => {
        if (input.trim()) {
            const message = input;
            setInput('');
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: 'user', content: message },
            ]);

            try {
                const response = await axios.post('http://localhost:5000/chatbot/ask', {
                    message: message,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
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
            <Header />
           <Sidebar />
            <div className="page-wrapper">
                <div className="content">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link href="/chat">App</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right">
                                            <FeatherIcon icon="chevron-right" />
                                        </i>
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
                                                {/* {message.role === 'assistant' && (
                                                    <div className="avatar flex-shrink-0">
                                                        <Image
                                                            src={chatbot}
                                                            height={40}
                                                            width={40}
                                                            alt="User Image"
                                                            className="avatar-img rounded-circle"
                                                        />
                                                    </div>
                                                )} */}
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

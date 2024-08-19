import React, {useState, useEffect, useRef} from 'react';
import {useToast} from '@chakra-ui/react';
import {chatfooter3} from '../imagepath';
import Image from 'next/image';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons';
import './chatbot.css';

export default function Input(props) {
    const toast = useToast();
    const [isListening, setIsListening] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('French');
    const recognitionRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
            recognitionRef.current = new window.webkitSpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event) => {
                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        props.onChange({target: {value: props.value + event.results[i][0].transcript + ' '}});
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                // Update the input field with both final and interim results
                props.onChange({target: {value: props.value + interimTranscript + event.results[event.results.length - 1][0].transcript + ' '}});
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                setIsListening(false);
                toast({
                    title: 'Speech recognition error',
                    description: event.error,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });
            };
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    useEffect(() => {
        if (recognitionRef.current) {
            switch (selectedLanguage) {
                case 'English':
                    recognitionRef.current.lang = 'en-US';
                    break;
                case 'French':
                    recognitionRef.current.lang = 'fr-FR';
                    break;
                case 'Arabic':
                    recognitionRef.current.lang = 'ar-SA';
                    break;
                default:
                    recognitionRef.current.lang = 'en-US';
            }
        }
    }, [selectedLanguage]);

    const toggleListening = () => {
        try {
            if (typeof window === 'undefined' || !('webkitSpeechRecognition' in window)) {
                throw new Error('Speech recognition is not supported in this browser');
            }
            if (isListening) {
                recognitionRef.current.stop();
            } else {
                recognitionRef.current.start();
            }
            setIsListening(!isListening);
        } catch (error) {
            toast({
                title: "Speech recognition error",
                description: error.message,
                status: 'error',
                duration: 3000,
                position: 'top',
            });
            setIsListening(false);
        }
    };

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
    };

    return (
        <div className="chat-footer-box">
            <div className="discussion-sent">
                <div className="row gx-2">
                    <div className="col-lg-12">
                        <div className="footer-discussion">
                            <div className="inputgroups d-flex align-items-center">
                                <button
                                    className={`btn btn-outline-secondary rounded-circle me-2 ${isListening ? 'btn-danger' : ''}`}
                                    onClick={toggleListening}

                                >
                                    <FontAwesomeIcon icon={faMicrophone} size='2x'/>
                                </button>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type your Message here..."
                                    onKeyDown={props.onKeyDown}
                                    onChange={props.onChange}
                                    value={props.value}
                                    autoFocus
                                    style={{fontFamily: 'monospace', fontSize: '14px'}}
                                />
                                <div className="send-chat position-icon comman-flex button">
                                    <div onClick={props.onClick}><Image src={chatfooter3} alt="#"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-lg-4">
                        <select
                            value={selectedLanguage}
                            onChange={handleLanguageChange}
                            style={{
                                padding: '5px 10px',
                                border: '1px solid #ccc',
                                borderRadius: '7px',
                                backgroundColor: 'white',
                                fontSize: '14px',
                                width: 'auto'
                            }}
                        >
                            <option value="French">French</option>
                            <option value="English">English</option>
                            <option value="Arabic">Arabic</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};
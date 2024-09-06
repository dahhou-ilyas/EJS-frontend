import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Avatar5,
  chatfooter1,
  chatfooter2,
  chatfooter3,
  chatfooter4,
  chaticon07,
} from "./imagepath";
import Image from "next/image";

const Conversation = ({ messages, value, setValue, sendMessage, targetDate }) => {

  const getInitials = (name) => {
    return name.charAt(0);
  };

  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ minutes, seconds });
      } else {
        setTimeLeft({ minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();

    const timerId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, [targetDate]);

  return (
    <div>
      {/* Timer */}
      {/* <div className="text-center">
        <p className="h5 mb-1">
          Temps restant: <span className="text-danger">{timeLeft.minutes} minutes et {timeLeft.seconds} seconds</span>
        </p>
        <p className="h4 text-danger">
          
        </p>
      </div> */}
      {/* Chat */}
      <div className="card chat-message-box">
        <div className="card-body p-0">
          <div
            className="chat-body"
            style={{
              height: "270px",
              width: "100%",
              overflowY: "auto",
            }}
          >
            <ul className="list-unstyled chat-message">
              {messages.map((msg) => (
                <li key={msg.id} className={`media d-flex ${msg.type}`}>
                  {msg.type === "received" && (
                    <div 
                      className="initials avatar-img rounded-circle"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "5px"
                      }}
                    >
                      {getInitials(msg.name)}
                    </div>
                  )}
                  <div className="media-body flex-grow-1">
                    <div className="msg-box">
                      <div className="message-sub-box">
                        {msg.name && <h4>{msg.name}</h4>}
                        <p>{msg.message}</p>
                        {msg.extraMessage && (
                          <p className="mb-0">{msg.extraMessage}</p>
                        )}
                        {msg.attachments.length > 0 && (
                          <ul className="msg-sub-list">
                            {msg.attachments.map((att, index) => (
                              <li key={index}>
                                <Image
                                  src={att.icon}
                                  alt="#"
                                  className="me-1"
                                />
                                {att.name}
                                <span className="ms-1">{att.size}</span>
                                <Image
                                  src={chaticon07}
                                  alt="#"
                                  className="ms-auto"
                                />
                              </li>
                            ))}
                          </ul>
                        )}
                        <span>{msg.time}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* write  */}
          <div className="chat-footer-box">
            <div className="discussion-sent">
              <div className="row gx-2">
                <div className="col-lg-12 ">
                  <div className="footer-discussion">
                    <form 
                      className="inputgroups" 
                      onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage()
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Type your Message here..."
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                      {/* <div className="micro-text position-icon">
                        <Image src={chatfooter4} alt="#" />
                      </div> */}
                      <button style={{border: "none"}} className="send-chat position-icon comman-flex">
                        <Image src={chatfooter3} alt="#" />
                      </button>
                      {/* <div className="symple-text position-icon">
                        <ul>
                          <li>
                            <Link href="/">
                              <Image
                                src={chatfooter1}
                                className="me-2"
                                alt="#"
                              />
                            </Link>
                          </li>
                          <li>
                            <Link href="/">
                              <Image src={chatfooter2} alt="#" />
                            </Link>
                          </li>
                        </ul>
                      </div> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* write  */}
        </div>
      </div>
      {/* /Chat */}
    </div>
  );
};

export default Conversation;

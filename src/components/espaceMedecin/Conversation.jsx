import React from "react";
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

const Conversation = ({ messages, user }) => {
  return (
    <div className="col-xl-8">
      <div className="card chat-box ">
        <div className=" chat-search-group ">
          <div className="chat-user-group mb-0 d-flex align-items-center">
            <div className="img-users call-user">
              <Link href="/">
                <Image src={Avatar5} alt="img" />
              </Link>
              <span className="active-users bg-info" />
            </div>
            <div className="chat-users">
              <div className="user-titles">
                <h5>{decodeURIComponent(user)}</h5>
              </div>
            </div>
          </div>
          {/* <div className="chat-search-list">
            <ul>
              <li>
                <Link href="/">
                  <Image src={chaticon1} alt="img" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Image src={chaticon2} alt="img" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Image src={chaticon3} alt="img" />
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
      {/* Chat */}
      <div className="card chat-message-box">
        <div className="card-body p-0">
          <div
            className="chat-body"
            style={{
              height: "300px",
              width: "100%",
              overflowY: "auto",
            }}
          >
            <ul className="list-unstyled chat-message">
              {messages.map((msg) => (
                <li key={msg.id} className={`media d-flex ${msg.type}`}>
                  {msg.type === "received" && (
                    <div className="avatar flex-shrink-0">
                      <Image
                        src={msg.avatar}
                        alt="User Image"
                        className="avatar-img rounded-circle"
                        width={40}
                        height={40}
                      />
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
                                  className="ms-1 ms-auto"
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
                    <div className="inputgroups">
                      <input
                        type="text"
                        placeholder="Type your Message here..."
                      />
                      <div className="micro-text position-icon">
                        <Image src={chatfooter4} alt="#" />
                      </div>
                      <div className="send-chat position-icon comman-flex">
                        <Link href="/">
                          <Image src={chatfooter3} alt="#" />
                        </Link>
                      </div>
                      <div className="symple-text position-icon">
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
                      </div>
                    </div>
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

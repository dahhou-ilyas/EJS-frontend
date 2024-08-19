import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './chatbot.css';

export default function Message(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  return (
    <div className="media-body flex-grow-1">
      <div className="msg-box">
        <div style={{backgroundColor:"transparent"}}>
          <ReactMarkdown className="message-text">
            {props.content}
          </ReactMarkdown>
        </div>
      </div>

    </div>
  );
}
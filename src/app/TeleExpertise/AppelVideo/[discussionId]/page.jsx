"use client"

import "@/assets/css/style.css";
import { useEffect, useRef, useState } from "react";
import React from "react";
import Sidebar from "@/components/TeleExpertise/Sidebar";
import pdfIcon from "@/assets/img/icons/pdf-icon.png";
import docIcon from "@/assets/img/icons/doc-icon.png";
import Link from "next/link";
import Image from "next/image";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useWebSocket } from "@/hooks/useWebSocket";
import axios from "axios";
import { decodeToken } from "@/utils/docodeToken";
import { getDiscussion } from "@/services/discussionService";
import { useRouter } from "next/navigation";
import { PiMicrophoneFill, PiMicrophoneSlashFill } from "react-icons/pi";
import { HiVideoCamera, HiVideoCameraSlash } from "react-icons/hi2";

const streamConstraints = { audio: true, video: true };

const iceServers = {
  iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      { urls: "stun:stun2.l.google.com:19302" },
      { urls: "stun:stun3.l.google.com:19302" },
      { urls: "stun:stun4.l.google.com:19302" },
      { urls: "stun:stun.ekiga.net" },
      { urls: "stun:stun.ideasip.com" },
      { urls: "stun:stun.schlund.de" },
      { urls: "stun:stun.stunprotocol.org:3478" },
      { urls: "stun:stun.voiparound.com" },
      { urls: "stun:stun.voipbuster.com" },
      { urls: "stun:stun.voipstunt.com" },
      { urls: "stun:stun.services.mozilla.com" }
  ]
};


export default function Test({ params }) {
  const router = useRouter()
  const { connect,isConnected, stompClient } = useWebSocket()
  const [userId, setUserId] = useState()
  const [discussion, setDiscussion] = useState()
  const [fileList, setFileList] = useState([]);

  const [localStream, setLocalStream] = useState(null);
  const localVideoRef = useRef(null);

  const [readyMessage, setReadyMessage] = useState()
  const [isReady, setIsReady] = useState(false)

  const [isOfferReady, setIsOfferReady] = useState(false);
  const [offerMessage, setOfferMessage] = useState(null);

  const [isAnswerReady, setIsAnswerReady] = useState(false);
  const [answerMessage, setAnswerMessage] = useState(null);

  const [isCandidateReady, setIsCandidateReady] = useState(false);
  const [candidateMessage, setCandidateMessage] = useState(null);

  const [peers, setPeers] = useState({});
  const remoteVideoRefs = useRef({});

  const [remoteStreams, setRemoteStreams] = useState({});
  
  const fetchFiles = async () => {
    const response = await fetch(`/api/upload?id=${params.discussionId}`);
    const data = await response.json();
    setFileList(data.files);
  };

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    const decodedToken = decodeToken(token);
    setUserId(decodedToken.claims.id);
    async function fetchData() {
        try {
            const res = await getDiscussion(token, params.discussionId);
            setDiscussion(res)
            connect(token)
        } catch (error) {
            console.log(error.message)
            router.push("/TeleExpertise")
        }
    }
    fetchData()
    fetchFiles()
  }, [])

  useEffect(() => {
    async function getLocalStream() {
        try {
        const stream = await navigator.mediaDevices.getUserMedia(streamConstraints);
        setLocalStream(stream);
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
        }
        } catch (error) {
            console.error('Error accessing media devices.', error);
        }
    }
    getLocalStream()
  }, [])

  useEffect(() => {
    if(isConnected, stompClient) {
        const subscription1 = stompClient.subscribe(`/user/${userId}/queue/ready`,onReady);
        const subscription2 = stompClient.subscribe(`/user/${userId}/queue/candidate`, onCandidate);
        const subscription3 = stompClient.subscribe(`/user/${userId}/queue/offer`, onOffer);
        const subscription4 = stompClient.subscribe(`/user/${userId}/queue/answer`, onAnswer);
  
        const payload = {
          type: "Ready",
          discussionId: params.discussionId,
          senderId: userId
        }
  
        stompClient.publish({
          destination: "/app/room.ready",
          body: JSON.stringify(payload),
        });

        return () => {
            subscription1.unsubscribe();
            subscription2.unsubscribe();
            subscription3.unsubscribe();
            subscription4.unsubscribe();
        };
    }
  }, [isConnected, stompClient])

  const onReady = (payload) => {
    const message = JSON.parse(payload.body);
    setReadyMessage(message);
    setIsReady(true);
  }

  useEffect(() => {
    if (isReady && localStream && readyMessage) {
      handleReadyEvent();
      setIsReady(false);
      setReadyMessage(null);
    }
  }, [isReady, localStream, readyMessage]);

  const handleReadyEvent = async () => {
    const rtcPeerConnection = createPeerConnection(readyMessage.senderId);
    try {
      const offer = await rtcPeerConnection.createOffer();
      await rtcPeerConnection.setLocalDescription(offer);
      const payload = {
        type: "offer",
        sdp: offer,
        discussionId: params.discussionId,
        senderId: userId,
      }
      console.log("Sending offer", payload)
      stompClient.publish({
        destination: "/app/room.offer",
        body: JSON.stringify(payload)
      })
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  const createPeerConnection = (participantId) => {
    const rtcPeerConnection = new RTCPeerConnection(iceServers);
    
    rtcPeerConnection.onicecandidate = (e) => { onIceCandidate(e) };
    rtcPeerConnection.ontrack = (e) => { onAddStream(e, participantId) };
    localStream.getTracks().forEach(track => rtcPeerConnection.addTrack(track, localStream));

    setPeers(prevPeers => ({
      ...prevPeers,
      [participantId]: rtcPeerConnection
    }));

    // Create a new ref for the participant
    if (!remoteVideoRefs.current[participantId]) {
      remoteVideoRefs.current[participantId] = React.createRef();
    }

    return rtcPeerConnection;
  };

  const onCandidate = (payload) => {
    const message = JSON.parse(payload.body);
    //console.log("onOffer message:", message);
    setIsCandidateReady(true);
    setCandidateMessage(message);
  };

  useEffect(() => {
    if (isCandidateReady && localStream && candidateMessage) {
      handleCandidateEvent();
      setIsCandidateReady(false);
      setCandidateMessage(null);
    }
  }, [isCandidateReady, localStream, candidateMessage]);

  const handleCandidateEvent = async () => {;
    console.log("onCandidate message:", candidateMessage);
    const peerConnection = peers[candidateMessage.senderId];
    console.log("peerConnection", peerConnection)
    if (peerConnection) {
      const candidate = new RTCIceCandidate({
        sdpMLineIndex: candidateMessage.label,
        candidate: candidateMessage.candidate,
      });
      console.log('Adding ICE candidate:', candidate);
      await peerConnection.addIceCandidate(candidate);
    }
  };

  const onOffer = (payload) => {
    const message = JSON.parse(payload.body);
    console.log("onOffer message:", message);
    setIsOfferReady(true);
    setOfferMessage(message);
  };

  useEffect(() => {
    if (isOfferReady && localStream && offerMessage) {
      handleOfferEvent();
      setIsOfferReady(false);
      setOfferMessage(null);
    }
  }, [isOfferReady, localStream, offerMessage]);

  const handleOfferEvent = async () => {
    const rtcPeerConnection = createPeerConnection(offerMessage.senderId);
    console.log("Signaling state after creating offer:", rtcPeerConnection.signalingState);
    try {
      if (rtcPeerConnection.signalingState === "stable") {
        await rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(offerMessage.sdp));
        const answer = await rtcPeerConnection.createAnswer();
        await rtcPeerConnection.setLocalDescription(answer);

        const payload = {
          type: "answer",
          sdp: answer,
          discussionId: params.discussionId,
          senderId: userId,
        }

        stompClient.publish({
          destination: "/app/room.answer",
          body: JSON.stringify(payload)
        })
      }
    } catch (error) {
      console.log('Error handling offer:', error);
    }
  };

  const onAnswer = (payload) => {
    const message = JSON.parse(payload.body);
    console.log("onOffer message:", message);
    setIsAnswerReady(true);
    setAnswerMessage(message);
  };

  useEffect(() => {
    if (isAnswerReady && localStream && answerMessage) {
      handleAnswerEvent();
      setIsAnswerReady(false);
      setAnswerMessage(null);
    }
  }, [isAnswerReady, localStream, answerMessage]);

  const handleAnswerEvent = async () => {
    console.log("onAnswer message:", answerMessage);
    const peerConnection = peers[answerMessage.senderId];
    console.log("peerConnection.signalingState:", peerConnection.signalingState);
    if (peerConnection.signalingState === "have-local-offer") {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answerMessage.sdp));
    }
  };
  
  const onIceCandidate = (e) => {
    if (e.candidate) {
      const payload = {
        type: "candidate",
        label: e.candidate.sdpMLineIndex,
        id: e.candidate.sdpMid,
        candidate: e.candidate.candidate,
        discussionId: params.discussionId,
        senderId: userId,
      }
      console.log("Sending ice candidate", payload);
      stompClient.publish({
        destination: "/app/room.candidate",
        body: JSON.stringify(payload)
      })
    }
  };

  const onAddStream = (e, participantId) => {
    console.log("Received remote stream", e.streams[0]);

    if (!remoteVideoRefs.current[participantId]) {
      remoteVideoRefs.current[participantId] = React.createRef();
    }

    const videoElement = remoteVideoRefs.current[participantId].current;
    if (videoElement) {
      videoElement.srcObject = e.streams[0];
    } else {
      console.error("Video element not found for participant", participantId);
    }

    setRemoteStreams(prevStreams => ({
      ...prevStreams,
      [participantId]: e.streams[0]
    }));
  };

  useEffect(() => {
    Object.keys(remoteVideoRefs.current).forEach(participantId => {
      const remoteVideoRef = remoteVideoRefs.current[participantId];
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStreams[participantId];
      }
    });
  }, [remoteStreams]);

  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const toggleTrack = (trackType) => {
    if (!localStream) return;

    const track = trackType === 'video' ? localStream.getVideoTracks()[0] : localStream.getAudioTracks()[0];
    const enabled = !track.enabled;
    track.enabled = enabled;

    if (trackType === 'video') {
      setIsVideoEnabled(enabled);
    } else {
      setIsAudioEnabled(enabled);
    }
  };


  return (
    <div id="root">
      <Sidebar activeClassName="discussions" />
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/TeleExpertise">Télé Expertise </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <FeatherIcon icon="chevron-right" />
                    </li>
                  <li className="breadcrumb-item">
                    <Link href="/Discussions">Discussions </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <FeatherIcon icon="chevron-right" />
                  </li>
                  <li className="breadcrumb-item active">Appel Video</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {discussion &&
          <div className="row">
            <div
              className="col-xl-3"
              style={{
                backgroundColor: "white",
                borderRadius: "30px",
                display: "flex",
                flexDirection: "column",
                padding: "40px",
                maxHeight: "900px",
                overflowY: "auto",
                marginBottom: "20px",
                marginLeft: "50px",
              }}
            >
              <div className="DiscussionTitle">{discussion.titre}</div>
              {/* <div className="DiscussionCas">{discussion.CasDuPatient}</div> */}
              <div className="DiscussionMotif">{discussion.motif}</div>
              {discussion.antecedentsMedicaux.length > 0 && (
                <div>
                  <div className="Traitements">Antécédents Médicaux</div>
                  {discussion.antecedentsMedicaux.map((antecedent, index) => (
                    <div key={index} className="DiscussionMotif">
                      {index + 1}. {antecedent}
                    </div>
                  ))}
                </div>
              )}
              {discussion.antecedentsChirurgicaux != "" && (
                <div>
                  <div className="Traitements">Antécédents Chirurgicaux</div>
                  <div className="DiscussionMotif">
                    {discussion.antecedentsChirurgicaux}
                  </div>
                </div>
              )}
              {discussion.habitudes.length > 0 && (
                <div>
                  <div className="Traitements">Habitudes</div>
                  {discussion.habitudes.map((habitude, index) => (
                    <div key={index} className="DiscussionMotif">
                      {index + 1}. {habitude}
                    </div>
                  ))}
                </div>
              )}
              {discussion.antecedentsFamiliaux.length > 0 && (
                <div>
                  <div className="Traitements">Antécédents Familiaux</div>
                  {discussion.antecedentsFamiliaux.map((antecedent, index) => (
                    <div key={index} className="DiscussionMotif">
                      {index + 1}. {antecedent}
                    </div>
                  ))}
                </div>
              )}
              {fileList.length > 0 && (
                <div>
                  <div className="Fichiers">Fichiers Attachés</div>
                  <div className="preview-container2">
                    {fileList.map((file, index) => (
                      <div key={index} className="file-preview2">
                        {file.type.match("image/*") ? (
                          <Image
                            src={file.src}
                            alt={`Preview of ${file.name}`}
                            objectFit="cover"
                            width={300}
                            height={300}
                          />
                        ) : (
                          <div className="file-link">
                            <Image
                              src={
                                file.type === "application/pdf"
                                  ? pdfIcon
                                  : docIcon
                              }
                              alt="File icon"
                              width={file.type === "application/pdf" ? 35 : 52}
                              height={file.type === "application/pdf" ? 47 : 47}
                            />
                            <a
                              href={file.src}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {file.name}
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                    {discussion.commentaireFichiers != "" && (
                      <div>
                        <div className="Traitements">Commentaire Fichiers</div>
                        <div className="DiscussionMotif">
                          {discussion.commentaireFichiers}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="col-xl-8">
              <div 
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: "center",
                  gap: '10px',
                  backgroundColor: 'white',
                  //border: '2px solid black',
                  //width: '750px'
                  minHeight: "400px",
                  borderRadius: "15px",
                  paddingTop: "10px"
                }}
              >
                <div
                  style={{
                    width: '350px',
                    height: '225px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#363636',
                    marginBottom: '10px',
                    borderRadius: "10px"
                  }}
                >
                  <video
                    //muted
                    id="localVideo"
                    autoPlay
                    ref={localVideoRef}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  ></video>
                </div> 
              {Object.keys(remoteVideoRefs.current).map(participantId => {
                  return (
                    <div
                      id="remoteVideoContainer"
                      key={participantId}
                      style={{
                        width: '350px',
                        height: '225px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#363636',
                        marginBottom: '10px',
                        borderRadius: "10px"
                      }}
                    >
                      <video
                        key={participantId}
                        ref={remoteVideoRefs.current[participantId]}
                        autoPlay
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      ></video>
                    </div>
                  )
              })}
            </div>
            <div className="mt-2 col-xl-12 flex gap-3">
              <button
                id="toggleVideo"
                className="w-14 h-14 rounded-full bg-red-500 ms-auto"
                onClick={() => {toggleTrack('video')}}
              >
                {isVideoEnabled ? (
                  <HiVideoCamera className="m-auto text-3xl text-white" />
                ) : (
                  <HiVideoCameraSlash className="m-auto text-3xl text-white" />
                )}
              </button>
              <button 
                className="bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Terminer la discussion
              </button>
              <button
                id="toggleAudio"
                className="w-14 h-14 rounded-full bg-red-500 me-auto"
                onClick={() => {toggleTrack('audio')}}
              >
                {isAudioEnabled ? (
                  <PiMicrophoneFill className="m-auto text-3xl text-white" />
                ) : (
                  <PiMicrophoneSlashFill className="m-auto text-3xl text-white" />
                )}
              </button>
              
            </div>
          </div>
            
        </div>
        }
      </div>
      {/* <video
        muted
        id="localVideo"
        autoPlay
        ref={localVideoRef}
        style={{
          width: '240px',
          height: '200px',
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        }}
      ></video> */}
    </div>
  )
}

import { acceptInvitation, declineInvitation } from "@/services/discussionService";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

const Invitation = ({
  invitationId,
  title,
  description,
  doctor,
  doctorSpeciality,
  doctorPhoto,
  date,
  time,
  setInvitations

}) => {

  const getInitials = (name) => {
    return name.charAt(0);
  };

  const accepterInvitation = async () => {
    try {
      const token = localStorage.getItem("access-token")
      await acceptInvitation(token, invitationId)
      setInvitations((prevInvitations) =>
        prevInvitations.filter((invitation) => invitation.id !== invitationId)
      );
      toast.success("Vous avez accpter l'invitation")
    } catch (error) {
      console.log(error.message)
      toast.error("Quelque chose s'est mal passé, veuillez réessayer")
    }
  }

  const refuserInvitation = async () => {
    try {
      const token = localStorage.getItem("access-token")
      await declineInvitation(token, invitationId)
      setInvitations((prevInvitations) =>
        prevInvitations.filter((invitation) => invitation.id !== invitationId)
      );
      toast.success("Vous avez refuser l'invitation")
    } catch (error) {
      console.log(error.message)
      toast.error("Quelque chose s'est mal passé, veuillez réessayer")
    }
  }

  return (
    <div className="discussion-item">
      <div className="discussion-header">
        {doctorPhoto ? (
          <Image src={doctorPhoto} alt={doctor} />
        ) : (
          <div className="initials">{getInitials(doctor)}</div>
        )}
        <div className="doctor-info">
          <h4>Dr. {doctor}</h4>
          <p>{doctorSpeciality}</p>
        </div>
      </div>
      <hr className="divider" />
      <div className="discussion-body">
        <h5>{title}</h5>
        <p>
          Motif: <span style={{ color: "#2f38a3" }}>{description}</span>
        </p>
        <p>
          Date: <span className="date">{format(date, 'yyyy-MM-dd')}</span>
        </p>
        <p>
          À: <span className="time">{time}</span>
        </p>
      </div>
      <div className="buttons">
        <button 
          type="button" 
          className="accept-button"
          onClick={accepterInvitation}
        >
          Accepter
        </button>
        <button 
          type="button" 
          className="reject-button"
          onClick={refuserInvitation}
        >
          Refuser
        </button>
      </div>
    </div>
  );
};

export default Invitation;

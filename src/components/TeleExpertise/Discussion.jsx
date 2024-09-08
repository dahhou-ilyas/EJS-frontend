import { joinOuverteDiscussion } from "@/services/discussionService";
import { set } from "date-fns";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

const Discussion = ({
  id,
  title,
  description,
  doctor,
  doctorSpeciality,
  doctorPhoto,
  neededSpecialities,
  date,
  time,
  setDiscussions
}) => {
  const getInitials = (name) => {
    return name.charAt(0);
  };

  const handleJoinDiscussion = async () => {
    try {
      const token = localStorage.getItem("access-token")
      await joinOuverteDiscussion(token, id)
      toast.success("Vous avez rejoint la discussion")
      setDiscussions((prevDiscussions) =>
        prevDiscussions.filter((discussion) => discussion.id !== id)
      );
    } catch (error) {
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
          Spécialités demandées:{" "}
          {neededSpecialities.map((speciality, index) => (
            <span style={{ color: "#2f38a3" }} key={index}>
              {speciality}
              {index < neededSpecialities.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
        <p>
          Date: <span className="date">{date}</span>
        </p>
        <p>
          À: <span className="time">{time}</span>
        </p>
      </div>
      <button type="button" className="join-button" onClick={handleJoinDiscussion}>
        Joindre
      </button>
    </div>
  );
};

export default Discussion;

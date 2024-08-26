import React from "react";
const Invitation = ({
  title,
  description,
  doctor,
  doctorSpeciality,
  doctorPhoto,
  date,
  time,
}) => {
  const getInitials = (name) => {
    return name.charAt(0);
  };

  return (
    <div className="discussion-item">
      <div className="discussion-header">
        {doctorPhoto ? (
          <img src={doctorPhoto} alt={doctor} />
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
          Date: <span className="date">{date}</span>
        </p>
        <p>
          À: <span className="time">{time}</span>
        </p>
      </div>
      <div className="buttons">
        <button type="button" className="accept-button">
          Accepter
        </button>
        <button type="button" className="reject-button">
          Refuser
        </button>
      </div>
    </div>
  );
};

export default Invitation;

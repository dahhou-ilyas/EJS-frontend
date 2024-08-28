import React from "react";
const Discussion = ({
  title,
  description,
  doctor,
  doctorSpeciality,
  doctorPhoto,
  neededSpecialities,
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
      <button type="button" className="join-button">
        Joindre
      </button>
    </div>
  );
};

export default Discussion;

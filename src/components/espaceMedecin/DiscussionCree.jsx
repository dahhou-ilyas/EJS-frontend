"use client";
import { useState, useEffect } from "react";
import "@assets/css/style.css";
const DiscussionCree = ({
  title,
  neededSpecialities,
  acceptedInvitations,
  rejectedInvitations,
  date,
  time,
}) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const checkDateTime = () => {
      const currentDateTime = new Date();
      const discussionDateTime = new Date(`${date} ${time}`);
      setIsButtonEnabled(currentDateTime >= discussionDateTime);
    };

    checkDateTime();
    const intervalId = setInterval(checkDateTime, 60000);

    return () => clearInterval(intervalId);
  }, [date, time]);

  return (
    <tr className="discussion-cree-item">
      <td style={{ fontWeight: "800", color: "#2f38a3" }}>{title}</td>
      <td>{neededSpecialities.join(", ")}</td>
      <td>{acceptedInvitations.join(", ")}</td>
      <td>{rejectedInvitations.join(", ")}</td>
      <td
        style={{
          fontWeight: "600",
          color: "#03D2C5",
        }}
      >
        {date}
      </td>
      <td style={{ fontWeight: "600", color: "#03D2C5" }}>{time}</td>
      <td>
        <button
          type="button"
          className="launch-button"
          disabled={!isButtonEnabled}
        >
          Lancer
        </button>
      </td>
    </tr>
  );
};

export default DiscussionCree;

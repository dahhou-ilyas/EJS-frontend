"use client";
import { useState, useEffect } from "react";
import "@/assets/css/style.css";
import { format } from "date-fns";
const DiscussionPlanifiee = ({
  title,
  MainDoctor,
  neededSpecialities,
  date,
  time,
}) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const joinDiscussion = () => {
    
  }

  return (
    <tr className="discussion-cree-item">
      <td style={{ fontWeight: "800", color: "#2f38a3" }}>{title}</td>
      <td style={{ fontWeight: "500" }}>{MainDoctor}</td>
      <td>{neededSpecialities.join(", ")}</td>

      <td
        style={{
          fontWeight: "600",
          color: "#03D2C5",
        }}
      >
        {format(date, 'yyyy-MM-dd')}
      </td>
      <td style={{ fontWeight: "600", color: "#03D2C5" }}>{time}</td>
      <td>
        <button
          type="button"
          className="joindre-button"
          disabled={
            !(new Date() >= new Date(date) && new Date() <= new Date(new Date(date).getTime() + 30 * 60000))
          }
          onClick={joinDiscussion}
        >
          Joindre
        </button>
      </td>
    </tr>
  );
};

export default DiscussionPlanifiee;

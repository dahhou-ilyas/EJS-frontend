"use client";
import { useState, useEffect } from "react";
import "@/assets/css/style.css";
import { format } from "date-fns";
import { startDiscussion } from "@/services/discussionService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const DiscussionCree = ({
  id,
  title,
  neededSpecialities,
  acceptedInvitations,
  rejectedInvitations,
  date,
  time,
  status,
  type
}) => {
  const router = useRouter();
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

  const launchDiscussion = async () => {
    try {
      const token = localStorage.getItem("access-token")
      const res = await startDiscussion(token, id)
      if(type === "CHAT") {
        router.push("/TeleExpertise/ChatMeeting/${discussionId}")
      } else if (type === "APPEL_VIDEO") {
        router.push("/TeleExpertise/AppelVideo/${discussionId}")
      }
    } catch (error) {
      toast.error("Quelque chose s'est mal passé, veuillez réessayer")
    }
  }

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
        {format(date, 'yyyy-MM-dd')}
      </td>
      <td style={{ fontWeight: "600", color: "#03D2C5" }}>{time}</td>
      <td>
        {
          status === "TERMINEE" || status === "ANNULEE"? 
          status:
          status === "EN_COURS"?
          <button
            className="joindre-button"
          >
            En cours {"->"}
          </button>:
          <button
            type="button"
            className="launch-button"
            disabled={
              !(new Date() >= new Date(date) && new Date() <= new Date(new Date(date).getTime() + 30 * 60000))
            }
            onClick={launchDiscussion}
          >
          Lancer
        </button>
        }
      </td>
    </tr>
  );
};

export default DiscussionCree;

"use client";
import "@/assets/css/style.css";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const DiscussionPlanifiee = ({
  discussionId,
  title,
  MainDoctor,
  neededSpecialities,
  date,
  time,
  type,
  status
}) => {
  const router = useRouter();

  const joinDiscussion = () => {
    if(type === "CHAT") {
      router.push(`/TeleExpertise/ChatMeeting/${discussionId}`)
    } else if (type === "APPEL_VIDEO") {
      router.push(`/TeleExpertise/AppelVideo/${discussionId}`)
    }
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
        {
          status === "TERMINEE" || status === "ANNULEE"? 
          status:
          status === "EN_COURS"?
          <button
            className="joindre-button"
            onClick={joinDiscussion}
          >
            Joindre
          </button>:
          <button
            type="button"
            className="launch-button"
            disabled
          >
            Joindre
          </button>
        }
      </td>
    </tr>
  );
};

export default DiscussionPlanifiee;

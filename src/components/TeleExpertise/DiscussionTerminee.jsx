"use client";
import { useState, useEffect } from "react";
import "@/assets/css/style.css";
import Image from "next/image";
import { pdficon } from "./imagepath";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const DiscussionTerminee = ({
  discussionId,
  title,
  MainDoctor,
  DoctorsWhoAttended,
  date,
  time,
  compteRendu,
}) => {
  const router = useRouter()

  const handleDownload = () => {
    router.push(`/TeleExpertise/Report/${discussionId}`)
  };

  return (
    <tr className="discussion-cree-item">
      <td style={{ fontWeight: "800", color: "#2f38a3" }}>{title}</td>
      <td style={{ fontWeight: "500" }}>{MainDoctor}</td>
      <td>{DoctorsWhoAttended.join(", ")}</td>
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
          className="download-button"
          onClick={handleDownload}
        >
          <Image
            src={pdficon}
            alt="Download"
            style={{ height: "30px", width: "30px" }}
          />
        </button>
      </td>
    </tr>
  );
};

export default DiscussionTerminee;

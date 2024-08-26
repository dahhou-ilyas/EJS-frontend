"use client";
import { useState, useEffect } from "react";
import "@assets/css/style.css";
import Image from "next/image";
import { pdficon } from "./imagepath";

const DiscussionTerminee = ({
  title,
  MainDoctor,
  DoctorsWhoAttended,
  date,
  time,
  compteRendu,
}) => {
  // Function to handle file download
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = compteRendu;
    link.download = "compteRendu.pdf"; // Specify the default file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        {date}
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

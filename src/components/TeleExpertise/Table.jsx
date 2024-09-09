"use client";
import { React, useEffect, useState } from "react";
//import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@/assets/css/font-awesome.min.css";
import { useRouter } from "next/navigation";

const Table = ({ columns, data }) => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 12;
  const router = useRouter();

  // Calculate the displayed doctors
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = data.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const handleClick = (e) => {
    router.push(`/TeleExpertise/Chat/${e}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(data.length / doctorsPerPage);

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.accessor}>{column.Header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentDoctors.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={column.accessor}>
                    {column.accessor === "name" ? (
                      <div className="d-flex align-items-center">
                        <span>{row[column.accessor]}</span>
                      </div>
                    ) : column.accessor === "actions" ? (
                      <button
                        onClick={() => handleClick(row.id)}
                        style={{
                          color: "white",
                          backgroundColor: "darkblue",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "14px",
                          transition: "background-color 0.3s ease",
                        }}
                      >
                        envoyer un message
                      </button>
                    ) : (
                      row[column.accessor]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages).keys()].map((number) => (
            <li
              key={number}
              className={`page-item ${
                currentPage === number + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(number + 1)}
              >
                {number + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Table;

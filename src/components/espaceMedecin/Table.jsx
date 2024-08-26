"use client";
import { React, useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@assets/css/font-awesome.min.css";
import { useRouter } from "next/navigation";
const Table = ({ columns, data }) => {
  const router = useRouter();
  const handleClick = (e) => {
    // router.push(`/ProfilePatient/${e}`);
  };
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column.accessor}>
                {column.accessor === "name" ? 
                (
                  <div className="d-flex align-items-center">
                    <span>{row[column.accessor]}</span>
                  </div>
                ) 
                :
                column.accessor === "actions" ? 
                (
                  // <button
                  //   onClick={() => handleClick(row.name)}
                  //   className="btn btn-primary btn-sm"
                  // >
                  //   envoyer un message
                  // </button>
                  <div></div>
                ) : (
                  row[column.accessor]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

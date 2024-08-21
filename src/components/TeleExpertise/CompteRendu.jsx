import React from "react";

const PrintableComponent = React.forwardRef((props, ref) => {
  const {
    title,
    description,
    patientName,
    patientLastName,
    patientDOB,
    patientID,
    patientCIN,
    patientMassar,
    caseCreation,
    caseClosure,
    requestingDoctorName,
    requestingDoctorLastName,
    requestingDoctorWorkplace,
    requestingDoctorSpecialty,
    consultedDoctorName,
    consultedDoctorLastName,
    consultedDoctorWorkplace,
    consultedDoctorSpecialty,
    discussion,
    conclusion,
  } = props;

  return (
    <div
      ref={ref}
      style={{
        padding: "20mm",
        background: "white",
        width: "210mm",
        minHeight: "297mm",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
        fontSize: "12pt",
        lineHeight: "1.5",
        color: "#333",
      }}
    >
      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 0;
            }
            body {
              -webkit-print-color-adjust: exact;
            }
            .printable-component {
              width: 210mm;
              min-height: 297mm;
              margin: 0;
              padding: 20mm;
              box-sizing: border-box;
            }
          }
          @media screen and (max-width: 1200px) {
            .printable-component {
              padding: 15mm;
              font-size: 11pt;
            }
          }
          @media screen and (max-width: 992px) {
            .printable-component {
              padding: 10mm;
              font-size: 10pt;
            }
          }
          @media screen and (max-width: 768px) {
            .printable-component {
              padding: 5mm;
              font-size: 9pt;
            }
          }
          @media screen and (max-width: 576px) {
            .printable-component {
              padding: 2mm;
              font-size: 8pt;
            }
          }
        `}
      </style>
      <div className="printable-component">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #ccc",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ fontSize: "16pt" }}>{title}</h1>
          <div style={{ textAlign: "right" }}>
            <h2 style={{ fontSize: "14pt", margin: 0 }}>e-ESJ</h2>
          </div>
        </div>
        <h2 style={{ fontSize: "14pt", marginBottom: "10px" }}>
          Informations du Patient
        </h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                Nom
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {patientName}
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                Prénom
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {patientLastName}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                Date de naissance
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {patientDOB}
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                Identifiant
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {patientID}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                CIN
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {patientCIN}
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                Code Massar
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {patientMassar}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                Création de cas
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {caseCreation}
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                Clôture de cas
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {caseClosure}
              </td>
            </tr>
          </tbody>
        </table>
        <h2 style={{ fontSize: "14pt", marginBottom: "10px" }}>
          Description clinique
        </h2>
        <p style={{ marginBottom: "20px" }}>{description}</p>
        <h2 style={{ fontSize: "14pt", marginBottom: "10px" }}>
          Médecin requérant
        </h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                Nom
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {requestingDoctorName}
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                Prénom
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {requestingDoctorLastName}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                Lieu de travail
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {requestingDoctorWorkplace}
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                Spécialité
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {requestingDoctorSpecialty}
              </td>
            </tr>
          </tbody>
        </table>
        <h2 style={{ fontSize: "14pt", marginBottom: "10px" }}>
          Médecin sollicité
        </h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                Nom
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {consultedDoctorName}
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                Prénom
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {consultedDoctorLastName}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                Lieu de travail
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {consultedDoctorWorkplace}
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                Spécialité
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {consultedDoctorSpecialty}
              </td>
            </tr>
          </tbody>
        </table>
        <h2 style={{ fontSize: "14pt", marginBottom: "10px" }}>Discussion</h2>
        <p style={{ marginBottom: "20px" }}>{discussion}</p>
        <h2 style={{ fontSize: "14pt", marginBottom: "10px" }}>
          Conclusion et recommandation
        </h2>
        <p style={{ marginBottom: "20px" }}>{conclusion}</p>
      </div>
    </div>
  );
});

export default PrintableComponent;

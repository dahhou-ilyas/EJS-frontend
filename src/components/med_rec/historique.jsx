"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "../Navbar"
import './custom.css';
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { jsPDF } from "jspdf"
import { FaSearch, FaDownload, FaChevronDown, FaChevronUp, FaSort } from "react-icons/fa"

export default function Consultations() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showInfo, setShowInfo] = useState(false)
  const [selectedConsultation, setSelectedConsultation] = useState(null)
  const [expandedConsultations, setExpandedConsultations] = useState([])
  const [sortMode, setSortMode] = useState("dateDesc")
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false)

  const consultations = [
    {
      id: 1,
      title: "Consultation Cardiologie",
      type: "Suivi - ECG",
      location: "Espace Santé Jeune SALE TABRIQUET",
      date: "2024-07-15",
      doctor: "Dr. Monaim BLAYZA",
      info: "Consultation détaillée en cardiologie incluant un électrocardiogramme (ECG). Le patient a présenté des symptômes de douleur thoracique et essoufflement. L'ECG a révélé une tachycardie sinusale.",
      motif: "Douleur thoracique et essoufflement",
      antecedents: {
        type: "medical",
        details: "Hypertension, antécédents familiaux de maladies cardiaques"
      },
      historiqueClinique: "Douleur thoracique intermittente depuis 2 mois",
      examenClinique: "ECG, auscultation cardiaque",
      examenMedical: "Analyse sanguine, ECG",
      diagnostic: "Tachycardie sinusale",
      ordonnance: "Bêta-bloquants, régime pauvre en sodium"
    },
    {
      id: 2,
      title: "Consultation Dermatologie",
      type: "Examen - Biopsie",
      location: "Espace Santé Jeune AIN EL AOUDA",
      date: "2024-07-16",
      doctor: "Dr. CHINWI",
      info: "Consultation en dermatologie pour évaluation d'une éruption cutanée persistante. Une biopsie cutanée a été effectuée pour exclure des pathologies plus graves. Le diagnostic final a révélé une dermatite de contact.",
      motif: "Éruption cutanée persistante",
      antecedents: {
        type: "chirurgical",
        details: "Chirurgie de la peau antérieure"
      },
      historiqueClinique: "Éruption cutanée depuis 3 semaines",
      examenClinique: "Examen visuel de la peau, biopsie",
      examenMedical: "Biopsie cutanée",
      diagnostic: "Dermatite de contact",
      ordonnance: "Corticostéroïdes topiques"
    }
  ]
  

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleInfoClick = (consultation) => {
    setSelectedConsultation(consultation)
    setShowInfo(true)
  }

  const handleCloseInfo = () => {
    setShowInfo(false)
    setSelectedConsultation(null)
  }

  const handleExpandClick = (id) => {
    setExpandedConsultations(prevState => 
      prevState.includes(id) ? prevState.filter(expId => expId !== id) : [...prevState, id]
    )
  }

  const handleSortChange = (mode) => {
    setSortMode(mode)
    setSortDropdownOpen(false)
  }

  const sortConsultations = (consultations, mode) => {
    switch (mode) {
      case "dateAsc":
        return consultations.sort((a, b) => new Date(a.date) - new Date(b.date))
      case "dateDesc":
        return consultations.sort((a, b) => new Date(b.date) - new Date(a.date))
      case "titleAsc":
        return consultations.sort((a, b) => a.title.localeCompare(b.title))
      case "titleDesc":
        return consultations.sort((a, b) => b.title.localeCompare(a.title))
      default:
        return consultations
    }
  }

  const generatePDF = (consultation) => {
    const doc = new jsPDF()
    doc.text(`Consultation: ${consultation.title}`, 10, 10)
    doc.text(`Type: ${consultation.type}`, 10, 20)
    doc.text(`Location: ${consultation.location}`, 10, 30)
    doc.text(`Date: ${consultation.date}`, 10, 40)
    doc.text(`Doctor: ${consultation.doctor}`, 10, 50)
    doc.text(`Info: ${consultation.info}`, 10, 60)
    doc.save(`${consultation.title}.pdf`)
  }

  const filteredConsultations = consultations.filter(consultation =>
    consultation.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedConsultations = sortConsultations(filteredConsultations, sortMode)

  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />
      <div className="flex justify-between p-4">
        <Button
          className="flex items-center justify-center space-x-2 bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          <Link href="../" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
        </Button>
        <div className="relative">
      <Button
        className="flex items-center justify-center space-x-2 bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
      >
        <FaSort />
        <span>Trier</span>
      </Button>
      {sortDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <button
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={() => handleSortChange("dateAsc")}
          >
            Date (Ascendant)
          </button>
          <button
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={() => handleSortChange("dateDesc")}
          >
            Date (Descendant)
          </button>
          <button
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={() => handleSortChange("titleAsc")}
          >
            Titre (A-Z)
          </button>
          <button
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            onClick={() => handleSortChange("titleDesc")}
          >
            Titre (Z-A)
          </button>
        </div>
          )}
        </div>
      </div>
      <div className={`flex justify-center my-4 ${showInfo ? "blur" : ""}`}>
      <div className="relative w-full max-w-md">
          <FaSearch
            style={{
              position: 'absolute',
              top: '50%',
              left: '0.75rem',
              transform: 'translateY(-50%)',
              color: '#333',
              fontSize: '1rem',
            }}
          />
          <input
            type="search"
            placeholder="Rechercher une consultation"
            value={searchTerm}
            onChange={handleSearch}
            style={{
              backgroundColor: 'white',
              paddingLeft: '2.5rem', 
              paddingRight: '1rem',
              color: '#333',
              border: '1px solid #ccc',
              borderRadius: '9999px', 
              width: '100%',
              height: '2.5rem',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#1877F2')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          />
        </div>

      </div>
      <div className={`space-y-4 p-4 ${showInfo ? "blur" : ""}`}>
        {sortedConsultations.map((consultation) => (
          <Card
            key={consultation.id}
            className={`p-4 rounded-lg shadow-md ${
              searchTerm.toLowerCase().includes(consultation.title.toLowerCase()) ? "bg-blue-500 text-white" : "bg-[#e6f2ff]"
            }`}
          >
            <div className="flex justify-between items-start">
              <CardContent>
                <div className="flex items-center">
                  <h2 className={`text-xl font-semibold ${searchTerm.toLowerCase().includes(consultation.title.toLowerCase()) ? "text-white" : "text-[#1877F2]"}`}>
                    {consultation.title}
                  </h2>
                  <button
                    className="ml-2 text-sm text-gray-500 underline"
                    onClick={() => handleInfoClick(consultation)}
                  >
                    Info
                  </button>
                </div>
                  <p className="text-md font-semibold">Type:</p>
                  <p className="text-md">{consultation.type}</p>
                  {expandedConsultations.includes(consultation.id) && (
                    <div className="mt-2">
                      <p className="text-md">{consultation.info}</p>
                      <p className="text-md  mt-2">
                        <span className="font-bold">Médecin:</span> {consultation.doctor}
                      </p>
                      <p className="text-md mt-2">
                        <span className="font-bold">Motif:</span> {consultation.motif}
                      </p>
                      <p className="text-md mt-2">
                        <span className="font-bold">Antécédents ({consultation.antecedents.type}):</span> {consultation.antecedents.details}
                      </p>
                      <p className="text-md mt-2">
                        <span className="font-bold">Historique Clinique:</span> {consultation.historiqueClinique}
                      </p>
                      <p className="text-md mt-2">
                        <span className="font-bold">Examen Clinique:</span> {consultation.examenClinique}
                      </p>
                      <p className="text-md mt-2">
                        <span className="font-bold">Examen Médical:</span> {consultation.examenMedical}
                      </p>
                      <p className="text-md mt-2">
                        <span className="font-bold">Diagnostic:</span> {consultation.diagnostic}
                      </p>
                      <p className="text-md mt-2">
                        <span className="font-bold">Ordonnance:</span> {consultation.ordonnance}
                      </p>
                  </div>
                )}
              </CardContent>
              <div>
                <p className={`text-sm ${searchTerm.toLowerCase().includes(consultation.title.toLowerCase()) ? "text-white" : "text-gray-500"}`}>
                  {consultation.location}
                </p>
                <p className={`text-sm ${searchTerm.toLowerCase().includes(consultation.title.toLowerCase()) ? "text-white" : "text-gray-500"}`}>
                  {consultation.date}
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="text-blue-500 underline"
                onClick={() => handleExpandClick(consultation.id)}
              >
                {expandedConsultations.includes(consultation.id) ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <button
                className="text-blue-500 underline"
                onClick={() => generatePDF(consultation)}
              >
                <FaDownload />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {showInfo && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-md w-3/4">
            <h2 className="text-xl font-semibold">{selectedConsultation.title}</h2>
            <p className="text-md">{selectedConsultation.info}</p>
            <p className="text-md">
              <span className="font-bold">Type:</span> {selectedConsultation.type}
            </p>
            <p className="text-md mt-2">
              <span className="font-bold">Médecin:</span> {selectedConsultation.doctor}
            </p>
            <p className="text-md">
              <span className="font-bold">Motif:</span> {selectedConsultation.motif}
            </p>
            <p className="text-md">
              <span className="font-bold">Antécédents ({selectedConsultation.antecedents.type}):</span> {selectedConsultation.antecedents.details}
            </p>
            <p className="text-md">
              <span className="font-bold">Historique Clinique:</span> {selectedConsultation.historiqueClinique}
            </p>
            <p className="text-md">
              <span className="font-bold">Examen Clinique:</span> {selectedConsultation.examenClinique}
            </p>
            <p className="text-md">
              <span className="font-bold">Examen Médical:</span> {selectedConsultation.examenMedical}
            </p>
            <p className="text-md">
              <span className="font-bold">Diagnostic:</span> {selectedConsultation.diagnostic}
            </p>
            <p className="text-md">
              <span className="font-bold">Ordonnance:</span> {selectedConsultation.ordonnance}
            </p>
            
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full"
              onClick={handleCloseInfo}
            >
              Fermer
            </button>
          </div>
        </div>
)}

    </div>
  );
}


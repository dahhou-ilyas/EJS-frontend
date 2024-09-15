"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "antd";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import NavigationHeader from "@/components/ppn/NavigationHeader";
import "@/assets/css/style.css";
import { plusicon, refreshicon, imagesend, dots, edit, deleteIcon } from "@/components/imagepath";
import { jwtDecode } from 'jwt-decode';
import { SPRINGBOOT_API_URL } from "@/config";

const Patients = () => {
  const [query, setQuery] = useState("");
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [id, setId] = useState('');
  const [patients, setPatients] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const path = usePathname();

  const fetchPatients = async (query) => {
    if (query.trim()) {
      const accessToken = localStorage.getItem('access-token');
      const decodedAccessToken = jwtDecode(accessToken);
      axios.get(SPRINGBOOT_API_URL+`/jeunes_filter?${query}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the patients!", error);
      });
    }else{
      setPatients([]);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (id) query.append('id', id);
    if (nom) query.append('nom', nom);
    if (prenom) query.append('prenom', prenom);

    if (id || nom || prenom) {
        fetchPatients(query.toString());
    }
};

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const columns = [
    {
      title: "NIP",
      dataIndex: "id",
      render: (text, record) => (
        <h2 className="profile-image">
          <Link href={`${path}/${record.id}`}>{record.id}</Link>
        </h2>
      ),
      sorter: (a, b) => a.identifiantPatient - b.identifiantPatient
    },
    {
      title: "Nom",
      dataIndex: "nom",
      render: (text, record) => (
        <h2 className="profile-image">
          <Link href={`${path}/${record.id}`}>{record.infoUser?.nom}</Link>
        </h2>
      ),
      sorter: (a, b) => a.nom.localeCompare(b.nom)
    },
    {
      title: "Prénom",
      dataIndex: "prenom",
      render: (text, record) => (
        <h2 className="profile-image">
          <Link href={`${path}/${record.id}`}>{record.infoUser?.prenom}</Link>
        </h2>
      ),
      sorter: (a, b) => a.prenom.localeCompare(b.prenom)
    },
    {
      title: "Sexe",
      dataIndex: "sexe",
      render: (text, record) => (
        <h2 className="profile-image">
          <Link href={`${path}/${record.id}`}>{record.sexe}</Link>
        </h2>
      ),
      sorter: (a, b) => a.sexe.localeCompare(b.sexe)
    },
    {
      title: "Date de Naissance",
      dataIndex: "dateNaissance",
      render: (text, record) => (
        <h2 className="profile-image">
          <Link href={`${path}/${record.id}`}>
            {new Date(record.dateNaissance).toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </Link>
        </h2>
      ),
      sorter: (a, b) => new Date(a.dateNaissance) - new Date(b.dateNaissance)
    }
    ,
    {
      title: "Scolarise",
      dataIndex: "scolarise",
      render: (text, record) => (
        <h2 className="profile-image">
          <Link href={`${path}/${record.id}`}>{record.scolarise ? "Oui" : "Non"}</Link>
        </h2>
      ),
      sorter: (a, b) => a.scolarise - b.scolarise
    }
  ];

  return (
  <div>
      <div className="content mx-4 mt-4">
          <NavigationHeader pages={["Patients"]} currentPage="Patients" />
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table show-entire">
                <div className="card-body">
                  <div className="page-table-header mb-2">
                    <div className="row align-items-center">
                      <div className="col">
                        <div className="doctor-table-blk">
                          <h3>Patients</h3>
                          <div className="doctor-search-blk">
                            <div className="top-nav-search table-search-blk"></div>
                            <div className="add-group">
                              <form className="search-form flex flex-row p-1 rounded-lg max-w-lg mx-auto">
                                <div className="search-input">
                                  <input
                                    type="text"
                                    id="nom"
                                    value={nom}
                                    onChange={(e) => setNom(e.target.value)}
                                    placeholder="Rechercher par nom"
                                    className="border rounded-md px-2 py-2"
                                  />
                                </div>

                                <div className="search-input">
                                  <input
                                    type="text"
                                    id="prenom"
                                    value={prenom}
                                    onChange={(e) => setPrenom(e.target.value)}
                                    placeholder="Rechercher par prenom"
                                    className="border rounded-md px-3 py-2"
                                  />
                                </div>

                                <div className="search-input">
                                  <input
                                    type="text"
                                    id="id"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    placeholder="Rechercher par ID"
                                    className="border rounded-md px-3 py-2"
                                  />
                                </div>

                                <button
                                  type="submit"
                                  onClick={handleSearch}
                                  className="doctor-refresh ms-2 search-button bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                  Search
                                </button>
                               </form>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive doctor-list">
                    <Table
                      columns={columns}
                      dataSource={patients}
                      rowSelection={rowSelection}
                      rowKey={(record) => record.id}
                      style={{
                        backgroundColor: "#f2f2f2"
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div id="delete_patient" className="modal fade delete-modal" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <Image src={imagesend} alt="#" width={50} height={46} />
              <h3>Are you sure want to delete this ?</h3>
              <div className="m-t-20">
                <Link href="#" className="btn btn-white me-2" data-bs-dismiss="modal">
                  Close
                </Link>
                <button type="submit" className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>  
  );
};

export default Patients;
"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "antd";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import NavigationHeader from "@/components/ppn/NavigationHeader";
import "@/assets/css/style.css";
import SearchBar from "./searchBar";
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

  // useEffect(() => {
  //   const query = new URLSearchParams();
  //   if (id) query.append('id', id);
  //   if (nom) query.append('nom', nom);
  //   if (prenom) query.append('prenom', prenom);
  //   fetchPatients(query.toString());
  // }, [query]);

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
          {/* <SearchBar onSearch={setQuery} /> */}
          <form>
                <div>
                    <label htmlFor="nom">Nom:</label>
                    <input
                        type="text"
                        id="nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Search by nom"
                    />
                </div>

                <div>
                    <label htmlFor="prenom">Prenom:</label>
                    <input
                        type="text"
                        id="prenom"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        placeholder="Search by prenom"
                    />
                </div>

                <div>
                    <label htmlFor="id">ID:</label>
                    <input
                        type="text"
                        id="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="Search by ID"
                    />
                </div>

                <button type="submit" onClick={handleSearch}>Search</button>
            </form>
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
                              <Link href="/" className="btn btn-primary add-pluss ms-2">
                                <Image src={plusicon} alt="#" />
                              </Link>
                              <button onClick={handleRefresh} className="btn btn-primary doctor-refresh ms-2">
                                <Image src={refreshicon} alt="#" />
                              </button>
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
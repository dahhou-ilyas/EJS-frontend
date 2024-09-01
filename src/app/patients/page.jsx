"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "antd";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import NavigationHeader from "@/components/ppn/NavigationHeader";
import Header from "@/components/espaceMedecin/Header"
import "@/assets/css/style.css";
// import "@/assets/css/links.css";
import { plusicon, refreshicon, imagesend, dots, edit, deleteIcon } from "@/components/imagepath";
import Sidebar from "@/components/espaceMedecin/Sidebar1";

const Patients = () => {
  console.log('ht');
  const [patients, setPatients] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const path = usePathname();

  useEffect(() => {
    axios.get("http://localhost:8080/jeunes")
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the patients!", error);
      });
  }, []);

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
          <Link href={`${path}/${record.id}`}>{record.identifiantPatient}</Link>
        </h2>
      ),
      sorter: (a, b) => a.identifiantPatient - b.identifiantPatient
    },
    {
      title: "Nom",
      dataIndex: "nom",
      render: (text, record) => (
        <h2 className="profile-image">
          <Link href={`${path}/${record.id}`}>{record.nom}</Link>
        </h2>
      ),
      sorter: (a, b) => a.nom.localeCompare(b.nom)
    },
    {
      title: "Prénom",
      dataIndex: "prenom",
      render: (text, record) => (
        <h2 className="profile-image">
          <Link href={`${path}/${record.id}`}>{record.prenom}</Link>
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
          <Link href={`${path}/${record.id}`}>{record.dateNaissance}</Link>
        </h2>
      ),
      sorter: (a, b) => new Date(a.dateNaissance) - new Date(b.dateNaissance)
    },
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
    <div id="main-wrapper">
      <Header section={"Mes Patients"}/>
      <Sidebar activeClassName='ppn'/>
      {/* <Navbar/> */}
      <div className="page-wrapper">
        <div className="content">
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
    </div>
  );
};

export default Patients;
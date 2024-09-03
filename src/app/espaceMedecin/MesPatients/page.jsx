"use client";
import "../../../assets/css/style.css";
import { useMemo, useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "../../../components/espaceMedecin/Sidebar1";
import Header from '@/components/espaceMedecin/Header';
import { Table  } from 'antd';
import "../../../assets/css/font-awesome.min.css";
import axios from 'axios';
import {
  refreshicon,
  searchnormal,
} from '../../../components/espaceMedecin/imagepath';
import { useRouter } from 'next/navigation';

const MesPatients = () => {
    const router = useRouter();
    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState([]);
    const token = localStorage.getItem('access-token');
  
    const getAllJeunes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/jeune', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
        router.push('/auth/medecins');
      }
    };
  
    const updateFavoriteState = async (jeuneId, favorite) => {
      try {
          await axios.put(
              `http://localhost:8080/jeune/favorite/${jeuneId}/${favorite}`,
              {},
              {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              }
          );
          getAllJeunes();
      } catch (error) {
          console.error(error);
      }
    };
  
    const handleCheckboxChange = async (event, jeuneId) => {
      const favorite = event.target.checked;
      await updateFavoriteState(jeuneId, favorite);
    };
  
    const filteredData = useMemo(() => {
      return data.filter(patient => {
        const fullName = `${patient.infoUser.prenom} ${patient.infoUser.nom}`.toLowerCase();
        const motifConsultation = patient.consultation.length > 0 ? patient.consultation[0].motif_consultation.toLowerCase() : '';
        return (
          fullName.includes(searchText.toLowerCase()) ||
          patient.sexe.toLowerCase().includes(searchText.toLowerCase()) ||
          motifConsultation.includes(searchText.toLowerCase())
        );
      });
    }, [searchText, data]);
  
    const columns = [
      {
        title: " ",
        width: 40,
        render: (record) => (
          <input
            className="star"
            type="checkbox"
            checked={record.favorite}
            onChange={(event) => handleCheckboxChange(event, record.id)}
          />
        )
      },
      {
        title: <span style={{ textAlign: 'center' }}>NIP</span>,
        dataIndex: 'identifiantPatient',
        width: 200,
        sorter: (a, b) => a.identifiantPatient - b.identifiantPatient,
        render: (text) => <span style={{ whiteSpace: 'pre-wrap', marginLeft: '0px' }}>{text}</span>,
      },
      {
        title: <span style={{ textAlign: 'center' }}>Nom et Prénom</span>,
        dataIndex: 'infoUser',
        width: 300,
        render: (infoUser) => (
          <span style={{ whiteSpace: 'pre-wrap', marginLeft: '0px' }}>
            {infoUser.prenom} {infoUser.nom}
          </span>
        ),
        sorter: (a, b) => `${a.infoUser.prenom} ${a.infoUser.nom}`.localeCompare(`${b.infoUser.prenom} ${b.infoUser.nom}`)
      },
      {
        title: <span style={{ marginLeft: '20px' }}>Sexe</span>,
        dataIndex: 'sexe',
        width: 200,
        render: (text) => <span style={{ whiteSpace: 'pre-wrap', marginLeft: '25px' }}>{text}</span>,
        sorter: (a, b) => a.sexe.localeCompare(b.sexe)
      },
      {
        title: <span style={{ marginLeft: '20px' }}>Age</span>,
        dataIndex: 'age',
        width: 200,
        render: (text) => <span style={{ whiteSpace: 'pre-wrap', marginLeft: '25px' }}>{text} ans</span>,
        sorter: (a, b) => b.age - a.age
      },
      {
        title: <span style={{ marginLeft: '20px' }}>Motif de consultation</span>,
        dataIndex: 'consultation',
        width: 250,
        render: (consultation) => (
          <span style={{ textAlign: 'center' }}>
            {consultation.length > 0 ? consultation[0].motif_consultation : 'N/A'}
          </span>
        ),
      },
      {
        title: <span style={{ marginLeft: '20px' }}>Date de consultation</span>,
        dataIndex: 'consultation',
        width: 300,
        render: (consultation) => (
          <span style={{ whiteSpace: 'pre-wrap', marginLeft: '25px' }}>
            {consultation.length > 0 ? consultation[0].date_consultation : 'N/A'}
          </span>
        ),
        sorter: (a, b) => a.consultation.length > 0 ? a.consultation[0].date_consultation.localeCompare(b.consultation.length > 0 ? b.consultation[0].date_consultation : '') : ''
      },
      {
        title: <span style={{ marginLeft: '20px' }}>Dossier médical</span>,
        width: 250,
        render: (record) => (
          <a href={`/espaceMedecin/MesPatients/DossierMedical/${record.id}`} style={{ marginLeft: '20px' }}>Dossier médical</a>
        ),
      },
    ];
  
    const handleSearchInputChange = (e) => {
      setSearchText(e.target.value);
    };
  
    useEffect(() => {
      getAllJeunes();
    }, []);
  
    return (
      <>
        <Header />
        <Sidebar />
        <div className="page-wrapper">
          <div className="content">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="#"> Mes Patients</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card card-table show-entire">
                  <div className="card-body">
                    {/* Table Header */}
                    <div className="page-table-header mb-2">
                      <div className="row align-items-center">
                        <div className="col">
                          <div className="doctor-table-blk">
                            <h3 style={{ marginRight: "20px" }}>Mes Patients</h3>
                            <div className="doctor-search-blk">
                              <div className="top-nav-search table-search-blk">
                                <form>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search here"
                                    value={searchText}
                                    onChange={handleSearchInputChange}
                                  />
                                  <Link className="btn" href="#">
                                    <img
                                      src={searchnormal.src}
                                      alt="#"
                                    />
                                  </Link>
                                </form>
                              </div>
                              <div className="add-group">
                                <Link
                                  href="#"
                                  className="btn btn-primary doctor-refresh ms-2"
                                >
                                  <img src={refreshicon.src} alt="#" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Table Header */}
                    <div className="table-responsive doctor-list">
                      <Table
                        pagination={{
                          total: filteredData.length,
                          showTotal: (total, range) =>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', fontFamily: 'Poppins' }}>
                              Nombre total des patients : {total} patients
                            </span>
                        }}
                        columns={columns}
                        dataSource={filteredData}
                        rowKey={(record) => record.id}
                        style={{
                          // backgroundColor: '#f2f2f2', // Replace with your desired background color for the table
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default MesPatients;
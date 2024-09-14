"use client";

import "../../../assets/css/style.css";
import { useMemo, useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "../../../components/espaceMedecin/Sidebar1";
import { Table } from 'antd';
import "../../../assets/css/font-awesome.min.css";
import axios from 'axios';
import { refreshicon, searchnormal } from '../../../components/espaceMedecin/imagepath';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import { SPRINGBOOT_API_URL } from "@/config";

const MesPatients = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const getAllJeunes = (medecinId) => {
    axios.get(`${SPRINGBOOT_API_URL}/jeune/medecin/${medecinId}`,  {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
        console.log(res.data);
        setData(res.data);
    })
    .catch(err => {
        console.log(err);
    })
  }

  const timestampToDateString = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }

  const updateFavoriteState = async (jeuneId, favorite) => {
    try {
        await axios.put(
            `${SPRINGBOOT_API_URL}/jeune/favorite/${jeuneId}/${favorite}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        getAllJeunes(user?.claims?.id);
    } catch (error) {
        console.error(error);
    }
  };

  const handleCheckboxChange = async (event, jeuneId) => {
    const favorite = event.target.checked;
    await updateFavoriteState(jeuneId, favorite);
  };

  const filteredData = useMemo(() => {
    return data && data.filter((item) =>
      item[1].toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, data]);

  const columns = [
    {
        title : " ",
        width : 40,
        render : (item) => <input className="star" type="checkbox" checked={ item[8] } onChange={(event) => handleCheckboxChange(event, item[0])} />
    },
    {
        title: <span style={{ textAlign: 'center' }}>NIP</span>,
        dataIndex: 7,
        width: 200,
        sorter: (a, b) => a[7] - b[7],
        render: (text) => <span style={{ whiteSpace: 'pre-wrap', marginLeft: '0px' }}>{text}</span>,
    },
    {
        title: <span style={{ textAlign: 'center' }}>Nom et Prénom</span>,
        dataIndex: 0,
        width: 300,
        render: (text, record) => (
            <span style={{ whiteSpace: 'pre-wrap', marginLeft: '0px' }}>
                {record[2]} {record[1]}
            </span>
        ),
        sorter: (a, b) => `${a[2]} ${a[1]}`.localeCompare(`${b[2]} ${b[1]}`)
    },   
    {
        title: <span style={{ marginLeft: '20px' }}>Sexe</span>,
        dataIndex: 3,
        width: 200,
        render: (text) => <span style={{ whiteSpace: 'pre-wrap', marginLeft: '25px' }}>{text}</span>,
        sorter: (a, b) => `${a[2]} ${a[1]}`.localeCompare(`${b[2]} ${b[1]}`)

    },
    {
        title: <span style={{ marginLeft: '20px' }}>Age</span>,
        dataIndex: 4,
        width: 200,
        render: (text) => <span style={{ whiteSpace: 'pre-wrap', marginLeft: '25px' }}>{text} ans</span>,
        sorter: (a, b) => b[3].localeCompare(a[3])
    },
    {
        title: <span style={{ marginLeft: '20px' }}>Motif de consultation</span>,
        dataIndex: 5,
        width: 250,
        render: (text) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    {
        title: <span style={{ marginLeft: '20px' }}>Date de consultation</span>,
        dataIndex: 6,
        width: 300,
        render: (text) => <span style={{ whiteSpace: 'pre-wrap', marginLeft: '25px' }}>{timestampToDateString(text)}</span>,
        sorter: (a, b) => timestampToDateString(a[6]).localeCompare(timestampToDateString(b[6]))
    },
    {
        title: <span style={{ marginLeft: '20px' }}>Dossier médical</span>,
        width: 250,
        render: (item) => <a href={'/patients/' + item[0]} style={{marginLeft: '20px'}}>Dossier médical</a>,
    },
  ];

  const isTokenInvalidOrNotExist = (token) => {
    if (typeof token !== 'string' || token.trim() === '') {
      console.error('Token is invalid or does not exist');
      return true; 
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        return true; 
      }
      return false; 
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; 
    }
  }

  const applySearch = () => {
      const filteredData = data && data.filter(patient => {
          return (
              patient[1].toLowerCase().includes(searchText.toLowerCase()) ||
              patient[2].toLowerCase().includes(searchText.toLowerCase()) ||
              patient[3].toLowerCase().includes(searchText.toLowerCase()) ||
              patient[5].toLowerCase().includes(searchText.toLowerCase())
          );
      });

      return filteredData;
  };
  const handleSearchInputChange = (e) => {
      setSearchText(e.target.value);
  };

  useEffect(() => {
    setToken(localStorage.getItem('access-token'));
    if (isTokenInvalidOrNotExist(token)) {
      console.log('Invalid token');
    } else {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      getAllJeunes(decodedToken?.claims?.id);
    }
  }, [token]);

  return (
      <>
          <Sidebar id='menu-item1' id1='menu-items1' activeClassName='ppnx' />
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
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  {/* /Table Header */}
                                  <div className="table-responsive doctor-list">
                                      <Table
                                          className="custom-table"
                                          pagination={{
                                              patients_number: data && data.length,
                                              showTotal: (patients_number, range) =>
                                                  <span style={{ fontWeight: 'bold', fontSize: '16px' , fontFamily:'Poppins'}}>
                                              Nombre total des patients : {patients_number} patients
                                              </span>
                                              
                                          }}
                                          columns={columns}
                                          dataSource={applySearch()}
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
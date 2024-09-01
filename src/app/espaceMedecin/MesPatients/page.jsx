"use client";
import "../../../assets/css/style.css";
import { useMemo, useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Sidebar from "../../../components/espaceMedecin/Sidebar1";
import Header from '@/components/espaceMedecin/Header';
import { Table, Drawer } from 'antd';
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import "../../../assets/css/font-awesome.min.css";
// import patients from "@assets/data/Patients";
import moment from 'moment';
import axios from 'axios';

import {
  refreshicon,
  searchnormal,
} from '../../../components/espaceMedecin/imagepath';
import { render } from "@fullcalendar/core/preact";

const MyPatients = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const ageRanges = Array.from({ length: 16 }, (_, index) => index + 10);

// const data = patients;
  const [data, setData] = useState(null);

  const getAllJeunes = () => {
    axios.get('http://localhost:8080/jeunes/with-user-info')
    .then(res => {
        console.log(res.data);
        setData(res.data);
    })
    .catch(err => {
        console.log(err);
    })
  }

  const updateFavoriteState = async (jeuneId, favorite) => {
    await axios.put(`http://localhost:8080/jeunes/favorite/${jeuneId}/${favorite}`)
    .then(res => {
        getAllJeunes();
    })
    .catch(err => {
        console.log(err);
    })
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
    // {
    //     title: <span style={{ marginLeft : '30px' }}>Id</span>,
    //     dataIndex: 0,
    //     width: 200,
    //     sorter: (a, b) => a[0] - b[0],
    //     render: (text) => <span style={{ whiteSpace: 'pre-wrap', marginLeft: '0px' }}>{text}</span>,
    // },
    {
        title: <span style={{ textAlign: 'center' }}>NIP</span>,
        dataIndex: 7,
        width: 200,
        sorter: (a, b) => a[7] - b[7],
        render: (text) => <span style={{ whiteSpace: 'pre-wrap', marginLeft: '0px' }}>{text}</span>,
    },
    {
        title: <span style={{ textAlign: 'center' }}>Nom et Prénom</span>,
        dataIndex: 0, // This is just a placeholder; we use custom rendering below
        width: 300,
        render: (text, record) => (
            <span style={{ whiteSpace: 'pre-wrap', marginLeft: '0px' }}>
                {record[2]} {record[1]}  {/* Display First Name followed by Last Name */}
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
        render: (text) => <span style={{ whiteSpace: 'pre-wrap', marginLeft: '25px' }}>{text}</span>,
        sorter: (a, b) => a[6].localeCompare(b[6])
    },
    {
        title: <span style={{ marginLeft: '20px' }}>Dossier médical</span>,
        width: 250,
        render: (item) => <a href={'/MesPatients/DossierMedical/' + item[0]} style={{marginLeft: '20px'}}>Dossier médical</a>,
    },
];

const openDrawer = () => {
    setDrawerVisible(true);
};

const closeDrawer = () => {
    setDrawerVisible(false);
};

const applySearch = () => {
    const filteredData = data && data.filter(patient => {
        // Check if the patient's Name, Gender, or Disease includes the searchText
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
    getAllJeunes();
}, [])

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

export default MyPatients;
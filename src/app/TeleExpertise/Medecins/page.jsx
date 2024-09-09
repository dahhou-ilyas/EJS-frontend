/* eslint-disable react/no-unescaped-entities */
"use client";
import "@/assets/css/style.css";
import { useMemo, useEffect, useState } from "react";
import Sidebar from "@/components/TeleExpertise/Sidebar";
import Link from "next/link";
import Image from "next/image";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { searchnormal } from "@/components/TeleExpertise/imagepath";
import Table from "@/components/TeleExpertise/Table";
import { getAllMedecins } from "@/services/medecinService";
import { decodeToken } from "@/utils/docodeToken";

const Medecins = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Nom",
        accessor: "name",
      },
      {
        Header: "Spécialité",
        accessor: "speciality",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "",
        accessor: "actions",
      },
    ],
    []
  );

  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("access-token")
      const decodedToken = decodeToken(token)
      try {
        const res = await getAllMedecins(token)
        const filteredData = res
          .filter(d => d.id !== decodedToken.claims.id)
          .map(d => ({
            ...d,
            name: d.nom + " " + d.prenom,
            speciality: d.estGeneraliste ? "Medecin Généraliste" : d.specialite,
            email: d.mail
          }));

        setData(filteredData);
        //console.log(res)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
  }, [])

  const [filteredData, setFilteredData] = useState(data);
  const [search, setSearch] = useState("");
  const [selectedspeciality, setSelectedspeciality] = useState("");

  useEffect(() => {
    const result = data.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        (selectedspeciality
          ? item.speciality.toLowerCase() === selectedspeciality.toLowerCase()
          : true)
    );
    setFilteredData(result);
  }, [search, selectedspeciality, data]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlespecialityChange = (e) => {
    setSelectedspeciality(e.target.value);
  };

  return (
    <>
      <Sidebar activeClassName="doctors" />
      <>
        <div className="page-wrapper">
          <div className="content">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/espaceMedecin">Page d&#39;accueil </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <FeatherIcon icon="chevron-right" />
                    </li>
                    <li className="breadcrumb-item">
                      <Link href="/TeleExpertise">Télé-Expertise</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <FeatherIcon icon="chevron-right" />
                    </li>
                    <li className="breadcrumb-item active">Médecins</li>
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
                            {/* <h3>Médecins ou Spécialité</h3> */}
                            <div className="doctor-search-blk">
                              <div className="top-nav-search table-search-blk" style={{marginRight: "10px"}}>
                                <form className="d-flex" onSubmit={(e) => {
                                  e.preventDefault()
                                }}>
                                  <input
                                    type="text"
                                    value={search}
                                    onChange={handleSearch}
                                    className="form-control common-style input-style"
                                    placeholder="Rechercher un nom"
                                  />
                                  <div className="btn">
                                    <Image src={searchnormal} alt="#" />
                                  </div>
                                </form>
                              </div>
                              <div className="speciality-dropdown table-search-blk">
                                <select
                                  value={selectedspeciality}
                                  onChange={handlespecialityChange}
                                  className="form-control common-style dropdown-style"
                                >
                                  <option value="">
                                    Toutes les spécialités
                                  </option>
                                  <option value="Pédiatre">Pédiatre</option>
                                  <option value="Psychiatre">Psychiatre</option>
                                  <option value="Gynécologue">
                                    Gynécologue
                                  </option>
                                  <option value="Dermatologue">
                                    Dermatologue
                                  </option>
                                  <option value="Ophtalmologue">
                                    Ophtalmologue
                                  </option>
                                  <option value="Medecin Généraliste">
                                    Medecin Généraliste
                                  </option>
                                </select>
                              </div>
                              {/* <div className="add-group">
                                <Link
                                  href="/"
                                  className="btn btn-primary add-pluss ms-2"
                                >
                                  <Image src={plusicon} alt="#" />
                                </Link>
                                <Link
                                  href="/"
                                  className="btn btn-primary doctor-refresh ms-2"
                                >
                                  <Image src={refreshicon} alt="#" />
                                </Link>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Table Header */}
                    {/* Table*/}
                    <div className="table-responsive ">
                      <Table columns={columns} data={filteredData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Page Header */}
          </div>
        </div>
      </>
    </>
  );
};

export default Medecins;

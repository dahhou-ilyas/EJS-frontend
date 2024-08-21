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

  const data = useMemo(
    () => [
      {
        name: "Ahmed El Mansouri",
        speciality: "Gynécologue",
        email: "ahmed.elmansouri@example.com",
      },
      {
        name: "Fatima Zahra Amrani",
        speciality: "Pédiatre",
        email: "fatima.amrani@example.com",
      },
      {
        name: "Ali Benchekroun",
        speciality: "Dermatologue",
        email: "ali.benchekroun@example.com",
      },
      {
        name: "Leila El Haddad",
        speciality: "Ophtalmologue",
        email: "leila.elhaddad@example.com",
      },
      {
        name: "Khalid Bouzid",
        speciality: "Pédiatre",
        email: "khalid.bouzid@example.com",
      },
      {
        name: "Rachida El Youssfi",
        speciality: "Psychiatre",
        email: "rachida.elyoussfi@example.com",
      },
      {
        name: "Omar Fassi",
        speciality: "Gynécologue",
        email: "omar.fassi@example.com",
      },
      {
        name: "Nadia Benjelloun",
        speciality: "Dermatologue",
        email: "nadia.benjelloun@example.com",
      },
      {
        name: "Samir Toumi",
        speciality: "Psychiatre",
        email: "samir.toumi@example.com",
      },
      {
        name: "Zineb El Kharraz",
        speciality: "Medecin Généraliste",
        email: "zineb.elkharraz@example.com",
      },
      {
        name: "Hassan El Bacha",
        speciality: "Ophtalmologue",
        email: "hassan.elbacha@example.com",
      },
      {
        name: "Amina El Habib",
        speciality: "Dermatologue",
        email: "amina.elhabib@example.com",
      },
      {
        name: "Mohamed El Idrissi",
        speciality: "Medecin Généraliste",
        email: "mohamed.elidrissi@example.com",
      },
      {
        name: "Sofia Bensouda",
        speciality: "Gynécologue",
        email: "sofia.bensouda@example.com",
      },
      {
        name: "Youssef El Alami",
        speciality: "Ophtalmologue",
        email: "youssef.elalami@example.com",
      },
      {
        name: "Jean Dupont",
        speciality: "Pédiatre",
        email: "jean.dupont@example.com",
      },
      {
        name: "Marie Lefèvre",
        speciality: "Dermatologue",
        email: "marie.lefevre@example.com",
      },
      {
        name: "Alice Martin",
        speciality: "Psychiatre",
        email: "alice.martin@example.com",
      },
      {
        name: "Robert Bernard",
        speciality: "Medecin Généraliste",
        email: "robert.bernard@example.com",
      },
      {
        name: "Catherine Dubois",
        speciality: "Ophtalmologue",
        email: "catherine.dubois@example.com",
      },
      {
        name: "David Moreau",
        speciality: "Dermatologue",
        email: "david.moreau@example.com",
      },
      {
        name: "Émilie Petit",
        speciality: "Gynécologue",
        email: "emilie.petit@example.com",
      },
      {
        name: "François Leroy",
        speciality: "Pédiatre",
        email: "francois.leroy@example.com",
      },
      {
        name: "Grace Lemoine",
        speciality: "Medecin Généraliste",
        email: "grace.lemoine@example.com",
      },
      {
        name: "Henri Marchand",
        speciality: "Ophtalmologue",
        email: "henri.marchand@example.com",
      },
    ],
    []
  );

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
                      <Link href="/TeleExpertise">Page d'accueil</Link>
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
                              <div className="top-nav-search table-search-blk">
                                <form className="d-flex">
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

"use client";
import "../assets/css/style.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { morning_img_03 } from "@/components/imagepath";
import {Avatar2} from "@/components/imagepath";
import NavigationHeader from "@/components/NavigationHeader";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/navigation";

export default function Home() {
  
  const router = useRouter();
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsSmallScreen(window.innerWidth <= 768);
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  return (
    // ici se trouve le contenu enfant de la MISE EN PAGE
    <div id="root">
      <Sidebar activeClassName="doctor-home" />
      <div className="page-wrapper">
        <div className="content">
          {/* En-tête de la page */}
          <NavigationHeader pages={['Tableau de Bord']} currentPage = "Tableau de Bord"/>
          {/* En-tête de la page */}

          <div className="topSection" style={{ marginTop: "40px" }}>
            {/* Section Bonjour */}
            <div className="good-morning-blk">
              <div className="row">
                <div className="col-md-6">
                  <div className="morning-user">
                    <h2>
                      Bonjour, <span>Dr.Mohamed</span>
                    </h2>
                    <p>Passez une bonne journée au travail</p>
                  </div>
                </div>
                <div className="col-md-6 position-blk">
                  <div className="morning-Image z-index-0">
                    <Image src={morning_img_03}  alt="" />
                  </div>
                </div>
              </div>
            </div>
            {/* Section Bonjour */}
          </div> 

          <div className="row mt-2">
              <div className="col-12 col-xl-12">
                <div className="card">
                  <div className="card-header pb-0">
                    <h1 className="card-title d-inline-block">
                      Patient récent{" "}
                    </h1>{" "}
                    <Link
                      href="/Patients"
                      className="float-end patient-views"
                    >
                      Voir tout
                    </Link>
                    {/* <div className="page-table-header mb-2">
                      <div className="row align-items-center">
                        <div className="col">
                          <div className="doctor-table-blk">
                            <h3>Liste des médecins</h3>
                            <div className="doctor-search-blk">
                              
                              <div className="add-group">
                                <Link
                                    href="/add-doctor"
                                    className="btn btn-primary add-pluss ms-2"
                                >
                                  <Image src={plusicon} alt="#" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  
                  <div className="card-block table-dash">
                    <div className="table-responsive">
                      <table className="table mb-0 border-0 datatable custom-table">
                        <thead>
                          <tr>
                            <th>Nom du patient</th>
                            <th>Âge</th>
                            <th>Date de naissance</th>
                            <th>Diagnostic</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="table-image">
                              <Image
                                width={28}
                                height={28}
                                className="rounded-circle"
                                src={Avatar2}
                                alt="#"
                              />
                              <h2>Amine Yamal</h2>
                            </td>
                            <td>21</td>
                            <td>07 janvier 2002</td>
                            <td>Crise cardiaque</td>
                          </tr>
                          <tr>
                            <td className="table-image">
                              <Image
                                width={28}
                                height={28}
                                className="rounded-circle"
                                src={Avatar2}
                                alt="#"
                              />
                              <h2>
                                Amine Yamal
                              </h2>
                            </td>
                            <td>21</td>
                            <td>07 janvier 2002</td>
                            <td>Crise cardiaque</td>
                          </tr>
                          <tr>
                            <td className="table-image">
                              <Image
                                width={28}
                                height={28}
                                className="rounded-circle"
                                src={Avatar2}
                                alt="#"
                              />
                              <h2>Amine Yamal</h2>
                            </td>
                            <td>21</td>
                            <td>07 janvier 2002</td>
                            <td>Crise cardiaque</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

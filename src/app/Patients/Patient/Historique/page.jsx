"use client";
import Sidebar from "@/components/Sidebar";
import NavigationHeader from "@/components/NavigationHeader";
import Link from "next/link";
import Image from "next/image";
import "@/assets/css/style2.css";//sublines on linkes
import "@/assets/css/style3.css";
import "@/assets/css/hist.css";
import {
  teeth,
  consultation,
  bones,
  eye,
  heart,
  lungs,
  stomach,
  dep_icon1
} from "@/components/imagepath";

const Historique = () => {
  const pages = ["Patients", "Patient", "Historique"];
  return (
    <div id="root">
      <Sidebar activeClassName="patients" />
      <div className="page-wrapper">
        <div className="content">
          <NavigationHeader pages={pages} currentPage="Historique" />

          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <ul class="timeline">
                    <li>
                      <button  className="timeline-badge activity-boxs comman-flex-center"
                      
                      data-bs-toggle="modal"
                      data-bs-target="#delete_patient"
                      >
                        <Image src={teeth}
                         style={{width:'50%',
                          height:'50%'
                         }}
                         height={50}
                         alt="#" />
                      </button>

                      <button class="timeline-panel">
                        <div class="timeline-heading">
                          <h5 class="">09 Decemebre 2022</h5>
                        </div>
                        <div class="timeline-body">
                          <p>
                            Bucco-dentaire
                          </p>
                          <p>
                            Examen Clinique
                          </p>
                        </div>
                      </button>
                    </li>
                    <li className="timeline-inverted">
                      <button className="timeline-badge activity-boxs comman-flex-center">
                        <Image src={eye}
                         style={{width:'50%',
                          height:'50%'
                         }}
                         height={50}
                         alt="#" />
                      </button>

                      <button class="timeline-panel">
                        <div class="timeline-heading">
                          <h5 class="">09 Decemebre 2022</h5>
                        </div>
                        <div class="timeline-body">
                          <p>
                            Ophtalmique
                          </p>
                          <p>
                            Examen Clinique
                          </p>
                        </div>
                      </button>
                    </li>
                    <li>
                      <button className="timeline-badge activity-boxs comman-flex-center">
                        <Image src={teeth}
                         style={{width:'50%',
                          height:'50%'
                         }}
                         height={50}
                         alt="#" />
                      </button>

                      <button class="timeline-panel">
                        <div class="timeline-heading">
                          <h5 class="">09 Decemebre 2022</h5>
                        </div>
                        <div class="timeline-body">
                          <p>
                            Bucco-dentaire
                          </p>
                          <p>
                            Examen Clinique
                          </p>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div
        id="delete_patient"
        className="modal fade delete-modal"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="about-me-list subcontent">
              <div className="modal-body text-center consultation-title">
                <Image
                  src={consultation}
                  alt="#"
                  width={50}
                  height={46}
                />
                <h3>Consultation XXXX</h3>
              </div>
              <ul className="list-space">
                <li>
                  <h4>NIP</h4>
                  <span>I731727</span>
                </li>
                <li>
                  <h4>CIN</h4>
                  <span>SB1294</span>
                </li>
                <li>
                  <h4>Date de Naissance</h4>
                  <span>21 Juin 2008</span>
                </li>
                <li>
                  <h4>Adresse</h4>
                  <span>13 Rue Elwahda, Sale</span>
                </li>
                <li>
                  <h4>Adresse Email</h4>
                  <span>jamal.morocco@gmail.com</span>
                </li>
                <li>
                  <h4>Numéro de Teléphone</h4>
                  <span>06 72 20 21 33</span>
                </li>
                <li>
                  <h4>Scolarisation</h4>
                  <span>Oui</span>
                </li>
                <li>
                  <h4>Niveau d etude</h4>
                  <span>Lycee</span>
                </li>
                <li>
                  <h4>CNE</h4>
                  <span>H1309818912</span>
                </li>
              </ul>
            </div>

            <div className="modal-body text-center mb-3">
              <div className="m-t-20">
                <button
                  type="submit"
                  className="btn btn-success me-2 imprimer"
                >
                  Imprimer
                </button>
                {" "}
                <Link
                  href="#"
                  className="btn btn-success modifier"
                  data-bs-dismiss="modal"
                >
                  Modifier
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Historique;

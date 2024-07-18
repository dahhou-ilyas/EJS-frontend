"use client";
import Sidebar from "@/components/Sidebar";
import NavigationHeader from "@/components/NavigationHeader";
import Link from "next/link";
import Image from "next/image";
// import "@/assets/css/style.css"; 
import "@/assets/css/style2.css";
import "@/assets/css/hist.css";
// import "@/assets/css/bootstrap.min.css";
// import "@/assets/css/select2.min.css";
// import "@/assets/css/font-awesome.min.css";
import { trashicon, profileicon, imgicon ,dep_icon1} from "@/components/imagepath";

const Historique = () => {
  const pages = ["Patients", "Patient", "Historique"];
  return (
    <div id="root">
      <Sidebar activeClassName="patients" />
      <div className="page-wrapper">
        <div className="content">
          <NavigationHeader pages={pages} currentPage="Historique" />
          {/* <div class="row">
            <div className="col-12 col-lg-12 d-flex">
              <div className="card flex-fill comman-shadow">
                <div className="card-header">
                  <h4 className="card-title d-inline-block">
                    Nombre de Consultation : 4
                  </h4>{" "}
                  <Link
                    href="/appoinmentlist"
                    className="patient-views float-end"
                  >
                    Show all
                  </Link>
                </div>
                <div className="card-body">
                  <div className="teaching-card">
                    <ul className="steps-history">
                      <li>02/12/2023</li>
                      <li>28/12/2023</li>
                      <li>17/02/2024</li>
                      <li>24/04/2024</li>
                    </ul>
                    <ul className="activity-feed">
                      <li className="feed-item d-flex align-items-center">
                        <div className="dolor-activity">
                          <ul className="doctor-date-list mb-2">
                            <li>
                              <i className="fas fa-circle me-2" />
                              Infections <span>Description</span>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="feed-item d-flex align-items-center">
                        <div className="dolor-activity">
                          <ul className="doctor-date-list mb-2">
                            <li>
                              <i className="fas fa-circle me-2" />
                              Problèmes cardiovasculaires{" "}
                              <span>Description</span>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="feed-item d-flex align-items-center">
                        <div className="dolor-activity">
                          <ul className="doctor-date-list mb-2">
                            <li>
                              <i className="fas fa-circle me-2" />
                              Maladies chroniques <span>Description</span>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="feed-item d-flex align-items-center">
                        <div className="dolor-activity">
                          <ul className="doctor-date-list mb-2">
                            <li>
                              <i className="fas fa-circle me-2" />
                              Problèmes cardiovasculaires{" "}
                              <span>Description</span>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div class="row">
					
          <div class="col-md-12">	
            <div class="card">
              <div class="card-body">
                <ul class="timeline">
                                  <li>
                                  <div className="timeline-badge activity-boxs comman-flex-center">
                                    <Image src={dep_icon1} alt="#"/>
                                  </div>
                                      
                                      <div class="timeline-panel">
                                          <div class="timeline-heading">
                                              <h4 class="timeline-title">Title</h4>
                                          </div>
                                          <div class="timeline-body">
                                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero laboriosam
                                                  dolor perspiciatis omnis exercitationem. Beatae, officia pariatur? Est
                                                  cum veniam excepturi. Maiores praesentium, porro voluptas suscipit facere
                                                  rem dicta, debitis.</p>
                                          </div>
                                      </div>
                                  </li>
                                  <li class="timeline-inverted">
                                      <div class="timeline-badge warning">
                                          <i class="fas fa-users"></i></div>
                                      <div class="timeline-panel">
                                          <div class="timeline-heading">
                                              <h4 class="timeline-title">Title </h4>
                                          </div>
                                          <div class="timeline-body">
                                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium maiores
                                                  odit qui est tempora eos, nostrum provident explicabo dignissimos debitis
                                                  vel! Adipisci eius voluptates, ad aut recusandae minus eaque facere.</p>
                                          </div>
                                      </div>
                                  </li>
                                  <li>
                                      <div class="timeline-badge danger">
                                          <i class="fas fa-gift"></i>
                                      </div>
                                      <div class="timeline-panel">
                                          <div class="timeline-heading">
                                              <h4 class="timeline-title">Lorem ipsum dolor</h4>
                                          </div>
                                          <div class="timeline-body">
                                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus numquam
                                                  facilis enim eaque, tenetur nam id qui vel velit similique nihil iure
                                                  molestias aliquam, voluptatem totam quaerat, magni commodi quisquam.</p>
                                          </div>
                                      </div>
                                  </li>
                                  <li class="timeline-inverted">
                                      <div class="timeline-panel">
                                          <div class="timeline-heading">
                                              <h4 class="timeline-title">Lorem ipsum dolor</h4>
                                          </div>
                                          <div class="timeline-body">
                                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates est
                                                  quaerat asperiores sapiente, eligendi, nihil. Itaque quos, alias sapiente
                                                  rerum quas odit! Aperiam officiis quidem delectus libero, omnis ut debitis!</p>
                                          </div>
                                      </div>
                                  </li>
                                  <li>
                                      <div class="timeline-badge info">
                                          <i class="fa fa-save"></i>
                                      </div>
                                      <div class="timeline-panel">
                                          <div class="timeline-heading">
                                              <h4 class="timeline-title">Lorem ipsum dolor</h4>
                                          </div>
                                          <div class="timeline-body">
                                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis minus modi
                                                  quam ipsum alias at est molestiae excepturi delectus nesciunt, quibusdam</p>
                                          </div>
                                      </div>
                                  </li>
                                  <li class="timeline-inverted">
                                      <div class="timeline-badge success">
                                          <i class="fa fa-graduation-cap"></i>
                                      </div>
                                      <div class="timeline-panel">
                                          <div class="timeline-heading">
                                              <h4 class="timeline-title">Lorem ipsum dolor</h4>
                                          </div>
                                          <div class="timeline-body">
                                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt obcaecati,
                                                  quaerat tempore officia voluptas debitis consectetur culpa amet, accusamus
                                                  dolorum fugiat, animi dicta aperiam, enim incidunt quisquam maxime neque
                                                  eaque.
                                              </p>
                                          </div>
                                      </div>
                                  </li>
                              </ul>
              </div>
            </div>
          </div>
            
        </div>		
        </div>
      </div>
    </div>
  );
};
export default Historique;

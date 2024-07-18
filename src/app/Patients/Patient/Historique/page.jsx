"use client";
import Sidebar from "@/components/Sidebar";
import NavigationHeader from "@/components/NavigationHeader";
import Link from "next/link";
import Image from "next/image";
import "@/assets/css/style2.css";
import "@/assets/css/hist.css";
import {
  teeth,
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
                      <Link href='NouvelleConsultation' className="timeline-badge activity-boxs comman-flex-center">
                        <Image src={teeth}
                         style={{width:'50%',
                          height:'50%'
                         }}
                         height={50}
                         alt="#" />
                      </Link>

                      <Link href='NouvelleConsultation' class="timeline-panel">
                        <div class="timeline-heading">
                          <h4 class="">09 Decemebre 2022</h4>
                        </div>
                        <div class="timeline-body">
                          <p>
                            Bucco-dentaire
                          </p>
                          <p>
                            Examen Clinique
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li className="timeline-inverted">
                      <Link href='NouvelleConsultation' className="timeline-badge activity-boxs comman-flex-center">
                        <Image src={eye}
                         style={{width:'50%',
                          height:'50%'
                         }}
                         height={50}
                         alt="#" />
                      </Link>

                      <Link href='NouvelleConsultation' class="timeline-panel">
                        <div class="timeline-heading">
                          <h4 class="">09 Decemebre 2022</h4>
                        </div>
                        <div class="timeline-body">
                          <p>
                            Ophtalmique
                          </p>
                          <p>
                            Examen Clinique
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href='NouvelleConsultation' className="timeline-badge activity-boxs comman-flex-center">
                        <Image src={teeth}
                         style={{width:'50%',
                          height:'50%'
                         }}
                         height={50}
                         alt="#" />
                      </Link>

                      <Link href='NouvelleConsultation' class="timeline-panel">
                        <div class="timeline-heading">
                          <h4 class="">09 Decemebre 2022</h4>
                        </div>
                        <div class="timeline-body">
                          <p>
                            Bucco-dentaire
                          </p>
                          <p>
                            Examen Clinique
                          </p>
                        </div>
                      </Link>
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

"use client";
import Sidebar from "@/components/Sidebar";
import NavigationHeader from "@/components/NavigationHeader";
import Link from "next/link";
import Image from "next/image";
import "@/assets/css/links.css"; //sublines on linkes
import "@/assets/css/center.module.css";
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
// import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { handleGenerateDocument } from "../page";

const Historique = () => {
  const pages = ["Patients", "Patient", "Historique"];
  const router = useRouter();
  function handleModify(){
    console.log('hy');
    router.push("Consultation/modifier");
    console.log(router);
  }
  return (
    <div id="root">
      <Sidebar activeClassName="patients" />
      <div className="page-wrapper">
        <div className="content">
          <NavigationHeader pages={pages} currentPage="Historique" />

          <div className="row hist-row">
            <div className="col-md-12 hist-card">
              <div className="card">
                <div className="card-body">
                  <ul className="timeline">
                    <li>
                      <button
                        className="timeline-badge activity-boxs comman-flex-center"
                        // className="btn btn-success waves-effect waves-light mt-1"
                        data-bs-toggle="modal"
                        data-bs-target="#con-close-modal"
                      >
                        <Image
                          src={teeth}
                          style={{ width: "50%", height: "50%" }}
                          height={50}
                          alt="#"
                        />
                      </button>

                      <button className="timeline-panel" 
                        data-bs-toggle="modal"
                        data-bs-target="#con-close-modal"
                        data-bs-toggle="modal"
                        data-bs-target="#con-close-modal">
                        <div className="timeline-heading">
                          <h5 className="">09 Decemebre 2022</h5>
                        </div>
                        <div className="timeline-body">
                          <p>Bucco-dentaire</p>
                          <p>Examen Clinique</p>
                        </div>
                      </button>
                    </li>
                    <li className="timeline-inverted">
                      <button className="timeline-badge activity-boxs comman-flex-center"
                        data-bs-toggle="modal"
                        data-bs-target="#con-close-modal">
                        <Image
                          src={eye}
                          style={{ width: "50%", height: "50%" }}
                          height={50}
                          alt="#"
                        />
                      </button>

                      <button className="timeline-panel"
                        data-bs-toggle="modal"
                        data-bs-target="#con-close-modal">
                        <div className="timeline-heading">
                          <h5 className="">18 Juillet 2023</h5>
                        </div>
                        <div className="timeline-body">
                          <p>Ophtalmique</p>
                          <p>Examen Clinique</p>
                        </div>
                      </button>
                    </li>
                    <li>
                      <button className="timeline-badge activity-boxs comman-flex-center"
                        data-bs-toggle="modal"
                        data-bs-target="#con-close-modal">
                        <Image
                          src={teeth}
                          style={{ width: "50%", height: "50%" }}
                          height={50}
                          alt="#"
                        />
                      </button>

                      <button className="timeline-panel"
                        data-bs-toggle="modal"
                        data-bs-target="#con-close-modal">
                        <div className="timeline-heading">
                          <h5 className="">02 Janvier 2024</h5>
                        </div>
                        <div className="timeline-body">
                          <p>Bucco-dentaire</p>
                          <p>Examen Clinique</p>
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
        id="con-close-modal"
        className="modal fade"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
        style={{ display: "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header p-4">
              <Image
                src={consultation}
                alt="#"
                style={{width:"7%",height:"7%"}}
              />
              <h4 className="modal-title">Consultation XXXX</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body p-4">
              <div class="row">
                  <div class="col-md-6">
                      <div class="mb-3">
                          <label for="motif" class="form-label">Motif</label>
                          <input readOnly value="Bucco-dentaire" type="text" class="form-control" id="motif" />
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="mb-3">
                          <label for="ant" class="form-label">Antecedants</label>
                          <input readOnly value="Personnel - Medical - Diabète" type="text" class="form-control" id="ant" />
                      </div>
                  </div>
              </div>
              <div class="row one-input">
                  <div class="col-md-12">
                      <div class="mb-3">
                          <label for="field-historique" class="form-label">Historique Clinique</label>
                          <textarea class="form-control" id="field-historique" 
                            value = "L'historique clinique regroupe les antécédents médicaux d'un patient"
                          ></textarea>
                      </div>
                  </div>
              </div>
              <div class="row one-input">
                  <div class="col-md-12">
                      <div class="mb-3">
                          <label for="field-historique" class="form-label">Examen Clinique</label>
                          <textarea class="form-control" id="field-clinique" 
                          value = "L'examen clinique est une évaluation physique du patient réalisée par un professionnel de la santé."></textarea>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-6">
                      <div class="mb-3">
                          <label for="motif" class="form-label">Examen Medicaux</label>
                          <input readOnly value="Biologique - NFS" type="text" class="form-control" id="examen-medicaux" />
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="mb-3">
                          <label for="ant" class="form-label">Diagnostic Positif</label>
                          <input readOnly value="Tele-Expertise" type="text" class="form-control" id="ant" />
                      </div>
                  </div>
              </div>
              <div class="row one-input">
                  <div class="col-md-12">
                      <div class="mb-3">
                          <label for="field-historique" class="form-label">Ordonnance</label>
                          <textarea class="form-control" id="field-historique" value = "Ordonnance .." ></textarea>
                      </div>
                  </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary waves-effect btn-imprimer"
                data-bs-dismiss="modal"
                onClick={handleGenerateDocument}
              >
                Imprimer
              </button>
              <button
                type="button"
                className="btn btn-info btn-modifier"
                data-bs-dismiss="modal"
                onClick={handleModify}
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Historique;

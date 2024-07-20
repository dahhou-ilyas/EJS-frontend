"use client";
import Sidebar from "@/components/Sidebar";
import NavigationHeader from "@/components/NavigationHeader";
import Link from "next/link";
import Image from "next/image";
import "@/assets/css/links.css"; //sublines on linkes
import "@/assets/css/center.css";
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

          <div className="row">
            <div className="col-md-12">
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

                      <button className="timeline-panel">
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
                      <button className="timeline-badge activity-boxs comman-flex-center">
                        <Image
                          src={eye}
                          style={{ width: "50%", height: "50%" }}
                          height={50}
                          alt="#"
                        />
                      </button>

                      <button className="timeline-panel">
                        <div className="timeline-heading">
                          <h5 className="">09 Decemebre 2022</h5>
                        </div>
                        <div className="timeline-body">
                          <p>Ophtalmique</p>
                          <p>Examen Clinique</p>
                        </div>
                      </button>
                    </li>
                    <li>
                      <button className="timeline-badge activity-boxs comman-flex-center">
                        <Image
                          src={teeth}
                          style={{ width: "50%", height: "50%" }}
                          height={50}
                          alt="#"
                        />
                      </button>

                      <button className="timeline-panel">
                        <div className="timeline-heading">
                          <h5 className="">09 Decemebre 2022</h5>
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
            <div className="modal-header">
              <Image
                src={consultation}
                alt="#"
                width={50}
                height={46}
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
                          <label for="field-1" class="form-label">Name</label>
                          <input type="text" class="form-control" id="field-1" placeholder="John"/>
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="mb-3">
                          <label for="field-2" class="form-label">Surname</label>
                          <input type="text" class="form-control" id="field-2" placeholder="Doe"/>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-12">
                      <div class="mb-3">
                          <label for="field-3" class="form-label">Address</label>
                          <input type="text" class="form-control" id="field-3" placeholder="Address"/>
                      </div>
                  </div>
              </div>
              {/* <div class="row">
                  <div class="col-md-4">
                      <div class="mb-3">
                          <label for="field-4" class="form-label">City</label>
                          <input type="text" class="form-control" id="field-4" placeholder="Boston">
                      </div>
                  </div>
                  <div class="col-md-4">
                      <div class="mb-3">
                          <label for="field-5" class="form-label">Country</label>
                          <input type="text" class="form-control" id="field-5" placeholder="United States">
                      </div>
                  </div>
                  <div class="col-md-4">
                      <div class="mb-3">
                          <label for="field-6" class="form-label">Zip</label>
                          <input type="text" class="form-control" id="field-6" placeholder="123456">
                      </div>
                  </div>
              </div> */}
              <div class="row">
                  <div class="col-md-12">
                      <div class="">
                          <label for="field-7" class="form-label">Personal Info</label>
                          <textarea class="form-control" id="field-7" placeholder="Write something about yourself"></textarea>
                      </div>
                  </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary waves-effect"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-info waves-effect waves-light"
                data-bs-dismiss="modal"
                onClick={handleModify}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};
export default Historique;

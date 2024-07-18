"use client";
import Sidebar from "@/components/Sidebar";
import NavigationHeader from "@/components/NavigationHeader";
import { useState } from "react";
import Select from "react-select";
const ajouterPrescription = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [consultations, setConsultations] = useState([
    { value: "Infection(INXXXX)", label: "Infection(INXXXX)" },
    { value: "Bucco-dentaire", label: "Bucco-dentaire" },
    { value: "O.R.L", label: "O.R.L" },
    { value: "Pleuropulmonaire", label: "Pleuropulmonaire" },
    { value: "Cardio-vasculaire", label: "Cardio-vasculaire" },
    { value: "Digestif", label: "Digestif" },
    { value: "Loco-moteur", label: "Loco-moteur" }
  ]);

  const [medicaments, setMedicaments] = useState([
    { value: "Bêtabloquants", label: "Bêtabloquants" },
    { value: "Diurétiques", label: "Diurétiques" },
    { value: "Metformine", label: "Metformine" },
    { value: "Sulfonylurées", label: "Sulfonylurées" },
    { value: "Insuline", label: "Insuline" }
  ]);
  const [volume, setVolume] = useState([
    { value: "100mg", label: "100mg" },
    { value: "500mg", label: "500mg" },
    { value: "1000mg", label: "1000mg" }
  ]);
  const [frequence, setFrequence] = useState([
    { value: "100mg", label: "100mg" },
    { value: "500mg", label: "500mg" },
    { value: "1000mg", label: "1000mg" }
  ]);
  const pages = ["Patients", "Patient", "Ajouter Prescription"];
  return (
    <div id="root">
      <Sidebar activeClassName="patients" />
      <div className="page-wrapper">
        <div className="content">
          <NavigationHeader pages={pages} currentPage="Ajouter Prescription" />
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-heading">
                          <h4>Ajouter Une Nouvelle Prescriptions</h4>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                            Médicaments<span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Entrer.."
                          />
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-6">
                        <div className="form-group local-forms">
                          <label>
                            Periode de traitement{" "}
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Entrer.."
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group local-forms">
                          <label>
                            Consultations{" "}
                            <span className="login-danger">*</span>
                          </label>
                          <Select
                            menuPortalTarget={document.body}
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 })
                            }}
                            defaultValue={consultations[0]}
                            onChange={setConsultations}
                            options={consultations}
                            id="search-commodity"
                            components={{
                              IndicatorSeparator: () => null
                            }}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused
                                  ? "none"
                                  : "2px solid rgba(46, 55, 164, 0.1);",
                                boxShadow: state.isFocused
                                  ? "0 0 0 1px #2e37a4"
                                  : "none",
                                "&:hover": {
                                  borderColor: state.isFocused
                                    ? "none"
                                    : "2px solid rgba(46, 55, 164, 0.1)"
                                },
                                borderRadius: "10px",
                                fontSize: "14px",
                                minHeight: "45px"
                              }),
                              dropdownIndicator: (base, state) => ({
                                ...base,
                                transform: state.selectProps.menuIsOpen
                                  ? "rotate(-180deg)"
                                  : "rotate(0)",
                                transition: "250ms",
                                width: "35px",
                                height: "35px"
                              })
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group local-forms">
                          <label>
                            Medicaments <span className="login-danger">*</span>
                          </label>
                          <Select
                            menuPortalTarget={document.body}
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 })
                            }}
                            defaultValue={medicaments[0]}
                            onChange={setConsultations}
                            options={medicaments}
                            id="search-commodity"
                            components={{
                              IndicatorSeparator: () => null
                            }}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused
                                  ? "none"
                                  : "2px solid rgba(46, 55, 164, 0.1);",
                                boxShadow: state.isFocused
                                  ? "0 0 0 1px #2e37a4"
                                  : "none",
                                "&:hover": {
                                  borderColor: state.isFocused
                                    ? "none"
                                    : "2px solid rgba(46, 55, 164, 0.1)"
                                },
                                borderRadius: "10px",
                                fontSize: "14px",
                                minHeight: "45px"
                              }),
                              dropdownIndicator: (base, state) => ({
                                ...base,
                                transform: state.selectProps.menuIsOpen
                                  ? "rotate(-180deg)"
                                  : "rotate(0)",
                                transition: "250ms",
                                width: "35px",
                                height: "35px"
                              })
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group local-forms">
                          <label>
                            Volume <span className="login-danger">*</span>
                          </label>
                          <Select
                            menuPortalTarget={document.body}
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 })
                            }}
                            defaultValue={volume[0]}
                            onChange={setConsultations}
                            options={volume}
                            id="search-commodity"
                            components={{
                              IndicatorSeparator: () => null
                            }}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused
                                  ? "none"
                                  : "2px solid rgba(46, 55, 164, 0.1);",
                                boxShadow: state.isFocused
                                  ? "0 0 0 1px #2e37a4"
                                  : "none",
                                "&:hover": {
                                  borderColor: state.isFocused
                                    ? "none"
                                    : "2px solid rgba(46, 55, 164, 0.1)"
                                },
                                borderRadius: "10px",
                                fontSize: "14px",
                                minHeight: "45px"
                              }),
                              dropdownIndicator: (base, state) => ({
                                ...base,
                                transform: state.selectProps.menuIsOpen
                                  ? "rotate(-180deg)"
                                  : "rotate(0)",
                                transition: "250ms",
                                width: "35px",
                                height: "35px"
                              })
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group local-forms">
                          <label>
                            Fréquence <span className="login-danger">*</span>
                          </label>
                          <Select
                            menuPortalTarget={document.body}
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 })
                            }}
                            defaultValue={medicaments[0]}
                            onChange={setConsultations}
                            options={medicaments}
                            id="search-commodity"
                            components={{
                              IndicatorSeparator: () => null
                            }}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused
                                  ? "none"
                                  : "2px solid rgba(46, 55, 164, 0.1);",
                                boxShadow: state.isFocused
                                  ? "0 0 0 1px #2e37a4"
                                  : "none",
                                "&:hover": {
                                  borderColor: state.isFocused
                                    ? "none"
                                    : "2px solid rgba(46, 55, 164, 0.1)"
                                },
                                borderRadius: "10px",
                                fontSize: "14px",
                                minHeight: "45px"
                              }),
                              dropdownIndicator: (base, state) => ({
                                ...base,
                                transform: state.selectProps.menuIsOpen
                                  ? "rotate(-180deg)"
                                  : "rotate(0)",
                                transition: "250ms",
                                width: "35px",
                                height: "35px"
                              })
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group local-forms">
                          <label>
                            Durée <span className="login-danger">*</span>
                          </label>
                          <Select
                            menuPortalTarget={document.body}
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 })
                            }}
                            defaultValue={medicaments[0]}
                            onChange={setConsultations}
                            options={medicaments}
                            id="search-commodity"
                            components={{
                              IndicatorSeparator: () => null
                            }}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused
                                  ? "none"
                                  : "2px solid rgba(46, 55, 164, 0.1);",
                                boxShadow: state.isFocused
                                  ? "0 0 0 1px #2e37a4"
                                  : "none",
                                "&:hover": {
                                  borderColor: state.isFocused
                                    ? "none"
                                    : "2px solid rgba(46, 55, 164, 0.1)"
                                },
                                borderRadius: "10px",
                                fontSize: "14px",
                                minHeight: "45px"
                              }),
                              dropdownIndicator: (base, state) => ({
                                ...base,
                                transform: state.selectProps.menuIsOpen
                                  ? "rotate(-180deg)"
                                  : "rotate(0)",
                                transition: "250ms",
                                width: "35px",
                                height: "35px"
                              })
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group local-forms">
                          <label>
                            Indication <span className="login-danger">*</span>
                          </label>
                          <textarea
                            className="form-control"
                            rows={3}
                            cols={30}
                            placeholder={"Ajouter des indications .."}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                          <div className="doctor-submit text-end">
                            <button
                              type="submit"
                              className="btn btn-primary submit-form me-2"
                            >
                              Ajouter
                            </button>
                            <button
                              type="submit"
                              className="btn btn-primary cancel-form"
                            >
                              Annuler
                            </button>
                          </div>
                        </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ajouterPrescription;

import React from "react";
import Link from "next/link";

import Select from "react-select";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

import { DatePicker } from "antd";
import { TextField } from "@mui/material";

import dayjs from 'dayjs';
import { useState, useEffect } from "react";
import { professionals } from "@/components/ies/utility/professionals";

const Live_Planification_Form_Filled = ({ showDashboard, status, liveData }) => {
    //const selectedOption = professionals[1];
    const selectedOption = { value: liveData.id, label: liveData.responsable.infoUser.nom };
    const dateArray = liveData.date; // Par exemple, [2024, 2, 10, 14, 30, 0]
    const [selectedDate, setSelectedDate] = useState(dayjs(new Date(dateArray[0], dateArray[1] - 1, dateArray[2])));


    return (
        <>
            <div className="page-wrapper custom-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link href="#" onClick={showDashboard}>Tableau de bord </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right"></i>
                                    </li>
                                    <li className="breadcrumb-item active">Planification du Live</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <div className="col-12">
                                    <div className="form-heading">
                                        <h4>Planification du Live</h4>
                                    </div>
                                </div>
                                <form action="#">
                                    <div className="input-block row mb-4">
                                        <label className="col-form-label col-md-4">Titre du Live <span className="login-danger">*</span></label>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control" value={liveData.subject} disabled />
                                        </div>
                                    </div>

                                    <div className="input-block row mb-4">
                                        <label className="col-form-label col-md-4">Choisir la thématique du Live <span className="login-danger">*</span></label>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control" value={liveData.thematique.contenu} disabled />
                                        </div>
                                    </div>

                                    <div className="input-block row mb-4">
                                        <label className="col-form-label col-md-4">Intervenant</label>
                                        <div className="col-md-8">
                                            <Select
                                                isSearchable={false} // Disable search functionality
                                                isDisabled={true} // Disable the entire Select component if needed
                                                value={selectedOption}
                                                options={professionals}
                                                id="search-commodity"
                                                components={{
                                                    IndicatorSeparator: () => null
                                                }}
                                                styles={{
                                                    menuPortal: base => ({ ...base, zIndex: 9999 }),
                                                    control: (baseStyles, state) => ({
                                                        ...baseStyles,
                                                        borderColor: state.isFocused ? 'none' : '2px solid rgba(46, 55, 164, 0.1);',
                                                        boxShadow: state.isFocused ? '0 0 0 1px #2e37a4' : 'none',
                                                        '&:hover': {
                                                            borderColor: state.isFocused ? 'none' : '2px solid rgba(46, 55, 164, 0.1)',
                                                        },
                                                        borderRadius: '10px',
                                                        fontSize: "14px",
                                                        minHeight: "45px",
                                                    }),
                                                    dropdownIndicator: (base, state) => ({
                                                        ...base,
                                                        transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
                                                        transition: '250ms',
                                                        width: '35px',
                                                        height: '35px',
                                                    }),
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="input-block row mb-0">
                                        <label className="col-form-label col-md-4">Date du Live <span className="login-danger">*</span></label>
                                        <div className="col-md-8">
                                            <div className="cal-icon">
                                                <DatePicker
                                                    value={/*dayjs("10-02-2024")*/
                                                        selectedDate
                                                    }
                                                    className="form-control datetimepicker"
                                                    suffixIcon={null}
                                                    allowClear={false}
                                                    placeholder="Sélectionner une date"
                                                    style={{
                                                        control: (baseStyles, state) => ({
                                                            ...baseStyles,
                                                            borderColor: isClicked ? '#2E37A4' : '2px solid rgba(46, 55, 164, 0.1)',
                                                            '&:hover': {
                                                                borderColor: state.isFocused ? 'none' : 'none',
                                                            },
                                                        })
                                                    }}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="input-block row mb-4">
                                        <label className="col-form-label col-md-4">Commence vers <span className="login-danger">*</span></label>
                                        <div className="col-md-8">
                                            <div className="">
                                                <TextField
                                                    id="outlined-controlled"
                                                    className="form-control"
                                                    type="time"
                                                    value={"18:30"}
                                                    style={{ minWidth: '100%' }}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    {(status !== "Questions envoyés" && status !== "Terminé") ?
                                        <div className="input-block row">
                                            <label className="col-form-label col-md-4">Lien StreamYard <span className="login-danger">*</span></label>
                                            <div className="col-md-8">
                                                <input type="text" className="form-control" defaultValue={liveData.lienStreamYard} />
                                            </div>
                                        </div>
                                        :
                                        <div className="input-block row">
                                            <label className="col-form-label col-md-4">Lien StreamYard <span className="login-danger">*</span></label>
                                            <div className="col-md-8">
                                                <input type="text" className="form-control" value={liveData.lienStreamYard} disabled />
                                            </div>
                                        </div>
                                    }

                                    {(status !== "Questions envoyés" && status !== "Terminé") ?
                                        <div className="input-block row mb-4">
                                            <label className="col-form-label col-md-4">Lien Youtube <span className="login-danger">*</span></label>
                                            <div className="col-md-8">
                                                <input type="text" className="form-control" defaultValue={liveData.lienYoutube} />
                                            </div>
                                        </div>
                                        :
                                        <div className="input-block row mb-4">
                                            <label className="col-form-label col-md-4">Lien Youtube <span className="login-danger">*</span></label>
                                            <div className="col-md-8">
                                                <input type="text" className="form-control" value={liveData.lienYoutube} disabled />
                                            </div>
                                        </div>
                                    }

                                    <div className="col-12">
                                        <div className="doctor-submit text-end">
                                            <button type="submit" className="btn btn-primary submit-form me-2">Enregistrer</button>
                                            <button type="submit" className="btn btn-primary cancel-form">Annuler</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Live_Planification_Form_Filled;

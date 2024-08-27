"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";

import Select from "react-select";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import InputWithCharacterCount from "../input-character-count";
import TextAreaWithCharacterCount from "@/components/ies/ui/textarea-character-count";

const quality = [
    { value: 1, label: "Très mauvais" },
    { value: 2, label: "Mauvais" },
    { value: 3, label: "Passable" },
    { value: 4, label: "Bon" },
    { value: 5, label: "Excellent" }
];

const yesno = [
    { value: 1, label: "Oui" },
    { value: 2, label: "Non" },
];

const Post_Live_Form = ({ showDashboard }) => {

    {/** TODO: Please check for input size control classes etc. */ }
    const [inputValue, setTextAreaValue] = useState('');

    const [alertify, setAlertify] = useState(null);

    useEffect(() => {
        const initializeAlertify = async () => {
            try {
                const alertifyInstance = await getAlertifyInstance();
                setAlertify(alertifyInstance);
            } catch (error) {
                console.error('Failed to load alertify:', error);
            }
        };

        initializeAlertify();
    }, []);

    return (
        <>
            <div className="page-wrapper custom-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link href="/youth" >Tableau de bord </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right"></i>
                                    </li>
                                    <li className="breadcrumb-item active">Votre avis compte</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <div className="col-12">
                                    <div className="form-heading">
                                        <h4>Ce que vous pensez du Live...</h4>
                                    </div>
                                </div>
                                <form action="#">
                                    <div className="input-block row mb-0">
                                        <label className="col-form-label col-md-4">Comment évalueriez-vous le Live? <span className="login-danger">*</span></label>
                                        <div className="col-md-8">
                                            <Select
                                                options={quality}
                                                id="search-commodity"
                                                components={{
                                                    IndicatorSeparator: () => null
                                                }}
                                                placeholder="Sélectionner une des réponses"
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
                                    <div className="input-block row mb-4">
                                        <label className="col-form-label col-md-4">Recommanderiez-vous cette session à d'autres personnes? <span className="login-danger">*</span></label>
                                        <div className="col-md-8">
                                            <Select
                                                options={yesno}
                                                id="search-commodity"
                                                components={{
                                                    IndicatorSeparator: () => null
                                                }}
                                                placeholder="Sélectionner une des réponses"
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

                                    <InputWithCharacterCount maxLength={100} label={"Y a-t-il un sujet que vous aimeriez voir abordé en direct?"} />

                                    <div className="col-12">
                                        <div className="form-heading">
                                            <h4 style={{ fontSize: "16px", marginBottom: "12px" }}>Exprimez-vous librement</h4>
                                        </div>
                                    </div>

                                    <TextAreaWithCharacterCount maxLength={400} inputValue={inputValue} setTextAreaValue={setTextAreaValue} />

                                    <div className="col-12">
                                        <div className="doctor-submit text-end">
                                            <button type="submit" className="btn btn-primary submit-form me-2">Soumettre</button>
                                            <Link href="/ies/youth"><button type="submit" className="btn btn-primary cancel-form">Annuler</button></Link>
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

export default Post_Live_Form;

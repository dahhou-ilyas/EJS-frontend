"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";

import Select from "react-select";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import InputWithCharacterCount from "../input-character-count";
import TextAreaWithCharacterCount from "@/components/ies/ui/textarea-character-count";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { getAlertifyInstance } from "../../utility/alertify-singleton";
import axios from "axios";
import Loading from "../../utility/loading";
import { SPRINGBOOT_API_URL } from "@/config";

const quality = [
    { value: 1, label: "★☆☆☆☆" },
    { value: 2, label: "★★☆☆☆" },
    { value: 3, label: "★★★☆☆" },
    { value: 4, label: "★★★★☆" },
    { value: 5, label: "★★★★★" }
];

const yesno = [
    { value: 1, label: "Oui" },
    { value: 2, label: "Non" },
];

const Post_Live_Form = ({ showDashboard }) => {

    {/** TODO: Please check for input size control classes etc. */ }
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedRecommand, setSelectedRecommand] = useState(null);

    const handleChange1 = (selectedOption) => {
        setSelectedRating(selectedOption);
    };

    // Handle change event
    const handleChange2 = (selectedOption) => {
        setSelectedRecommand(selectedOption);
    };

    const [inputValue1, setInputValue] = useState('');
    const [inputValue2, setTextAreaValue] = useState('');

    const [alertify, setAlertify] = useState(null);
    const [fetched, setFetched] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const initializeAlertify = async () => {
            try {
                const alertifyInstance = await getAlertifyInstance();
                setAlertify(alertifyInstance);
            } catch (error) {
                console.error('Failed to load alertify:', error);
            }
        };

        const fetchData = async () => {
            const token = localStorage.getItem("access-token");

            if (!token) {
                router.push("/auth/jeunes");
                return;
            }

            try {
                const decodedToken = jwtDecode(token);
                const role = decodedToken.claims.role;

                if (!role.includes("JEUNE")) {
                    router.push("/auth/jeunes");
                    return;
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        initializeAlertify();
        fetchData();
        setFetched(true);
    }, []);

    const fetchLastLive = async (token, idJeune) => {
        try {
            const response = await axios.get(`${SPRINGBOOT_API_URL}/jeunes/${idJeune}/streams/last`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch last live');
        }
    };

    const postFeedback = async (token, idJeune, lastLive, feedback) => {
        try {
            await axios.post(`${SPRINGBOOT_API_URL}/jeunes/${idJeune}/streams/${lastLive.id}/feedbacks`, feedback, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            throw new Error('Failed to post feedback');
        }
    };

    const handleErrors = (error) => {
        console.error("Error: " + error);
        if (alertify) alertify.error('<strong>This is an error message:</strong> ' + error.message);
    };

    const save = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("access-token");

            if (!token) {
                router.push("/auth/jeunes");
                return;
            }

            const decodedToken = jwtDecode(token);
            const idJeune = decodedToken.claims.id;

            if (!selectedRating || !selectedRecommand) throw new Error("bad form");

            const evals = ["Excellent", "Bon", "Passable", "Mauvais", "TresMauvais"];
            const feedback = {
                evaluation: evals[5 - selectedRating.value],
                recommended: selectedRecommand.value === 1,
                suggestedTheme: inputValue1,
                opinion: inputValue2
            };

            const lastLive = await fetchLastLive(token, idJeune);

            if (!lastLive) throw new Error('Last live not found');

            await postFeedback(token, idJeune, lastLive, feedback);

            if (alertify) alertify.success('<strong>This is a success message:</strong> done');
        } catch (error) {
            handleErrors(error);
        }
    };

    if (!fetched) return <Loading />;

    return (
        <>
            <div className="page-wrapper custom-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link href="/ies/youth" >Tableau de bord </Link>
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
                                                value={selectedRating}
                                                onChange={handleChange1}
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
                                        <label className="col-form-label col-md-4">Recommanderiez-vous cette session à d&apos;autres personnes? <span className="login-danger">*</span></label>
                                        <div className="col-md-8">
                                            <Select
                                                options={yesno}
                                                value={selectedRecommand}
                                                id="search-commodity"
                                                onChange={handleChange2}
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

                                    <InputWithCharacterCount maxLength={100} label={"Y a-t-il un sujet que vous aimeriez voir abordé en direct?"} inputValue={inputValue1} setInputValue={setInputValue} />

                                    <div className="col-12">
                                        <div className="form-heading">
                                            <h4 style={{ fontSize: "16px", marginBottom: "12px" }}>Exprimez-vous librement</h4>
                                        </div>
                                    </div>

                                    <TextAreaWithCharacterCount maxLength={400} inputValue={inputValue2} setTextAreaValue={setTextAreaValue} />

                                    <div className="col-12">
                                        <div className="doctor-submit text-end">
                                            <button type="submit" className="btn btn-primary submit-form me-2" onClick={save}>Soumettre</button>
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

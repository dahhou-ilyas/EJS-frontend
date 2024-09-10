import React, { useEffect, useState } from "react";
import Link from "next/link";

import Select from "react-select";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

import { DatePicker } from "antd";
import { TextField } from "@mui/material";

import axios from 'axios';
import Loading from "@/components/ies/utility/loading";
import Error from "@/components/ies/utility/error";
import dayjs from 'dayjs';
import FileUploader from "../file-uploader";
import { getAlertifyInstance } from "@/components/ies/utility/alertify-singleton";
import { jwtDecode } from 'jwt-decode';
import { useRouter } from "next/navigation";
import { SPRINGBOOT_API_URL } from "@/config";

const Live_Planification_Form = ({ toDashboard }) => {
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

    {/** TODO: Please check for input size control classes, do input format checking too (regex etc.). */ }
    {/** Please use onChange(event) or onChange with [selectedOption, setSelectedOption] with time inputs. */ }
    const [selectedprofessionals, setselectedprofessionals] = useState(null)
    const [datat, setdatat] = useState(null)
    const [dataprofs, setdataprofs] = useState([])
    const [professionals, setProfessionals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const [selectedTime, setSelectedTime] = useState(null);

    const [file, setFile] = useState(null);
    const [fetched, setFetched] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const init = async () => {

            const token = localStorage.getItem("access-token");

            if (!token) {
                router.push("/auth/administrateur");
                return;
            }

            try {
                const decodedToken = jwtDecode(token);
                const role = decodedToken.claims.role;

                if (role.includes("MEDECIN") || role.includes("SANTE") || role.includes("JEUNE")) {
                    router.push("/auth/administrateur");
                    return;
                }
            } catch (error) {
            }
        };

        init();
        setFetched(true);
    }, []);

    const handleDateChange = (date) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        setSelectedDate(formattedDate);
        updateCombinedDateTime(formattedDate, selectedTime);
    };
    const handleTimeChange = (event) => {
        const time = event.target.value;
        setSelectedTime(time);
        updateCombinedDateTime(selectedDate, time);
    };
    const updateCombinedDateTime = (date, time) => {
        if (date && time) {
            const combinedDateTime = dayjs(`${date}T${time}`).format('YYYY-MM-DDTHH:mm:ss');
            setSelectedDateTime(combinedDateTime);
        }
    };
    const handlechange = (profselected) => {
        for (let i = 0; i < dataprofs.length; i++) {
            if (dataprofs[i].id == profselected.value) {
                setselectedprofessionals(dataprofs[i]);

            }
        }
    }

    const save = async (event) => {
        try {
            const token = localStorage.getItem("access-token");

            if (!token) {
                router.push("/auth/administrateur");
                return;
            }

            const decodedToken = jwtDecode(token);
            const idAdmin = decodedToken.claims.id;

            event.preventDefault();
            const title = document.getElementById("title").value;
            const theme = document.getElementById("theme").value
            const thematique = { contenu: theme }
            const lienStreamYard = document.getElementById("lienS").value;
            const lienyoutube = document.getElementById("lieny").value;
            const responsable = {
                id: selectedprofessionals.id,
                infoUser: {
                    id: selectedprofessionals.infoUser.id,
                    nom: selectedprofessionals.infoUser.nom,
                    prenom: selectedprofessionals.infoUser.prenom,
                    numTel: selectedprofessionals.infoUser.numTel,
                    mail: selectedprofessionals.infoUser.mail,
                    motDePasse: selectedprofessionals.infoUser.motDePasse
                },
                role: selectedprofessionals.role
            }
            const live = {
                subject: title,
                date: selectedDateTime,
                lienStreamYard: lienStreamYard,
                lienYoutube: lienyoutube,
                thematique: thematique,
                responsable: responsable
            };

            const formData = new FormData();
            formData.append('live', JSON.stringify(live));
            formData.append('image', file);

            try {
                await axios.post(`${SPRINGBOOT_API_URL}/admins/${idAdmin}/streams`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`
                    }
                });

                // Toast
                if (alertify) alertify.success('<strong>This is a success message:</strong> done');
            } catch (error) {
                console.error("Error saving the live: " + error);

                // Toast
                if (alertify) alertify.error('<strong>This is an error message:</strong> request related');
            }
        } catch (error) {
            // Toast
            if (alertify) alertify.error('<strong>This is an error message:</strong> bad form');
        }
    }

    useEffect(() => {
        const fetchProfessionals = async () => {
            try {
                const token = localStorage.getItem("access-token");

                if (!token) {
                    router.push("/auth/administrateur");
                    return;
                }

                const response = await axios.get(SPRINGBOOT_API_URL+"/responsables", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setdataprofs(response.data);
            } catch (error) {
                console.error("Error fetching professionals:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfessionals();
    }, []);

    useEffect(() => {
        const data = dataprofs.map((item) => ({
            value: item.id,
            label: `${item.role} ${item.infoUser.nom} ${item.infoUser.prenom}`
        }));
        setProfessionals(data);
    }, [dataprofs]);

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
                                        <Link href={toDashboard} >Tableau de bord </Link>
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
                                    <div className="input-block row mb-0">
                                        <label className="col-form-label col-md-4">Titre du Live <span className="login-danger">*</span></label>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control" id="title" />
                                        </div>
                                    </div>

                                    <div className="input-block row mb-4">
                                        <label className="col-form-label col-md-4">Choisir la thématique du Live <span className="login-danger">*</span></label>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control" id="theme" />
                                        </div>
                                    </div>

                                    <div className="input-block row mb-4">
                                        <label className="col-form-label col-md-4">Intervenant</label>
                                        <div className="col-md-8">
                                            <Select
                                                onChange={handlechange}
                                                options={professionals}
                                                id="search-commodity"
                                                components={{ IndicatorSeparator: () => null }}
                                                placeholder="Sélectionner un intervenant"
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
                                                    onChange={handleDateChange}
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
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="input-block row mb-4">
                                        <label className="col-form-label col-md-4">Commence vers <span className="login-danger">*</span></label>
                                        <div className="col-md-8">
                                            <div className="">
                                                <TextField
                                                    onChange={handleTimeChange}
                                                    type="time"
                                                    style={{ minWidth: '100%' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="input-block row mb-4">
                                        <label className="col-form-label col-md-4">Lien Youtube <span className="login-danger">*</span></label>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control" id="lieny" />
                                        </div>
                                    </div>

                                    <div className="input-block row mb-4">
                                        <label className="col-form-label col-md-4">Lien StreamYard <span className="login-danger">*</span></label>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control" id="lienS" />
                                        </div>
                                    </div>

                                    <div className="input-block row mb-4">
                                        <label className="col-form-label col-md-4">Vignette <span className="login-danger">*</span></label>
                                        <div className="col-md-8">
                                            <FileUploader setFile={setFile} />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="doctor-submit text-end">
                                            <button type="submit" className="btn btn-primary submit-form me-2" onClick={save}>Soumettre</button>
                                            <Link href="/ies/admin"><button type="submit" className="btn btn-primary cancel-form">Annuler</button></Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div >
            </div >
        </>
    );
};

export default Live_Planification_Form;

"use client";

import React from 'react'
import { useEffect, useState } from "react";
import Link from 'next/link'

import Sidebar from "../../../components/espaceMedecin/Sidebar1";
import Header from '@/components/espaceMedecin/Header';

import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { Profileuser, cameraicon, doctor, medalicon, medalicon02, medalicon03, menuicon16 } from '../../../components/espaceMedecin/imagepath';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tagsinput/react-tagsinput.css';
import TagsInput from 'react-tagsinput';
import * as bootstrap from 'bootstrap';
import 'boxicons/css/boxicons.min.css';
import { Button, Card, Form, Input, Space, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import "../../../assets/css/style.css";

const MonProfile = () => {
    const [tags, setTags] = useState([]); // Initial values
    const [form] = Form.useForm();


    const handleChange = (newTags) => {
      setTags(newTags);
    };
    useEffect(() => {
        window.bootstrap = bootstrap;
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }, [])
        const [entries1] = useState([
            { annee1: "2002-2005", poste1: "Médecin Senior", espaceSante1: "Clinique Médicale Midtown" }
        ]);
        const [entries2] = useState([
            { annee2: "2005-2014", poste2: "Professeur Associé", espaceSante2: "Netherland Medical College" }        
        ]);
        const [education1] = useState([
            { annee1: "2002-2005", Diplome1: "M.D. en Médecine", Institut1: "Université du Wyoming" }
        ]);
        const [education2] = useState([
            { annee2: "2005-2014", Diplome2: "MBBS", Institut2: "Netherland Medical College" }      
        ]);

        const [passwordVisible1, setPasswordVisible1] = useState(false);
        const [passwordVisible2, setPasswordVisible2] = useState(false);
        const [passwordVisible3, setPasswordVisible3] = useState(false);
    
        const [password1, setPassword1] = useState('');
        const [password2, setPassword2] = useState('');
        const [password3, setPassword3] = useState('');
        const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track if passwords match
    
        const togglePasswordVisibility1 = () => {
            setPasswordVisible1((prev) => !prev);
        };
    
        const togglePasswordVisibility2 = () => {
            setPasswordVisible2((prev) => !prev);
        };
        const togglePasswordVisibility3 = () => {
            setPasswordVisible3(!passwordVisible3);
        };
    
        const handlePassword2Change = (e) => {
            const value = e.target.value;
            setPassword2(value);
            // Check if passwords match when password2 changes
            setPasswordsMatch(value === password1);
        };
    return (
        <>
            <Header />
            <Sidebar />
                <div className="page-wrapper">
                    <div className="content">
                        {/* Page Header */}
                        <div className="page-header">
                            <div className="row">
                                <div className="col-sm-12">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><Link href="doctors.html">Medecins </Link></li>
                                        <li className="breadcrumb-item"><i className="feather-chevron-right">
                                            </i>
                                        </li>
                                        <li className="breadcrumb-item active">Paramètres du profil</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* /Page Header */}
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-body">
                                        
                                            <div className="col-md-20">
                                                
                                                <div className="doctor-profile-head">
                                                   
                                                    <div className="row">
                                                        <div >
                                                            <div className="profile-user-box ">
                                                                <div  className="profile-user-img">
                                                                    <img src={Profileuser.src} alt="Profile" />
                                                                    <div className="form-group doctor-up-files profile-edit-icon mb-0">
                                                                        <div className="uplod d-flex">
                                                                            <label className="file-upload profile-upbtn mb-0">
                                                                                <img src={cameraicon.src} alt="Profile" /><input type="file" />
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="names-profiles">
                                                                    <h4>Dr. Bruce Willis</h4>
                                                                    <h5>Medecin sénior</h5>
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                       
                                                    </div>
                                                </div>
                                            </div>
                                        
                                    </div>
                                </div>
                                <div className="row">
                                   
                                    <div className="col-lg-12">
                                        <div className="doctor-personals-grp">
                                            <div className="card">
                                                <div className="card-body">
                                                    
                                                    <div className="setting-form-blk">
                                                        <form>
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <div className="form-heading">
                                                                        <h4>Paramètres du compte</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-12">
                                                                    <div className="form-group local-forms">
                                                                        <label>À propos de Moi </label>
                                                                        <input className="form-control" type="email" defaultValue="Bonjour, je suis Dr. Bruce Willis, un gynécologue à l'hôpital Sanjivni de Surat.
                            J'aime travailler avec tout le personnel de mon hôpital et les médecins seniors." />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-12">
                                                                    <div className="form-group local-forms">
                                                                        <label>Désignation </label>
                                                                        <input className="form-control" type="email" defaultValue="Médecin sénior" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-md-6 col-xl-6">
                                                                    <div className="form-group select-gender" required  >
                                                                        <label className="gen-label" >
                                                                        Sexe
                                                                        </label>
                                                                        <div className="form-check-inline">
                                                                        <label className="form-check-label">
                                                                            <input
                                                                            defaultChecked={true}
                                                                            type="radio"
                                                                            name="gender"
                                                                            className="form-check-input"
                                                                            required
                                                                            />
                                                                            Homme
                                                                        </label>
                                                                        </div>
                                                                        <div className="form-check-inline">
                                                                        <label className="form-check-label">
                                                                            <input
                                                                            
                                                                            type="radio"
                                                                            name="gender"
                                                                            className="form-check-input"
                                                                            />
                                                                            Femme
                                                                        </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-12">
                                                                    <div className="form-group local-forms">
                                                                        <label>Nom Complet </label>
                                                                        <input className="form-control" type="email" defaultValue="Dr. Khalid Amine" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-12">
                                                                    <div className="form-group local-forms">
                                                                        <label>Mobile </label>
                                                                        <input className="form-control" type="email" defaultValue="264-625-2583" />
                                                                    </div>
                                                                </div>
                                                                
                                                                
                                                                <div className="col-12 col-sm-12">
                                                                    <div className="form-group local-forms">
                                                                        <label>Email </label>
                                                                        <input className="form-control" type="email" defaultValue="brucewillis@info.com" />
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-12 col-sm-12">
                                                                    <div className="form-group local-forms">
                                                                        <label>Adresse <span className="login-danger">*</span></label>
                                                                        <textarea className="form-control" rows={3} cols={30} defaultValue="ESJ Salé Tabrikt"/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-md-6 col-xxl-9">
                                                                    <label className="gen-label" >
                                                                            <b>Éducation :</b>
                                                                    </label>
                                                                    <div className="table-responsive">
                                                                        <table className="table mb-0 border-0 custom-table profile-table">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Année</th>
                                                                                    <th>Diplôme/Formation</th>
                                                                                    <th>Institut</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {education1.map((entry) => (
                                                                                    <tr >
                                                                                        <td>
                                                                                            <Input
                                                                                                className="form-control"
                                                                                                type="text"
                                                                                                defaultValue={entry.annee1}
                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <Input
                                                                                                className="form-control"
                                                                                                type="text"
                                                                                                defaultValue={entry.Diplome1}                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <Input
                                                                                                className="form-control"
                                                                                                type="text"
                                                                                                defaultValue={entry.Institut1}                                                                                            />
                                                                                        </td>
                                                                                        
                                                                                    </tr>
                                                                                ))}
                                                                                {education2.map((entry, index) => (
                                                                                    <tr key={index}>
                                                                                        <td>
                                                                                            <Input
                                                                                                className="form-control"
                                                                                                type="text"
                                                                                                defaultValue={entry.annee2}                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <Input
                                                                                                className="form-control"
                                                                                                type="text"
                                                                                                defaultValue={entry.Diplome2}                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <Input
                                                                                                className="form-control"
                                                                                                type="text"
                                                                                                defaultValue={entry.Institut2}                                                                                            />
                                                                                        </td>
                                                                                        
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    <div className="form-group local-forms" >
                                                                        
                                                                        <Form
                                                                        labelCol={{
                                                                            span: 9,
                                                                        }}
                                                                        wrapperCol={{
                                                                            span: 18,
                                                                        }}
                                                                        form={form}
                                                                        name="dynamic_form_complex"
                                                                        style={{
                                                                            maxWidth: 600,
                                                                        }}
                                                                        autoComplete="off"
                                                                        initialValues={{
                                                                            items: [{}],
                                                                        }}
                                                                        >
                                                                        
                                                                        <Form.List name="items">
                                                                            {(fields, { add }) => (
                                                                            <div
                                                                                style={{
                                                                                display: 'flex',
                                                                                rowGap: 20,
                                                                                flexDirection: 'column',
                                                                                }}
                                                                            >
                                                                                {fields.map((field) => (
                                                                                <div key={field.key}>
                                                                                    

                                                                                    {/* Nested Form.List */}
                                                                                    
                                                                                    
                                                                                    <Form.List name={[field.name, 'Éducation']}>
                                                                                        {(subFields, subOpt) => (
                                                                                        <div
                                                                                            
                                                                                            style={{
                                                                                            display: 'flex',
                                                                                            flexDirection: 'column',
                                                                                            rowGap: 16,
                                                                                            }}
                                                                                        >
                                                                                            {subFields.map((subField) => (
                                                                                            <Space key={subField.key}>
                                                                                                <Form.Item noStyle name={[subField.name, 'first']}>
                                                                                                <Input placeholder="Année" required />
                                                                                                </Form.Item>
                                                                                                <Form.Item noStyle name={[subField.name, 'second']}>
                                                                                                <Input placeholder="Diplôme/Formation" required/>
                                                                                                </Form.Item>
                                                                                                <Form.Item noStyle name={[subField.name, 'third']}>
                                                                                                <Input placeholder="Institut" required/>
                                                                                                </Form.Item>
                                                                                                <CloseOutlined
                                                                                                onClick={() => {
                                                                                                    subOpt.remove(subField.name);
                                                                                                }}
                                                                                                />
                                                                                            </Space>
                                                                                            ))}
                                                                                            <Button type="dashed" onClick={() => subOpt.add()} block>
                                                                                            + Ajouter Formation
                                                                                            </Button>
                                                                                        </div>
                                                                                        )}
                                                                                    </Form.List>
                                                                                    
                                                                                </div>
                                                                                ))}
                                                                                
                                                                            </div>
                                                                            )}
                                                                        </Form.List>
                                                                        </Form>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-md-6 col-xxl-9">
                                                                    <label className="gen-label" >
                                                                            <b>Expérience :</b>
                                                                    </label>
                                                                    <div className="table-responsive">
                                                                        <table className="table mb-0 border-0 custom-table profile-table">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Année</th>
                                                                                    <th>Poste</th>
                                                                                    <th>Espace Santé</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {entries1.map((entry) => (
                                                                                    <tr >
                                                                                        <td>
                                                                                            <Input
                                                                                                className="form-control"
                                                                                                type="text"
                                                                                                defaultValue={entry.annee1}
                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <Input
                                                                                                className="form-control"
                                                                                                type="text"
                                                                                                defaultValue={entry.poste1}                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <Input
                                                                                                className="form-control"
                                                                                                type="text"
                                                                                                defaultValue={entry.espaceSante1}                                                                                            />
                                                                                        </td>
                                                                                        
                                                                                    </tr>
                                                                                ))}
                                                                                {entries2.map((entry, index) => (
                                                                                    <tr key={index}>
                                                                                        <td>
                                                                                            <Input
                                                                                                className="form-control"
                                                                                                type="text"
                                                                                                defaultValue={entry.annee2}                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <Input
                                                                                                className="form-control"
                                                                                                type="text"
                                                                                                defaultValue={entry.poste2}                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <Input
                                                                                                className="form-control"
                                                                                                type="text"
                                                                                                defaultValue={entry.espaceSante2}                                                                                            />
                                                                                        </td>
                                                                                        
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    
                                                                    <div className="form-group local-forms" >
                                                                        
                                                                        <Form
                                                                        labelCol={{
                                                                            span: 9,
                                                                        }}
                                                                        wrapperCol={{
                                                                            span: 18,
                                                                        }}
                                                                        form={form}
                                                                        name="dynamic_form_complex"
                                                                        style={{
                                                                            maxWidth: 600,
                                                                        }}
                                                                        autoComplete="off"
                                                                        initialValues={{
                                                                            items: [{}],
                                                                        }}
                                                                        >
                                                                        
                                                                        <Form.List name="items">
                                                                            {(fields, { add }) => (
                                                                            <div
                                                                                style={{
                                                                                display: 'flex',
                                                                                rowGap: 20,
                                                                                flexDirection: 'column',
                                                                                }}
                                                                            >
                                                                                {fields.map((field) => (
                                                                                <div key={field.key}>
                                                                                    

                                                                                    {/* Nested Form.List */}
                                                                                    
                                                                                    
                                                                                    <Form.List name={[field.name, 'Expérience']}>
                                                                                        {(subFields, subOpt) => (
                                                                                        <div
                                                                                            
                                                                                            style={{
                                                                                            display: 'flex',
                                                                                            flexDirection: 'column',
                                                                                            rowGap: 16,
                                                                                            }}
                                                                                        >
                                                                                            {subFields.map((subField) => (
                                                                                            <Space key={subField.key}>
                                                                                                <Form.Item noStyle name={[subField.name, 'first']}>
                                                                                                <Input placeholder="Année" required />
                                                                                                </Form.Item>
                                                                                                <Form.Item noStyle name={[subField.name, 'second']}>
                                                                                                <Input placeholder="Poste occupé" required/>
                                                                                                </Form.Item>
                                                                                                <Form.Item noStyle name={[subField.name, 'third']}>
                                                                                                <Input placeholder="Espace Santé" required/>
                                                                                                </Form.Item>
                                                                                                <CloseOutlined
                                                                                                onClick={() => {
                                                                                                    subOpt.remove(subField.name);
                                                                                                }}
                                                                                                />
                                                                                            </Space>
                                                                                            ))}
                                                                                            <Button type="dashed" onClick={() => subOpt.add()} block>
                                                                                            + Ajouter Expérience
                                                                                            </Button>
                                                                                        </div>
                                                                                        )}
                                                                                    </Form.List>
                                                                                    
                                                                                </div>
                                                                                ))}
                                                                                
                                                                            </div>
                                                                            )}
                                                                        </Form.List>
                                                                        </Form>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-12 col-sm-12">
                                                                    <div className="form-group local-forms">
                                                                        <label>Linkedin </label>
                                                                        <input className="form-control" type="text" defaultValue="https://Linkedin.com" />
                                                                    </div>
                                                                    <div className="form-group local-forms">
                                                                        <label>X (Ex Twitter) </label>
                                                                        <input className="form-control" type="text" defaultValue="https://x.com/" />
                                                                    </div>
                                                                </div>
                                                          
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="form-heading">
                                                                    <h4>Paramètres de sécurité</h4>
                                                                </div>
                                                                <div className="col-12 col-sm-12">
                                                                <div className="form-group local-forms">
                                                                <label>Mot de passe Actuel</label>
                                                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                                                    <input
                                                                    className="form-control"
                                                                    type={passwordVisible3 ? 'text' : 'password'}
                                                                    value={password3}
                                                                    onChange={(e) => setPassword3(e.target.value)}
                                                                    style={{ flex: 1 }}
                                                                    placeholder="Mdp Actuel"
                                                                    />
                                                                    <span
                                                                    onClick={togglePasswordVisibility3}
                                                                    style={{
                                                                        position: 'absolute',
                                                                        right: '10px',
                                                                        cursor: 'pointer',
                                                                    }}
                                                                    >
                                                                    {passwordVisible1 ? <FaEye /> : <FaEyeSlash />}
                                                                    </span>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-sm-12">
                                                                <div className="form-group local-forms">
                                                                <label>Nouveau Mot de passe</label>
                                                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                                                    <input
                                                                    className="form-control"
                                                                    type={passwordVisible1 ? 'text' : 'password'}
                                                                    value={password1}
                                                                    onChange={(e) => setPassword1(e.target.value)}
                                                                    style={{ flex: 1 }}
                                                                    placeholder="Nouveau mdp"
                                                                    />
                                                                    <span
                                                                    onClick={togglePasswordVisibility1}
                                                                    style={{
                                                                        position: 'absolute',
                                                                        right: '10px',
                                                                        cursor: 'pointer',
                                                                    }}
                                                                    >
                                                                    {passwordVisible1 ? <FaEye /> : <FaEyeSlash />}
                                                                    </span>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-sm-12">
                                                                <div className="form-group local-forms">
                                                                <label>Confirmer le mot de passe</label>
                                                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                                                    <input
                                                                    className="form-control"
                                                                    type={passwordVisible2 ? 'text' : 'password'}
                                                                    value={password2}
                                                                    onChange={handlePassword2Change}
                                                                    style={{ flex: 1 }}
                                                                    placeholder="Confirmer Mdp"
                                                                    />
                                                                    <span
                                                                    onClick={togglePasswordVisibility2}
                                                                    style={{
                                                                        position: 'absolute',
                                                                        right: '10px',
                                                                        cursor: 'pointer',
                                                                    }}
                                                                    >
                                                                    {passwordVisible2 ? <FaEye /> : <FaEyeSlash />}
                                                                    </span>
                                                                </div>
                                                                {!passwordsMatch && (
                                                                    <p style={{ color: 'red', marginTop: '5px' }}>Les mots de passe ne correspondent pas.</p>
                                                                )}
                                                                </div>
                                                            </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="doctor-submit">
                                                                    <button type="submit" className="btn btn-primary submit-form me-2">Soumettre</button>
                                                                    <button type="submit" className="btn btn-primary cancel-form">Annuler</button>
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
                        </div>
                    </div>
                </div>
        </>
    )
}

export default MonProfile

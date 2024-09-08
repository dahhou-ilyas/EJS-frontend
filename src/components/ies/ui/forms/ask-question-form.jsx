'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import TextAreaWithCharacterCount from '@/components/ies/ui/textarea-character-count';
import { getAlertifyInstance } from '@/components/ies/utility/alertify-singleton';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { SPRINGBOOT_API_URL } from '@/config';

const Ask_Question_Form = ({ showDashboard, liveData }) => {
	const [alertify, setAlertify] = useState(null);
	const [inputValue, setTextAreaValue] = useState('');

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

	const router = useRouter();

	const save = async (id, event) => {
		try {
			try {
				event.preventDefault();
				if (inputValue.length <= 5)
					throw new Error('empty question');

				const token = localStorage.getItem("access-token");

				if (!token) {
					router.push("/auth/jeunes");
					return;
				}

				try {
					const decodedToken = jwtDecode(token);
					const idJeune = decodedToken.claims.id;
					const question = { contenu: inputValue };
					await axios.post(`${SPRINGBOOT_API_URL}/jeune/${idJeune}/streams/${id}/questions`, question, {
						headers: {
							Authorization: `Bearer ${token}`
						}
					});

					// Toast
					if (alertify) {
						alertify.success('<strong>This is a success message:</strong> done');
					}
					location.reload();
				} catch (error) {
					if (error.response && error.response.status === 409) {
						if (alertify) {
							alertify.error('<strong>This is an error message:</strong> You have already asked');
						}
					} else {
						// Handle other errors
						if (alertify) {
							alertify.error(`<strong>This is an error message:</strong> ${error}`);
						}
					}
				}
			} catch (error) {
				console.error("Error saving the live: " + error);

				// Toast
				if (alertify) alertify.error(`<strong>This is an error message:</strong> ${error}`);
			}
		} catch (error) {
			// Toast
			if (alertify) alertify.error('<strong>This is an error message:</strong> bad form');
		}
	}

	return (
		<div className="main-wrapper">
			<div className="page-wrapper custom-wrapper">
				<div className="content">
					{/* Page Header */}
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
									<li className="breadcrumb-item active">Posez une question</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-12">
							<div className="card">
								<div className="card-body">
									<form>
										<div className="row ">
											<div className="col-12">
												<div className="form-heading">
													<h4 style={{ marginBottom: "5px" }}>Posez une question sur la thématique: {liveData ? liveData.thematique.contenu : "UNDEFINED"}</h4>
													<h5 style={{ marginBottom: "20px" }}>Pour le prochain Live</h5>
												</div>
											</div>

											<TextAreaWithCharacterCount maxLength={200} setTextAreaValue={setTextAreaValue} inputValue={inputValue} />

											<div className="col-12">
												<div className="doctor-submit text-end">
													<button type="submit" className="btn btn-primary submit-form me-2" onClick={/*alert*/() => { save(liveData.id, event) }}>Soumettre</button>
													<Link href="#" onClick={showDashboard}><button type="submit" className="btn btn-primary cancel-form">Annuler</button></Link>
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
	)
}

export default Ask_Question_Form;

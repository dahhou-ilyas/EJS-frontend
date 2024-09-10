"use client"

import "@/../public/ies/assets/css/font-awesome.min.css";
import Bar_Chart from '@/components/ies/utility/apex-graph';
import Loading from '@/components/ies/utility/loading';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { EXPRESS_API_URL, SPRINGBOOT_API_URL } from "@/config";

const Stats_Page = () => {
    const searchParams = useSearchParams();
    const [queryParams, setQueryParams] = useState({ id: '', thematique: '' });
    const [loading, setLoading] = useState(true);
    const [fetched, setFetched] = useState(true);
    const [liveStats, setLiveStats] = useState(null);
    const [opinion, setOpinion] = useState(null);

    const router = useRouter();
    useEffect(
        () => {
            const init = async () => {
                const id = searchParams.get('id');
                const thematique = searchParams.get('thematique');

                const token = localStorage.getItem("access-token");

                if (!token) {
                    router.push("/auth/professionnels");
                    return;
                }

                const decodedToken = jwtDecode(token);
                const role = decodedToken.claims.role;

                if (!role.includes("MEDECIN") && !role.includes("SANTE")) {
                    router.push("/auth/professionnels");
                    return;
                }

                const fetchLiveStats = async (id, token) => {
                    try {
                        const [evaluationsRes, recommendationsRes, opinionsRes] = await Promise.all([
                            axios.get(`${SPRINGBOOT_API_URL}/streams/${id}/evaluations`, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }),
                            axios.get(`${SPRINGBOOT_API_URL}/streams/${id}/recommendations`, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }),
                            axios.get(`${SPRINGBOOT_API_URL}/streams/${id}/opinions`, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            })
                        ]);

                        return {
                            evaluations: evaluationsRes.data,
                            recommendations: recommendationsRes.data,
                            opinions: opinionsRes.data
                        };
                    } catch (error) {
                        console.error(error);
                    }
                };

                const stats = await fetchLiveStats(id, token);

                try {
                    const long_comments = stats?.opinions.length > 0 ? stats?.opinions : null;

                    if ((long_comments !== null) && (long_comments !== undefined)) {
                        const response = await axios.post(
                            EXPRESS_API_URL+'/summarized_long_comments',
                            { long_comments },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                }
                            }
                        );

                        const responseData = response.data.replace(/```json|```/g, '');
                        setOpinion(responseData);
                    }
                } catch (error) {
                    console.error('Error fetching summarized opinions:', error);
                }

                setLiveStats(stats);
                setQueryParams({
                    id: id || '', thematique: thematique || ''
                });
                setLoading(false);
            }
            init();
            setFetched(true);
        }, [searchParams]);

    if (!fetched || loading) {
        return (
            <Loading />
        );
    }

    const data1 = [liveStats.evaluations.TresMauvais, liveStats.evaluations.Mauvais, liveStats.evaluations.Passable, liveStats.evaluations.Bon, liveStats.evaluations.Excellent];
    const categories1 = [
        '★☆☆☆☆',
        '★★☆☆☆',
        '★★★☆☆',
        '★★★★☆',
        '★★★★★'
    ];
    const title1 = 'Votes';

    const data2 = [liveStats.recommendations.true, liveStats.recommendations.false];
    const categories2 = ['Oui', 'Non'];
    const title2 = 'Votes';

    return (
        <div style={{ padding: "40px" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgba(46, 55, 164, 0.8)', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                <p className='m-0 p-0 ms-2' style={{ color: 'white' }}><span style={{ fontWeight: '600' }}>ID:</span> {queryParams.id}</p>
                <p className='m-0 p-0' style={{ color: 'white' }}><span style={{ fontWeight: '600' }}>Thématique:</span> {queryParams.thematique}</p>
                <p className='m-0 p-0'></p>
            </div>
            <div className="ies-stats-container" style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '32px', flex: '2' }}>
                    <p className="pt-0 mt-0" style={{ paddingBottom: '12px' }}><strong>Réponses: <span style={{ fontStyle: "italic" }}>Comment évalueriez-vous le Live?</span></strong></p>
                    <Bar_Chart data={data1} categories={categories1} title={title1} />
                </div>
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '32px', flex: '1' }}>
                    <p className="pt-0 mt-0" style={{ paddingBottom: '12px' }}><strong>Réponses: <span style={{ fontStyle: "italic" }}>Recommanderiez-vous cette session à d&apos;autres personnes?</span></strong></p>
                    <Bar_Chart data={data2} categories={categories2} title={title2} />
                </div>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                <p className="pt-0 mt-1" style={{ paddingBottom: '2px', paddingLeft: '4px' }}><strong><i className="fa fa-cog"></i> IA-IES - Résumé des avis des jeunes pour vous:</strong></p>
                {opinion ? (
                    <p className="pt-0 mt-1">{opinion}</p>
                ) : (
                    <p className="pt-0 mt-1" style={{ textAlign: 'center' }}>Aucun avis disponible</p>
                )}
            </div>
        </div>
    );
};

export default Stats_Page;
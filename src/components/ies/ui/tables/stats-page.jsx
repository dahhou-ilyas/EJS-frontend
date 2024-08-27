"use client"

import "../../../../public/assets/css/font-awesome.min.css";
import Bar_Chart from '@/components/utility/apex-graph';
import Loading from '@/components/utility/loading';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Stats_Page = () => {
    const searchParams = useSearchParams();
    const [queryParams, setQueryParams] = useState({ id: '', thematique: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = searchParams.get('id');
        const thematique = searchParams.get('thematique');
        setQueryParams({ id: id || '', thematique: thematique || '' });
        setLoading(false);
    }, [searchParams]);

    if (loading) {
        return (
            <Loading />
        );
    }


    const data1 = [120, 80, 45, 10, 11];
    const categories1 = [
        '★☆☆☆☆',
        '★★☆☆☆',
        '★★★☆☆',
        '★★★★☆',
        '★★★★★'
    ];
    const title1 = 'Votes';

    const data2 = [1200, 80];
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
                    <p className="pt-0 mt-0" style={{ paddingBottom: '12px' }}><strong>Réponses: <span style={{ fontStyle: "italic" }}>Recommanderiez-vous cette session à d'autres personnes?</span></strong></p>
                    <Bar_Chart data={data2} categories={categories2} title={title2} />
                </div>
            </div>
            <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                <p className="pt-0 mt-1" style={{ paddingBottom: '2px', paddingLeft: '4px' }}><strong><i className="fa fa-cog"></i> IA-IES - Résumé des avis des jeunes pour vous:</strong></p>
                <p className="pt-0 mt-0" style={{ textIndent: '20px', paddingInline: '16px' }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, exercitationem qui. Inventore, impedit non labore ab maxime error suscipit saepe animi deserunt, laudantium quos eum repudiandae consectetur veniam nam commodi?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias deleniti sequi veritatis recusandae iste ipsum enim blanditiis ipsam sunt id molestiae accusantium repellat quaerat tenetur, odit sit eum laudantium asperiores.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere nam cum dolore corporis ducimus, distinctio cupiditate quibusdam consectetur, praesentium suscipit sunt, quisquam sit labore totam. Pariatur provident harum tempora voluptatem!
                </p>
            </div>
        </div>
    );
};

export default Stats_Page;
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ReactApexChart only on the client-side
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Bar_Chart = ({ data, categories, title }) => {
    const barChartOptions = {
        chart: {
            height: 340,
            type: 'bar',
        },
        tooltip: {
            enabled: true,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                colors: {
                    ranges: [{
                        from: 0,
                        to: Infinity,
                        color: 'rgba(46, 55, 164, 1)',
                    }],
                },
            },
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '18px',
                fontFamily: 'inherit',
            },
        },
        xaxis: {
            categories: categories || ['Thématique 1 - Long nom de la thématique', 'Thématique 2', 'Thématique 3'],
            labels: {
                style: {
                    fontSize: '18px',
                    fontFamily: 'inherit',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '18px',
                    fontFamily: 'inherit',
                },
                offsetX: -8,
            },
        },
    };

    return (
        <div style={{ width: '100%', height: "340px" }}>
            <ReactApexChart
                options={barChartOptions}
                series={[{ name: title || "Votes", data: data || [135, 45, 10] }]}
                type="bar"
                height={340}
            />
        </div>
    );
};

export default Bar_Chart;
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styles from "./charts.module.scss"

const getBarChart = (dataSource: any[]) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'ASTEROID VELOCITY',
            },
        },
    };

    const labels = dataSource.map((near_earth_object) => `${near_earth_object.name}`);

    const data = {
        labels,
        datasets: [
            {
                label: 'Velocity(kilometers per hour)',
                data: dataSource.map((near_earth_object) => `${near_earth_object.relative_velocity} `),
                backgroundColor: '#2E3B52',
            },
        ],
    };

    return <Bar className={styles.barChart} options={options} data={data} />
}


export default getBarChart
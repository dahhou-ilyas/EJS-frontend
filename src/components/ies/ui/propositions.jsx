import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useState } from 'react';

const sampleData = [
    {
        category: 'Nutrition',
        topics: [
            'Understanding Nutrition Labels',
            'Healthy Eating on a Budget',
            'Healthy Eating for Busy Schedules'
        ]
    },
    {
        category: 'Mental Health',
        topics: [
            'The Impact of Sleep on Health',
            'Managing Stress and Anxiety',
            'Building Resilience',
            'Understanding Mental Health Disorders',
            'The Connection Between Mental and Physical Health'
        ]
    },
    {
        category: 'Physical Health',
        topics: [
            'The Benefits of Regular Exercise',
            'The Importance of Hydration',
            'The Effects of Caffeine on Health',
            'Importance of Regular Check-Ups'
        ]
    },
    {
        category: 'Healthy Living',
        topics: [
            'Digital Detox',
            'Preventing Substance Abuse',
            'Understanding Food Allergies and Intolerances',
            'The Effects of Sedentary Lifestyle'
        ]
    },
    {
        category: 'Social Well-being',
        topics: [
            'Healthy Relationships',
            'Safe Internet Use and Online Safety',
            'Understanding and Preventing Eating Disorders',
            'The Impact of Peer Pressure on Health'
        ]
    },
    {
        category: 'Lifestyle Management',
        topics: [
            'The Importance of Work-Life Balance',
            'How to Build a Support Network',
            'Tips for a Healthy School-Life Balance',
            'Healthy Cooking Tips and Tricks'
        ]
    }
];

const sortCategoriesByLongestTopic = (categories) => {
    return categories.sort((a, b) => {
        return b.topics.length - a.topics.length;
    });
};

const Propositions = ({ toDashboard }) => {
    const [data, setData] = useState(sortCategoriesByLongestTopic(sampleData));
    console.log(data);

    return (
        <>
            <style jsx>{`
                .category-card {
                    background-color: white;
                    border: 1px solid #ddd;
                    border-radius: 0 2rem 0.5rem 0;
                    margin: 0.5rem;
                }
                .category-header {
                    color: white;
                    background-color: rgba(50, 55, 164, 1);
                    border-radius: 0 1rem 0 0;
                    padding: 1rem;
                    padding-left: 2rem;
                    border-bottom: 1px solid #ddd;
                    font-weight: bold;
                }
                .topic-list {
                    list-style-type: none;
                    padding: 0;
                }
                .topic-list-item {
                    padding: 0.5rem 1rem;
                    border-bottom: 1px solid #ddd;
                }
                .topic-list-item:last-child {
                    border-bottom: none;
                }
            `}</style>
            <div className="main-wrapper">
                <div className="page-wrapper custom-wrapper">
                    <div className="content">
                        <div className="page-header">
                            <div className="row">
                                <div className="col-sm-12">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href={toDashboard}>Tableau de bord</a>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <FeatherIcon icon="chevron-right" />
                                        </li>
                                        <li className="breadcrumb-item active">Propositions des jeunes</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {data.map((category) => (
                                <div key={category.category} className="col-lg-4 col-md-6">
                                    <div className="category-card mb-4">
                                        <div className="category-header">{category.category}</div>
                                        <ul className="topic-list">
                                            {category.topics.map((topic, index) => (
                                                <li key={index} className="topic-list-item">{topic}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Propositions;

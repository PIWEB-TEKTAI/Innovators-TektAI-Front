import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'animate.css';
import Layout from '../../layout/DefaultLayout';
import { useParams } from 'react-router-dom';

interface Challenge {
    _id: string;
    title: string;
    description: string;
    price: string;
    status: 'open' | 'completed' | 'archived';
    startDate: Date;
    endDate: Date;
    createdBy: string;
    targetedSkills: string[];
    dataset: {
        name: string;
        description: string;
        fileUrl: string;
    };
    image: string;
    participations: {
        soloParticipants: string[];
        soloParticipationRequests: string[];
        TeamParticipants: string[];
        TeamParticipationRequests: string[];
    };
}

const SubmissionCard: React.FC<{ challenge: Challenge }> = ({ challenge }) => (
    <div key={challenge._id} className="max-w-sm bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg mx-4 my-6">
        <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Solo Participants: {challenge.participations.soloParticipants.length}</h3>
            <div className="flex items-center mb-4">
                <div className="bg-indigo-500 rounded-full py-1 px-3 text-sm font-medium text-white mr-2">{challenge.participations.TeamParticipants.length} Teams Accepted</div>
                <div className="bg-gray-700 rounded-full py-1 px-3 text-sm font-medium text-white">{challenge.participations.soloParticipationRequests.length} Teams submitted</div>
            </div>
            <div className="flex justify-between items-center">
                <div className="inline-flex rounded-full text-sm font-medium px-4 py-2 mb-4">
                    <p className="text-lg font-semibold text-gray-700 mb-4">Team Requests: {challenge.participations.TeamParticipationRequests.length}</p>
                </div>
                <div className="inline-flex rounded-full text-sm font-medium px-4 py-2 mb-4">
                    <p className="text-lg font-semibold text-gray-700 mb-4">Solo Requests: {challenge.participations.soloParticipationRequests.length}</p>
                </div>
            </div>
        </div>
    </div>
);

export default function FetchData() {
    const [participation, setParticipation] = useState<Challenge | null>(null);
    const { id } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/challenges/challenge/${id}`);
            setParticipation(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (!participation) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <h2 className="text-2xl font-semibold mb-4">Teams List</h2>
            <div className="mb-8">
                <div className="flex flex-wrap">
                    <SubmissionCard challenge={participation} />
                </div>
            </div>
        </Layout>
    );
}

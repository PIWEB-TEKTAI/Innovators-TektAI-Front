import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'animate.css';
import Layout from '../../layout/DefaultLayout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaFilePdf, FaStar } from 'react-icons/fa'; // Importation des icônes

interface Submission {
    _id: string;
    description: string;
    status: 'pending' | 'approved' | 'rejected';
    score: number;
    submittedBy: string;
    submissionDate: Date;
    files: File[];
  }
  interface File {
    name: string;
    url: string;
  }
const calculateRanking = (score: number) => {
    if (score >= 90) {
        return 5; // 5 étoiles pour un score supérieur ou égal à 90
    } else if (score >= 80) {
        return 4; // 4 étoiles pour un score entre 80 et 89
    } else if (score >= 70) {
        return 3; // 3 étoiles pour un score entre 70 et 79
    } else if (score >= 60) {
        return 2; // 2 étoiles pour un score entre 60 et 69
    } else {
        return 1; // 1 étoile pour un score inférieur à 60
    }
};
const CardSubmission: React.FC<{ submission: Submission }> = ({ submission }) => {
    const renderStars = (ranking: number) => {
        const stars = [];
        for (let i = 0; i < ranking; i++) {
            stars.push(<FaStar key={i} className="text-yellow-500 inline-block mx-1" />);
        }
        return stars;
    };

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="p-6">
                <h3 className="text-lg font-semibold text-blue-600 mb-4">{submission.description}</h3>
                <div className={`inline-flex rounded-full text-sm font-medium px-4 py-2 mb-4 ${submission.status === 'pending' ? 'bg-green-400 text-white' : submission.status === 'rejected' ? 'bg-black text-white' : 'bg-red-400 text-white'}`}>
                    {submission.status.toUpperCase()}
                </div>
                <div className="text-sm text-gray-800 dark:text-gray-300 mb-4">
                    <h6 className="font-semibold text-gray-800 mb-2">Upload Submission</h6>
                    <ul className="space-y-2">
   0.  {submission.files.map(file => (
        <li key={file.name}>
            {file.url.toLowerCase().endsWith('.pdf') ? (
                <a href={file.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                    <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-lg">
                        <FaFilePdf className="text-red-500" />
                    </div>
                    <span>{file.name}</span>
                </a>
            ) : (
                <span>{file.name}</span>
            )}
        </li>
    ))}
</ul>
                </div>
                <div className="text-sm text-gray-800 dark:text-gray-300 mb-4">
                    <h6 className="font-semibold text-gray-800 mb-2">Submission Date:</h6>
                    {new Date(submission.submissionDate).toLocaleDateString()}
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        {renderStars(calculateRanking(submission.score))}
                        <span className="ml-2 text-gray-800 dark:text-gray-300">Score: {submission.score}</span>
                    </div>
                  
                </div>
            </div>
        </div>
    );
};



export default function FetchData() {
    const [submission, setSubmission] = useState<Submission | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(`http://localhost:3000/Submission/SubmissionsDetails/${id}`)
            .then(response => {
                const submissionData = response.data;
                setSubmission(submissionData);
            })
            .catch(err => console.log(err));
    };

    const renderSubmission = () => {
        if (!submission) {
            return <p>Aucune soumission trouvée.</p>;
        }

        return (
            <div>
                <CardSubmission submission={submission} />
            </div>
        );
    };

    return (
        <Layout>
            <h2 className="text-2xl font-semibold mb-4">Submissions List</h2>
            {renderSubmission()}
        </Layout>
    );
}

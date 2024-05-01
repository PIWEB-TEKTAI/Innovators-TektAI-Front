import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'animate.css';
import Layout from '../../layout/DefaultLayout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaFilePdf, FaStar } from 'react-icons/fa'; // Importation des icônes
import { User } from '../../types/User';
interface Submission {
    _id: string;
    description: string;
    status: 'pending' | 'approved' | 'rejected';
    score: number;
    challengeId:string;
    submittedBy: string;
    submissionDate: Date;
    output:string,
    datasetFile:{
      name:string,
      url:string
    },
    presentationFile:{
      name:string,
      url:string
    },
    codeSourceFile:{
      name:string,
      url:string
    },
    reportFile:{
      name:string,
      url:string
    },
    demoFile:{
      name:string,
      url:string
    },
    readMeFile:{
      name:string,
      url:string
    },
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

    const [ChallengerSubmitted, setChallengerSubmitted] = useState<string | null>(null);
    const [ChallengerEmail, setChallengerEmail] = useState(null);
    const [ChallengerImage, setChallengerImage] = useState(null);
    const [Challenge, setChallenge] = useState<string | null>(null);


    function fetchChallenge(challenge: any) {
        axios.get(`http://localhost:3000/challenges/challenges/${challenge}`,{withCredentials:true})
            .then(response => {
                const submissionChallenge = response.data;
                setChallenge(`${submissionChallenge.title}`);
               
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchChallenge(submission.challengeId);
    }, [submission.challengeId]);


    function fetchSubmittedUser(submittedBy: any) {
        axios.get(`http://localhost:3000/user/getById/${submittedBy}`,{withCredentials:true})
            .then(response => {
                const submissionChallenger = response.data;
                setChallengerSubmitted(`${submissionChallenger.FirstName} ${submissionChallenger.LastName}`);
                setChallengerEmail(submissionChallenger.email);
                setChallengerImage(submissionChallenger.imageUrl);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchSubmittedUser(submission.submittedBy);
    }, [submission.submittedBy]);
    const styles = {
        backgroundColor: '#f2f2f2',
        padding: '10px',
        borderRadius: '5px',
        margin: '10px 0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center'
    };

    const imageStyles = {
        marginRight: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
    };

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="p-6">
                <div className="flex">
                    <div className="w-1/2 pr-2 border-r border-gray-200 dark:border-gray-700">
                        <div className="text-sm text-gray-800 dark:text-gray-300 mb-4">
                            <h6 className="font-semibold text-gray-800 mb-2">Upload Submission</h6>
                            <ul className="space-y-2">
                               
                             
                                    {submission?.presentationFile?.url && (
                                      <li>  
                                        <a href={submission.presentationFile.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                                            <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-lg">
                                                <FaFilePdf className="text-red-500" />
                                            </div>
                                            <span>{submission.presentationFile.name}</span>
                                        </a>
                                        </li>
                                    ) }


                                      {submission?.datasetFile?.url && (
                                      <li>  
                                        <a href={submission.datasetFile.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                                            <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-lg">
                                                <FaFilePdf className="text-red-500" />
                                            </div>
                                            <span>{submission.datasetFile.name}</span>
                                        </a>
                                        </li>
                                    ) }


                                    {submission?.reportFile?.url && (
                                      <li>  
                                        <a href={submission.reportFile.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                                            <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-lg">
                                                <FaFilePdf className="text-red-500" />
                                            </div>
                                            <span>{submission.reportFile.name}</span>
                                        </a>
                                        </li>
                                    ) }


                                    {submission?.demoFile?.url && (
                                      <li>  
                                        <a href={submission.demoFile.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                                            <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-lg">
                                                <FaFilePdf className="text-red-500" />
                                            </div>
                                            <span>{submission.demoFile.name}</span>
                                        </a>
                                        </li>
                                    ) }


                                    {submission?.readMeFile?.url && (
                                      <li>  
                                        <a href={submission.readMeFile.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                                            <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-lg">
                                                <FaFilePdf className="text-red-500" />
                                            </div>
                                            <span>{submission.readMeFile.name}</span>
                                        </a>
                                        </li>
                                    ) }

                                    {submission?.codeSourceFile?.url && (
                                      <li>  
                                        <a href={submission.codeSourceFile.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                                            <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-lg">
                                                <FaFilePdf className="text-red-500" />
                                            </div>
                                            <span>{submission.codeSourceFile.name}</span>
                                        </a>
                                        </li>
                                    ) }
                                    



                               
                               
                            </ul>


                        </div>
                        <div className={`inline-flex rounded-full text-sm font-medium px-4 py-2 mb-4 ${submission.status === 'pending' ? 'bg-green-400 text-white' : submission.status === 'rejected' ? 'bg-black text-white' : 'bg-red-400 text-white'}`}>
                            {submission.status.toUpperCase()}
                        </div>
                        <div className="text-sm text-gray-800 dark:text-gray-300 mb-4">
                            <h6 className="font-semibold text-gray-800 mb-2">Submission Date:</h6>
                            {new Date(submission.submissionDate).toLocaleDateString()}
                        </div>
                        <h6 className="font-semibold text-gray-800 mb-2">Submitted By:</h6>
                        <div className="text-sm text-gray-800 dark:text-gray-300 mb-4" style={styles}>

                            {ChallengerImage && <img src={ChallengerImage} alt="Challenger" style={imageStyles} />}
                            <div>

                                <p>{ChallengerSubmitted}</p>

                                <p>{ChallengerEmail}</p>

                            </div>
                            {/* Autres éléments de votre composant */}
                        </div>
                        <h6 className="font-semibold text-gray-800 mb-2">Challenge:</h6>
                        <div className="text-sm text-gray-800 dark:text-gray-300 mb-4" style={styles}>

                      
    <p>  <h6 className="font-semibold text-gray-800 mb-2">Title:</h6>{Challenge}</p>

  

{/* Autres éléments de votre composant */}
</div>

                        <div className="flex items-center">
                            {renderStars(calculateRanking(submission.score))}
                            <span className="ml-2 text-gray-800 dark:text-gray-300">Score: {submission.score}</span>
                        </div>
                        


                    </div>
                    <div className="w-1/2 pl-2">
                        <h3 className="text-lg font-semibold text-blue-600 mb-2">Description:</h3>
                        <p className="text-gray-800 dark:text-gray-300">{submission.description}</p>

                        {/* Ajoutez ici les champs supplémentaires */}
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
        axios.get(`http://localhost:3000/submissions/SubmissionsDetails/${id}`,{withCredentials:true})
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
          
            {renderSubmission()}
        </Layout>
    );
}

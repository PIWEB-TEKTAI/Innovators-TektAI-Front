import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'animate.css';
import Layout from '../../layout/DefaultLayout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaUserEdit, FaBan, FaTrashAlt, FaCheck, FaUserPlus, FaStar, FaFilePdf } from 'react-icons/fa'; // Importation des icônes
import Swal from 'sweetalert2';

// Définissez le type des données attendues
interface User {
    _id: string;
    email: string;
    FirstName: string;
    LastName: string;
    password: string;
    imageUrl: string;
    phone: string;
    address: string;
    birthDate: Date | null;
    occupation: string;
    Description: string;
    Education: string;
    Skills: string;
    isEmailVerified: boolean;
    state: 'validated' | 'not validated' | 'blocked';
    role: 'super admin' | 'admin' | 'challenger' | 'company' | 'archive';
}
interface Submission {
    _id: string;
    description: string;
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
    status: 'pending' | 'approved' | 'rejected';
    score: number;
    submissionDate: Date;
}

const toTitleCase = (str: string) => {
    return str.toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
};

// ... (previous imports)

export default function FetchData() {
    const [data, setData] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    interface CardSubmissionProps {
        submission: Submission;
    }
    interface SubmissionsModalProps {
        submissions: Submission[];
        isOpen: boolean;
        onClose: () => void;
    }
    const CardSubmission: React.FC<{ submission: Submission }> = ({ submission }) => {
        // Fonction pour calculer un classement basé sur le score
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
    
        const renderStars = (ranking: number) => {
            const stars = [];
            for (let i = 0; i < ranking; i++) {
                stars.push(<FaStar key={i} className="text-yellow-500 inline-block mx-1" />);
            }
            return stars;
        };
    
        return (
            <div className="max-w-xs mb-4 md:mb-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 m-1">
                <div className="p-6">
                <div className={`inline-flex rounded-full text-sm font-medium px-4 py-2 mb-4 ${submission.status === 'pending' ? 'bg-green-400 text-white' : submission.status === 'rejected' ? 'bg-black text-white' : 'bg-red-400 text-white'}`}>
                        {toTitleCase(submission.status)}
                    </div>
                    <div className="px-4 py-3">
                        <ul>
                            {/*{submission.files.map(file => (
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
                            ))}*/}
                             <li>
                                    {submission.presentationFile.url.toLowerCase().endsWith('.pdf') ? (
                                        <a href={submission.presentationFile.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                                            <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-lg">
                                                <FaFilePdf className="text-red-500" />
                                            </div>
                                            <span>{submission.presentationFile.name}</span>
                                        </a>
                                    ) : (
                                        <span>{submission.presentationFile.name}</span>
                                    )}
                                </li>
                        </ul>
                    </div>
                  
                    <div className="flex justify-between items-center px-4 py-3 text-gray-800 dark:text-gray-300">
                        <div className="flex items-center">
                            <span className="text-lg font-semibold">Score:</span>
                            <span className="ml-2">{submission.score}</span>
                        </div>
                        
                    </div>
                    <div className="flex items-center">
                            {renderStars(calculateRanking(submission.score))}
                        </div>
                    <div className="px-4 py-2">
                        <Link
                            to={`/submission-details/${submission._id}`}
                            className="text-blue-600 hover:underline transition duration-300"
                        >
                            Show More
                        </Link>
                    </div>
                </div>
            </div>
        );
    };        
    
    const { id } = useParams();


   // const navigate = useNavigate();
    useEffect(() => {
        fetchData();
        console.log(data); // Vérifiez les données après chaque mise à jour
    }, [selectedRole, searchTerm]); // Fetch data again when selectedRole or searchTerm changes

    const fetchData = () => {
        axios.get(`http://localhost:3000/submissions/SubmissionsByIdChallenge/${id}`,{withCredentials:true})
        .then(response => {
            const submissionsData = response.data;
            setSubmissions(submissionsData);
            })
            .catch(err => console.log(err));
    };



    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const navigate = useNavigate();

    const handleEdit = (email: string, e: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent default button behavior
        e.preventDefault();
        // Redirect to edit form with user ID
        navigate(`/modifierAdmin/${email}`);

    };



    return (
         <Layout>
        <h2 className="text-2xl font-semibold mb-4">Submissions List</h2>
        {/* Contenu de la liste des soumissions */}
        <div className="mb-8"> {/* Ajoutez une marge inférieure de 8 unités */}
            <div className="flex flex-wrap">
                {submissions.map(submission => (
                    <CardSubmission key={submission._id} submission={submission} />
                ))}
            </div>
        </div>
    </Layout>
    );

}


function Pagination({
    usersPerPage,
    totalUsers,
    currentPage,
    paginate
}: {
    usersPerPage: number;
    totalUsers: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="flex justify-center mt-4">
            <ul className="flex items-center">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <a
                            onClick={() => paginate(number)}
                            href="#"
                            className={`${currentPage === number
                                ? 'bg-[#1C6F55] text-white'
                                : 'bg-white text-[#1C6F55]'
                                } py-2 px-4 mx-1 rounded-full`}
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

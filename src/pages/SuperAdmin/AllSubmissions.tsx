import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'animate.css';
import Layout from '../../layout/DefaultLayout';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserEdit, FaBan, FaFilePdf, FaEye } from 'react-icons/fa'; // Importation des icônes
import { AllSubmissions } from '../../services/submissionService';
import { submission } from '../../types/submission';

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


export default function FetchData() {
    const [data, setData] = useState<submission[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [SubmissionsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, [searchTerm]);


    const fetchData = async () => {
        try {
            const response = await AllSubmissions();
            if (Array.isArray(response)) {
                setData(response);
                console.log(data)
            } else {
                setData([]);
            }
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };
    const view = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent default button behavior
        e.preventDefault();
        // Redirect to edit form with user ID
        navigate(`/submission-details/${id}`);

    };



    const sortSubmissionBytitle = (sub: submission[] | undefined) => {
        return sub?.slice().sort((a, b) => {
            const titleA = a?.title?.toLowerCase();
            const titleB = b?.title?.toLowerCase();
            if (titleA && titleB) {
                if (titleA < titleB) return -1;
                if (titleA > titleB) return 1;
                return 0;
            }
            return 0;
        }) || [];
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
    };

    const indexOfLastSubmissions = currentPage * SubmissionsPerPage;
    const indexOfFirstSubmissions = indexOfLastSubmissions - SubmissionsPerPage;
    const currentSubmissions = data.slice(indexOfFirstSubmissions, indexOfLastSubmissions);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const navigate = useNavigate();

    const filteredData = data.filter(sub =>
    (sub.title?.toLowerCase()?.startsWith(searchTerm) ||
        sub.description?.toLowerCase()?.startsWith(searchTerm) ||
        sub.status?.startsWith(searchTerm))
    );

    return (
        <Layout>
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">List Submissions</h2>
                    <div className="flex items-center space-x-4">
                        {/* Add any content here */}
                    </div>
                </div>
                <div className="max-w-full overflow-x-auto">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="mb-4 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                    />

                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-left dark:bg-meta-4">


                                <th className="px-4 py-3">File</th>
                                <th className="px-4 py-3">Score</th>
                                <th className="px-4 py-3">State</th>
                                <th className="px-4 py-3">submissionDate</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortSubmissionBytitle(currentSubmissions).map((sub, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>


                                    <td className="px-4 py-3">
                                        <ul>
                                            {/*{sub.files.map(file => (
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
                                    {sub.presentationFile.url.toLowerCase().endsWith('.pdf') ? (
                                        <a href={sub.presentationFile.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 hover:underline">
                                            <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-lg">
                                                <FaFilePdf className="text-red-500" />
                                            </div>
                                            <span>{sub.presentationFile.name}</span>
                                        </a>
                                    ) : (
                                        <span>{sub.presentationFile.name}</span>
                                    )}
                                </li>
                                             

                                        </ul>
                                    </td>

                                    <td className="px-4 py-3">{sub.score}</td>


                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${sub.status === 'pending' ? 'bg-green-400 text-white font-semibold' :
                                                sub.status === 'rejected' ? 'bg-black text-white font-semibold' :
                                                    'bg-red-400 text-white font-semibold'
                                                }`}
                                        >
                                            {sub.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{sub.submissionDate}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center space-x-2">
                                            <button onClick={(e) => view(sub._id, e)}>
                                                <FaEye className="text-blue-500" />
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='mb-5'>
                    <Pagination
                        SubmissionsPerPage={SubmissionsPerPage}
                        totalSubmissions={filteredData.length}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                </div>
            </div>
        </Layout>
    );
}

function Pagination({
    SubmissionsPerPage,
    totalSubmissions,
    currentPage,
    paginate
}: {
    SubmissionsPerPage: number;
    totalSubmissions: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalSubmissions / SubmissionsPerPage); i++) {
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

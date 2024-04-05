import React, { useEffect, useState } from 'react';
import ClientLayout from '../../layout/clientLayout';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { format, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { getSubmissionsByChallengeId } from '../../services/submissionService';


const ChallengeDetailsCompany: React.FC = () => {
    const [challengeDetails, setChallengeDetails] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<string>('overview'); // Default active tab

    const { id } = useParams();
    const [submissions, setSubmissions] = useState<any[]>([]); 

    useEffect(() => {
        const fetchSubmissions = async () => {
          try {
            const fetchedSubmissions = await getSubmissionsByChallengeId(id);
            setSubmissions(fetchedSubmissions);
          } catch (error) {
            console.error('Error fetching submissions:', error);
          }
        };
    
        fetchSubmissions();
      }, [id]); 
      const itemsPerPage = 10;
      const [currentPage, setCurrentPage] = useState(1);
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = submissions && submissions.length > 0 ? submissions.slice(indexOfFirstItem, indexOfLastItem) : [];
      const paginate = (pageNumber: any)=> setCurrentPage(pageNumber);

    const fetchChallengeDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/challenge/${id}`, {
                withCredentials: true
              });            setChallengeDetails(response.data);

        } catch (error) {
            console.error('Error fetching challenge details:', error);
        }
    };



    useEffect(() => {
        fetchChallengeDetails();
    }, [id]);

    if (!challengeDetails) {
        return <div>Loading...</div>;
    }

    const getStatusColor = () => {
        switch (challengeDetails.status) {
            case 'open':
                return 'bg-green-500';
            case 'completed':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getStatusText = () => {
        switch (challengeDetails.status) {
            case 'open':
                return 'Open';
            case 'completed':
                return 'Completed';
            default:
                return 'Unknown';
        }
    };

    const formattedStartDate = format(new Date(challengeDetails.startDate), 'dd MMMM, yyyy');
    const formattedEndDate = format(new Date(challengeDetails.endDate), 'dd MMMM, yyyy');

    // Calculate the time left
    const now = new Date();
    const endDate = new Date(challengeDetails.endDate);
    const monthsLeft = differenceInMonths(endDate, now);
    const daysLeft = differenceInDays(endDate, now) % 30;
    const hoursLeft = differenceInHours(endDate, now) % 24;
    const minutesLeft = differenceInMinutes(endDate, now) % 60;
    const secondsLeft = differenceInSeconds(endDate, now) % 60;

    const timeLeftString = `${monthsLeft > 0 ? `${monthsLeft} months, ` : ''}${daysLeft > 0 ? `${daysLeft} days, ` : ''}${hoursLeft > 0 ? `${hoursLeft} hours, ` : ''}${minutesLeft > 0 ? `${minutesLeft} minutes, ` : ''}${secondsLeft} seconds`;


    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };


    return (
        <ConnectedClientLayout>

<div className="mx-auto   rounded-lg px-4 ">
                <div className="bg-white px-[2rem] py-8 shadow-lg rounded-lg overflow-hidden">
               
                    <div className="flex flex-col sm:flex-row items-center mt-4 sm:mt-0">
                        <img src={`http://localhost:3000/images/${challengeDetails.image}`} alt="Challenge" className="w-50 h-30 mr-4 px-auto rounded-lg" />
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mt-2 capitalize">{challengeDetails.title}</h2>
                            <div className="flex items-center mt-4">
                                <div className={`rounded-full py-1 px-3 text-sm font-semibold mr-4 ${challengeDetails.status === 'open' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                                    {challengeDetails.status === 'open' ? 'Open' : 'Completed'}
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-gray-500 mr-2" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v6h-2zm0 8h2v2h-2z" />
                                </svg>
                                <p className="text-gray-600">{formattedStartDate} - {formattedEndDate}</p>
                            </div>
                            <p className="text-gray-600 font-bold cursor-pointer mt-2" >
                                Hosted by: {challengeDetails.createdBy.company.name}
                            </p>
                            {challengeDetails.status === 'open' && (
                                <p className="mt-2 text-gray-600">Time Left: {timeLeftString}</p>
                            )}
                        </div>
                    </div>
                </div>
          
                {/* Navigation Menu */}
                <div className="bg-white rounded-lg my-6">
                    <ul className="p-8 flex cursor-pointer flex-wrap sm:flex-nowrap border-gray-200 border-b py-4">
                            <li className="-mb-px mr-1">
                                <a className={`bg-white inline-block rounded-t py-2 px-4 text-blue-700 font-semibold ${activeTab == 'overview' ? 'bg-blue-100 border-l border-t border-r ' : ''}`} onClick={() => handleTabChange('overview')}>
                                    Overview
                                </a>
                            </li>
                            <li className="mr-1">
                                <a className={`bg-white inline-block py-2 rounded-t  px-4 text-blue-500 hover:text-blue-800 font-semibold ${activeTab === 'leaderboard' ? 'bg-blue-100 border-l border-t border-r' : ''}`} onClick={() => handleTabChange('leaderboard')}>
                                    Leaderboard
                                </a>
                            </li>
                            <li className="mr-1">
                                <a className={`bg-white inline-block py-2 rounded-t  px-4 text-blue-500 hover:text-blue-800 font-semibold ${activeTab === 'discussion' ? 'bg-blue-100 border-l border-t border-r' : ''}`} onClick={() => handleTabChange('discussion')}>
                                    Discussion
                                </a>
                            </li>
                            <li className="mr-1">
                                <a className={`bg-white inline-block py-2 px-4 rounded-t  text-blue-500 hover:text-blue-800 font-semibold ${activeTab === 'submission' ? 'bg-blue-100 border-l border-t border-r' : ''}`} onClick={() => handleTabChange('submission')}>
                                    Submission
                                </a>
                            </li>
                            <li className="mr-1">
              <a
                className={`bg-white inline-block py-2 px-4 rounded-t  text-blue-500 hover:text-blue-800 font-semibold ${activeTab === 'datasets' ? 'bg-blue-100 border-l border-t border-r' : ''}`}
                onClick={() => handleTabChange('datasets')}
              >
                Datasets
              </a>
            </li>
                        </ul>
                    
                        <div className="p-8">
                            {activeTab === 'overview' && (
                                <>
                                    <h2 className="text-2xl font-bold text-gray-900 mt-2">Description</h2>
                                    <p className="text-gray-600 mt-4 break-words text-black">{challengeDetails.description}</p>
                                    <h2 className="text-2xl font-bold text-gray-900 mt-8">Prizes</h2>
                                    <p className="text-gray-600 mt-4 text-black">{challengeDetails.price}Dt</p>
                                    <h2 className="text-2xl font-bold text-gray-900 mt-8 ">Submission Guidelines</h2>
                                    <p className="text-gray-600 mt-4 break-words text-black">{challengeDetails.description}</p>
                                </>
                            )}
                            {activeTab === 'leaderboard' && (
                                <div>
                                    <h2>Leaderboard</h2>
                                </div>
                            )}
                            {activeTab === 'discussion' && (
                                <div>
                                    <h2>Discussion</h2>
                                </div>
                            )}
                            {activeTab === 'submission' && (
                        <div>
               <div className="flex justify-end">
                    </div>
                    <ul>
                {currentItems.map(submission => (
                    <li className='border-b border-gray-300 justify-between flex p-2' key={submission.id}>
                        <div className="flex-col">
                            <p className='break-words text-black font-semibold'>{submission.title}</p>
                            <p className='break-words text-black'>{submission.description.substring(0, 60)}</p>
                        </div>
                        <p className='break-words cursor-pointer p-2 bg-gray-300 text-black sm:w-[12rem] rounded-lg'>
                            {submission.files[0].name.substring(0, 15)}...
                        </p>
                    </li>
                ))}
            </ul>
            {/* Pagination */}
            <nav>
                <ul className='pagination'>
                    {submissions.length > itemsPerPage &&
                        Array.from({ length: Math.ceil(submissions.length / itemsPerPage) }).map((_, index) => (
                            <li key={index} className='page-item'>
                                <button onClick={() => paginate(index + 1)} className='page-link bg-primary h-[2rem] w-[2rem] text-white rounded-full '>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                </ul>
            </nav>
                    </div>
                    )}
                </div>                
               </div>
            </div>



        </ConnectedClientLayout>
    );
};

export default ChallengeDetailsCompany;
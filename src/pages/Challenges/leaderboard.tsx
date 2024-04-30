import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import {useParams} from 'react-router-dom';
import {getSubmissionsByChallengeId} from '../../services/submissionService';
import { useAuth } from '../../components/Auth/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';



const Leaderboard: React.FC = () => {
    const [challengeDetails, setChallengeDetails] = useState<any>(null);
    let { userAuth } = useAuth();
    const { id } = useParams();
    const [submissions, setSubmissions] = useState<any[]>([]);
  
    useEffect(() => {
      const fetchSubmissions = async () => {
        try {
          const fetchedSubmissions = await getSubmissionsByChallengeId(id);
          setSubmissions(fetchedSubmissions);
          console.log(fetchedSubmissions);
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
    const currentItems = submissions.slice(indexOfFirstItem, indexOfLastItem);
    const [alert, setAlert] = useState<{ type: string; message: string } | null>(
      null,
    );
  
    const fetchChallengeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/challenge/${id}`);
        setChallengeDetails(response.data);
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
  
  
    const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  
 
  
  
    return (
        <div>
        <div className="flex justify-end mb-4">
          {userAuth?.role === 'challenger' &&
            (challengeDetails.participations.soloParticipants.includes(
              userAuth._id,
            ) ||
              challengeDetails.participations.TeamParticipants.some(
                (team: any) =>
                  team.leader &&
                  team.leader._id &&
                  team.leader._id == userAuth._id,
              ))}

        </div>
        <ul>
  {currentItems
    .slice()
    .sort((a, b) => parseInt(b.output) - parseInt(a.output))
    .map((submission, index) => (
      <li
        className="border-b border-gray-300 justify-between flex p-2"
        key={submission.id}
      >
        <div className="w-full flex justify-between">
          <div className="flex items-center">
            {/* Rank */}
            <div className={`rank-circle ${index === 0 ? 'rank-circle-medalgold' : index === 1 ? 'rank-circle-medalsilver' : index === 2 ? 'rank-circle-medalbronze' : ''}`}>
              {index + 1 + (currentPage - 1) * itemsPerPage}
            </div>
            <div className="flex-col">
              {submission.submittedByTeam ? (
                <p className="break-words text-black font-semibold">
                  {submission.submittedByTeam.name}
                </p>
              ) : (
                submission.submittedBy && (
                  <p className="break-words text-black font-semibold">
                    {submission.submittedBy.FirstName} {submission.submittedBy.LastName}
                  </p>
                )
              )}
            </div>
          </div>
          <div className="flex">
            <p className="break-words cursor-pointer p-2 mr-5 bg-gray-300 text-black sm:w-[12rem] rounded-lg">
              {submission.output}
            </p>
            {/* View icon */}
            <div className="p-2 text-gray text-primary cursor-pointer focus:outline-none">
              <Link to={`/submission/details/${submission._id}`}>
                <FontAwesomeIcon icon={faEye} />
              </Link>
            </div>
          </div>
        </div>
      </li>
    ))}
</ul>



        {/* Pagination */}
        <nav>
          <ul className="pagination">
            {submissions.length > itemsPerPage &&
              Array.from({
                length: Math.ceil(submissions.length / itemsPerPage),
              }).map((_, index) => (
                <li key={index} className="page-item">
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link bg-primary h-[2rem] w-[2rem] text-white rounded-full "
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    );
};

export default Leaderboard;

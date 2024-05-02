import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getSubmissionsByChallengeId } from '../../services/submissionService';
import { useAuth } from '../../components/Auth/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Leaderboard: React.FC = () => {
  const [challengeDetails, setChallengeDetails] = useState<any>(null);
  const { userAuth } = useAuth();
  const { id } = useParams();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [sortByScore, setSortByScore] = useState(false);

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

  // Logic to handle ties
  let previousOutput: string | null = null;
  let rank = 0;

  return (
    <div>
      <div className="flex justify-end mb-4">
        {userAuth?.role === 'challenger' &&
          (challengeDetails.participations.soloParticipants.includes(userAuth._id) ||
            challengeDetails.participations.TeamParticipants.some(
              (team: any) => team.leader && team.leader._id && team.leader._id === userAuth._id
            ))}

<button
          onClick={() => setSortByScore((prev) => !prev)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4 focus:outline-none"
        >
          {sortByScore ? 'Sort by Score' : 'Sort by Output'}
        </button>

      </div>
      <h2 className="text-2xl font-semibold mb-4">
      {sortByScore ? 'Expert Ranking' : 'Automatic Ranking'}
    </h2>

      <ul>
      {submissions
  .slice()
  .sort((a, b) => {
    if (sortByScore) {
      // Sort by score in descending order
      return parseInt(b.score) - parseInt(a.score);
    } else {
      // Sort by output in descending order
      return parseInt(b.output) - parseInt(a.output);
    }
  })
  .map((submission, index, sortedSubmissions) => {
    if (index === 0 || submission.score !== sortedSubmissions[index - 1].score) {
      rank = index + 1;
    }
           

            return (
              <li className="border-b border-gray-300 justify-between flex p-2" key={submission.id}>
                <div className="w-full flex justify-between">
                  <div className="flex items-center">
                    {/* Rank */}
                    <div className={`rank-circle ${rank === 1 ? 'rank-circle-medalgold' : rank === 2 ? 'rank-circle-medalsilver' : rank === 3 ? 'rank-circle-medalbronze' : ''}`}>
                      {rank}
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
                    {sortByScore ?  submission.score :submission.output}
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
            );
          })}
      </ul>
      {/* Pagination */}
      <nav>
        <ul className="pagination">
          {submissions.length > itemsPerPage &&
            Array.from({ length: Math.ceil(submissions.length / itemsPerPage) }).map((_, index) => (
              <li key={index} className="page-item">
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link bg-primary h-[2rem] w-[2rem] text-white rounded-full"
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

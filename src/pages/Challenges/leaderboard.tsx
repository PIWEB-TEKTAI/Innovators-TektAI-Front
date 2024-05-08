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
  const [FirstWinnerName, setFirstWinnerName] = useState<string | null>(null);
  const [SecondWinnerName, setSecondWinnerName] = useState<string | null>(null);
  const [ThirdWinnerName, setThirdWinnerName] = useState<string | null>(null);
  const [FirstWinnerImage, setFirstWinnerImage] = useState<string | null>(null);
  const [SecondWinnerImage, setSecondWinnerImage] = useState<string | null>(null);
  const [ThirdWinnerImage, setThirdWinnerImage] = useState<string | null>(null);



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

  useEffect(() => {
    if (challengeDetails && challengeDetails.status === 'completed' ) {
      if (submissions.length > 0) {
        // Sort submissions by score in descending order
        const sortedSubmissions = submissions.slice().sort((a, b) => parseInt(b.score) - parseInt(a.score));

        // Determine the first winner
        const firstWinner = sortedSubmissions[0];
        setFirstWinnerName(firstWinner.submittedByTeam ? firstWinner.submittedByTeam.name :
          `${firstWinner.submittedBy.FirstName} ${firstWinner.submittedBy.LastName}`);
        setFirstWinnerImage(firstWinner.submittedByTeam ? firstWinner.submittedByTeam.imageUrl : firstWinner.submittedBy.imageUrl);
        console.log(firstWinner.submittedBy.email);
      
        // Determine the second winner if available
        if (sortedSubmissions.length > 1) {
          const secondWinner = sortedSubmissions[1];
          setSecondWinnerName(secondWinner.submittedByTeam ? secondWinner.submittedByTeam.name :
            `${secondWinner.submittedBy.FirstName} ${secondWinner.submittedBy.LastName}`);
          setSecondWinnerImage(secondWinner.submittedByTeam ? secondWinner.submittedByTeam.imageUrl : secondWinner.submittedBy.imageUrl);
        }
  
        // Determine the third winner if available
        if (sortedSubmissions.length > 2) {
          const thirdWinner = sortedSubmissions[2];
          setThirdWinnerName(thirdWinner.submittedByTeam ? thirdWinner.submittedByTeam.name :
            `${thirdWinner.submittedBy.FirstName} ${thirdWinner.submittedBy.LastName}`);
          setThirdWinnerImage(thirdWinner.submittedByTeam ? thirdWinner.submittedByTeam.imageUrl : thirdWinner.submittedBy.imageUrl);
        }
      
  
      }
    }
  }, [challengeDetails, submissions]);
  
        
  if (!challengeDetails) {
    return <div>Loading...</div>;
  }

  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  // Logic to handle ties
  let previousOutput: string | null = null;
  let rank = 0;

  return (
    <div>
          {challengeDetails.status === 'completed' && (

<div className="podium">
  
  <h2 className="text-center text-4xl font-bold mb-4">Winners</h2>
  <div className="winners-container">
  {FirstWinnerName && (
      <div className="podium-item gold">
        <h3 className="font-bold text-2xl">1st Place</h3>
        <img src={FirstWinnerImage} alt="first" />
        <p className="font-bold text-2xl" >{FirstWinnerName}</p>
      </div>
    )}

    {SecondWinnerName && (
      <div className="podium-item silver">
        <h3 className="font-bold text-2xl ">2nd Place</h3>
        <img src={SecondWinnerImage} alt="second" />
        <p className="font-bold text-2xl" >{SecondWinnerName}</p>
      </div>
    )}

    {ThirdWinnerName && (
      <div className="podium-item bronze">
        <h3 className="font-bold text-2xl ">3rd Place</h3>
        <img src={ThirdWinnerImage} alt="third" />
        <p className="font-bold text-2xl">{ThirdWinnerName}</p>
      </div>
    )}
  </div>
</div>

  )}

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
                      {sortByScore ? submission.score : submission.output}
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

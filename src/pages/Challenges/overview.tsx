import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../components/Auth/AuthProvider';

const Overview: React.FC = () => {
  const [challengeDetails, setChallengeDetails] = useState<any>(null);
  const { id } = useParams();

  const { userAuth } = useAuth();
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

  const totalParticipants =
    parseInt(challengeDetails.numberParticipants.nbrTeam) +
    parseInt(challengeDetails.numberParticipants.nbrSolo);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mt-2">Description</h2>
      <p className="text-gray-600 mt-3 break-words text-black 	">
        {challengeDetails.description}
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-6">Problematic </h2>
      <p className="text-gray-600 mt-3 break-words text-black	">
        {challengeDetails.problematic}
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-6">
        Number of Participants{' '}
      </h2>

      <p className="text-gray-600 mt-3 break-words text-black	">
        This competition welcomes a total of {totalParticipants} participants :{' '}
      </p>

      <p className="text-gray-600 mt-3 break-words text-black	">
        <span className=" font-semibold"> Teams:</span>{' '}
        {challengeDetails.numberParticipants.nbrTeam}
      </p>
      <p className="text-gray-600 mt-4 break-words text-black">
        <span className=" font-semibold">Solo:</span>{' '}
        {challengeDetails.numberParticipants.nbrSolo}
      </p>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mt-6">
          Submission Guidelines
        </h2>
        <p className="text-gray-600 mt-4 break-words text-black">
          To participate in this competition, participants are required to
          adhere to the submission guidelines. Submissions should include:
        </p>
        <p className="text-gray-600 mt-4 break-words font-medium text-black">
          {challengeDetails.bareme.output ? 'Output: Accuracy  (float)' : ''}
        </p>
        <p className="text-gray-600 mt-4 break-words font-medium text-black">
          {challengeDetails.bareme.presentation ? 'Presentation: PDF file' : ''}
        </p>
        <p className="text-gray-600 mt-4 break-words font-medium text-black">
          {challengeDetails.bareme.codeSource
            ? 'Code Source: ZIP or RAR file'
            : ''}
        </p>
        <p className="text-gray-600 mt-4 break-words font-medium text-black">
          {challengeDetails.bareme.dataSet ? 'Data Set: Excel file' : ''}
        </p>
        <p className="text-gray-600 mt-4 break-words font-medium text-black">
          {challengeDetails.bareme.readmeFile
            ? 'Readme File: Text file (e.g., .txt)'
            : ''}
        </p>
        <p className="text-gray-600 mt-4 break-words font-medium text-black">
          {challengeDetails.bareme.rapport ? 'Rapport: PDF file' : ''}
        </p>
        <p className="text-gray-600 mt-4 break-words font-medium text-black">
          {challengeDetails.bareme.Demo ? 'Demo: MP4 file' : ''}
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-900  mt-6">Ranking Mode</h2>

      <p className="text-gray-600 mt-4 break-words text-black">
        In this competition, the ranking mode operates through:
      </p>
      <p className="text-gray-600 mt-4 break-words font-semibold text-black">
        {challengeDetails.rankingMode.automated ? 'Automated Ranking' : ''}
        {challengeDetails.rankingMode.expert ? ' &  Expert Ranking' : ''}
      </p>

      {/* Render prizes */}
      <h2 className="text-2xl font-bold text-gray-900 mt-6">Prizes</h2>
      {challengeDetails.amount && (
        <p className="text-gray-600 mt-4 break-words text-black">
          <span className="font-semibold">Monetary Prize: </span>{' '}
          {challengeDetails.amount} {challengeDetails.currency === 'EUR' && '€'}{challengeDetails.currency === 'TND' && 'DT'} {(challengeDetails.currency === 'USD' || challengeDetails.currency === 'CAD') && '	$'} for each challenger in the Top 1 on the
          leaderboard at close of challenge.
        </p>
      )}
      <div>
        {/* Non-Monetary Prizes */}
        {challengeDetails.prizes && challengeDetails.prizes.prizeName && (
          <div className="mb-4.5 mt-4.5">
            <span className="font-semibold text-gray-600 mt-4 break-words text-black">
              {' '}
              Non-Monetary Prize:{' '}
            </span>
            <p className="text-gray-600 font-medium mt-1 ">
                 <span className="font-semibold text-primary">
                    Prize Name:
                  </span>{' '}
              {challengeDetails.prizes.prizeName}
            </p>
            {challengeDetails.prizes.prizeDescription && (
              <p className="text-gray-600 font-medium mt-1">
                 <span className="font-semibold text-primary">
                    Prize Description:
                  </span>{' '}
                {challengeDetails.prizes.prizeDescription}
              </p>
            )}
          </div>
        )}

        {/* Recruitment */}
        {challengeDetails.recruitement &&
          challengeDetails.recruitement.positionTitle && (
            <div className="mb-4.5 mt-4.5">
              <span className="font-semibold text-gray-600 mt-4 break-words text-black">
                {' '}
                Non-Monetary Prize :
              </span>

              <div className="ml-3 mt-2">
                <h3 className="font-semibold  text-md text-black block ">
                  Job opportunity:
                </h3>
                <p className="text-gray-600 font-medium mt-1">
                  <span className="font-semibold text-primary">
                    Position Title:
                  </span>{' '}
                  {challengeDetails.recruitement.positionTitle}
                </p>
                {challengeDetails.recruitement.jobDescription && (
                  <p className="text-gray-600 font-medium mt-1">
                    <span className="font-semibold text-primary">
                      {' '}
                      Job Description:{' '}
                    </span>

                    {challengeDetails.recruitement.jobDescription}
                  </p>
                )}
              </div>
            </div>
          )}

        {/* Freelance */}
        {challengeDetails.freelance &&
          challengeDetails.freelance.projectTitle && (
            <div className="mb-4.5 mt-4.5">
              <span className="font-semibold text-gray-600 mt-4 break-words text-black">
                {' '}
                Non-Monetary Prize :
              </span>

              <div className="ml-3 mt-2">
                <h3 className="font-semibold  text-md text-black block ">
                  Freelance opportunity:
                </h3>
                <p className="text-gray-600 font-medium mt-1">
                <span className="font-semibold text-primary">
                   Project Title:
                </span>  
                   {challengeDetails.freelance.projectTitle}
                </p>
                {challengeDetails.freelance.projectDescription && (
                  <p className="text-gray-600 font-medium mt-1">
                    <span className="font-semibold text-primary">
                      Project Description:{' '}
                    </span>
                    {challengeDetails.freelance.projectDescription}
                  </p>
                )}
              </div>
            </div>
          )}

        {/* Internship */}
        {challengeDetails.internship &&
          challengeDetails.internship.internshipTitle && (
            <div className="mb-4.5 mt-4.5">
             <span className="font-semibold text-gray-600 mt-4 break-words text-black">
                {' '}
                Non-Monetary Prize :
              </span>

              <div className="ml-3 mt-2">
                <h3 className="font-semibold  text-md text-black block ">
                  Internship opportunity:
                </h3>
              <p className="text-gray-600 font-medium mt-1">
              <span className="font-semibold text-primary">
                 Internship Title: 
              </span>
                {challengeDetails.internship.internshipTitle}
              </p>
              {challengeDetails.internship.internshipDescription && (
                <p className="text-gray-600 font-medium mt-1">
                  <span className="font-semibold text-primary">
                     Internship Description:{' '}
                  </span>
                  {challengeDetails.internship.internshipDescription}
                </p>
              )}
              {challengeDetails.internship.duration && (
                <p className="text-gray-600 font-medium mt-1">
                 <span className="font-semibold text-primary">
                  Duration:</span> {challengeDetails.internship.duration}
                </p>
              )}
            </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Overview;

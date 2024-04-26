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

    return (
        <div>

<h2 className="text-2xl font-bold text-gray-900 mt-2">
          Problematic      </h2>
      <p className="text-gray-600 mt-4 break-words text-black break-words	">
        {challengeDetails.problematic}
      </p>



        <h2 className="text-2xl font-bold text-gray-900 mt-2">
        Description
      </h2>
      <p className="text-gray-600 mt-4 break-words text-black break-words	">
        {challengeDetails.description}
      </p>


      <div>
    <h2 className="text-2xl font-bold text-gray-900 mt-2">
    Submission Guidelines
    </h2>
    <p className="text-gray-600 mt-4 break-words text-black break-words">
        {challengeDetails.bareme.output ? 'Output: Accuracy  (float)' : ''}
    </p>
    <p className="text-gray-600 mt-4 break-words text-black break-words">
        {challengeDetails.bareme.presentation ? 'Presentation: PDF file' : ''}
    </p>
    <p className="text-gray-600 mt-4 break-words text-black break-words">
        {challengeDetails.bareme.codeSource ? 'Code Source: ZIP or RAR file' : ''}
    </p>
    <p className="text-gray-600 mt-4 break-words text-black break-words">
        {challengeDetails.bareme.dataSet ? 'Data Set: Excel file' : ''}
    </p>
    <p className="text-gray-600 mt-4 break-words text-black break-words">
        {challengeDetails.bareme.readmeFile ? 'Readme File: Text file (e.g., .txt)' : ''}
    </p>
    <p className="text-gray-600 mt-4 break-words text-black break-words">
        {challengeDetails.bareme.rapport ? 'Rapport: PDF file' : ''}
    </p>
    <p className="text-gray-600 mt-4 break-words text-black break-words">
        {challengeDetails.bareme.Demo ? 'Demo: MP4 file' : ''}
    </p>
</div>

    
         <h2 className="text-2xl font-bold text-gray-900 mt-2">
        Ranking Mode
    </h2>
    <p className="text-gray-600 mt-4 break-words text-black">
        {challengeDetails.rankingMode.automated ? 'Automated Ranking' : ''}

    </p>
    <p className="text-gray-600 mt-4 break-words text-black">
        {challengeDetails.rankingMode.expert ? 'Expert Ranking' : ''}

    </p>
  
               {/* Render prizes */}
               <h2 className="text-2xl font-bold text-gray-900 mt-8">Prizes</h2>
            {challengeDetails.amount && (
                <p className="text-gray-600 mt-4 break-words text-black">
                    {challengeDetails.amount} Dt
                </p>
            )}
            <div className="ml-5">
                {/* Monetary Prize */}
                {challengeDetails.monetary && (
                    <div className="mb-4.5 mt-4.5">
                        <h3 className="font-medium text-sm block text-gray-900">Monetary Prize</h3>
                        <p className="text-gray-600 mt-1">Amount: {challengeDetails.amount}</p>
                    </div>
                )}

                {/* Non-Monetary Prizes */}
                {challengeDetails.prizes && challengeDetails.prizes.prizeName && (
                    <div className="mb-4.5 mt-4.5">
                        <h3 className="font-medium text-sm block text-gray-900">Non-Monetary Prize</h3>
                        <p className="text-gray-600 mt-1">{challengeDetails.prizes.prizeName}</p>
                        {challengeDetails.prizes.prizeDescription && (
                            <p className="text-gray-600 mt-1">{challengeDetails.prizes.prizeDescription}</p>
                        )}
                    </div>
                )}

                {/* Recruitment */}
                {challengeDetails.recruitement && challengeDetails.recruitement.positionTitle && (
                    <div className="mb-4.5 mt-4.5">
                        <h3 className="font-medium text-sm block text-gray-900">Recruitment</h3>
                        <p className="text-gray-600 mt-1">Position Title: {challengeDetails.recruitement.positionTitle}</p>
                        {challengeDetails.recruitement.jobDescription && (
                            <p className="text-gray-600 mt-1">Job Description: {challengeDetails.recruitement.jobDescription}</p>
                        )}
                    </div>
                )}

                {/* Freelance */}
                {challengeDetails.freelance && challengeDetails.freelance.projectTitle && (
                    <div className="mb-4.5 mt-4.5">
                        <h3 className="font-medium text-sm block text-gray-900">Freelance</h3>
                        <p className="text-gray-600 mt-1">Project Title: {challengeDetails.freelance.projectTitle}</p>
                        {challengeDetails.freelance.projectDescription && (
                            <p className="text-gray-600 mt-1">Project Description: {challengeDetails.freelance.projectDescription}</p>
                        )}
                    </div>
                )}

                {/* Internship */}
                {challengeDetails.internship && challengeDetails.internship.internshipTitle && (
                    <div className="mb-4.5 mt-4.5">
                        <h3 className="font-medium text-sm block text-gray-900">Internship</h3>
                        <p className="text-gray-600 mt-1">Internship Title: {challengeDetails.internship.internshipTitle}</p>
                        {challengeDetails.internship.internshipDescription && (
                            <p className="text-gray-600 mt-1">Internship Description: {challengeDetails.internship.internshipDescription}</p>
                        )}
                        {challengeDetails.internship.duration && (
                            <p className="text-gray-600 mt-1">Duration: {challengeDetails.internship.duration}</p>
                        )}
                    </div>
                )}
            </div>


      </div>
    );
};

export default Overview;

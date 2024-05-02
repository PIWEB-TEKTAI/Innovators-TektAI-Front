import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { useParams } from 'react-router-dom';
import { FaFilePdf , FaFileAlt ,FaFileExcel , FaFileCsv , FaFileVideo , FaFileWord} from 'react-icons/fa'; // Import file icon from react-icons/fa
import { format} from 'date-fns';
import { Link } from 'react-router-dom';
import { useAuth } from '../../components/Auth/AuthProvider';


interface Submission {
    title: string;
    description: string;
    datasetFile:any,
    output:any,
    presentationFile:any,
    codeSourceFile:any,
    readMeFile:any,
    reportFile:any,
    demoFile:any,
    challengeId:any,
    submittedBy:any,
    submissionDate:any,
    status:any,
    score:any,
}

const SubmissionDetails: React.FC = () => {
  const { id } = useParams();
  const [submission, setSubmission] = useState<Submission | null>(null); // Specify Submission or null
  const { userAuth } = useAuth();
  const [newScore, setNewScore] = useState(0);


  const fetchSubmissionDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/submissions/get/${id}`, { withCredentials: true });
      setSubmission(response.data.submission);
      setNewScore(response.data.submission.score);
    } catch (error) {
      console.error('Error fetching submission details:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSubmissionDetails();
    }
  }, [id]);

  const handleScoreChange = (event:any) => {
    setNewScore(event.target.value);
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/submissions/updateSubmissionScore/${id}`, { score: newScore } , { withCredentials: true });

      console.log('Submission score updated successfully:', response.data);
    } catch (error:any) {
      console.error('Error updating submission score:', error.message);
    }
  };



    if (!submission) {
        return <div>Loading...</div>;
    }
    return (
      <ConnectedClientLayout>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="md:w-1/2 md:mr-4 mb-4">
              <div className="text-gray-700">
                <p className="font-semibold mb-2">Challenge: {submission.challengeId.title}</p>
                <img src={submission.submittedBy.imageUrl} alt="profile" className="w-full sm:w-50 h-auto mr-4 rounded-lg" />
                <p>Submitted By: {submission.submittedBy.FirstName} {submission.submittedBy.LastName}</p>
                <p>Submitted on: {submission.submissionDate ? format(new Date(submission.submissionDate), 'MM/dd/yyyy') : 'N/A'}</p>
              </div>
            </div>
            <div className="md:w-1/2 md:ml-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Title: {submission.title}</h2>
              <p className="text-gray-700 mb-4">Description: {submission.description}</p>
              <p className="text-gray-700 mb-4">Output: {submission.output}</p>
              <div className="mt-4">
                {userAuth?.role === 'company' && userAuth?._id === submission.challengeId.createdBy &&  (
                  <div>
                    <form onSubmit={handleSubmit} className="flex items-center">
                      <label className="mr-4">New Score:</label>
                      <input
                        type="number"
                        value={newScore}
                        onChange={handleScoreChange}
                        className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="submit"
                        className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:bg-blue-600"
                      >
                        Put Score
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
      
          <div className="flex flex-wrap justify-between">
            {submission.datasetFile && (
              <div className="file-card mb-4">
                <FaFileExcel className="text-green-500 text-5xl mx-auto mb-8" />
                <p className="text-gray-700 text-center">{submission.datasetFile.name.substring(0, 20)}...</p>
              </div>
            )}
      
            {submission.presentationFile && (
              <div className="file-card mb-4">
                <FaFilePdf className="text-red-500 text-5xl mx-auto mb-8" />
                <p className="text-gray-700 text-center">{submission.presentationFile.name.substring(0, 20)}...</p>
                <a href={submission.presentationFile.url} download className="block text-center mt-2 underline text-blue-500">Download</a>

              </div>
            )}
      
            {submission.codeSourceFile && (
              <div className="file-card mb-4">
                <FaFileAlt className="text-gray-500 text-5xl mx-auto mb-8" />
                <p className="text-gray-700 text-center">{submission.codeSourceFile.name.substring(0, 20)}...</p>
              </div>
            )}
      
            {submission.readMeFile && (
              <div className="file-card mb-4">
                <FaFileWord className="text-blue-500 text-5xl mx-auto mb-8" />
                <p className="text-gray-700 text-center">{submission.readMeFile.name.substring(0, 20)}...</p>
              </div>
            )}
      
            {submission.reportFile && (
              <div className="file-card mb-4">
                <FaFilePdf className="text-red-500 text-5xl mx-auto mb-8" />
                <p className="text-gray-700 text-center">{submission.reportFile.name.substring(0, 20)}...</p>
              </div>
            )}
      
            {submission.demoFile && (
              <div className="file-card mb-4">
                <FaFileVideo className="text-gray-500 text-5xl mx-auto mb-8" />
                <p className="text-gray-700 text-center">{submission.demoFile.name.substring(0, 20)}...</p>
              </div>
            )}
          </div>
</div>



      
        </ConnectedClientLayout>
      );
      
      
      
};

export default SubmissionDetails;

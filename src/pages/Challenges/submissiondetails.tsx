import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { useParams } from 'react-router-dom';
import { FaFilePdf, FaFileAlt, FaFileExcel, FaFileCsv, FaFileVideo, FaFileWord } from 'react-icons/fa'; // Import file icon from react-icons/fa
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useAuth } from '../../components/Auth/AuthProvider';

interface File {
    name: string;
    url: string;
}

interface Submission {
    title: string;
    description: string;
    datasetFile: File | null;
    output: any;
    presentationFile: File | null;
    codeSourceFile: File | null;
    readMeFile: File | null;
    reportFile: File | null;
    demoFile: File | null;
    challengeId: any;
    submittedBy: any;
    submissionDate: any;
    status: any;
    score: any;

}

const SubmissionDetails: React.FC = () => {
    const { id } = useParams();
    const [submission, setSubmission] = useState<Submission | null>(null); // Specify Submission or null
    const { userAuth } = useAuth();
    const [newScore, setNewScore] = useState();
    const [scoreChangedMessage,setScoreChangedMessage] = useState('');
    useEffect(() => {
        const fetchSubmissionDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/submissions/get/${id}`, { withCredentials: true });
                setNewScore(response.data.submission.score);

                setSubmission(response.data.submission);
            } catch (error) {
                console.error('Error fetching submission details:', error);
            }
        };

        if (id) {
            fetchSubmissionDetails();
        }
    }, [id]);

    if (!submission) {
        return <div>Loading...</div>;
    }
    const handleScoreChange = (event: any) => {
        setNewScore(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const response = await axios.post(`http://localhost:3000/submissions/updateSubmissionScore/${id}`, { score: newScore }, { withCredentials: true });
            setScoreChangedMessage("Score added successfully")
            setTimeout(() => {
                setScoreChangedMessage('');
              }, 3000);
            console.log('Submission score updated successfully:', response.data);
        } catch (error: any) {
            console.error('Error updating submission score:', error.message);
        }
    };

    //Function to handle file download
    const handleDownload = (fileUrl: string, fileName: string) => {
        axios({
            url: fileUrl,
            method: 'GET',
            responseType: 'blob', // Important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
        });
    };
    const handleDownloadAll = () => {
        const filesToDownload = [
            submission.datasetFile,
            submission.presentationFile,
            submission.codeSourceFile,
            submission.readMeFile,
            submission.reportFile,
            submission.demoFile,
        ];

        filesToDownload.forEach((file) => {
            if (file) {
                handleDownload(file.url, file.name);
            }
        });
    };

    return (
        <ConnectedClientLayout>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center" >
                    <br />
                        <br />
                        <p className="font-semibold">Challenge: {submission.challengeId.title}</p>

                        <div className="flex justify-center"> 
                        
                            <img src={submission.submittedBy.imageUrl} alt="profile" className="w-48 h-48 mb-3 hover:scale-[1.05] cursor-pointer rounded-full m-3 shadow-lg shadow-primary"
 />
                        </div>
                        <br />
                        

                        <p className="font-semibold">Submitted By: {submission.submittedBy.FirstName} {submission.submittedBy.LastName}</p>
                        <p className="font-semibold">Submitted on: {submission.submissionDate ? format(new Date(submission.submissionDate), 'MM/dd/yyyy') : 'N/A'}</p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                      
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Title: {submission.title}</h2>
                        <p className="text-gray-700 mb-2">Description: {submission.description}</p>
                        <p className="text-gray-700 mb-2">Output: {submission.output}</p>

                        {((userAuth?.role === 'challenger' || userAuth?.role === 'company') && userAuth?._id !== submission.challengeId.createdBy) && submission.score && (
                            <p className="text-gray-700 mb-2">Score: {submission.score}</p>
                        )}

                        <div className="mt-4 flex justify-center">
                            {userAuth?.role === 'company' && userAuth?._id === submission.challengeId.createdBy && (
                                <div>
                                    <form onSubmit={handleSubmit} className="flex items-center">
                                        <label className="mr-4">Score:</label>
                                        <input
                                            type="number"
                                            value={newScore}
                                            onChange={handleScoreChange}
                                            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
                                        />
                                        <button
                                            type="submit"
                                            className="ml-4 bg-primary rounded-xl p-2 hover:bg-blue-600 text-white font-semibold  px-4 py-2  focus:outline-none focus:bg-blue-600"
                                        >
                                            Put Score
                                        </button>
                                    </form>

                                    <br />
                                    <span className='text-green-500'>{scoreChangedMessage}</span>
                                </div>
                            )}
                        </div>
                        <div className="border-t border-gray-200 pt-4 text-center"> 
    {submission.datasetFile && (
        <div className="flex flex-col items-center mt-2">
        <FaFileExcel className="text-green-500 size-12 " />
            <button onClick={() => handleDownload(submission.datasetFile!.url, submission.datasetFile!.name)} className="text-gray-700 mt-2">Download DataSetFile</button>
        </div>
    )}
    {submission.presentationFile && (
        <div className="flex flex-col items-center mt-2">
        <FaFilePdf className="text-red-500 size-12 " />
            <button onClick={() => handleDownload(submission.presentationFile!.url, submission.presentationFile!.name)} className="text-gray-700 mt-2">Download Presentation File</button>
        </div>
    )}
    {submission.codeSourceFile && (
        <div className="flex flex-col items-center mt-2">
        <FaFileAlt className="text-gray-500 size-12 " />
            <button onClick={() => handleDownload(submission.codeSourceFile!.url, submission.codeSourceFile!.name)} className="text-gray-700 mt-2">Download Code Source File</button>
        </div>
    )}
    {submission.readMeFile && (
        <div className="flex flex-col items-center mt-2">
        <FaFileWord className="text-blue-500 size-12 " />
            <button onClick={() => handleDownload(submission.readMeFile!.url, submission.readMeFile!.name)} className="text-gray-700 mt-2">Download ReadMe File</button>
        </div>
    )}
    {submission.reportFile && (
        <div className="flex flex-col items-center mt-2">
        <FaFilePdf className="text-red-500 size-12 " />
            <button onClick={() => handleDownload(submission.reportFile!.url, submission.reportFile!.name)} className="text-gray-700 mt-2">Download Report File</button>
        </div>
    )}
    {submission.demoFile && (
        <div className="flex flex-col items-center mt-2">
        <FaFileVideo className="text-gray-500 size-12 " />
            <button onClick={() => handleDownload(submission.demoFile!.url, submission.demoFile!.name)} className="text-gray-700 mt-2">Download Demo File</button>
        </div>
    )}
    <div className="mt-2"> 
        <button onClick={handleDownloadAll} className="bg-primary rounded-xl p-2 text-white font-semibold">Download All</button>
    </div>
</div>



                    </div>

                </div>


            </div>
        </ConnectedClientLayout>
    );
};

export default SubmissionDetails;
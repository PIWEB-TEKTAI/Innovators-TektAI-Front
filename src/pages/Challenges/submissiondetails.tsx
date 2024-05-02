import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { useParams } from 'react-router-dom';
import { FaFilePdf, FaFileAlt, FaFileExcel, FaFileCsv, FaFileVideo, FaFileWord } from 'react-icons/fa'; // Import file icon from react-icons/fa
import { format } from 'date-fns';

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
}

const SubmissionDetails: React.FC = () => {
    const { id } = useParams();
    const [submission, setSubmission] = useState<Submission | null>(null); // Specify Submission or null

    useEffect(() => {
        const fetchSubmissionDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/submissions/get/${id}`, { withCredentials: true });
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

    // Function to handle file download
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
            <div className="bg-white rounded-lg shadow-md p-6 mb-4 flex flex-col sm:flex-row justify-between">
                <div className="flex-none w-full sm:w-1/2 sm:ml-4">
                    <div className="text-gray-700 mb-4">
                        <p className="font-semibold">Challenge: {submission.challengeId.title}</p>

                        <img src={submission.submittedBy.imageUrl} alt="profile" className="w-full sm:w-50 h-auto mr-4 px-auto rounded-lg" />

                        <p>Submitted By: {submission.submittedBy.FirstName} {submission.submittedBy.LastName}</p>
                        <p>Submitted on: {submission.submissionDate ? format(new Date(submission.submissionDate), 'MM/dd/yyyy') : 'N/A'}</p>
                    </div>
                </div>
                <div className="flex-none w-full sm:w-1/2 sm:mr-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Title: {submission.title}</h2>
                    <p className="text-gray-700 mb-2">Description: {submission.description}</p>
                    <p className="text-gray-700 mb-2">Output: {submission.output}</p>
                    <div className="border-t border-gray-200 pt-4">
                        {submission.datasetFile && (
                            <div className="flex items-center mt-2">
                                <FaFileExcel className="text-green-500 mr-2" />
                                <button onClick={() => handleDownload(submission.datasetFile!.url, submission.datasetFile!.name)} className="text-gray-700">Download DataSetFile</button>
                            </div>
                        )}
                        {submission.presentationFile && (
                            <div className="flex items-center mt-2">
                                <FaFilePdf className="text-red-500 mr-2" />
                                <button onClick={() => handleDownload(submission.presentationFile!.url, submission.presentationFile!.name)} className="text-gray-700">Download Presentation File</button>
                            </div>
                        )}
                        {submission.codeSourceFile && (
                            <div className="flex items-center mt-2">
                                <FaFileAlt className="text-gray-500 mr-2" />
                                <button onClick={() => handleDownload(submission.codeSourceFile!.url, submission.codeSourceFile!.name)} className="text-gray-700">Download Code Source File</button>
                            </div>
                        )}
                        {submission.readMeFile && (
                            <div className="flex items-center mt-2">
                                <FaFileWord className="text-blue-500 mr-2" />
                                <button onClick={() => handleDownload(submission.readMeFile!.url, submission.readMeFile!.name)} className="text-gray-700">Download ReadMe File</button>
                            </div>
                        )}
                        {submission.reportFile && (
                            <div className="flex items-center mt-2">
                                <FaFilePdf className="text-red-500 mr-2" />
                                <button onClick={() => handleDownload(submission.reportFile!.url, submission.reportFile!.name)} className="text-gray-700">Download Report File</button>
                            </div>
                        )}
                        {submission.demoFile && (
                            <div className="flex items-center mt-2">
                                <FaFileVideo className="text-gray-500 mr-2" />
                                <button onClick={() => handleDownload(submission.demoFile!.url, submission.demoFile!.name)} className="text-gray-700">Download Demo File</button>
                            </div>
                        )}
                         <div className="flex items-center mt-2">
                            <button  onClick={handleDownloadAll} className="bg-primary rounded-xl p-2 text-white font-semibold">Download All</button>
                        </div>
                    </div>
                   
                </div>
            </div>
        </ConnectedClientLayout>
    );
};

export default SubmissionDetails;

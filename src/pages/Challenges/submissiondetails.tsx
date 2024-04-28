import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { useParams } from 'react-router-dom';
import { FaFilePdf , FaFileAlt ,FaFileExcel , FaFileCsv , FaFileVideo , FaFileWord} from 'react-icons/fa'; // Import file icon from react-icons/fa
import { format} from 'date-fns';
import { Link } from 'react-router-dom';

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
}

const SubmissionDetails: React.FC = () => {
    const { id } = useParams();
    const [submission, setSubmission] = useState<Submission | null>(null); // Specify Submission or null

    useEffect(() => {
        const fetchSubmissionDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/submissions/get/${id}`,{ withCredentials: true },);
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

    return (
        <ConnectedClientLayout>
<div className="bg-white rounded-lg shadow-md p-6 mb-4 flex flex-col sm:flex-row justify-between">
<div className="flex-none w-full sm:w-1/2 sm:ml-4">
        <div className="text-gray-700 mb-4">
            <p className="font-semibold">Challenge: {submission.challengeId.title}</p>

            <img src={submission.submittedBy.imageUrl } alt="profile"className="w-full sm:w-50 h-auto mr-4 px-auto rounded-lg"/>

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
                    <p className="text-gray-700">DataSetFile: {submission.datasetFile.name}</p>
                </div>
            )}
{submission.presentationFile && (
    <div className="flex items-center mt-2">
        <FaFilePdf className="text-red-500 mr-2" />
        <p className="text-gray-700">Presentation File: <a href={`${submission.presentationFile.url}?${Date.now()}`} download>{submission.presentationFile.name}</a></p>
    </div>
)}

            {submission.codeSourceFile && (
                <div className="flex items-center mt-2">
                    <FaFileAlt className="text-gray-500 mr-2" />
                    <p className="text-gray-700">Code Source File: {submission.codeSourceFile.name}</p>
                </div>
            )}
            {submission.readMeFile && (
                <div className="flex items-center mt-2">
                    <FaFileWord className="text-blue-500 mr-2" />
                    <p className="text-gray-700">ReadMe File: {submission.readMeFile.name}</p>
                </div>
            )}
            {submission.reportFile && (
                <div className="flex items-center mt-2">
                    <FaFilePdf className="text-red-500 mr-2" />
                    <p className="text-gray-700">Report File: {submission.reportFile.name}</p>
                </div>
            )}
            {submission.demoFile && (
                <div className="flex items-center mt-2">
                    <FaFileVideo className="text-gray-500 mr-2" />
                    <p className="text-gray-700">Demo File: {submission.demoFile.name}</p>
                </div>
            )}
        </div>
    </div>

</div>


        </ConnectedClientLayout>
    );
};

export default SubmissionDetails;

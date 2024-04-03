import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faCheckCircle, faArchive , faLightbulb , faUnlockAlt , faBrain ,faBullseye,faClock   } from '@fortawesome/free-solid-svg-icons';

const ChallengeStatistics: React.FC = () => {
    const [statistics, setStatistics] = useState<any>(null);

    useEffect(() => {
        const fetchChallengeStatistics = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/challenge/statistics`);
                setStatistics(response.data.statistics);
            } catch (error) {
                console.error('Error fetching challenge statistics:', error);
            }
        };

        fetchChallengeStatistics();
    }, []);

    if (!statistics) {
        return <div>Loading...</div>;
    }

    return (
<div className="flex flex-wrap justify-center space-x-4">

<div className="cursor-pointer w-[17rem] m-2 group p-6 bg-white hover:bg-black hover:bg-opacity-80 hover:text-white border border-gray rounded-lg shadow dark:bg-gray-800 hover:shadow-md transition-transform transform hover:scale-[1.10] flex flex-col items-center">
    <FontAwesomeIcon icon={faBullseye} className="h-10 w-full group-hover:text-white rounded mb-2 hover:scale-[1.15] text-red-500 text-3xl mr-4" />
    <a href="#" className="text-gray-500 group-hover:text-white">
        <h5 className="mb-2 text-xl font-semibold text-gray-900 tracking-tight dark:text-white hover:scale-75">All Challenges</h5>
    </a>
    <p className="mb-1 font-semibold text-gray-500 group-hover:text-black group-hover:font-semibold dark:text-gray-400 hover:scale-105 text-center">{statistics.totalChallenges}</p>
</div>

<div className="cursor-pointer w-[17rem] m-2 group p-6 bg-white hover:bg-black hover:bg-opacity-80 hover:text-white border border-gray rounded-lg shadow dark:bg-gray-800 hover:shadow-md transition-transform transform hover:scale-[1.10] flex flex-col items-center">
    <FontAwesomeIcon icon={faUnlockAlt} className="h-10 w-full group-hover:text-white rounded mb-2 hover:scale-[1.15] text-yellow-500 text-3xl mr-4" />
    <a href="#" className="text-gray-500 group-hover:text-white">
        <h5 className="mb-2 text-xl font-semibold text-gray-900 tracking-tight dark:text-white hover:scale-75">Open Challenges</h5>
    </a>
    <p className="mb-1 font-semibold text-gray-500 group-hover:text-black group-hover:font-semibold dark:text-gray-400 hover:scale-105 text-center">{statistics.openChallenges}</p>
</div>

<div className="cursor-pointer w-[17rem] m-2 group p-6 bg-white hover:bg-black hover:bg-opacity-80 hover:text-white border border-gray rounded-lg shadow dark:bg-gray-800 hover:shadow-md transition-transform transform hover:scale-[1.10] flex flex-col items-center">
    <FontAwesomeIcon icon={faCheckCircle} className="h-10 w-full group-hover:text-white rounded mb-2 hover:scale-[1.15] text-green-500 text-3xl mr-4" />
    <a href="#" className="text-gray-500 group-hover:text-white">
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:scale-75">Completed Challenges</h5>
    </a>
    <p className="mb-1 font-semibold text-gray-500 group-hover:text-black group-hover:font-semibold dark:text-gray-400 hover:scale-105 text-center">{statistics.completedChallenges}</p>
</div>

<div className="cursor-pointer w-[17rem] m-2 group p-6 bg-white hover:bg-black hover:bg-opacity-80 hover:text-white border border-gray rounded-lg shadow dark:bg-gray-800 hover:shadow-md transition-transform transform hover:scale-[1.10] flex flex-col items-center">
    <FontAwesomeIcon icon={faArchive} className="h-10 w-full group-hover:text-white rounded mb-2 hover:scale-[1.15] text-black text-3xl mr-4" />
    <a href="#" className="text-gray-500 group-hover:text-white">
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:scale-75">Archived Challenges</h5>
    </a>
    <p className="mb-1 font-semibold text-gray-500 group-hover:text-black group-hover:font-semibold dark:text-gray-400 hover:scale-105 text-center">{statistics.archivedChallenges}</p>
</div>

</div>
);
};

export default ChallengeStatistics;

import React, { useEffect, useState } from 'react';
import ClientLayout from '../../layout/clientLayout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns'; // Import date formatting function

const ChallengeDetails: React.FC = () => {
    const [challengeDetails, setChallengeDetails] = useState<any>(null);
    const { id } = useParams();

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

    const getStatusColor = () => {
        switch (challengeDetails.status) {
            case 'open':
                return 'bg-green-500';
            case 'completed':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getStatusText = () => {
        switch (challengeDetails.status) {
            case 'open':
                return 'Open';
            case 'completed':
                return 'Completed';
            default:
                return 'Unknown';
        }
    };

    // Format the date using date-fns library
    const formattedStartDate = format(new Date(challengeDetails.startDate), 'dd MMMM, yyyy');
    const formattedEndDate = format(new Date(challengeDetails.endDate), 'dd MMMM, yyyy');

    return (
        <ClientLayout>
            <div className="flex justify-center">
                <div className="w-full max-w-screen-xl px-4">
                    <section id="details" className="mb-8">
                        <h2 className="text-3xl font-semibold mb-4">{challengeDetails.title}</h2>
                        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                            <img src="/src/images/landing/flight.jpeg" alt="Challenge" className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <p className="text-gray-700"><span className="font-bold">Price:</span> {challengeDetails.price}</p>
                                <p className="text-gray-700"><span className="font-bold">Start Date:</span> {formattedStartDate}</p>
                                <p className="text-gray-700"><span className="font-bold">End Date:</span> {formattedEndDate}</p>
                                <p className="text-gray-700 font-bold">Status: <span className={`inline-block rounded px-2 py-1 text-sm font-semibold ${getStatusColor()} text-white`}>{getStatusText()}</span></p>
                            </div>
                        </div>
                    </section>
                    <section id="leaderboard" className="mb-8">
                        <h2 className="text-3xl font-semibold mb-4">Leaderboard</h2>
                        {/* Render leaderboard component here */}
                    </section>
                    <section id="datasets" className="mb-8">
                        <h2 className="text-3xl font-semibold mb-4">Datasets</h2>
                        {/* Render datasets component here */}
                    </section>
                    <section id="guideliness">
                        <h2 className="text-3xl font-semibold mb-4">Submission Guidelines</h2>
                        {/* Render submission guidelines component here */}
                    </section>
                </div>
            </div>


            <div className="card">
            <h2 className="text-3xl font-semibold mb-4">{challengeDetails.title}</h2>
      <div className="card__header">
     
        <img src="/src/images/landing/flight.jpeg" alt="sample1" />
      </div>
      <div className="card__body">
      <p className=" text-gray-700 "><span className="font-bold text-purple-500 ">Price:</span>{challengeDetails.price}</p>
        <p className=" text-gray-700 "><span className="font-bold text-purple-500 ">Start Date:</span>{formattedStartDate}</p>
        <p className=" text-gray-700"><span className="font-bold text-purple-500 "> End Date:</span>{formattedEndDate}</p>
        <p className="text-purple-500  font-bold">Status: <span className={`inline-block rounded px-2 py-1 text-sm font-semibold ${getStatusColor()} text-white`}>{getStatusText()}</span></p>

      </div>
      <div  className="card__footer bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg">
        <div className="card__Footer__first">
          <div>
            <p></p>
          </div>
          <label>Number of participants</label>
        </div>
     
      </div>
    </div>


    <div className="flex justify-center">
    <div className="w-full max-w-screen-xl px-4 flex">
        <div className="w-1/5">
            <ul className="menu" id="sticky-menu">
                <li><a href="#description">Description</a></li>
                <li><a href="#evaluation">Evaluation Metrics</a></li>
                <li><a href="#guidelines">Submission Guidelines</a></li>
            </ul>
        </div>
        <div className="w-4/5">
            <section id="description" className="mb-8">
                <h2 className="text-3xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700">{challengeDetails.description}</p>

                {/* Render leaderboard component here */}
            </section>
            <section id="evaluation" className="mb-8">
                <h2 className="text-3xl font-semibold mb-4">Evaluation Metrics</h2>
                {/* Render datasets component here */}
            </section>
            <section id="guidelines">
                <h2 className="text-3xl font-semibold mb-4">Submission Guidelines</h2>
                {/* Render submission guidelines component here */}
            </section>
        </div>
        
    </div>
</div>


        </ClientLayout>
    );
};

export default ChallengeDetails;

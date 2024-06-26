import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUsers, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../components/Auth/AuthProvider';

const ChallengeStatistics: React.FC = () => {
    const [fetchedStatistics, setFetchedStatistics] = useState<any>({
        totalChallenges: 0,
        nbchallengers: 0,
        nbcompanies: 0
    });

    const [displayedStatistics, setDisplayedStatistics] = useState<any>({
        totalChallenges: 0,
        nbchallengers: 0,
        nbcompanies: 0
    });

    const incrementPercentage = 0.1;
    const animationDuration = 800; // milliseconds
    const pauseDuration = 7000; // milliseconds

    const animateStatistics = () => {
        setDisplayedStatistics((prevDisplayedStatistics: any) => ({
            totalChallenges: Math.ceil(prevDisplayedStatistics.totalChallenges + (fetchedStatistics.totalChallenges - prevDisplayedStatistics.totalChallenges) * incrementPercentage),
            nbchallengers: Math.ceil(prevDisplayedStatistics.nbchallengers + (fetchedStatistics.nbchallengers - prevDisplayedStatistics.nbchallengers) * incrementPercentage),
            nbcompanies: Math.ceil(prevDisplayedStatistics.nbcompanies + (fetchedStatistics.nbcompanies - prevDisplayedStatistics.nbcompanies) * incrementPercentage)
        }));
    };
    useEffect(() => {
        console.log('Fetching challenge statistics...');
        const fetchChallengeStatistics = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/challenge/statistics`, {
                    withCredentials: true,
                });
                console.log('Fetched statistics:', response.data.statistics);
                setFetchedStatistics(response.data.statistics);
            } catch (error) {
                console.error('Error fetching challenge statistics:', error);
            }
        };

        fetchChallengeStatistics();
    }, []);

    useEffect(() => {
        if (fetchedStatistics && fetchedStatistics.totalChallenges !== 0) {
            console.log('Starting animation...');
            const animationTimer = setInterval(() => {
                animateStatistics();
                if (
                    displayedStatistics.totalChallenges === fetchedStatistics.totalChallenges &&
                    displayedStatistics.nbchallengers === fetchedStatistics.nbchallengers &&
                    displayedStatistics.nbcompanies === fetchedStatistics.nbcompanies
                ) {
                    clearInterval(animationTimer);
                    setTimeout(() => {
                        setDisplayedStatistics({
                            totalChallenges: 0,
                            nbchallengers: 0,
                            nbcompanies: 0
                        });
                    }, pauseDuration);
                }
            }, animationDuration);
            return () => clearInterval(animationTimer);
        }
    }, [fetchedStatistics]);

   

    if (!fetchedStatistics.totalChallenges) {
        return <div>Loading...</div>;
    }

    const {userAuth} = useAuth();

    return (
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-2 text-primary">Empower Your Community</h2>
                <p className="text-xl text-gray-600">Meet your developers where they already are.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className={userAuth?.role === 'challenger' ? "bg-white p-8 rounded-lg shadow-lg text-center" : "bg-gray p-8 rounded-lg shadow-lg text-center"}>
                    <FontAwesomeIcon icon={faTrophy} className="text-6xl text-primary mb-4" />
                    <h3 className="text-2xl font-semibold mb-4">Competitions</h3>
                    <p className="text-5xl font-semibold mb-2">{displayedStatistics.totalChallenges}</p>
                </div>
                <div className={userAuth?.role === 'challenger' ? "bg-white p-8 rounded-lg shadow-lg text-center" : "bg-gray p-8 rounded-lg shadow-lg text-center"}>
                    <FontAwesomeIcon icon={faUsers} className="text-6xl text-primary mb-4" />
                    <h3 className="text-2xl font-semibold mb-4">Challengers</h3>
                    <p className="text-5xl font-semibold mb-2">{displayedStatistics.nbchallengers}</p>
                </div>
                <div className={userAuth?.role === 'challenger' ? "bg-white p-8 rounded-lg shadow-lg text-center" : "bg-gray p-8 rounded-lg shadow-lg text-center"}>
                    <FontAwesomeIcon icon={faBuilding} className="text-6xl text-primary mb-4" />
                    <h3 className="text-2xl font-semibold mb-4">Companies</h3>
                    <p className="text-5xl font-semibold mb-2">{displayedStatistics.nbcompanies}</p>
                </div>
            </div>
        </div>
    );
};

export default ChallengeStatistics;
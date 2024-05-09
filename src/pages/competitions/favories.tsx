
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';
import '../landing/comp.css'; // Import du fichier CSS

import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../components/Auth/AuthProvider';

interface Challenge {
  _id: string;
  title: string;
  description: string;
  image: string;
  amount: string;
  prizes: {
    prizeName: string;
    prizeDescription: string;
  };

  recruitement: {
    positionTitle: string;
    jobDescription: string;
  };

  freelance: {
    projectTitle: string;
    projectDescription: string;
  };

  internship: {
    internshipTitle: string;
    internshipDescription: string;
    duration: string;
  };
  status: string;
  startDate: string;
  endDate: string;
  createdBy: string;
  targetedSkills: string[];
  dataset: {
    name: string;
    description: string;
    fileUrl: string;
  }[];
}

const Favories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // État pour le terme de recherche
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all'); // État pour le statut sélectionné
  const [currentPage, setCurrentPage] = useState<number>(1); // État pour la page actuelle
  const [challengesPerPage, setChallengesPerPage] = useState<number>(8); // Nombre de challenges par page

  const { userAuth } = useAuth();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        console.log('Fetching challenges...');
        const response = await axios.get<Challenge[]>( `http://localhost:3000/challenges/favorites/${userAuth?._id}`,{withCredentials:true});
       
        console.log('Challenges response:', response);
        setChallenges(response.data);
        console.log(challenges);
      } catch (error) {
        console.error('Erreur lors de la récupération des défis:', error);
      }
    };

    fetchChallenges();
  }, []);

 

  useEffect(() => {
    // Fonction de recherche avec délai de 300ms
    const timer = setTimeout(() => {
      console.log('Searching for challenges with term:', searchTerm);
      // Code pour rechercher les challenges avec le terme de recherche
    }, 300);

    return () => clearTimeout(timer); // Nettoyer le timer à chaque changement de terme de recherche
  }, [searchTerm]);

  // Fonction pour calculer le temps restant jusqu'à la fin du défi
  const calculateTimeRemaining = (endDate: string, challengeId: any) => {
    const endDateTime = new Date(endDate).getTime();
    const currentTime = new Date().getTime();
    const timeRemaining = endDateTime - currentTime;

    const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutesRemaining = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
    );

    if (daysRemaining <= 0 && minutesRemaining <= 0 && hoursRemaining <= 0) {
      handleCompleted(challengeId);
    }

    return `${daysRemaining} days  ${hoursRemaining} hours ${minutesRemaining} minutes`;
  };

  // Fonction pour ajouter une ligne vide si le titre n'est pas dans deux lignes
  const addEmptyLineIfNeeded = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + '...'; // Limiter la longueur du titre à maxLength
    }
    return title;
  };



  const indexOfLastChallenge = currentPage * challengesPerPage;
  const indexOfFirstChallenge = indexOfLastChallenge - challengesPerPage;
  const currentChallenges = challenges.slice(
    indexOfFirstChallenge,
    indexOfLastChallenge,
  );

  const paginate = (pageNumber: number) => {
    console.log('Page number:', pageNumber);
    setCurrentPage(pageNumber);
  };

  let filteredChallenges = currentChallenges.filter((challenge) => {
    if (selectedStatus === 'all') {
      // Afficher les challenges ouverts et terminés, mais pas les archivés
      return challenge?.status === 'open' || challenge?.status === 'completed';
    } else {
      return challenge?.status === selectedStatus; // Afficher les challenges avec le statut sélectionné
    }
  });

  // Fonction pour mettre à jour le statut sélectionné
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };
  const navigateToDetails = (challengeId: any) => {
    navigate(`/challengeDetail/${challengeId}`);
  };

  const handleCompleted = async (challengeId: string) => {
    try {
      await axios.put(
        `http://localhost:3000/challenges/completed/${challengeId}/update-status`,
        { status: 'completed' },
        { withCredentials: true },
      );

      console.log('PUT request successful for challenge ID:', challengeId);

      const updatedChallenges = challenges.map((challenge) => {
        if (challenge?._id === challengeId) {
          return { ...challenge, status: 'completed' };
        }
        return challenge;
      });

      setChallenges(updatedChallenges);
    } catch (error) {
      console.error('Error completing challenge:', error);
    }
  };

  

  // Fonction pour changer le terme de recherche
  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    filteredChallenges = currentChallenges.filter((challenge) => {
      const titleMatch =  challenge?.title.toLowerCase().includes(searchTerm);
      const priceMatch =  challenge?.amount
        .toString()
        .toLowerCase()
        .includes(searchTerm);
      return titleMatch || priceMatch;
    });
  };

  const navigate = useNavigate();

  function add() {
    navigate('/challenge/add');
  }

  return (
    <ConnectedClientLayout>
      <div className="flex flex-col gap-9 border-full">
        <div className="rounded-sm  border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b rounded-lg border-stroke py-4 px-6.5 dark:border-strokedark">
            <h2 className="font-bold text-black text-title-xl mb-8">
              Favories
            </h2>

            <div className="search">
              <input
                placeholder="Search..."
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
            </div>

            {/* Liste déroulante pour sélectionner le statut */}
            <div className="flex justify-end">
             
              <div className="col-md-2  text-end">
                <div className="status-dropdown">
                  <label htmlFor="status-select"> </label>
                  <select
                    id="status-select"
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    className="form-select"
                  >
                    <option value="all">All</option>
                    <option value="open">Open</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Affichage des challenges filtrés */}
            <div className="row row-cols-1 row-cols-md-3 g-4  lg:justify-start sm:justify-center">
              {filteredChallenges.map((challenge, index) => (
                <div className="col" key={ challenge?._id}>
                  <div className="card p-3 h-100 card-hover cursor-pointer">
                    <div className="status-and-actions-container">
                      <div
                        className={`status inline-flex rounded-full py-1 px-3 text-sm font-medium ${
                           challenge?.status === 'completed'
                            ? 'bg-green-400 text-white font-semibold'
                            :  challenge?.status === 'archived'
                              ? 'bg-red-600 text-white font-semibold'
                              :  challenge?.status === 'open'
                                ? 'bg-blue-400 text-white font-semibold'
                                : 'bg-red-400 text-white font-semibold'
                        }`}
                      >
                        { challenge?.status}
                      </div>

                    
                    </div>
                    <Link to={`/challengecompany/details/${ challenge?._id}`}>
                      <img
                        src={`http://localhost:3000/images/${ challenge?.image}`}
                        className="card-img-top mt-3"
                        alt="Card image"
                      />
                    </Link>

                    <div className="card-body">
                      <h5
                        className={`card-title ${addEmptyLineIfNeeded( challenge?.title, 24).length < 24 ? 'one-line-title' : ''}`}
                        title={ challenge?.title}
                      >
                        {addEmptyLineIfNeeded( challenge?.title, 40)}
                      </h5>
                    </div>
                    <div className="card-footer">
                      <div
                        className={`price ${ challenge?.status !== 'open' && 'mt-8'}`}
                      >
                        <span className='text-md font-semibold'>{ challenge?.amount &&  challenge?.amount} { challenge?.amount && 'DT'}</span>
                        <strong className="font-semibold text-base ">
                          { challenge?.prizes.prizeName && 'Award'}
                          { challenge?.recruitement.positionTitle &&
                            'Job Opportunity'}
                          { challenge?.freelance.projectTitle && 'Freelance Work'}
                          { challenge?.internship.internshipTitle &&
                            'Internship Opportunity'}
                        </strong>

                      </div>
                      <div className="date text-md font-medium flex flex-col">
                        { challenge?.status == 'open' && (
                          <p className="ml-12 text-red-600">Time Left </p>
                        )}
                        { challenge?.status == 'open' ? (
                          <span className="text-sm">
                            {calculateTimeRemaining(
                               challenge?.endDate,
                               challenge?._id,
                            )}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination cursor-pointer">
              <a onClick={() => paginate(currentPage - 1)}>&laquo;</a>
              {Array.from({
                length: Math.ceil(
                  filteredChallenges.length / challengesPerPage,
                ),
              }).map((_, index) => (
                <a
                  key={index + 1}
                  className={currentPage === index + 1 ? 'active' : ''}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </a>
              ))}
              <a onClick={() => paginate(currentPage + 1)}>&raquo;</a>
            </div>
          </div>
        </div>
      </div>
    </ConnectedClientLayout>
  );
};

export default Favories;

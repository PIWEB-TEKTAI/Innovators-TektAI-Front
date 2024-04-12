import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';
import './comp.css'; // Import du fichier CSS

import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../components/Auth/AuthProvider';


interface Challenge {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: string;
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

const Competitions: React.FC = () => {
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
        let url;
        if (userAuth?.role === 'company') {
           url =  'http://localhost:3000/challenges/get';

        } else {
          url = 'http://localhost:3000/submissions/get/all/submission';
        }

        const response = await axios.get<Challenge[]>(
          url,
          { withCredentials: true },
        );
        console.log('Challenges response:', response);
        setChallenges(response.data);
        console.log(challenges);
      } catch (error) {
        console.error('Erreur lors de la récupération des défis:', error);
      }
    };

    fetchChallenges();
  }, []);
  const [openDropdowns, setOpenDropdowns] = useState<boolean[]>(Array);

  const toggleDropdown = (index: any) => {
    const newOpenDropdowns = [...openDropdowns];
    newOpenDropdowns[index] = !newOpenDropdowns[index];
    setOpenDropdowns(newOpenDropdowns);
  };

  useEffect(() => {
    // Fonction de recherche avec délai de 300ms
    const timer = setTimeout(() => {
      console.log('Searching for challenges with term:', searchTerm);
      // Code pour rechercher les challenges avec le terme de recherche
    }, 300);

    return () => clearTimeout(timer); // Nettoyer le timer à chaque changement de terme de recherche
  }, [searchTerm]);

  // Fonction pour calculer le temps restant jusqu'à la fin du défi
  const calculateTimeRemaining = (endDate: string , challengeId:any) => {
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

    if(daysRemaining <=0 && minutesRemaining <= 0 && hoursRemaining <=0){
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

  // Fonction pour limiter la description à deux lignes
  const limitDescriptionLength = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + '...';
    }
    return description;
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
      return challenge.status === 'open' || challenge.status === 'completed';
    } else {
      return challenge.status === selectedStatus; // Afficher les challenges avec le statut sélectionné
    }
  });

  // Fonction pour mettre à jour le statut sélectionné
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };
  const navigateToDetails = (challengeId:any) => {
    navigate(`/challengeDetail/${challengeId}`);
    };
  const handleArchive = async (challengeId: string) => {
    try {
      console.log(
        "Sending PUT request to update challenge status to 'archived' for challenge ID:",
        challengeId,
      );

      // Send a PUT request to update the challenge status to 'archived'
      await axios.put(
        `http://localhost:3000/challenges/archived/${challengeId}/update-status`,
        { status: 'archived' },
        { withCredentials: true },
      );

      console.log('PUT request successful for challenge ID:', challengeId);

      // Update the challenges state after archiving
      const updatedChallenges = challenges.map((challenge) => {
        if (challenge._id === challengeId) {
          return { ...challenge, status: 'archived' };
        }
        return challenge;
      });

      console.log('Updated challenges after archiving:', updatedChallenges);

      setChallenges(updatedChallenges);
    } catch (error) {
      console.error('Error archiving challenge:', error);
    }
  };

  // Fonction pour ouvrir un challenge
  const handleOpen = async (challengeId: string) => {
    try {
      console.log(
        "Sending PUT request to update challenge status to 'open' for challenge ID:",
        challengeId,
      );

      await axios.put(
        `http://localhost:3000/challenges/open/${challengeId}/update-status`,
        { status: 'open' },
        { withCredentials: true },
      );

      console.log('PUT request successful for challenge ID:', challengeId);

      const updatedChallenges = challenges.map((challenge) => {
        if (challenge._id === challengeId) {
          return { ...challenge, status: 'open' };
        }
        return challenge;
      });

      console.log('Updated challenges after opening:', updatedChallenges);

      setChallenges(updatedChallenges);
    } catch (error) {
      console.error('Error opening challenge:', error);
    }
  };

  // Fonction pour marquer un challenge comme terminé
  const handleCompleted = async (challengeId: string) => {
    try {
      await axios.put(
        `http://localhost:3000/challenges/completed/${challengeId}/update-status`,
        { status: 'completed' },
        { withCredentials: true },
      );

      console.log('PUT request successful for challenge ID:', challengeId);

      const updatedChallenges = challenges.map((challenge) => {
        if (challenge._id === challengeId) {
          return { ...challenge, status: 'completed' };
        }
        return challenge;
      });

      setChallenges(updatedChallenges);
    } catch (error) {
      console.error('Error completing challenge:', error);
    }
  };



  const handleEdit = async (challengeId: string) => {
      navigate(`/challenge/edit/${challengeId}`)
  };





  // Fonction pour changer le terme de recherche
  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

     filteredChallenges = currentChallenges.filter((challenge) => {
        const titleMatch = challenge.title.toLowerCase().includes(searchTerm);
        const priceMatch = challenge.price.toString().toLowerCase().includes(searchTerm);
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
              Competitions
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
              <div>

                {userAuth?.role === 'company' && (
                  <button
                  onClick={add}
                  className="inline-flex items-center justify-center bg-transparent px-5 py-2 mr-3 text-primary font-semibold text-center text-white-900 border border-primary-300 rounded-full hover:bg-opacity-90 hover:shadow-4 hover:bg-primary hover:text-white  focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
                >
                  Host a competition
                </button>
                ) }
                
              </div>
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

                <div className="col" key={challenge._id}>
                  <div className="card p-3 h-100 card-hover">
                    <div className="status-and-actions-container">
                      <div
                        className={`status inline-flex rounded-full py-1 px-3 text-sm font-medium ${
                          challenge.status === 'completed'
                            ? 'bg-green-400 text-white font-semibold'
                            : challenge.status === 'archived'
                              ? 'bg-red-600 text-white font-semibold'
                              : challenge.status === 'open'
                                ? 'bg-blue-400 text-white font-semibold'
                                : 'bg-red-400 text-white font-semibold'
                        }`}
                      >
                        {challenge.status}
                      </div>

                      {userAuth?.role === "company" && (
                             <div className="relative" key={challenge._id}>
                             <button
                               id={`dropdownMenuIconButton_${challenge._id}`}
                               onClick={() => toggleDropdown(index)}
                               className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                               type="button"
                             >
                               <svg
                                 className="w-5 h-5"
                                 aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor"
                                 viewBox="0 0 16 3"
                               >
                                 <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                               </svg>
                             </button>
     
                             {/* Dropdown menu */}
                             <div
                               id={`dropdownDots${challenge._id}`}
                               className={`${openDropdowns[index] ? 'block' : 'hidden'} z-10 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
                             >
                               <ul
                                 className="py-2 text-sm text-gray-700 dark:text-gray-200 font-semibold"
                                 aria-labelledby={`dropdownMenuIconButton_${challenge._id}`}
                               >
                                 <li>
                                   <button
                                     onClick={() => handleEdit(challenge._id)}
                                     className=" w-full flex justify-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-semibold"
                                   >
                                     Edit
                                   </button>
                                 </li>
                                 <li>
                                   <button
                                     onClick={() => handleOpen(challenge._id)}
                                     className=" w-full flex justify-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-semibold"
                                   >
                                     Open
                                   </button>
                                 </li>
                                 <li>
                                   <button
                                     onClick={() => handleCompleted(challenge._id)}
                                     className="w-full flex justify-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-semibold"
                                   >
                                     Complete
                                   </button>
                                 </li>
                               </ul>
                               <div className="py-2">
                                 <button
                                  onClick={() => handleArchive(challenge._id)}
                                   className="w-full flex justify-start px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white font-semibold"
                                 >
                                   Archive
                                 </button>
                               </div>
                             </div>
                           </div>
                      )}
                    
                    </div>
                    <Link to={`/challengecompany/details/${challenge._id}`} >

                    <img
                      src={`http://localhost:3000/images/${challenge.image}`}
                      className="card-img-top mt-3"
                      alt="Card image"
                    />
                    </Link>

                    <div className="card-body">
                      <h5
                        className={`card-title ${addEmptyLineIfNeeded(challenge.title, 24).length < 24 ? 'one-line-title' : ''}`}
                        title={challenge.title}
                      >
                        {addEmptyLineIfNeeded(challenge.title, 40)}
                      </h5>
                    
                    </div>
                    <div className="card-footer">
                      <div className={`price ${challenge.status !== 'open' && 'mt-8'}`}>
                        <strong>{challenge.price} DT</strong>
                      </div>
                      <div className="date text-md font-medium flex flex-col">
                        {challenge.status == 'open' && <p className='ml-12 text-red-600'>Time Left </p>}
                        {challenge.status == 'open' ?  <span className='text-sm'>{calculateTimeRemaining(challenge.endDate , challenge._id)}</span> : null }
                      
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
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

export default Competitions;

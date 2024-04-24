import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Footer from '../landing/footer';
import '@fortawesome/fontawesome-free/css/all.css';
import {
  faEuro,
} from '@fortawesome/free-solid-svg-icons';
interface CardProps {
  title: string;
  imageSrc: string;
  description: string;
}

interface RevealOnScrollProps {
  children: React.ReactNode;
  additionalProp?: boolean;
  delay: string;
}
interface User {
  _id: string;
  email: string;
  FirstName: string;
  LastName: string;
  password: string;
  imageUrl: string;
  phone: string;
  address: string;
  birthDate: Date | null;
  occupation: string;
  Description: string;
  Education: string;
  Skills: string;
  isEmailVerified: boolean;
  state: 'validated' | 'not validated' | 'blocked';
  role: 'super admin' | 'admin' | 'challenger' | 'company' | 'archive';
}
interface Challenge {
  [x: string]: any;
  _id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  status: 'open' | 'completed' | 'archived';
  startDate: Date;
  endDate: Date;
  createdBy: User['_id']; // Référence à l'ID de l'utilisateur
  targetedSkills: string[];
  dataset: {
    name: string;
    description: string;
    fileUrl: string;
  };
  onClick: () => void;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  additionalProp,
  delay,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isStyleTemporaryActive, setIsTemporaryStyleActive] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsTemporaryStyleActive(true);
        setIsVisible(true);
        setTimeout(() => {
          setIsTemporaryStyleActive(false);
        }, 3000);
        scrollObserver.unobserve(entry.target);
      }
    });

    if (ref.current) {
      scrollObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        scrollObserver.unobserve(ref.current);
      }
    };
  }, []);

  const classes = `transition-opacity duration-1000 ${delay}
          ${
            isVisible ? 'opacity-100' : 'opacity-0'
          } ${isStyleTemporaryActive && additionalProp && 'scale-[1.2]'}  `;

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
};


interface ChallengeModalProps {
  challenge: Challenge;
  onClose: () => void;
}

const Card: React.FC<Challenge & { onClick: () => void }> = ({
  onClick,
  _id,
  title,
  image,
  description,
  price,
  status,
  startDate,
  endDate,
  createdBy,
  targetedSkills,
  dataset,
}) => {
  const ChallengeModal: React.FC<ChallengeModalProps> = ({
    challenge,
    onClose,
  }) => {
    return (
      <Modal
        isOpen
        onRequestClose={onClose}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '800px',
            height: '60vh',
            padding: '40px',
            borderRadius: '8px',
          },
        }}
      >
        <div className="modal-header flex items-center justify-between  border-b border-gray-200 pb-2 mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="modal-body flex items-center mb-4">
          <div className="w-[250px] rounded-lg mr-5 overflow-hidden">
            <img
              src={`http://localhost:3000/images/${image}`}
              className="card-img-top mt-3 w-50"
              alt="Card image"
            />
          </div>
          <div>
           
            <hr className="my-2 border-gray-300" />
            <span className="font-semibold">Description</span>
            <p className="text-gray-700 dark:text-gray-300">{description}</p>
            <hr className="my-2 border-gray-300" />
            <span className="font-semibold">Skills</span>
            <hr className="my-2 border-gray-300" />
            <div className="inline-flex space-x-2">
              {targetedSkills.map((skill, index) => (
                <span
                  key={index}
                  className={`rounded-full py-1 px-3 text-sm font-medium ${
                    status === 'open' || status === 'completed'
                      ? 'bg-[#BDC2C3] text-white font-semibold'
                      : status === 'archived'
                        ? 'bg-red-600 text-white font-semibold'
                        : 'bg-green-400 text-white font-semibold'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex items-center mt-4 space-x-4 text-gray-700 dark:text-gray-300">
              <FontAwesomeIcon icon={faEuro} className="text-green-500" />
              <span className="font-semibold">Price: {price} DT</span>
            </div>
            <div className="flex items-center mt-2 space-x-4 text-gray-700 dark:text-gray-300">
              <FontAwesomeIcon icon={faChartLine} className="text-blue-500" />
              <span className="font-semibold">Status:</span>
              <span
                className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${
                  status === 'open'
                    ? 'bg-blue-400 text-white font-semibold'
                    : status === 'archived'
                      ? 'bg-red-600 text-white font-semibold'
                      : 'bg-green-400 text-white font-semibold'
                }`}
              >
                {status}
              </span>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null,
  );

  const handleCardClick = () => {
    const newChallenge: Challenge = {
      _id: 'temp-id', // Remplacez 'temp-id' par un ID approprié ou généré dynamiquement
      onClick: () => {}, // Ajoutez une fonction onClick vide ou définissez-la selon vos besoins
      title,
      image,
      description,
      price,
      status,
      startDate,
      endDate,
      createdBy,
      targetedSkills,
      dataset,
    };
    setSelectedChallenge(newChallenge);
  };
  const handleCloseModal = () => {
    setSelectedChallenge(null);
  };

  const [showDetails, setShowDetails] = useState(false);
  
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
      selectedChallenge?.status ==='completed'
    }

    
    if(daysRemaining <=0 && minutesRemaining <= 0 && hoursRemaining <=0){
      handleCompleted(challengeId);
    }
   
    return `${daysRemaining} days  ${hoursRemaining} hours ${minutesRemaining} minutes`;
  };


   // Fonction pour marquer un challenge comme terminé
   const handleCompleted = async (challengeId: string) => {
    try {
      console.log(selectedChallenge)
      await axios.put(
        `http://localhost:3000/challenges/completed/${challengeId}/update-status`,
        { status: 'completed' },
        { withCredentials: true },
      );

      console.log('PUT request successful for challenge ID:', challengeId);

      const updatedChallenges = selectedChallenge && selectedChallenge.map((challenge:any) => {
        if (challenge._id === challengeId) {
          return { ...challenge, status: 'completed' };
        }
        return challenge;
      });

      setSelectedChallenge(updatedChallenges);
    } catch (error) {
      console.error('Error completing challenge:', error);
    }
  };

  

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div
      className="bg-white  rounded-lg shadow-lg p-6 flex flex-col items-start h-full"
      onClick={toggleDetails}
    >

      
      <div className="flex items-center justify-between gap-8 mb-4 ">
        <img
          src={`http://localhost:3000/images/${image}`}
          className="card-img-top mt-3 w-40"
          alt="Card image"
        />

        <div className="flex flex-col items-start mb-4">
          <h3 className="text-xl font-bold text-black dark:text-white capitalize">
            {title}
          </h3>
          <div className='font-medium mt-2'>
            {status == 'open' && <p className=' text-red-600'>Time Left </p>}
            {status == 'open' ?  <span className='text-sm'>{calculateTimeRemaining(endDate.toString() , _id )}</span> : null }       
          </div>
        </div>
      </div>

    
      <hr className="my-2 border-gray-300" />
      <span className="font-semibold">Description </span>

      <p className="text-gray-700 dark:text-gray-300">{description.substring(0,70)}... </p>
      <hr className="my-2 border-gray-300" />
   
      <div className="flex items-center mt-4 space-x-4 text-gray-700 dark:text-gray-300">
        <FontAwesomeIcon icon={faEuro} className="text-green-500" />
        <span className="font-semibold">Price: {price} DT</span>
      </div>

      <div className="flex items-center mt-2 space-x-4 text-gray-700 dark:text-gray-300">
        <FontAwesomeIcon icon={faChartLine} className="text-blue-500" />{' '}
        <span className="font-semibold">Status : </span>
        <span
          className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${
            status === 'open'
              ? 'bg-blue-400 text-white font-semibold'
              : status === 'archived'
                ? 'bg-red-600 text-white font-semibold'
                : 'bg-green-400 text-white font-semibold'
          }`}
        >
          {status}
        </span>
      </div>
      {selectedChallenge && (
        <ChallengeModal
          challenge={selectedChallenge}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

import ClientLayout from '../../layout/clientLayout';
import { WhyChooseUs } from '../../types/whyChooseUs';
import {
  faTasks,
  faChartLine,
  faCalendarAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useAuth } from '../../components/Auth/AuthProvider';
const ListChallengerFront: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
    // Ajoutez ici la logique de filtrage en fonction du filtre sélectionné
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const [cardsData, setCardsData] = useState<Challenge[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');


  useEffect(() => {
    fetchData();
    console.log(cardsData); // Vérifiez les données après chaque mise à jour
  }, [selectedRole, searchTerm]); // Fetch data again when selectedRole or searchTerm changes

  const fetchData = () => {
    const requestOptions = selectedRole === 'MyChallenge' && userAuth?.role === 'company'  ? { withCredentials: true } : {};
    axios
      .get<Challenge[]>(
        `http://localhost:3000/challenges/${selectedRole || 'AllChallenge'}`, requestOptions
      )
      .then((response) => {
        console.log(response.data);
        const filteredUsers = response.data.filter(
          (user) =>
            user.title.toLowerCase().startsWith(searchTerm) ||
            user.price.toLowerCase().startsWith(searchTerm) ||
            user.description.startsWith(searchTerm),
        );
        setCardsData(filteredUsers);
      })
      .catch((err) => console.log(err));
  };
  const filteredCards = cardsData.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );


  const { userAuth } = useAuth();

  return (
    <ClientLayout>
       <RevealOnScroll additionalProp={false} delay="">
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl h-80 px-4 py-3 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:grid-cols-12">
          <div className="mr-auto lg:ml-8 place-self-center group lg:col-span-7 cursor-pointer">
            <h1 className="max-w-2xl mb-4 text-black text-3xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-3xl dark:text-white">
              <span className="animated-text">C</span>
              <span className="animated-text" style={{animationDelay: '0.1s'}}>o</span>
              <span className="animated-text" style={{animationDelay: '0.2s'}}>m</span>
              <span className="animated-text" style={{animationDelay: '0.3s'}}>p</span>
              <span className="animated-text" style={{animationDelay: '0.4s'}}>e</span>
              <span className="animated-text" style={{animationDelay: '0.5s'}}>t</span>
              <span className="animated-text" style={{animationDelay: '0.6s'}}>i</span>
              <span className="animated-text" style={{animationDelay: '0.7s'}}>t</span>
              <span className="animated-text" style={{animationDelay: '0.8s'}}>i</span>
              <span className="animated-text" style={{animationDelay: '0.9s'}}>o</span>
              <span className="animated-text" style={{animationDelay: '1s'}}>n</span>
              <span className="animated-text" style={{animationDelay: '1.1s'}}>s</span>
              <br />
            

           
            </h1>
            <p className="max-w-xl mb-6 text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Grow your data science skills by competing in our exciting competitions. Find help in the documentation or learn about Community Competitions.
            </p>
            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            {userAuth?.role !== 'challenger'  && (
              <a href={userAuth?.role === 'company' ? "/challenge/add" : "/auth/signin"}
              className="inline-flex items-center justify-center bg-transparent px-5 py-3 mr-3 text-primary font-semibold text-center text-white-900 border border-primary-300 rounded-full hover:bg-opacity-90 hover:shadow-4 hover:bg-primary hover:text-white  focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-primary-800">
                Host a new competition
              </a> 
            )}
            </div>
            
          </div>
          <div className="hidden ml-auto lg:col-span-5 lg:flex animate__animated animate__fadeInRight">
            <img src="/src/images/landing/competition.jpg" alt="mockup" className='h-60 w-95'/>
          </div>   

        </div>
      </section>
    </RevealOnScroll>
      <section className=" bg-opacity-85 dark:bg-gray-800">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6 ">
          <RevealOnScroll delay="">
           
            
            <div className="flex flex-col sm:flex-row items-center gap-2 bg-white border border-gray-300 rounded-full p-2 focus-within:border-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.5 2a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15zm8.854 14.146a1 1 0 0 1-1.414 1.414l-3.541-3.541a7 7 0 1 1 1.414-1.414l3.541 3.541zM9.5 14a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z"
                  />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search challenges..."
                  className="appearance-none bg-transparent border-none focus:outline-none flex-1 text-gray-700 w-full sm:w-auto"
                />
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="bg-white border-none rounded-lg p-2 focus:outline-none w-full sm:w-auto"
                >
                  <option value="">All challenges</option>
                  {userAuth?.role === "company" && ( <option value="MyChallenge">My challenges</option>)}
                  <option value="OpenedChallenge">Open challenges</option>
                  <option value="completedChallenge">
                    Completed challenges
                  </option>
                </select>
              </div>

            <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              

              {filteredCards.map((card, index) => (
                <Link key={index} to={`/challenge/details/${card._id}`}>
                  <Card key={index} {...card} />
                </Link>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <RevealOnScroll delay="400">
        <Footer />
      </RevealOnScroll>
    </ClientLayout>
  );
};

export default ListChallengerFront;
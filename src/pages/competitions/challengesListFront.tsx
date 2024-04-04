import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import Modal from 'react-modal';
import Footer from '../landing/footer';
import '@fortawesome/fontawesome-free/css/all.css';
import {
  faStar as solidStar,
  faStarHalfAlt as halfStar,
  faStar as emptyStar,
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

const renderStars = (rating: number) => {
  const stars = [];
  const roundedRating = Math.round(rating * 2) / 2; // Arrondi au demi-score le plus proche

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={solidStar}
          className="text-yellow-500"
        />,
      );
    } else if (i - 0.5 === roundedRating) {
      stars.push(
        <FontAwesomeIcon key={i} icon={halfStar} className="text-yellow-500" />,
      );
    } else {
      stars.push(
        <FontAwesomeIcon key={i} icon={emptyStar} className="text-gray-400" />,
      );
    }
  }

  return stars;
};
interface ChallengeModalProps {
  challenge: Challenge;
  onClose: () => void;
}

const Card: React.FC<Challenge & { onClick: () => void }> = ({
  onClick,
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
        <div className="modal-header flex items-center justify-between border-b border-gray-200 pb-2 mb-4">
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
            <div className="flex items-center mt-2 space-x-4 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">
                Ranking {renderStars(challengeRank)}
              </span>
            </div>
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
  const formattedStartDate = new Date(startDate);
  const formattedEndDate =
    endDate instanceof Date ? endDate.toDateString() : '';
  const challengeRank = 4.5;
  const today = new Date();
  let durationText = '';
  // Calcul de la différence en millisecondes
  if (formattedStartDate instanceof Date) {
    const differenceMs = today.getTime() - formattedStartDate.getTime();

    // Conversion de la différence en jours, heures, minutes, secondes
    const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (differenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((differenceMs % (1000 * 60)) / 1000);

    // Affichage du résultat
    durationText = `${days} jours, ${hours} heures`;
  } else {
    console.error("startDate n'est pas une instance de Date");
  }
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div
      className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col items-start w-100 h-120"
      onClick={toggleDetails}
    >
      <div className="flex items-center mb-4">
        <img
          src={`http://localhost:3000/images/${image}`}
          className="card-img-top mt-3 w-40"
          alt="Card image"
        />

        <div className="flex flex-col items-start mb-4">
          <h3 className="text-xl font-bold text-black dark:text-white">
            {title}
          </h3>
          <p style={{ color: '#B8B9B9' }}>{durationText}</p>
        </div>
      </div>

      <div className="flex items-center mt-2 space-x-4 text-gray-700 dark:text-gray-300">
        <span className="font-semibold">
          Ranking {renderStars(challengeRank)}
        </span>
      </div>
      <hr className="my-2 border-gray-300" />
      <span className="font-semibold">Job Description </span>

      <p className="text-gray-700 dark:text-gray-300">{description}</p>
      <hr className="my-2 border-gray-300" />
      <span className="font-semibold">Skills </span>
      <hr className="my-2 border-gray-300" />
      <span className="inline-flex space-x-2">
        {targetedSkills.map((skill, index) => (
          <span
            key={index}
            className={`rounded-full py-1 px-3 text-sm font-medium ${
              status === 'open' || status === 'completed'
                ? 'bg-[#BDC2C3] text-white font-semibold'
                : status === 'archived'
                  ? 'bg-black text-white font-semibold'
                  : 'bg-red-400 text-white font-semibold'
            }`}
          >
            {skill}
          </span>
        ))}
      </span>
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
      <button onClick={handleCardClick}>Voir les détails</button>
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
    axios
      .get<Challenge[]>(
        `http://localhost:3000/challenges/${selectedRole || 'AllChallenge'}`,
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
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/user/contact', {
        email,
        message,
      }); // Send fromEmail instead of email
      setSuccessMessage('Message sent successfully!');
      setEmail(''); // Clear sender's email after sending
      setMessage('');
    } catch (error) {
      setErrorMessage('Failed to send message. Please try again later.');
    }
  };

  useEffect(() => {
    fetchAboutUsContent();
    fetchWhyUsContent();
  }, []);
  const [aboutUsContent, setAboutUsContent] = useState('');
  const [whyUsContent, setWhyUsContent] = useState<WhyChooseUs | null>(null);

  const fetchAboutUsContent = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/adminlan/aboutus',
      );
      setAboutUsContent(response.data.content);
    } catch (error) {
      console.error('Error fetching About Us content:', error);
    }
  };
  const fetchWhyUsContent = async () => {
    try {
      const response = await axios.get('http://localhost:3000/adminlan/whyus');
      setWhyUsContent(response.data);
    } catch (error) {
      console.error('Error fetching Why Choose Us content:', error);
    }
  };

  return (
    <ClientLayout>
      <section className="bg-gray-100 bg-opacity-85 dark:bg-gray-800">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6 ">
          <RevealOnScroll delay="">
            <h2 className="text-4xl font-extrabold text-black dark:text-white pb-4">
              Competitions
            </h2>
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
                  <option value="OpenedChallenge">open challenges</option>
                  <option value="completedChallenge">
                    completed challenges
                  </option>
                  <option value="archivedChallenge">Archive challenges</option>
                </select>
              </div>

              <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCards.map((card, index) => (
              <Link key={index} to={`/challenge/details/${card._id}`}>
                
                <Card {...card} />
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

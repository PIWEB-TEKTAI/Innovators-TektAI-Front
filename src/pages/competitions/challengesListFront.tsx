import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Footer from '../landing/footer';
import '@fortawesome/fontawesome-free/css/all.css';
import { faStar as solidStar, faStarHalfAlt as halfStar, faStar as emptyStar, faStar, DollarfaSackDollar, faFileInvoiceDollar, faEuro } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
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



const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, additionalProp, delay }) => {

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
          ${isVisible ? "opacity-100" : "opacity-0"
    } ${isStyleTemporaryActive && additionalProp && "scale-[1.2]"}  `;

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
};
const Card2: React.FC<CardProps> = ({ title, imageSrc, description }) => {
  return (
    <div
      className="cursor-pointer  max-w-[18rem] group p-6 bg-white hover:bg-primary hover:bg-opacity-80  hover:text-white border border-gray rounded-lg shadow dark:bg-gray-800 hover:shadow-md transition-transform transform hover:scale-[1.15]"
    >
      <img className="h-35 w-full group-hover:text-white rounded mb-2 hover:scale-[1.15]" src={imageSrc} alt="ai" loading='lazy' />
      <a href="#" className="text-[#00004b] group-hover:text-white">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white hover:scale-75">{title}</h5>
      </a>
      <p className="mb-3 font-normal text-gray-500 group-hover:text-black group-hover:font-semibold dark:text-gray-400 hover:scale-105">{description}</p>
    </div>
  );

};


const renderStars = (rating: number) => {
  const stars = [];
  const roundedRating = Math.round(rating * 2) / 2; // Arrondi au demi-score le plus proche

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<FontAwesomeIcon key={i} icon={solidStar} className="text-yellow-500" />);
    } else if (i - 0.5 === roundedRating) {
      stars.push(<FontAwesomeIcon key={i} icon={halfStar} className="text-yellow-500" />);
    } else {
      stars.push(<FontAwesomeIcon key={i} icon={emptyStar} className="text-gray-400" />);
    }
  }

  return stars;
};
interface ChallengeModalProps {
  challenge: Challenge;
  onClose: () => void;
}

const Card: React.FC<Challenge & { onClick: () => void }> = ({ onClick, title, image, description, price, status, startDate, endDate, createdBy, targetedSkills, dataset }) => {
  const ChallengeModal: React.FC<ChallengeModalProps> = ({ challenge, onClose }) => {
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
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="modal-body flex items-center mb-4">
          <div className="w-[1680px] h-[400px] rounded-lg mr-5 overflow-hidden">
            <img src={image} alt={title} className="w-full h-full " />
          </div>
          <div>
            <div className="flex items-center mt-2 space-x-4 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Ranking {renderStars(challengeRank)}</span>
            </div>
            <hr className="my-2 border-gray-300" />
            <span className="font-semibold">Job Description</span>
            <p className="text-gray-700 dark:text-gray-300">{description}</p>
            <hr className="my-2 border-gray-300" />
            <span className="font-semibold">Skills</span>
            <hr className="my-2 border-gray-300" />
            <div className="inline-flex space-x-2">
              {targetedSkills.map((skill, index) => (
                <span
                  key={index}
                  className={`rounded-full py-1 px-3 text-sm font-medium ${status === 'open' || status === 'completed'
                    ? 'bg-[#BDC2C3] text-white font-semibold'
                    : status === 'archived'
                      ? 'bg-black text-white font-semibold'
                      : 'bg-red-400 text-white font-semibold'
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
                className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${status === 'open'
                  ? 'bg-green-400 text-white font-semibold'
                  : status === 'archived'
                    ? 'bg-black text-white font-semibold'
                    : 'bg-red-400 text-white font-semibold'
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


  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const handleCardClick = () => {
    const newChallenge: Challenge = {
      _id: 'temp-id', // Remplacez 'temp-id' par un ID approprié ou généré dynamiquement
      onClick: () => { }, // Ajoutez une fonction onClick vide ou définissez-la selon vos besoins
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
  const formattedEndDate = endDate instanceof Date ? endDate.toDateString() : '';
  const challengeRank = 4.5
  const today = new Date();
  let durationText = '';
  // Calcul de la différence en millisecondes
  if (formattedStartDate instanceof Date) {
    const differenceMs = today.getTime() - formattedStartDate.getTime();

    // Conversion de la différence en jours, heures, minutes, secondes
    const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((differenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((differenceMs % (1000 * 60)) / 1000);

    // Affichage du résultat
    durationText = `${days} jours, ${hours} heures`;
  } else {
    console.error('startDate n\'est pas une instance de Date');
  }
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  return (

    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col items-start w-1000 h-120" onClick={toggleDetails}>
      <div className="flex items-center mb-4">
        <img src={image} alt={title} className="w-16 h-16 mr-4 object-cover rounded-lg" />
        <div className="flex flex-col items-start mb-4">
          <h3 className="text-xl font-bold text-black dark:text-white">{title}</h3>
          <p style={{ color: '#B8B9B9' }}>
            {durationText}
          </p>
        </div>
      </div>

      <div className="flex items-center mt-2 space-x-4 text-gray-700 dark:text-gray-300">

        <span className="font-semibold">Ranking {renderStars(challengeRank)}</span>
      </div>
      <hr className="my-2 border-gray-300" />
      <span className="font-semibold">Job Description </span>



      <p className="text-gray-700 dark:text-gray-300">{description}</p>
      <hr className="my-2 border-gray-300" /><span className="font-semibold">Skills </span>
      <hr className="my-2 border-gray-300" />
      <span className="inline-flex space-x-2">
        {targetedSkills.map((skill, index) => (
          <span
            key={index}
            className={`rounded-full py-1 px-3 text-sm font-medium ${status === 'open' || status === 'completed' ? 'bg-[#BDC2C3] text-white font-semibold' :
              status === 'archived' ? 'bg-black text-white font-semibold' :
                'bg-red-400 text-white font-semibold'
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
        <FontAwesomeIcon icon={faChartLine} className="text-blue-500" /> <span className="font-semibold">Status : </span>
        <span
          className={`inline-flex rounded-full py-1 px-3 text-sm font-medium ${status === 'open' ? 'bg-green-400 text-white font-semibold' :
            status === 'archived' ? 'bg-black text-white font-semibold' :
              'bg-red-400 text-white font-semibold'
            }`}
        >
          {status}
        </span>
      </div>
      <button onClick={handleCardClick}>Voir les détails</button>
      {selectedChallenge && (
        <ChallengeModal challenge={selectedChallenge} onClose={handleCloseModal} />
      )}


    </div>



  );
};

const forwardCards = [
  {
    imageSrc: '/src/images/landing/flight.jpeg',
    title: 'Flight Delay Prediction Challenge',
    description: 'Go to this step by step guideline process on how to certify for your weekly benefits.',
  },
  {
    imageSrc: '/src/images/landing/finance.jpg',
    title: 'Financial Inclusion in Africa',
    description: 'Can you predict who in Africa is most likely to have a bank account?',
  },
  {
    imageSrc: '/src/images/landing/turtle.webp',
    title: 'Turtle Rescue Forecast Challenge',
    description: 'Can you forecast the number of turtles rescued per site per week in Kenya?',
  },
  {
    imageSrc: '/src/images/landing/animal.webp',
    title: 'Animal Classification Challenge',
    description: 'Can you create a binary classification algorithm to distinguish animals?',
  },
];
const backwardCards = [
  {
    imageSrc: "/src/images/landing/imdb.jpeg",
    title: "IMDB Dataset 2023",
    description: "Dataset containing information about movies which appears on IMDB website.",
  },
  {
    imageSrc: "/src/images/landing/car.jpg",
    title: "Car Specification ",
    description: "Technical information and appearance information of nearly 30,000 cars from 124 car companies.",
  },
  {
    imageSrc: "/src/images/landing/bitcon.jpeg",
    title: "Bitcoin Price",
    description: "This dataset provides weekly updates on Bitcoin prices along with related information ",
  },
  {
    imageSrc: "/src/images/landing/git.png",
    title: "Github Social Network",
    description: "A large social network of GitHub developers was collected from the public API in June 2019.",
  },
];

import ClientLayout from '../../layout/clientLayout'
import { WhyChooseUs } from '../../types/whyChooseUs';
import { faTasks, faChartLine, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
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
    axios.get<Challenge[]>(`http://localhost:3000/challenge/${selectedRole || 'AllChallenge'}`)
  .then(response => {
    const filteredUsers = response.data.filter(user =>
      (user.title.toLowerCase().startsWith(searchTerm) ||
      user.price.toLowerCase().startsWith(searchTerm) ||
      user.description.startsWith(searchTerm))
    );
    setCardsData(filteredUsers);
  })
  .catch(err => console.log(err));
};
  const filteredCards = cardsData.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/user/contact', { email, message }); // Send fromEmail instead of email
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
      const response = await axios.get('http://localhost:3000/adminlan/aboutus');
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
      <RevealOnScroll additionalProp={false} delay="">
        <section className="bg-white dark:bg-gray-900">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto lg:ml-8 place-self-center group lg:col-span-7 cursor-pointer">
              <h1 className="max-w-2xl mb-4 group-hover:scale-[1.05] text-black text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                <span className="animated-text">T</span>
                <span className="animated-text" style={{ animationDelay: '0.1s' }}>r</span>
                <span className="animated-text" style={{ animationDelay: '0.2s' }}>a</span>
                <span className="animated-text" style={{ animationDelay: '0.3s' }}>n</span>
                <span className="animated-text" style={{ animationDelay: '0.4s' }}>s</span>
                <span className="animated-text" style={{ animationDelay: '0.5s' }}>f</span>
                <span className="animated-text" style={{ animationDelay: '0.6s' }}>o</span>
                <span className="animated-text" style={{ animationDelay: '0.7s' }}>r</span>
                <span className="animated-text" style={{ animationDelay: '0.8s' }}>m</span>
                <span className="animated-text" style={{ animationDelay: '0.9s' }}>i</span>
                <span className="animated-text" style={{ animationDelay: '1s' }}>n</span>
                <span className="animated-text" style={{ animationDelay: '1.1s' }}>g</span>
                <br />
                <span className="animated-text" style={{ animationDelay: '1.3s' }}>C</span>
                <span className="animated-text" style={{ animationDelay: '1.4s' }}>h</span>
                <span className="animated-text" style={{ animationDelay: '1.5s' }}>a</span>
                <span className="animated-text" style={{ animationDelay: '1.6s' }}>l</span>
                <span className="animated-text" style={{ animationDelay: '1.7s' }}>l</span>
                <span className="animated-text" style={{ animationDelay: '1.8s' }}>e</span>
                <span className="animated-text" style={{ animationDelay: '1.9s' }}>n</span>
                <span className="animated-text" style={{ animationDelay: '2s' }}>g</span>
                <span className="animated-text" style={{ animationDelay: '2.1s' }}>e</span>
                <span className="animated-text" style={{ animationDelay: '2.2s' }}>s</span>
                <span className="animated-text" style={{ animationDelay: '2.3s' }}>&nbsp;</span>

                <span className="animated-text text-primary" style={{ animationDelay: '2.3s' }}> Into </span>
                <br />
                <span className="animated-text text-primary" style={{ animationDelay: '2.4s' }}> Solutions</span>
              </h1>
              <p className="max-w-2xl mb-6 text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                Welcome to our collaborative data science platform,
                where industry challenges meet innovative solutions.
                Unlock the potential of real-world problem-solving
                by connecting with a global community of
                data science developers.
              </p>
              <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                <a href="/auth/signup" className="inline-flex items-center justify-center bg-primary px-5 py-3 mr-3 text-white font-medium text-center text-white-900 border border-primary-300 rounded-lg hover:bg-opacity-90 hover:scale-[1.1]  focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-primary-800">
                  Join Now
                </a>
                <a href="#" className="hover:bg-black hover:text-white inline-flex items-center justify-center bg-white px-5 py-3 text-black font-medium text-center  border border-primary-300 rounded-lg  hover:scale-[1.1] focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-primary-800">
                  Explore
                </a>
              </div>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex hover:scale-[1.2] animate__animated animate__fadeInRight">
              <img src="/src/images/landing/ai3.jpg" alt="mockup" />
            </div>

          </div>
        </section>
      </RevealOnScroll>



      <section className="bg-gray-100 bg-opacity-85 dark:bg-gray-800">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6 ">
          <RevealOnScroll delay=''>
            <h2 className="text-4xl font-extrabold text-black dark:text-white pb-4">Competitions</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-1">
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
    placeholder="Search challengers..."
    className="appearance-none bg-transparent border-none focus:outline-none flex-1 text-gray-700 w-full sm:w-auto"
  />
  <select
   value={selectedRole}
   onChange={(e) => setSelectedRole(e.target.value)}
    className="bg-white border-none rounded-lg p-2 focus:outline-none w-full sm:w-auto"
  >
     <option value="">All challenges</option>
        <option value="OpenedChallenge">open challenges</option>
        <option value="completedChallenge">completed challenges</option>
        <option value="archivedChallenge">Archive challenges</option>
  </select>
</div>

            
              {filteredCards.map((card, index) => (
                <Card
                  key={index}
                  {...card}

                />
              ))}
            </div>

          </RevealOnScroll>
        </div>


      </section>



      <RevealOnScroll delay='400'>
        <Footer />
      </RevealOnScroll>
    </ClientLayout>
  );
};

export default ListChallengerFront;

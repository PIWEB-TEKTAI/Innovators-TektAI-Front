import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Footer from '../landing/footer';
import '@fortawesome/fontawesome-free/css/all.css';
import { faChartLine, faTrophy } from '@fortawesome/free-solid-svg-icons';
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
const Card2: React.FC<CardProps> = ({ title, imageSrc, description }) => {
  return (
    <div className="cursor-pointer  max-w-[30rem] group p-6 bg-white hover:bg-primary hover:bg-opacity-80  hover:text-white border border-gray rounded-lg shadow dark:bg-gray-800 hover:shadow-md transition-transform transform hover:scale-[1.1]">
      <img
        className="h-35 w-full group-hover:text-white rounded mb-2 hover:scale-[1.15]"
        src={imageSrc}
        alt="ai"
        loading="lazy"
      />
      <a href="#" className="text-[#00004b] group-hover:text-white">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white hover:scale-75">
          {title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-500 group-hover:text-black group-hover:font-semibold dark:text-gray-400 hover:scale-105">
        {description}
      </p>
    </div>
  );
};
const Card: React.FC<CardProps> = ({ title, imageSrc, description }) => {
  return (
    <div className="cursor-pointer hover:bg-black hover:bg-opacity-95 hover:text-white group max-w-[32rem] p-6 bg-white border border-gray rounded-lg shadow dark:bg-gray-800 hover:shadow-md transition-transform transform hover:scale-[1.1]">
      <div className="flex">
        <img
          className="flex-none h-14 w-14 mr-2 rounded mb-2 hover:scale-[1.2] "
          src={imageSrc}
          alt="ai"
          loading="lazy"
        />
        <a
          href="#"
          className="text-primary hover:text-primary-dark group-hover:text-white flex-auto"
        >
          <h5 className="mb-2 text-xl w-50 font-semibold tracking-tight text-gray-900  dark:text-white">
            {title}
          </h5>
        </a>
      </div>
      <p className="mb-3 font-normal text-gray-500 group-hover:text-white group-hover:font-semibold dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};
const backwardCards = [
  {
    imageSrc: '/src/images/landing/imdb.jpeg',
    title: 'IMDB Dataset 2023',
    description:
      'Dataset containing information about movies which appears on IMDB website.',
  },
  {
    imageSrc: '/src/images/landing/car.jpg',
    title: 'Car Specification ',
    description:
      'Technical information and appearance information of nearly 30,000 cars from 124 car companies.',
  },
  {
    imageSrc: '/src/images/landing/bitcon.jpeg',
    title: 'Bitcoin Price',
    description:
      'This dataset provides weekly updates on Bitcoin prices along with related information ',
  },
  {
    imageSrc: '/src/images/landing/git.png',
    title: 'Github Social Network',
    description:
      'A large social network of GitHub developers was collected from the public API in June 2019.',
  },
];

interface Challenge {
  _id: string;
  title: string;
  description: string;
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

import ClientLayout from '../../layout/clientLayout';
import { WhyChooseUs } from '../../types/whyChooseUs';
import { challenge } from '../../types/challenge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '../../types/User';
import { Link } from 'react-router-dom';
import { FaLine } from 'react-icons/fa';
import { useAuth } from '../../components/Auth/AuthProvider';
import ChallengeStatistics from '../Challenges/challengesstatics';
const Landing: React.FC = () => {
  const CardCompetition: React.FC<challenge & { onClick: () => void }> = ({
    onClick,
    title,
    image,
    description,
    amount,
    prizes,
    recruitement,
    freelance,
    internship,
    status,
    startDate,
    endDate,
    createdBy,
    targetedSkills,
  }) => {
    const [selectedChallenge, setSelectedChallenge] =
      useState<Challenge | null>(null);

    const handleCardClick = () => {
      const newChallenge: Challenge = {
        _id: 'temp-id', // Remplacez 'temp-id' par un ID approprié ou généré dynamiquement
        onClick: () => {}, // Ajoutez une fonction onClick vide ou définissez-la selon vos besoins
        title,
        image,
        description,
        amount,
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

    const calculateTimeRemaining = (endDate: string) => {
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

      return `${daysRemaining} days  ${hoursRemaining} hours ${minutesRemaining} minutes`;
    };

      // Fonction pour ajouter une ligne vide si le titre n'est pas dans deux lignes
   const addEmptyLineIfNeeded = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + '...'; // Limiter la longueur du titre à maxLength
    }
    return title;
  };


    return (
      <div className="bg-white shadow-lg  rounded-lg p-6 flex flex-col items-start hover:shadow-6 h-full">
        <div className="flex items-center justify-between gap-8 mb-4 ">
          <img
            src={`http://localhost:3000/images/${image}`}
            className="card-img-top mt-3 w-40"
            alt="Card image"
          />

          <div className="flex flex-col items-start mb-4">
            <h3 className="text-xl font-bold text-black dark:text-white capitalize">
              {addEmptyLineIfNeeded(title, 26)}
            </h3>
            <div className="font-medium mt-2">
              {status == 'open' && <p className=" text-red-600">Time Left </p>}
              {status == 'open' ? (
                <span className="text-sm">
                  {calculateTimeRemaining(endDate.toString())}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <hr className="my-2 border-gray-300" />
        <span className="font-semibold">Description </span>

        <p className="text-gray-700 dark:text-gray-300">
          {description.substring(0, 80)}...{' '}
        </p>
        <hr className="my-2 border-gray-300" />

        <div className="flex items-center mt-4 space-x-4 text-gray-700 dark:text-gray-300">
          <FontAwesomeIcon icon={faTrophy} className="text-green-500" />
          <span className="font-semibold">Prize : </span>
          <span className="font-semibold ">
            {amount} {amount && 'DT'}
            {prizes.prizeName && 'Award'}
            {recruitement.positionTitle && 'Job Opportunity'}
            {freelance.projectTitle && 'Freelance Work'}
            {internship.internshipTitle && 'Internship Opportunity'}
          </span>
        </div>

        <div className="flex items-center mt-3 space-x-4 text-gray-700 dark:text-gray-300">
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
      </div>
    );
  };

  const [emailError, setEmailError] = useState('');

  const checkEmail = (value: any) => {
    setEmail(value);
    if (!value.trim()) {
      setEmailError('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  const [cardsData, setCardsData] = useState<Challenge[]>([]);
  let filteredUsers: any[] | ((prevState: Challenge[]) => Challenge[]) = [];

  useEffect(() => {
    fetchData();
    console.log(cardsData);
  }, []);

  const fetchData = () => {
    axios
      .get<Challenge[]>(`http://localhost:3000/challenges/AllChallengeLanding`)
      .then((response) => {
        console.log(response.data);
        filteredUsers = response.data;
        setCardsData(filteredUsers);
        console.log(filteredUsers);
      })
      .catch((err) => console.log(err));
  };

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCardsData, setFilteredCardsData] = useState(cardsData);

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

  const { userAuth } = useAuth();
  useEffect(() => {
    setFilteredCardsData(cardsData);
    fetchChallenges();
  }, [cardsData]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    filterCards(searchTerm);
  };

  const filterCards = (searchTerm: string) => {
    const filteredData = cardsData.filter((card) => {
      return card.title.toLowerCase().includes(searchTerm);
    });
    setFilteredCardsData(filteredData);
  };
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const fetchChallenges = async () => {
    try {
      console.log('Fetching challenges...');
      let url;
      if (userAuth?.role === 'company') {
        url = 'http://localhost:3000/challenges/get';
      } else {
        url = 'http://localhost:3000/submissions/get/all/submission';
      }

      const response = await axios.get<Challenge[]>(url, {
        withCredentials: true,
      });
      console.log('Challenges response:', response);
      setChallenges(response.data.slice(0,3));
      console.log(challenges);
    } catch (error) {
      console.error('Erreur lors de la récupération des défis:', error);
    }
  };

  return (
    <ClientLayout>
      <RevealOnScroll additionalProp={false} delay="">
        <section className="bg-white dark:bg-gray-900">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto lg:ml-8 place-self-center group lg:col-span-7 cursor-pointer">
              {userAuth?.role !== 'challenger' &&
                userAuth?.role !== 'company' && (
                  <>
                    <h1 className="max-w-2xl mb-4 group-hover:scale-[1.05] text-black text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                      <span className="animated-text">T</span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '0.1s' }}
                      >
                        r
                      </span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '0.2s' }}
                      >
                        a
                      </span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '0.3s' }}
                      >
                        n
                      </span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '0.4s' }}
                      >
                        s
                      </span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '0.5s' }}
                      >
                        f
                      </span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '0.6s' }}
                      >
                        o
                      </span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '0.7s' }}
                      >
                        r
                      </span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '0.8s' }}
                      >
                        m
                      </span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '0.9s' }}
                      >
                        i
                      </span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '1s' }}
                      >
                        n
                      </span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '1.1s' }}
                      >
                        g
                      </span>
                      <br />
                      <span
                        className="animated-text"
                        style={{ animationDelay: '1.3s' }}
                      >
                        C
                      </span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '1.4s' }}
                      >
                        h
                      </span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '1.5s' }}
                      >
                        a
                      </span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '1.6s' }}
                      >
                        l
                      </span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '1.7s' }}
                      >
                        l
                      </span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '1.8s' }}
                      >
                        e
                      </span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '1.9s' }}
                      >
                        n
                      </span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '2s' }}
                      >
                        g
                      </span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '2.1s' }}
                      >
                        e
                      </span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '2.2s' }}
                      >
                        s
                      </span>
                      <span
                        className="animated-text"
                        style={{ animationDelay: '2.3s' }}
                      >
                        &nbsp;
                      </span>

                      <span
                        className="animated-text text-primary"
                        style={{ animationDelay: '2.3s' }}
                      >
                        {' '}
                        Into{' '}
                      </span>
                      <br />
                      <span
                        className="animated-text text-primary"
                        style={{ animationDelay: '2.4s' }}
                      >
                        {' '}
                        Solutions
                      </span>
                    </h1>
                    <p className="max-w-2xl mb-6 text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                      Welcome to our collaborative data science platform, where
                      industry challenges meet innovative solutions. Unlock the
                      potential of real-world problem-solving by connecting with
                      a global community of data science developers.
                    </p>
                  </>
                )}
              {userAuth?.role === 'company' && (
                <>
                  <h1 className="max-w-2xl mb-4 group-hover:scale-[1.05] text-black text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                    <span className="animated-text">H</span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '0.1s' }}
                    >
                      o
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '0.2s' }}
                    >
                      s
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '0.3s' }}
                    >
                      t
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '0.4s' }}
                    >
                      &nbsp;
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '0.5s' }}
                    ></span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '0.6s' }}
                    >
                      Y
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '0.7s' }}
                    >
                      o
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '0.8s' }}
                    >
                      u
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '0.9s' }}
                    >
                      r
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '1.0s' }}
                    >
                      &nbsp;
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '1.1s' }}
                    >
                      D
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '1.2s' }}
                    >
                      a
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '1.3s' }}
                    >
                      t
                    </span>

                    <span
                      className="animated-text"
                      style={{ animationDelay: '1.4s' }}
                    >
                      a
                    </span>

                    <span
                      className="animated-text"
                      style={{ animationDelay: '1.5s' }}
                    >
                      &nbsp;
                    </span>
                    <br />
                    <span
                      className="animated-text"
                      style={{ animationDelay: '1.6s' }}
                    >
                      S
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '1.7s' }}
                    >
                      c
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '1.8s' }}
                    >
                      i
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '1.9s' }}
                    >
                      e
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '2s' }}
                    >
                      n
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '2.1s' }}
                    >
                      c
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '2.2s' }}
                    >
                      e
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '2.3s' }}
                    >
                      &nbsp;
                    </span>

                    <span
                      className="animated-text text-primary"
                      style={{ animationDelay: '2.4s' }}
                    >
                      {' '}
                      competitions{' '}
                    </span>
                    <br />
                  </h1>
                  <p className="max-w-2xl mb-6 text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                    Discover the unparalleled opportunity to elevate your brand,
                    engage top talent, and foster innovation by partnering with
                    us to host your own competitions. Start now and unleash the
                    power of competition to drive growth, creativity, and
                    lasting impact{' '}
                  </p>
                </>
              )}

              {userAuth?.role === 'challenger' && (
                <>
                  <h1 className="max-w-2xl mb-4 group-hover:scale-[1.05] text-black text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                    <span className="animated-text">C</span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '0.1s' }}
                    >
                      o
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '0.2s' }}
                    >
                      m
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '0.3s' }}
                    >
                      p
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '0.4s' }}
                    >
                      e
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '0.5s' }}
                    >
                      t
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '0.6s' }}
                    >
                      e
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '0.7s' }}
                    >
                      &nbsp;
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '0.8s' }}
                    >
                      N
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '0.9s' }}
                    >
                      o
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '1.0s' }}
                    >
                      w
                    </span>
                    <br />
                    <span
                      className="animated-text text-primary"
                      style={{ animationDelay: '1.1s' }}
                    >
                      {' '}
                      Claim{' '}
                    </span>
                    <span
                      className="animated-text"
                      style={{ animationDelay: '1.2s' }}
                    >
                      &nbsp;
                    </span>
                    <span
                      className="animated-text text-primary"
                      style={{ animationDelay: '1.3s' }}
                    >
                      {' '}
                      Victory
                    </span>
                  </h1>
                  <p className="max-w-2xl mb-6 text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                    Are you prepared to showcase your exceptional skills, claim
                    victory, and stand out from the crowd? Join us now and
                    embark on a journey to prove your mettle, compete against
                    the best, and emerge triumphant in the pursuit of
                    excellence!{' '}
                  </p>
                </>
              )}

              {userAuth?.role !== 'challenger' &&
                userAuth?.role !== 'company' && (
                  <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                    <a
                      href="/auth/signup"
                      className="inline-flex items-center justify-center bg-primary px-5 py-3 mr-3 text-white font-medium text-center text-white-900 border border-primary-300 rounded-lg hover:bg-opacity-90 hover:scale-[1.1]  focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
                    >
                      Join Now
                    </a>
                    <a
                      href="#"
                      className="hover:bg-black hover:text-white inline-flex items-center justify-center bg-white px-5 py-3 text-black font-medium text-center  border border-primary-300 rounded-lg  hover:scale-[1.1] focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
                    >
                      Explore
                    </a>
                  </div>
                )}
              {userAuth?.role === 'challenger' && (
                <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                  <a
                    href="/LCFront"
                    className="inline-flex items-center justify-center bg-primary px-5 py-3 mr-3 text-white font-medium text-center text-white-900 border border-primary-300 rounded-lg hover:bg-opacity-90 hover:scale-[1.1]  focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
                    style={{ fontSize: '1.6rem' }} // Adjust font size as needed

                >
                    Compete Now
                  </a>
                </div>
              )}
              {userAuth?.role === 'company' && (
                <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                  <a
                    href="/challenge/add"
                    className="inline-flex items-center justify-center bg-primary px-6 py-4 mr-3 text-white font-medium text-center text-white-900 border border-primary-300 rounded-lg hover:bg-opacity-90 hover:scale-[1.1] focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
                    style={{ fontSize: '1.6rem' }} // Adjust font size as needed
                  >
                    Host New Competition
                  </a>
                </div>
              )}
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex hover:scale-[1.2] animate__animated animate__fadeInRight">
              <img src="/src/images/landing/ai3.jpg" alt="mockup" />
            </div>
          </div>
        </section>
      </RevealOnScroll>

      <section className="bg-gray-100 bg-opacity-85 dark:bg-gray-800">
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
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search challenges..."
                className="appearance-none bg-transparent border-none focus:outline-none flex-1 text-gray-700 w-full sm:w-auto"
              />
           
          
               
                  <Link to="/LCFront">
                    <a className="flex items-center text-black dark:text-white hover:bg-gray-300 hover:font-semibold focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-md px-4 lg:px-5 lg:py-2.5 dark:hover:bg-gray-500 focus:outline-none dark:focus:ring-gray-800">
                      <img
                        src="/src/images/landing/arrow.png"
                        alt="arrow"
                        className="mr-2 w-3"
                      />
                      View all
                    </a>
                  </Link>
                </div>
                <br />
            <div className="flex justify-between mb-8">
              <h2 className="text-4xl font-extrabold text-black dark:text-white">
                Browse Competitions
              </h2>
              <div>
            
              </div>
              
            </div>
            
            <p className="max-w-2xl mb-6 text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Build your skills in our competitions, co-hosted by world-class
              research organizations & companies
            </p>

            <div className="grid md:grid-cols-2 gap-8 lg:grid-cols-3 justify-center sm:grid-cols-2">
              {filteredCardsData.map((card, index) => (
                <Link key={index} to={`/challenge/details/${card._id}`}>
                  <CardCompetition key={index} {...card} />
                </Link>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay="">
            <h2 className="text-4xl mt-15 font-extrabold text-black text-opacity-[1.5] dark:text-white py-4 ">
              Datasets
            </h2>
            <div className="grid md:grid-cols-3 gap-2 justify-center lg:grid-cols-4 sm:grid-cols-2">
              {backwardCards.map((card, index) => (
                <Card2 key={index} {...card} />
              ))}
            </div>
          </RevealOnScroll>

          {userAuth?.role === 'company' && (
            <RevealOnScroll delay="">
              <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6 ">
                <div className="flex justify-between mb-8">
                  <h2 className="text-4xl font-extrabold text-black dark:text-white">
                    My Competitions
                  </h2>

                  <div className="flex items-center">
                    <Link to="/competitions">
                      <a className="flex items-center text-black dark:text-white hover:bg-gray-300 hover:font-semibold focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-md px-4 lg:px-5 lg:py-2.5 dark:hover:bg-gray-500 focus:outline-none dark:focus:ring-gray-800">
                        <img
                          src="/src/images/landing/arrow.png"
                          alt="arrow"
                          className="mr-2 w-3"
                        />
                        View all
                      </a>
                    </Link>
                  </div>
                </div>
                <p className="max-w-2xl mb-6 text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                  Build your skills in our competitions, co-hosted by
                  world-class research organizations & companies
                </p>

                <div className="mt-12">
                  <div className="grid md:grid-cols-2 gap-8 lg:grid-cols-3 justify-center sm:grid-cols-2">
                    {challenges.map((challenge, index) => (
                      <Link
                        key={index}
                        to={`/challenge/details/${challenge._id}`}
                      >
                        <CardCompetition key={index} {...challenge} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          )}

          {userAuth?.role === 'challenger' && (
            <RevealOnScroll delay="">
              <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6 ">
                <div className="flex justify-between mb-8">
                  <h2 className="text-4xl font-extrabold text-black dark:text-white">
                    My Competitions
                  </h2>

                  <div className="flex items-center">
                    <Link to="/competitions">
                      <a className="flex items-center text-black dark:text-white hover:bg-gray-300 hover:font-semibold focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-md px-4 lg:px-5 lg:py-2.5 dark:hover:bg-gray-500 focus:outline-none dark:focus:ring-gray-800">
                        <img
                          src="/src/images/landing/arrow.png"
                          alt="arrow"
                          className="mr-2 w-3"
                        />
                        View all
                      </a>
                    </Link>
                  </div>
                </div>
                <p className="max-w-2xl mb-6 text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                  Build your skills in our competitions, co-hosted by
                  world-class research organizations & companies
                </p>

                <div className="mt-12">
                  <div className="grid md:grid-cols-2 gap-8 lg:grid-cols-3 justify-center sm:grid-cols-2">
                    {challenges.map((challenge, index) => (
                      <Link
                        key={index}
                        to={`/challenge/details/${challenge._id}`}
                      >
                        <CardCompetition key={index} {...challenge} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          )}
        </div>
      </section>

      {userAuth?.role === 'challenger' && (
        <section className="bg-white dark:bg-gray-900">
          <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-black dark:text-white">
                Turn Collaboration{' '}
                <span className="text-primary">Into Innovation</span>
              </h2>
              <p className="mt-8 max-w-3xl mx-auto text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                Joining a team or creating your own is your first step towards
                embracing the challenge. As a Challenger, you hold the power to
                assemble a team of like-minded individuals or join an existing
                one.
              </p>
            </div>

            <div className="flex flex-col mt-12 lg:flex-row lg:justify-around cursor-pointer">
              <Link to={'/TeamList'}>
                <div className="card-design rounded-lg p-5 bg-gray-100 flex flex-col items-center mb-8 lg:mb-0">
                  <img
                    src="/src/images/landing/TeamBlue2.png"
                    alt="joinTeam"
                    className="w-20"
                  />
                  <h2 className="mt-4 text-2xl font-semibold text-primary">
                    Join or Create a Team
                  </h2>
                  <p className="mt-2 text-center text-gray-500 lg:mx-auto lg:max-w-sm lg:text-lg dark:text-gray-400">
                    Joining or creating a team is your chance to connect with
                    others and tackle challenges together. Join a team now and
                    start your journey of collaboration and success.
                  </p>
                </div>
              </Link>

              {/* <Link to={'/TeamList'}>
              <div className="card-design p-5 bg-gray-200 flex flex-col items-center cursor-pointer">
                <img
                  src="/src/images/landing/createTeam.png"
                  alt="createTeam"
                  className="w-32"
                />
                <h2 className="mt-4 text-2xl font-semibold text-primary">
                  Create a Team
                </h2>
                <p className="mt-2 text-center text-gray-500 lg:mx-auto lg:max-w-sm lg:text-lg dark:text-gray-400">
                  Creating a team empowers you to shape your own destiny and
                  lead others towards greatness. Create your team now and pave
                  the way for extraordinary accomplishments.
                </p>
              </div>
      </Link>*/}
            </div>
          </div>
        </section>
      )}

      <section
        className={
          userAuth?.role === 'challenger'
            ? 'bg-gray-100 bg-opacity-85 dark:bg-gray-800'
            : 'bg-white bg-opacity-85 dark:bg-gray-800'
        }
      >
        <div className="max-w-screen-xl px-4  py-8 mx-auto lg:py-24 lg:px-6 ">
          <RevealOnScroll delay="">
            <ChallengeStatistics />
          </RevealOnScroll>
        </div>
      </section>

      {userAuth?.role !== 'company' && userAuth?.role !== 'challenger' && (
        <section className="bg-gray-200">
          <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-black dark:text-white">
                Why Choose Us
              </h2>
              <div
                className={`mt-8 grid grid-cols-1 gap-6 md:grid-cols-${Math.min(whyUsContent && whyUsContent.length, 2)} lg:grid-cols-${Math.min(whyUsContent && whyUsContent.length, 4)}`}
              >
                {whyUsContent &&
                  whyUsContent.map((content, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-[1.2] hover:shadow-xl cursor-pointer"
                    >
                      <div className="px-6 py-8">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {content.title}
                        </h3>
                        <p className="text-white">{content.contentwhy}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {userAuth?.role !== 'company' && userAuth?.role !== 'challenger' && (
        <RevealOnScroll additionalProp={false} delay="">
          <section>
            <div
              id="aboutUs"
              className="sm:flex items-center max-w-screen bg-white"
            >
              <div className="sm:w-1/2 p-10">
                <div className="image object-center text-center hover:scale-[1.05]">
                  <img src="https://i.imgur.com/WbQnbas.png" alt="About Us" />
                </div>
              </div>
              <div className="sm:w-1/2 p-5">
                <div className="text group cursor-pointer">
                  <span className="text-gray-500 border-b-2 group-hover:translate-x-6 border-indigo-600 uppercase">
                    About us
                  </span>
                  <h2 className="my-4 font-bold text-3xl  sm:text-4xl group-hover:scale-[1.05]">
                    About <span className="text-indigo-600">TektAI</span>
                  </h2>
                  <p className="text-gray-700  group-hover:scale-[1.05]">
                    {aboutUsContent}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </RevealOnScroll>
      )}

      <RevealOnScroll additionalProp={false} delay="">
        <section
          id="contactUs"
          className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg"
        >
          <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
            <div className="max-w-screen-sm mx-auto bg-white p-7 rounded-lg text-center hover:translate-y-12 hover:translate-x-12">
              <h2 className="mb-4 text-3xl font-extrabold leading-tight text-black tracking-tight text-gray-900 dark:text-white">
                Contact Us
              </h2>
              {successMessage && (
                <p style={{ color: 'green' }}>{successMessage}</p>
              )}
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    value={email}
                    onChange={(e) => checkEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary m-3"
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}

                  <span className="absolute right-4 top-6">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary m-3"
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="text-white bg-primary hover:bg-opacity-90 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll delay="400">
        <Footer />
      </RevealOnScroll>
    </ClientLayout>
  );
};

export default Landing;

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Footer from '../landing/footer';
import '@fortawesome/fontawesome-free/css/all.css';
import { faEuro } from '@fortawesome/free-solid-svg-icons';
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

const Card: React.FC<any & { onClick: () => void }> = ({
  onClick,
  name,
  image,
  invitations,
  members,
}) => {
  const [selectedTeam, setSelectedTeam] = useState<any | null>(null);

  const handleCardClick = () => {
    const newTeam: any = {
      _id: 'temp-id', // Remplacez 'temp-id' par un ID approprié ou généré dynamiquement
      onClick: () => {}, // Ajoutez une fonction onClick vide ou définissez-la selon vos besoins
      name,
    };
    setSelectedTeam(newTeam);
  };
  const handleCloseModal = () => {
    setSelectedTeam(null);
  };

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div
      className="bg-white rounded-lg shadow-lg p-2 flex flex-col items-center h-full "
      onClick={toggleDetails}
    >
      <div className="flex flex-col items-center mb-4">
        <img
          src="src/images/auth/teamUser.jpg"
          className="card-img-top mt-3 w-15"
          alt="Card image"
        />
        <h3 className="text-xl mt-4 font-bold text-black dark:text-white capitalize">
          {name}
        </h3>
      </div>

      {/*<div className="flex flex-col items-start mb-4">
        <span className="text-lg mt-2 font-bold text-black dark:text-white capitalize">
          Members
        </span>
        <div className="flex flex-col">
          {members.map((member: any, index: React.Key | null | undefined) => (
            <div
              key={index}
              className="flex items-center justify-start w-full mt-4"
            >
              <img src={member.imageUrl} alt="member_image" className="w-10" />

              <span className="ml-3 text-lg font-medium capitalize">
                {member.FirstName}
              </span>

              <span className="ml-4 rounded-full bg-green-500 px-2 py-1 text-sm text-center text-white font-medium capitalize">
                Member
              </span>
            </div>
          ))}

          {invitations.map(
            (member: any, index: React.Key | null | undefined) => (
              <div
              key={index}
              className="flex items-center justify-start w-full mt-4"
            >
              <img src={member.imageUrl} alt="member_image" className="w-10" />

              <span className="ml-3 text-lg font-medium capitalize">
                {member.FirstName}
              </span>

              <span className="ml-4 rounded-full bg-orange-500 px-2 py-1 text-sm text-center text-white font-medium capitalize">
                Invitation sent
              </span>
            </div>
            ),
          )}
        </div>
        </div>*/}
    </div>
  );
};

import ClientLayout from '../../layout/clientLayout';

import { Link } from 'react-router-dom';
import { useAuth } from '../../components/Auth/AuthProvider';
import CreateTeamForm from '../Challenges/createTeamForm';
import TeamSelectionModal from '../Challenges/teamSelectionModal';
import CreateTeamModal from './CreateTeamModal';
import { challenge } from '../../types/challenge';
const TeamList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
    // Ajoutez ici la logique de filtrage en fonction du filtre sélectionné
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const [cardsData, setCardsData] = useState<any[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    fetchData();
    console.log(cardsData); // Vérifiez les données après chaque mise à jour
  }, [selectedRole, searchTerm]); // Fetch data again when selectedRole or searchTerm changes

  const fetchData = () => {
    const requestOptions =
      selectedRole === 'MyChallenge' && userAuth?.role === 'company'
        ? { withCredentials: true }
        : {};
    axios
      .get<any[]>('http://localhost:3000/teams/front/all')
      .then((response) => {
        console.log(response.data);
        const filteredUsers = response.data.filter((user) =>
          user.name.toLowerCase().startsWith(searchTerm),
        );
        setCardsData(filteredUsers);
      })
      .catch((err) => console.log(err));
  };
  const filteredCards = cardsData.filter((card) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const [showModalCreateTeam, setshowModalCreateTeam] = useState(false);

  const handleCreateTeamModal = () => {
    setshowModalCreateTeam(true); 
  };
  
  const handleTeamModalClose = () => {
    setshowModalCreateTeam(false);
  };


  const { userAuth } = useAuth();

  return (
    <ClientLayout>
      <RevealOnScroll additionalProp={false} delay="">
        <section className="bg-white dark:bg-gray-900">
          <div className="grid max-w-screen-xl h-80 px-4 py-3 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:grid-cols-12">
            <div className="mr-auto lg:ml-8 place-self-center group lg:col-span-7 cursor-pointer">
              <h1 className="max-w-2xl mb-4 text-black text-3xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-3xl dark:text-white">
                <span
                  className="animated-text"
                  style={{ animationDelay: '0.1s' }}
                >
                  T
                </span>
                <span
                  className="animated-text"
                  style={{ animationDelay: '0.2s' }}
                >
                  e
                </span>
                <span
                  className="animated-text"
                  style={{ animationDelay: '0.3s' }}
                >
                  a
                </span>
                <span
                  className="animated-text"
                  style={{ animationDelay: '0.4s' }}
                >
                  m
                </span>
                <br />
              </h1>
              <p className="max-w-xl mb-6 text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                Grow your data science skills by competing in our exciting
                competitions. Find help in the documentation or learn about
                Community Competitions.
              </p>
              <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                {userAuth?.role == 'challenger' && (
                  <button
                    onClick={handleCreateTeamModal}
                    className="inline-flex items-center justify-center bg-transparent px-5 py-3 mr-3 text-primary font-semibold text-center text-white-900 border border-primary-300 rounded-full hover:bg-opacity-90 hover:shadow-4 hover:bg-primary hover:text-white  focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
                  >
                    Create a Team
                  </button>
                )}

                { showModalCreateTeam && (
                  <CreateTeamModal onClose={handleTeamModalClose}></CreateTeamModal>
                   )
                }
              </div>
            </div>
            <div className="hidden ml-auto lg:col-span-5 lg:flex animate__animated animate__fadeInRight">
              <img
                src="/src/images/landing/team.jpg"
                alt="mockup"
                className="h-60 w-70"
              />
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
                placeholder="Search Teams..."
                className="appearance-none bg-transparent border-none focus:outline-none flex-1 text-gray-700 w-full sm:w-auto p-2"
              />
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

export default TeamList;

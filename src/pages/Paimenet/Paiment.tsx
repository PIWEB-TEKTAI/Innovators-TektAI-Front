import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './formpaiment';
import { useAuth } from '../../components/Auth/AuthProvider';
import ErrorMessageModal from './ErrorMessageModal'; // Importez la nouvelle composante
import ClientLayout from '../../layout/clientLayout';
import Footer from '../landing/footer';
import { BsTypeH6 } from 'react-icons/bs';

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
  skills: string[];
  isExternalUser: boolean;
  company: {
    name: string;
    address: string;
    email: string;
    description: string;
    phone: string;
    professionnalFields: string[];
    websiteUrl: string;
    subscriptionType: string;
  };
  permissions: string[];
  favories: string[];
  isEmailVerified: boolean;
  country: string;
  state: 'validated' | 'not validated' | 'blocked' | 'archive';
  role: 'super admin' | 'admin' | 'challenger' | 'company' | 'archive';
  previousPasswords: string[];
  isDeactivated: boolean;
  wasDeactivated: boolean;
  AlreadyCompany: boolean;
  isDemandingToSwitchAccount: boolean;
  failedLoginAttempts: number;
  lastFailedAttempt: Date | null;
  teamInvitationSent: boolean;
}

interface Pack {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  features: string[];
}

const PaymentPage = () => {
  const stripePromise = loadStripe(
    'pk_test_51PCMzNHTb56tjMDuH9mlRWNgGo94uv9xBBcqLA67OjhwCn1U3GM6D0hF6xBZ1BixF9Trikzz2pwydkpGyugQFymD00UL9exp8n',
  );

  const [premiumPack, setPremiumPack] = useState<Pack | null>(null);
  const [freemiumPack, setFreemiumPack] = useState<Pack | null>(null);
  const [platiniumPack, setPlatiniumPack] = useState<Pack | null>(null);

  const [selectedSubscription, setSelectedSubscription] = useState<{
    type: string;
    price: number;
  }>({
    type: '',
    price: 0,
  });

  const { userAuth } = useAuth(); // Récupérer les informations d'authentification de l'utilisateur connecté
  const [email, setEmail] = useState(''); // Ajout de l'état pour l'adresse e-mail
  const [subscriptionStatus, setSubscriptionStatus] = useState<boolean>(false); // Ajout de l'état pour le statut de l'abonnement

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false); 
  const [isMissingCompanyInfo, setIsMissingCompanyInfo] = useState(false); 


  useEffect(() => {
    if (userAuth && userAuth.email) {
      setEmail(userAuth.email);

      // Vérifier le statut de l'abonnement de l'utilisateur connecté
      axios
        .get(
          `http://localhost:3000/Admin/check-subscription/${userAuth.email}`,
          { withCredentials: true },
        )
        .then((response) => {
          setSubscriptionStatus(response.data.isSubscribed);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la vérification du statut de l'abonnement :",
            error,
          );
        });
    }
  }, [userAuth]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/paiment/packs')
      .then((response) => {
        const { premium, freemium , platinium } = response.data;
        setPremiumPack(premium);
        setFreemiumPack(freemium);
        setPlatiniumPack(platinium);
      })
      .catch((error) => {
        console.error('Error fetching packs:', error);
      });
  }, []);


  const handleSubscriptionSelection = (
    type: string,
    price: number,
    email: string,
  ) => {

    if((type == 'Premium' || type == 'Platinium')){
        setIsMissingCompanyInfo(false);
    }
    if (!userAuth) {
      // Afficher le message d'erreur si l'utilisateur n'est pas connecté
      setIsModalOpen(true);
      setIsError(true);
      return;

    }else if((userAuth?.company.websiteUrl == '' || 
    userAuth?.company.creationDate == '' || 
    userAuth?.company.phone == '' || 
    userAuth?.company.description == '' || 
    userAuth?.company.professionnalFields.length === 0) && 
    (type !== 'Premium' && type !== 'Platinium')){
      setIsModalOpen(true);
      setIsMissingCompanyInfo(true);
      console.log(isMissingCompanyInfo)
      return;
    }else{

    // Vérifier si l'utilisateur a déjà un abonnement
    if (userAuth.company && !userAuth.company.subscriptionType) {
      // Si le champ subscriptionType est vide, mettre à jour le type d'abonnement et fermer le modal
      setSelectedSubscription({ type, price });
      setIsModalOpen(true);
      console.log("Nouveau type d'abonnement sélectionné :", type);
      console.log("Email de l'utilisateur :", email);
    } else {
      // Afficher un message spécifique pour indiquer à l'utilisateur qu'il est déjà abonné
      alert('Vous êtes déjà abonné.');
    }}
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsError(false); // Réinitialiser l'état de l'erreur
  };

  return (
    <ClientLayout>
      <div className="">
        <section className="bg-gray dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                Choose the right plan for your business
              </h2>
              <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                Used by freelancers, startups, companies and enterprise-level
                corporations all over the world.
              </p>
            </div>
            <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
              {freemiumPack && (
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border hover:scale-[1.1] cursor-pointer border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                  <h3 className="mb-4 text-2xl font-semibold">Freemium</h3>
                  <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    {freemiumPack.description}
                  </p>
                  <div className="flex justify-center items-baseline my-8">
                    <span className="mr-2 text-5xl  font-extrabold">{freemiumPack.price} Dt</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      /month
                    </span>
                  </div>
                  <ul role="list" className="mb-8 space-y-4 text-left">
                    {freemiumPack.features.map((feature, index) => (
                      <li className="flex items-center space-x-3" key={index}>

                        {feature === 'Unlimited creation of competitions' ?(
                             <svg
                             className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                             fill="currentColor"
                             viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg"
                           >
                             <path
                               fill-rule="evenodd"
                               d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                               clip-rule="evenodd"
                             ></path>
                           </svg>

                        ): (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"  className="flex-shrink-0 w-5 h-5 text-red-500 dark:text-red-400"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        )}
                        
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() =>
                      handleSubscriptionSelection(
                        'Freemium',
                        freemiumPack.price,
                        email,
                      )
                    }
                    className="text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
                  >
                    Get started
                  </button>
                </div>
              )}


{platiniumPack && (
              <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white hover:scale-[1.1] cursor-pointer rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                <h3 className="mb-4 text-2xl font-semibold">Platinium</h3>
                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                   {platiniumPack.description}
                </p>
                <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">{platiniumPack.price} Dt</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>Unlimited creation of competitions</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>Access to a pool of expert evaluators </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>
                      <span>
                        Access to advanced AI support features integrated into
                        our platform
                      </span>
                    </span>
                  </li>
                </ul>
                <button
                    onClick={() =>
                      handleSubscriptionSelection(
                        'Platinium',
                        platiniumPack.price,
                        email,
                      )
                    }
                    className="text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
                  >
                    Get started
                  </button>
              </div>)}

              {premiumPack && (
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 hover:scale-[1.1] cursor-pointer bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                  <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
                  <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                  {premiumPack.description}
                  </p>
                  <div className="flex justify-center items-baseline my-8">
                    <span className="mr-2 text-5xl font-extrabold">{premiumPack.price} Dt</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      /month
                    </span>
                  </div>
                  <ul role="list" className="mb-8 space-y-4 text-left">
                    {premiumPack.features.map((feature, index) => (
                      <li className="flex items-center space-x-3" key={index}>
                        {feature === 'Maximum of five competitions can be created' ?(
                             <svg
                             className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                             fill="currentColor"
                             viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg"
                           >
                             <path
                               fill-rule="evenodd"
                               d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                               clip-rule="evenodd"
                             ></path>
                           </svg>

                        ): (
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"  className="flex-shrink-0 w-5 h-5 text-red-500 dark:text-red-400"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        )}
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() =>
                      handleSubscriptionSelection(
                        'Premium',
                        premiumPack.price,
                        email,
                      )
                    }
                    className="text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
                  >
                    Get started
                  </button>
                </div>
              )}


            
            </div>
          </div>
        </section>

        <div className="mt-24 container space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
          {isModalOpen && (
            <>
              {isMissingCompanyInfo ? (
                <ErrorMessageModal onClose={closeModal} msg="Please provide all your company information to verify that you are a startup!" />
              ) : (
                <>
                {isError ? (
                  <ErrorMessageModal onClose={closeModal} msg="You should be connected!" />
                ) : (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                      <h1 className="text-3xl font-bold mb-4">Payment Form</h1>
                      <PaymentForm
                        price={selectedSubscription.price}
                        subscriptionType={selectedSubscription.type}
                      />
                      <button
                        onClick={closeModal}
                        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </ClientLayout>
  );
};

export default PaymentPage;

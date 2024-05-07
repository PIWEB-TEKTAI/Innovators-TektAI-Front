import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './formpaiment';
import { useAuth } from '../../components/Auth/AuthProvider';

interface Pack {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  features: string[];
}

const PaymentPage = () => {
  const stripePromise = loadStripe('pk_test_51PCMzNHTb56tjMDuH9mlRWNgGo94uv9xBBcqLA67OjhwCn1U3GM6D0hF6xBZ1BixF9Trikzz2pwydkpGyugQFymD00UL9exp8n');

  const [premiumPack, setPremiumPack] = useState<Pack | null>(null);
  const [freemiumPack, setFreemiumPack] = useState<Pack | null>(null);
  const [selectedSubscription, setSelectedSubscription] = useState<{
    type: string;
    price: number;
  }>({
    type: '',
    price: 0,
  });

  const { userAuth } = useAuth(); // Récupérer les informations d'authentification de l'utilisateur connecté
  const [email, setEmail] = useState(''); // Ajout de l'état pour l'adresse e-mail


  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (userAuth && userAuth.email) {
        setEmail(userAuth.email);
    }
}, [userAuth]);


  useEffect(() => {
    axios.get('http://localhost:3000/paiment/packs')
      .then(response => {
        const { premium, freemium } = response.data;
        setPremiumPack(premium);
        setFreemiumPack(freemium);
      })
      .catch(error => {
        console.error('Error fetching packs:', error);
      });
  }, []);

  const updateSubscriptionType = (type: string, email: string) => {
    axios.put(`http://localhost:3000/update-subscription-type/${email}`, { subscriptionType: type })
      .then(response => {
        console.log('Réponse de mise à jour du type d\'abonnement reçue:', response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du type d\'abonnement:', error);
      });
  };
  
  
  const handleSubscriptionSelection = (type: string, price: number, email: string) => {
    updateSubscriptionType(type, email); // Appeler la fonction pour mettre à jour le type d'abonnement
    setSelectedSubscription({ type, price });
    setIsModalOpen(true);
    console.log('Nouveau type d\'abonnement sélectionné :', type);
    console.log('Email de l\'utilisateur :', email);
  };
  





  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ConnectedClientLayout>

    <div className="">
      <div>
        <h2 className="text-3xl font-bold tracking-wide text-center mt-12 sm:text-5xl text-blue-700">Pricing</h2>
        <p className="max-w-3xl mx-auto mt-4 text-xl text-center ">Get started on our free plan and upgrade when you are ready.</p>
      </div>
      <div className="mt-24 container space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
        {premiumPack && (
          <div className="relative p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col bg-white">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-blue-700">Premium Pack</h3>
              <p className="mt-4 flex items-baseline ">
                <span className="text-5xl font-extrabold tracking-tight text-red-700">{premiumPack.price} DT</span><span className="ml-1 text-xl font-semibold">/month</span>
              </p>
              <p className="mt-6 ">{premiumPack.description}</p>
            </div>
            <h3 className="text-xl font-semibold mb-2">Features:</h3>
                  <ul className="list-disc pl-6">
                    {premiumPack.features.map((feature, index) => (
                      <li key={index} className="text-lg">{feature}</li>
                    ))}
                  </ul>
                  <button onClick={() => handleSubscriptionSelection('Premium', premiumPack.price, email)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Choose Premium</button>
          </div>
        )}
        {freemiumPack && (
          <div className="relative p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col bg-white">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-blue-700">Freemium Pack</h3>
              <p className="mt-4 flex items-baseline ">
                <span className="text-5xl font-extrabold tracking-tight text-red-700">{freemiumPack.price} DT</span><span className="ml-1 text-xl font-semibold">/month</span>
              </p>
              <p className="mt-6 ">{freemiumPack.description}</p>
            </div>
            <h3 className="text-xl font-semibold mb-2">Features:</h3>
                  <ul className="list-disc pl-6">
                    {freemiumPack.features.map((feature, index) => (
                      <li key={index} className="text-lg">{feature}</li>
                    ))}
                  </ul>
                  <button onClick={() => handleSubscriptionSelection('Freemium', freemiumPack.price, email)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Choose Freemium</button>
          </div>
        )}
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
              <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                <h1 className="text-3xl font-bold mb-4">Payment Form</h1>
                <PaymentForm price={selectedSubscription.price} subscriptionType={selectedSubscription.type} />
                <button onClick={closeModal} className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Close</button>
              </div>
            </div>
          )}
      </div>
    </div>
    </ConnectedClientLayout>

  );
};

export default PaymentPage;

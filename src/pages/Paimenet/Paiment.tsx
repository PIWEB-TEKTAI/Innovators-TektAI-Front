import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './formpaiment';

interface Pack {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

const PaymentPage = () => {
  const stripePromise = loadStripe('pk_test_51PCMzNHTb56tjMDuH9mlRWNgGo94uv9xBBcqLA67OjhwCn1U3GM6D0hF6xBZ1BixF9Trikzz2pwydkpGyugQFymD00UL9exp8n');

  const [selectedPackId, setSelectedPackId] = useState<string>('');

  const [premiumPack, setPremiumPack] = useState<Pack | null>(null);
  const [freemiumPack, setFreemiumPack] = useState<Pack | null>(null);
  const [selectedSubscription, setSelectedSubscription] = useState<{
    type: string;
    price: number;
  }>({
    type: '',
    price: 0,
  });

  // Etat pour contrôler l'ouverture de la modal
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSubscriptionSelection = (type: string, price: number) => {
    setSelectedSubscription({ type, price });
    setIsModalOpen(true); // Ouvrir la modal lorsque l'utilisateur sélectionne un abonnement
  };

  const closeModal = () => {
    setIsModalOpen(false); // Fermer la modal
  };

  return (
    <ConnectedClientLayout>
    <div className="flex justify-center">
      <div className="w-full lg:w-3/4 px-4 py-8"> {/* Augmentation de la largeur de la carte */}
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">Choose Your Subscription Plan</h1> {/* Augmentation de la taille du titre et utilisation de la couleur bleue */}
        <div className="flex flex-wrap justify-between"> {/* Utilisation de flex-wrap pour une disposition responsive */}
          {premiumPack && (
            <div className="w-full md:w-1/2 lg:w-1/3 mb-8"> {/* Utilisation de différentes largeurs pour différents écrans */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img src={premiumPack.image} alt={premiumPack.name} className="w-full h-64 object-cover rounded-t-lg mb-4" /> {/* Utilisation de Tailwind pour rendre l'image plus grande */}
                <h2 className="text-2xl font-semibold mb-4 text-blue-700">{premiumPack.name}</h2> {/* Utilisation de la couleur bleue */}
                <p className="text-lg mb-4">{premiumPack.description}</p>
                <p className="text-lg mb-4">Price: <span className="text-red-700 font-bold">{premiumPack.price} DT</span></p> {/* Utilisation de la couleur rouge et du gras pour le prix */}
                <button onClick={() => handleSubscriptionSelection('Premium', premiumPack.price)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Choose Premium</button>
              </div>
            </div>
          )}
          {freemiumPack && (
            <div className="w-full md:w-1/2 lg:w-1/3 mb-8"> {/* Utilisation de différentes largeurs pour différents écrans */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img src={freemiumPack.image} alt={freemiumPack.name} className="w-full h-64 object-cover rounded-t-lg mb-4" /> {/* Utilisation de Tailwind pour rendre l'image plus grande */}
                <h2 className="text-2xl font-semibold mb-4 text-blue-700">{freemiumPack.name}</h2> {/* Utilisation de la couleur bleue */}
                <p className="text-lg mb-4">{freemiumPack.description}</p>
                <p className="text-lg mb-4">Price: <span className="text-red-700 font-bold">{freemiumPack.price} DT</span></p> {/* Utilisation de la couleur rouge et du gras pour le prix */}
                <button onClick={() => handleSubscriptionSelection('Freemium', freemiumPack.price)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Choose Freemium</button>
              </div>
            </div>
          )}
        </div>
        {/* Conditionnellement afficher la modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-white p-8 rounded-lg w-full max-w-lg">
              <h1 className="text-3xl font-bold mb-4">Payment Form</h1>
              <PaymentForm price={selectedSubscription.price} />
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

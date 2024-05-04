import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import PaymentForm from './formpaiment'; 

interface Pack {
  _id: string; 
  name: string;
  description: string;
  price: number;
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
  };

  const proceedToPayment = async () => {
    if (selectedSubscription.type && selectedSubscription.price > 0) {
      // Récupérer le stripe instance depuis la promesse
      const stripe = await stripePromise;

      // Créer une session de checkout avec le prix du pack sélectionné
      const response = await axios.post('http://localhost:3000/paiment/checkout-session', {
        price: selectedSubscription.price,
        type: selectedSubscription.type,
      });

      // Rediriger vers la page de paiement Stripe
      if (response.data.sessionId) {
        const result = await stripe?.redirectToCheckout({
          sessionId: response.data.sessionId,
        });

        if (result?.error) {
          console.error('Erreur lors de la redirection vers la page de paiement:', result.error.message);
        }
      } else {
        console.error('Session ID non disponible dans la réponse du serveur.');
      }
    } else {
      alert('Veuillez sélectionner un abonnement avant de procéder au paiement');
    }
  };

  return (
    <ConnectedClientLayout>
      <div className="flex justify-center">
        <div className="w-full lg:w-1/2 px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Choose Your Subscription Type</h1>
          <div className="flex justify-between mb-4">
            {premiumPack && (
              <div className="flex-1 mx-2 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">{premiumPack.name}</h2>
                <p>{premiumPack.description}</p>
                <p>Price: {premiumPack.price}</p>
                <button onClick={() => handleSubscriptionSelection('Premium', premiumPack.price)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Choose Premium</button>
              </div>
            )}
            {freemiumPack && (
              <div className="flex-1 mx-2 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">{freemiumPack.name}</h2>
                <p>{freemiumPack.description}</p>
                <p>Price: {freemiumPack.price}</p>
                <button onClick={() => handleSubscriptionSelection('Freemium', freemiumPack.price)} className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Choose Freemium</button>
              </div>
            )}
          </div>
          <div className="text-center mt-8">
            <h1 className="text-3xl font-bold mb-4">Test Payment</h1>
            <PaymentForm price={selectedSubscription.price} />
          </div>
        </div>
      </div>
    </ConnectedClientLayout>
  );
};

export default PaymentPage;

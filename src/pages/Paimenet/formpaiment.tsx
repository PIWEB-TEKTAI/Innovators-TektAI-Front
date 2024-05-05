import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

import { useAuth } from '../../components/Auth/AuthProvider'; // Importer useAuth

interface PaymentFormProps {
    price: number; // Ajoutez le type de la propriété price
}

function PaymentForm({ price }: PaymentFormProps) { // Ajoutez les props comme arguments de la fonction
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false); // Ajout de l'état pour gérer le succès du paiement
    const [email, setEmail] = useState(''); // Ajout de l'état pour l'adresse e-mail
    const stripe = useStripe();
    const elements = useElements();
    const { userAuth } = useAuth(); // Récupérer les informations d'authentification de l'utilisateur connecté

    // Utiliser l'e-mail de l'utilisateur connecté comme valeur par défaut pour l'état email
    useEffect(() => {
        if (userAuth && userAuth.email) {
            setEmail(userAuth.email);
        }
    }, [userAuth]);

    const handlePayment = async () => {
        setLoading(true);

        if (!stripe || !elements) {
            console.error('Stripe.js n\'a pas encore été chargé. Assurez-vous de l\'initialiser correctement dans votre application.');
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            console.error('Le composant CardElement n\'a pas été correctement monté dans le DOM.');
            setLoading(false);
            return;
        }

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                console.error('Erreur lors de la création de la méthode de paiement:', error);
            } else {
                // Envoi des données de paiement au backend
                const response = await axios.post('http://localhost:3000/paiment/create-subscription', {
                    paymentMethodId: paymentMethod.id,
                    planId: 'price_1PCj4LHTb56tjMDu8rWQaMWp', // Remplacez par l'ID de votre plan Stripe
                    email: email, // Utilisation de l'e-mail de l'utilisateur connecté
                });
                console.log('Réponse du backend:', response.data);
                setPaymentSuccess(true); // Mettre à jour l'état pour indiquer le succès du paiement
            }
        } catch (error) {
            console.error('Erreur lors de la création de l\'abonnement:', error);
        }

        setLoading(false);
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        await handlePayment();
    };

    return (
        <div>
            {paymentSuccess ? (
                <p>Votre paiement a été effectué avec succès.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    {/* Le champ email est désactivé car il est rempli automatiquement avec l'e-mail de l'utilisateur connecté */}
                    <input
                        type="email"
                        placeholder="Adresse e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        disabled
                    />
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <button type="submit" disabled={!stripe || loading} className="block w-full p-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md focus:outline-none focus:bg-blue-600">
                        {loading ? 'Chargement...' : 'Payer'}
                    </button>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                </form>
            )}
        </div>
    );
}

export default PaymentForm;

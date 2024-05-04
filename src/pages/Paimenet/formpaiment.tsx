import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

interface PaymentFormProps {
    price: number; // Ajoutez le type de la propriété price
}

function PaymentForm({ price }: PaymentFormProps) { // Ajoutez les props comme arguments de la fonction
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

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
                    email: 'fatma.abid@esprit.tn', // Remplacez par l'email de l'utilisateur
                });
                console.log('Réponse du backend:', response.data);
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
        <form onSubmit={handleSubmit}>
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
            <button type="submit" disabled={!stripe || loading}>
                {loading ? 'Chargement...' : 'Payer'}
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
}

export default PaymentForm;

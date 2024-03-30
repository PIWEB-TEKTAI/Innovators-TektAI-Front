import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../landing/footer';
import '@fortawesome/fontawesome-free/css/all.css';
import './comp.css'; // Import du fichier CSS

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faPlayCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';


import ClientLayout from '../../layout/clientLayout';

interface Challenge {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  status: string;
  startDate: string;
  endDate: string;
  createdBy: string;
  targetedSkills: string[];
  dataset: {
    name: string;
    description: string;
    fileUrl: string;
  }[];
}

const Competitions: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all'); // État pour le statut sélectionné

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        console.log("Fetching challenges...");
        const response = await axios.get<Challenge[]>('http://localhost:3000/challenge/challenges', { withCredentials: true });
        console.log("Challenges response:", response);
        setChallenges(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des défis:', error);
      }
    };
  
    fetchChallenges();
  }, []);

  // Fonction pour calculer le temps restant jusqu'à la fin du défi
  const calculateTimeRemaining = (endDate: string) => {
    const endDateTime = new Date(endDate).getTime();
    const currentTime = new Date().getTime();
    const timeRemaining = endDateTime - currentTime;

    const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

    return `${daysRemaining} jours, ${hoursRemaining} heures, ${minutesRemaining} minutes`;
  };

  // Fonction pour ajouter une ligne vide si le titre n'est pas dans deux lignes
  const addEmptyLineIfNeeded = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + '...'; // Limiter la longueur du titre à maxLength
    }
    return title;
  };

  // Fonction pour limiter la description à deux lignes
  const limitDescriptionLength = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + '...';
    }
    return description;
  };

  // Filtrer les challenges en fonction du statut sélectionné
  const filteredChallenges = selectedStatus === 'all' ? challenges : challenges.filter(challenge => challenge.status === selectedStatus);

  // Fonction pour mettre à jour le statut sélectionné
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const handleArchive = async (challengeId: string) => {
    try {
      console.log("Sending PUT request to update challenge status to 'archived' for challenge ID:", challengeId);
  
      // Send a PUT request to update the challenge status to 'archived'
      await axios.put(`http://localhost:3000/challenge/archived/${challengeId}/update-status`, { status: 'archived' }, { withCredentials: true });
      
      console.log("PUT request successful for challenge ID:", challengeId);
  
      // Update the challenges state after archiving
      const updatedChallenges = challenges.map(challenge => {
        if (challenge._id === challengeId) {
          return { ...challenge, status: 'archived' };
        }
        return challenge;
      });
  
      console.log("Updated challenges after archiving:", updatedChallenges);
  
      setChallenges(updatedChallenges);
    } catch (error) {
      console.error('Error archiving challenge:', error);
    }
  };
  
  const handleOpen = async (challengeId: string) => {
    try {
      console.log("Sending PUT request to update challenge status to 'open' for challenge ID:", challengeId);
  
      await axios.put(`http://localhost:3000/challenge/open/${challengeId}/update-status`, { status: 'open' }, { withCredentials: true });
  
      console.log("PUT request successful for challenge ID:", challengeId);
  
      const updatedChallenges = challenges.map(challenge => {
        if (challenge._id === challengeId) {
          return { ...challenge, status: 'open' };
        }
        return challenge;
      });
  
      console.log("Updated challenges after opening:", updatedChallenges);
  
      setChallenges(updatedChallenges);
    } catch (error) {
      console.error('Error opening challenge:', error);
    }
  };
  


  const handlecompleted = async (challengeId: string) => {
    try {
  
      await axios.put(`http://localhost:3000/challenge/completed/${challengeId}/update-status`, { status: 'completed' }, { withCredentials: true });
  
      console.log("PUT request successful for challenge ID:", challengeId);
  
      const updatedChallenges = challenges.map(challenge => {
        if (challenge._id === challengeId) {
          return { ...challenge, status: 'completed' };
        }
        return challenge;
      });
  
  
      setChallenges(updatedChallenges);
    } catch (error) {
      console.error('Error completed challenge:', error);
    }
  };
  


  return (
    <ClientLayout>
      <div className="container">
        <h2 className="text-4xl font-extrabold text-black dark:text-white pb-4 text-center">Competitions</h2>
        {/* Liste déroulante pour sélectionner le statut */}
        <div className="row">
          <div className="col-md-6 offset-md-6 text-end">
            <div className="status-dropdown">
              <label htmlFor="status-select">Filtrer par statut : </label>
              <select id="status-select" value={selectedStatus} onChange={handleStatusChange} className="form-select">
                <option value="all">Tous</option>
                <option value="open">Ouvert</option>
                <option value="completed">Terminé</option>
                <option value="archived">Archivé</option>
              </select>
            </div>
          </div>
        </div>
        {/* Affichage des challenges filtrés */}
        <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
  {filteredChallenges.map(challenge => (
    <div className="col" key={challenge._id}>
      <div className="card h-100 card-hover">
        <div className="status-and-actions-container">
          <div className={`status inline-flex rounded-full py-1 px-3 text-sm font-medium ${
            challenge.status === 'completed' ? 'bg-green-400 text-white font-semibold' :
            challenge.status === 'archived' ? 'bg-black text-white font-semibold' :
            challenge.status === 'open' ? 'bg-blue-400 text-white font-semibold' :
            'bg-red-400 text-white font-semibold'
          }`}>
            {challenge.status}
          </div>
          <div className="button-container">
            <button className="open-button" onClick={() => handleOpen(challenge._id)}><FontAwesomeIcon icon={faPlayCircle} /></button>
            <button className="completed-button" onClick={() => handlecompleted(challenge._id)}><FontAwesomeIcon icon={faCheckCircle} /></button>
            <button className="archive-button" onClick={() => handleArchive(challenge._id)}><FontAwesomeIcon icon={faArchive} /></button>

          </div>
        </div>
        <img src={challenge.image} className="card-img-top" alt="Card image" />
        <div className="card-body">
          <h5 className={`card-title ${addEmptyLineIfNeeded(challenge.title, 24).length < 24 ? 'one-line-title' : ''}`} title={challenge.title}>{addEmptyLineIfNeeded(challenge.title, 40)}</h5>
          <p className="card-text two-lines-description">
            {(limitDescriptionLength(challenge.description, 100))}
          </p>
        </div>
        <div className="card-footer">
          <div className="price"><strong>{challenge.price} DT</strong></div>
          <div className="date">
            {calculateTimeRemaining(challenge.endDate)}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
      </div>
      <Footer />
    </ClientLayout>
  );  
  
   
};

export default Competitions;

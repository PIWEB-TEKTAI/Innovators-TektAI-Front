import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

interface Stats {
  challengerCount: number;
  companyCount: number;
  adminCount: number;
}

const roles = ['challenger', 'company', 'admin']; // Array of roles to fetch data for

const StatsBarChart = () => {
  // État initial avec les valeurs par défaut pour tous les rôles
  const [stats, setStats] = useState<Stats>({
    challengerCount: 0,
    companyCount: 0,
    adminCount: 0,
  });

  useEffect(() => {
    fetchData(); // Récupérer les données pour tous les rôles au montage du composant
  }, []); // Tableau de dépendances vide pour s'exécuter une seule fois au montage

  const fetchData = async () => {
    try {
      const allStatsData: Stats = {}; // Objet pour stocker les données pour tous les rôles

      for (const role of roles) {
        const apiUrl = `http://localhost:3000/Admin/stats/${role}`;
        const response = await axios.get(apiUrl);

        if (response.status === 200) {
          allStatsData[role + 'Count'] = response.data.count; // Mettre à jour les données en fonction du rôle
        } else {
          console.error(`Erreur lors de la récupération des statistiques pour '${role}' :`, response.statusText);
        }
      }

      setStats(allStatsData); // Mettre à jour l'état avec les données combinées
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques :', error);
    }
  };

  return (
    <div>
      <h2 style={{ color: 'blue', textAlign: 'center', fontWeight: 'bold' }}>Statistiques</h2>
      {stats && (
        <Bar
          data={{
            labels: ['Challenger', 'Company', 'Admin'],
            datasets: [
              {
                label: 'Nombre dutilisateurs',
                backgroundColor: [
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(255, 206, 86, 0.5)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
                // Accéder aux données en fonction des propriétés de comptage des rôles
                data: [stats.challengerCount, stats.companyCount, stats.adminCount],
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default StatsBarChart;

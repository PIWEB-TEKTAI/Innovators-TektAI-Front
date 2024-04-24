// PreferencesPage.tsx

import React, { useState } from 'react';
import ClientLayout from '../../layout/clientLayout';
import './PreferencesPage.css'; // Importation des styles CSS
import DarkModeSwitcher from '../Header/DarkModeSwitcher'; // Importation du composant DarkModeSwitcher

const PreferencesPage: React.FC = () => {
  // Exemple de valeurs initiales pour les paramètres du compte
  const [theme, setTheme] = useState<string>('light');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState<boolean>(false);
  const [fontSizeMode, setFontOfSize] = useState<string>('medium');

  // Fonction pour changer le thème
  const changeTheme = (selectedTheme: string) => {
    setTheme(selectedTheme);
  };

  // Fonction pour basculer l'affichage des paramètres avancés
  const toggleAdvancedSettings = () => {
    setShowAdvancedSettings(prevState => !prevState);
  };

  // Fonction pour changer la taille de la police
  const changeFontSizeMode = (selectedSize: string) => {
    setFontOfSize(selectedSize);
  };

  return (
    <div className="preferences-container">
      <ClientLayout>
        <h1>Apparence</h1>
        <table>
          <tbody>
            <tr>
              <td>Thème :</td>
              <td>
                <select value={theme} onChange={(e) => changeTheme(e.target.value)}>
                  <option value="light">Clair</option>
                  <option value="dark">Sombre</option>
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <button className="show-advanced-settings-btn" onClick={toggleAdvancedSettings}>
                  {showAdvancedSettings ? 'Masquer les paramètres avancés' : 'Afficher les paramètres avancés'}
                </button>
              </td>
            </tr>
            {showAdvancedSettings && (
              <>
                <tr>
                  <td colSpan={2}>Appareil</td>
                </tr>
                <tr>
                  <td>Afficher le bouton Accueil</td>
                  <td>Désactivé</td>
                </tr>
                <tr>
                  <td>Afficher la barre de favoris</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Fiche d'aperçu du survol de l'onglet</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Afficher les aperçus des onglets</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Afficher l'utilisation de la mémoire par les onglets</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Panneau latéral</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Taille de police</td>
                  <td>
                    <select value={fontSizeMode} onChange={(e) => changeFontSizeMode(e.target.value)}>
                      <option value="small">Petite</option>
                      <option value="medium">Moyenne (recommandé)</option>
                      <option value="large">Grande</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Zoom de la page</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Accessibilité</td>
                  <td></td>
                </tr>
              </>
            )}
            <tr>
              <td>Mode :</td>
              <td>
                {/* Intégration du composant DarkModeSwitcher */}
                <DarkModeSwitcher />
              </td>
            </tr>
          </tbody>
        </table>
      </ClientLayout>
    </div>
  );
};

export default PreferencesPage;

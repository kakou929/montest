import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Accueil from './Accueil';
import Dashboard from './Dashboard';
import EntrainementCode from './EntrainementCode';
import Quiz from './Quiz';
import QuizResult from './QuizResult';
import PanneauxSignalisation from './PanneauxSignalisation';
import QuestionsLogiques from './QuestionsLogiques';
import PremiumWave from './PremiumWave';
import ReservationConduite from './ReservationConduite';
import CharteMoniteurEleve from './CharteMoniteurEleve';
import PlanApprentissage1Mois from './PlanApprentissage1Mois';
import MessagerieMoniteur from './MessagerieMoniteur';
import EspaceResultats from './EspaceResultats';
import Inscription from './Inscription';
import AdminInterface from './AdminInterface';
import SimulateurDegagements from './SimulateurDegagements';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Page d'accueil */}
          <Route path="/" element={<Accueil />} />
          
          {/* Dashboard - Mes cours */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Inscription */}
          <Route path="/inscription" element={<Inscription />} />
          
          {/* Interface Admin */}
          <Route path="/admin" element={<AdminInterface />} />
          
          {/* Entraînement au code */}
          <Route path="/entrainement-code" element={<EntrainementCode />} />
          
          {/* Quiz */}
          <Route path="/quiz/:quizId" element={<Quiz />} />
          
          {/* Résultats du quiz */}
          <Route path="/quiz-result/:quizId/:score" element={<QuizResult />} />
          
          {/* Panneaux de signalisation */}
          <Route path="/panneaux-signalisation" element={<PanneauxSignalisation />} />
          
          {/* Questions logiques */}
          <Route path="/questions-logiques" element={<QuestionsLogiques />} />
          
          {/* Premium Wave - Inscription et paiement */}
          <Route path="/premium-wave" element={<PremiumWave />} />
          
          {/* Réservation de conduite */}
          <Route path="/reservation-conduite" element={<ReservationConduite />} />
          
          {/* Charte Moniteur/Élève */}
          <Route path="/charte-moniteur-eleve" element={<CharteMoniteurEleve />} />
          
          {/* Plan d'apprentissage 1 mois */}
          <Route path="/plan-apprentissage-1-mois" element={<PlanApprentissage1Mois />} />
          
          {/* Messagerie Moniteur ↔ Élève */}
          <Route path="/messagerie-moniteur" element={<MessagerieMoniteur />} />
          
          {/* Espace Résultats */}
          <Route path="/espace-resultats" element={<EspaceResultats />} />
          
          {/* Simulateur de 5 dégagements */}
          <Route path="/simulateur-degagements" element={<SimulateurDegagements />} />
          
          {/* Route 404 - Rediriger vers l'accueil */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

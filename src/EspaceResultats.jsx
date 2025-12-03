import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Trophy, TrendingUp, Calendar, User } from 'lucide-react';

const EspaceResultats = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    quizRealises: 0,
    noteMoyenne: 0,
    heuresFormation: 0,
    tauxReussite: 0
  });
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [userPhone, setUserPhone] = useState('');

  useEffect(() => {
    // Charger les données de l'élève
    const savedStats = localStorage.getItem('userStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }

    const savedQuizzes = localStorage.getItem('completedQuizzes');
    if (savedQuizzes) {
      setCompletedQuizzes(JSON.parse(savedQuizzes));
    }

    const phone = localStorage.getItem('userPhone') || 'Non renseigné';
    setUserPhone(phone);
  }, []);

  const handleDownloadPDF = () => {
    // Préparer les données pour le PDF
    const data = {
      eleve: {
        telephone: userPhone,
        dateInscription: localStorage.getItem('premiumStartDate') || new Date().toISOString()
      },
      statistiques: stats,
      quizRealises: completedQuizzes.map(q => ({
        serie: q.quizId,
        score: q.score,
        date: new Date(q.date).toLocaleDateString('fr-FR')
      }))
    };

    // Créer un texte formaté
    const textContent = `
===========================================
    MONDIALE AUTO-ÉCOLE
    RELEVÉ DE NOTES DE L'ÉLÈVE
===========================================

Téléphone : ${data.eleve.telephone}
Date d'inscription : ${new Date(data.eleve.dateInscription).toLocaleDateString('fr-FR')}
Date d'édition : ${new Date().toLocaleDateString('fr-FR')}

-------------------------------------------
STATISTIQUES GÉNÉRALES
-------------------------------------------
Quiz réalisés : ${data.statistiques.quizRealises}
Note moyenne : ${data.statistiques.noteMoyenne}/40
Heures de formation : ${data.statistiques.heuresFormation}h
Taux de réussite : ${data.statistiques.tauxReussite}%

-------------------------------------------
DÉTAIL DES QUIZ RÉALISÉS
-------------------------------------------
${data.quizRealises.map((q, i) => `${i + 1}. Série ${q.serie} - ${q.score}/40 - ${q.date}`).join('\n')}

-------------------------------------------
APPRÉCIATION
-------------------------------------------
${getAppreciation(data.statistiques.noteMoyenne)}

===========================================
Document généré par Mondiale Auto-École
Tél : 0788005332
===========================================
    `.trim();

    // Créer et télécharger le fichier
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Resultats_${userPhone}_${new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Téléchargement lancé ! Le fichier contient tous les résultats de l\'élève.');
  };

  const getAppreciation = (moyenne) => {
    if (moyenne >= 38) return "Excellent niveau ! L'élève est prêt pour l'examen officiel.";
    if (moyenne >= 35) return "Très bon niveau. L'élève peut se présenter à l'examen.";
    if (moyenne >= 30) return "Bon niveau. Quelques révisions supplémentaires sont recommandées.";
    if (moyenne >= 25) return "Niveau correct mais nécessite plus de pratique.";
    return "L'élève doit poursuivre son apprentissage avant de se présenter à l'examen.";
  };

  const getStatutClass = (moyenne) => {
    if (moyenne >= 35) return 'bg-green-100 text-green-800 border-green-300';
    if (moyenne >= 30) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-orange-100 text-orange-800 border-orange-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold mb-2">Espace Résultats</h1>
              <p className="text-purple-100">Téléchargez votre relevé de notes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Info élève */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Informations Élève</h2>
              <p className="text-gray-600">Téléphone : {userPhone}</p>
            </div>
          </div>

          {/* Statut */}
          <div className={`border-2 rounded-lg p-4 ${getStatutClass(stats.noteMoyenne)}`}>
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5" />
              <span className="font-bold">Statut :</span>
            </div>
            <p className="text-sm">{getAppreciation(stats.noteMoyenne)}</p>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{stats.quizRealises}</div>
            <div className="text-sm text-gray-600">Quiz réalisés</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{stats.noteMoyenne}/40</div>
            <div className="text-sm text-gray-600">Note moyenne</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{stats.heuresFormation}h</div>
            <div className="text-sm text-gray-600">Heures de formation</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">{stats.tauxReussite}%</div>
            <div className="text-sm text-gray-600">Taux de réussite</div>
          </div>
        </div>

        {/* Liste des quiz */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Détail des Quiz Réalisés</h2>
          
          {completedQuizzes.length > 0 ? (
            <div className="space-y-3">
              {completedQuizzes.map((quiz, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600">
                      {quiz.quizId}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Série {quiz.quizId}</div>
                      <div className="text-sm text-gray-600">
                        {new Date(quiz.date).toLocaleDateString('fr-FR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${quiz.score >= 35 ? 'text-green-600' : quiz.score >= 30 ? 'text-yellow-600' : 'text-orange-600'}`}>
                    {quiz.score}/40
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Aucun quiz réalisé pour le moment</p>
            </div>
          )}
        </div>

        {/* Bouton de téléchargement */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-8 text-white text-center">
          <Download className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Télécharger le Relevé de Notes</h3>
          <p className="mb-6 text-purple-100">
            Ce document contient toutes les statistiques et résultats de l'élève.
            Il peut être envoyé à l'école ou utilisé pour suivre la progression.
          </p>
          <button
            onClick={handleDownloadPDF}
            disabled={completedQuizzes.length === 0}
            className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
          >
            <Download className="w-6 h-6" />
            Télécharger le Relevé (TXT)
          </button>
          
          {completedQuizzes.length === 0 && (
            <p className="mt-4 text-sm text-purple-200">
              Faites au moins un quiz pour pouvoir télécharger votre relevé
            </p>
          )}
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-blue-900 mb-2">ℹ️ À propos de ce relevé</h3>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>• Le relevé contient toutes vos statistiques à jour</li>
            <li>• Il peut être envoyé par email à l'école</li>
            <li>• Le fichier est au format texte (.txt) facilement lisible</li>
            <li>• Les données sont automatiquement mises à jour après chaque quiz</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EspaceResultats;

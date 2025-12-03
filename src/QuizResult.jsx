import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy, Home, RotateCcw, TrendingUp, Award, Star } from 'lucide-react';

const QuizResult = () => {
  const { quizId, score } = useParams();
  const navigate = useNavigate();
  const scoreNum = parseInt(score);
  const passed = scoreNum >= 35;

  const getPerformanceLevel = (score) => {
    if (score >= 38) return { label: 'Excellent', couleur: 'from-green-500 to-green-600', message: 'Félicitations ! Vous maîtrisez parfaitement le code.' };
    if (score >= 35) return { label: 'Très bien', couleur: 'from-blue-500 to-blue-600', message: 'Bravo ! Vous êtes prêt pour l\'examen.' };
    if (score >= 30) return { label: 'Bien', couleur: 'from-yellow-500 to-yellow-600', message: 'Bon travail ! Continuez à vous entraîner.' };
    if (score >= 25) return { label: 'Moyen', couleur: 'from-orange-500 to-orange-600', message: 'Poursuivez vos efforts, vous progressez !' };
    return { label: 'À améliorer', couleur: 'from-red-500 to-red-600', message: 'Reprenez les bases et réessayez.' };
  };

  const performance = getPerformanceLevel(scoreNum);
  const percentage = (scoreNum / 40) * 100;

  const conseils = passed ? [
    "Continuez à pratiquer pour maintenir votre niveau",
    "Essayez les questions logiques pour progresser encore",
    "Révisez régulièrement les panneaux de signalisation",
    "Vous êtes prêt pour passer à la série suivante"
  ] : [
    "Identifiez vos points faibles et travaillez-les",
    "Relisez attentivement les explications des mauvaises réponses",
    "Prenez votre temps pour bien comprendre chaque question",
    "Refaites cette série jusqu'à obtenir au moins 35/40"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header avec gradient selon résultat */}
      <div className={`bg-gradient-to-r ${performance.couleur} text-white`}>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              {passed ? (
                <Trophy className="w-16 h-16" />
              ) : (
                <Award className="w-16 h-16" />
              )}
            </div>
            <h1 className="text-4xl font-bold mb-2">
              {passed ? 'Félicitations !' : 'Série Terminée'}
            </h1>
            <p className="text-xl opacity-90">Série {quizId} - {performance.label}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Score principal */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8 text-center">
          <div className="mb-6">
            <div className="text-7xl font-bold text-gray-800 mb-2">{scoreNum}/40</div>
            <div className="text-2xl text-gray-600 mb-4">{percentage.toFixed(0)}% de réussite</div>
            
            {/* Barre de progression */}
            <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${performance.couleur} transition-all duration-1000`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <div className={`inline-block px-6 py-3 bg-gradient-to-r ${performance.couleur} text-white rounded-full font-bold text-lg mb-4`}>
            {performance.label}
          </div>

          <p className="text-gray-600 text-lg">{performance.message}</p>
        </div>

        {/* Statistiques détaillées */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-800 mb-1">{scoreNum}</div>
            <div className="text-sm text-gray-600">Bonnes réponses</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Award className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-800 mb-1">{40 - scoreNum}</div>
            <div className="text-sm text-gray-600">Erreurs</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-800 mb-1">{percentage.toFixed(0)}%</div>
            <div className="text-sm text-gray-600">Taux de réussite</div>
          </div>
        </div>

        {/* Message de réussite/échec */}
        {passed ? (
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-bold text-green-900 mb-2">🎉 Série réussie !</h3>
            <p className="text-green-800">
              Vous avez obtenu au moins 35 bonnes réponses. Vous êtes sur la bonne voie pour réussir l'examen du code de la route !
            </p>
          </div>
        ) : (
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-bold text-orange-900 mb-2">⚠️ Continuez vos efforts</h3>
            <p className="text-orange-800">
              Il vous faut au moins 35 bonnes réponses pour valider une série. Analysez vos erreurs et réessayez !
            </p>
          </div>
        )}

        {/* Conseils */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Conseils pour progresser</h3>
          <ul className="space-y-3">
            {conseils.map((conseil, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  {index + 1}
                </div>
                <span className="text-gray-700">{conseil}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white py-4 rounded-lg font-bold transition-all"
          >
            <Home className="w-5 h-5" />
            Tableau de bord
          </button>
          
          <button
            onClick={() => navigate(`/quiz/${quizId}`)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-bold transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            Refaire la série
          </button>
          
          <button
            onClick={() => navigate('/entrainement-code')}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 rounded-lg font-bold transition-all"
          >
            <TrendingUp className="w-5 h-5" />
            Série suivante
          </button>
        </div>

        {/* Statistiques globales */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-blue-900 mb-2">📊 Vos statistiques globales</h3>
          <p className="text-blue-800 text-sm">
            Consultez votre tableau de bord pour voir votre progression globale, votre note moyenne et votre taux de réussite.
          </p>
        </div>

        {/* Call to Action Premium */}
        {scoreNum < 35 && (
          <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2">🚀 Besoin d'aide supplémentaire ?</h3>
                <p>Accédez à la pédagogie Ornikar et aux questions logiques en premium</p>
              </div>
              <button
                onClick={() => navigate('/premium-wave')}
                className="bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-yellow-50 transition-colors"
              >
                Découvrir Premium
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizResult;

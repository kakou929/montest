import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Brain, Lock, Trophy, Star } from 'lucide-react';

const QuestionsLogiques = () => {
  const navigate = useNavigate();
  const [isPremium, setIsPremium] = useState(false);

  // Simuler la vérification du statut premium
  React.useEffect(() => {
    const premium = localStorage.getItem('isPremium') === 'true';
    setIsPremium(premium);
  }, []);

  const categoriesLogiques = [
    {
      id: 1,
      titre: "Anticipation & Réaction",
      description: "Développez votre capacité à anticiper les situations dangereuses",
      niveaux: ["Débutant", "Intermédiaire", "Expert"],
      icone: <Brain className="w-12 h-12" />,
      couleur: "from-blue-500 to-blue-600",
      questions: 25,
      premium: false
    },
    {
      id: 2,
      titre: "Analyse de Situations",
      description: "Évaluez rapidement les situations complexes de circulation",
      niveaux: ["Intermédiaire", "Expert"],
      icone: <Zap className="w-12 h-12" />,
      couleur: "from-purple-500 to-purple-600",
      questions: 30,
      premium: true
    },
    {
      id: 3,
      titre: "Prises de Décision",
      description: "Améliorez vos réflexes de décision au volant",
      niveaux: ["Tous niveaux"],
      icone: <Star className="w-12 h-12" />,
      couleur: "from-yellow-500 to-yellow-600",
      questions: 20,
      premium: true
    },
    {
      id: 4,
      titre: "Logique Routière Avancée",
      description: "Maîtrisez les situations les plus complexes",
      niveaux: ["Expert"],
      icone: <Trophy className="w-12 h-12" />,
      couleur: "from-red-500 to-red-600",
      questions: 35,
      premium: true
    }
  ];

  const exempleQuestions = [
    {
      question: "Vous roulez à 90 km/h et voyez un obstacle à 100m. Compte tenu du temps de réaction (1s) et de la distance de freinage, pouvez-vous vous arrêter à temps ?",
      explication: "À 90 km/h, vous parcourez 25m en 1s (temps de réaction). La distance de freinage est d'environ 56m. Total: 81m. Vous pouvez donc vous arrêter.",
      reponse: "Oui"
    },
    {
      question: "Vous arrivez à un carrefour où un véhicule vient de droite à 60 km/h et se trouve à 50m. Vous roulez à 40 km/h. Qui arrive en premier au carrefour ?",
      explication: "À 40 km/h, vous mettez ~4,5s pour parcourir 50m. Le véhicule à 60 km/h met ~3s. Il arrive avant vous : vous devez lui céder la priorité.",
      reponse: "Le véhicule de droite"
    },
    {
      question: "Sur autoroute par temps de pluie, à quelle distance minimum devez-vous vous tenir d'un véhicule roulant à 110 km/h ?",
      explication: "Par temps de pluie, respectez la règle des 2 secondes minimum. À 110 km/h, cela équivaut à environ 61 mètres (110 ÷ 3,6 × 2).",
      reponse: "61 mètres minimum"
    }
  ];

  const avantagesPremium = [
    "Accès à toutes les catégories de questions logiques",
    "35+ questions avancées par catégorie",
    "Statistiques détaillées de performance",
    "Correction instantanée avec explications",
    "Mode entraînement chronométré",
    "Suivi de progression personnalisé"
  ];

  const handleCategoryClick = (category) => {
    if (category.premium && !isPremium) {
      // Rediriger vers la page premium
      navigate('/premium-wave');
    } else {
      // Ouvrir la catégorie
      navigate(`/logique/${category.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold mb-2">Questions Logiques</h1>
              <p className="text-yellow-100">Développez votre intelligence routière</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Brain className="w-8 h-8 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Pourquoi la logique routière ?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Les questions logiques vous permettent de développer votre capacité d'analyse et d'anticipation. 
                Elles vont au-delà de la simple mémorisation et vous préparent aux situations réelles de conduite.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  Anticipation
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Analyse rapide
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                  Prise de décision
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                  Réflexes
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Exemples de Questions */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Exemples de Questions</h2>
        <div className="space-y-4 mb-8">
          {exempleQuestions.map((exemple, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 mb-3">{exemple.question}</p>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <div className="font-semibold text-green-900 mb-1">Réponse : {exemple.reponse}</div>
                    <div className="text-green-800 text-sm">{exemple.explication}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Catégories */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Catégories Disponibles</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {categoriesLogiques.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden cursor-pointer group ${
                category.premium && !isPremium ? 'opacity-75' : ''
              }`}
            >
              <div className={`h-2 bg-gradient-to-r ${category.couleur}`}></div>
              <div className="p-6 relative">
                {category.premium && !isPremium && (
                  <div className="absolute top-4 right-4">
                    <Lock className="w-6 h-6 text-yellow-500" />
                  </div>
                )}

                <div className={`inline-block p-3 rounded-lg bg-gradient-to-r ${category.couleur} text-white mb-4`}>
                  {category.icone}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors">
                  {category.titre}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">{category.questions} questions</span>
                  <div className="flex gap-1">
                    {category.niveaux.map((niveau, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {niveau}
                      </span>
                    ))}
                  </div>
                </div>

                {category.premium && !isPremium ? (
                  <div className="flex items-center gap-2 text-yellow-600 font-semibold">
                    <Lock className="w-4 h-4" />
                    <span>Premium uniquement</span>
                  </div>
                ) : (
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all">
                    Commencer
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Section Premium si non premium */}
        {!isPremium && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg p-8 text-white">
            <div className="text-center mb-6">
              <Trophy className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Débloquez Tout le Contenu</h2>
              <p className="text-yellow-50 text-lg">Accédez à toutes les questions logiques en premium</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {avantagesPremium.map((avantage, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <Star className="w-5 h-5 flex-shrink-0" />
                  <span>{avantage}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/premium-wave')}
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-50 transition-colors shadow-lg inline-flex items-center gap-2"
              >
                <Trophy className="w-6 h-6" />
                Passer au Premium avec Wave
              </button>
              <p className="mt-3 text-yellow-50 text-sm">3 jours d'essai gratuit • Annulation à tout moment</p>
            </div>
          </div>
        )}

        {/* Conseils */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-blue-900 mb-2">💡 Conseils pour les questions logiques</h3>
          <ul className="text-blue-800 space-y-2">
            <li>• Prenez le temps de bien lire chaque question</li>
            <li>• Visualisez la situation comme si vous étiez au volant</li>
            <li>• Calculez les distances et les temps si nécessaire</li>
            <li>• Pensez toujours à la sécurité en priorité</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuestionsLogiques;

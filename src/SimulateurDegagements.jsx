import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, AlertTriangle, Navigation } from 'lucide-react';

const SimulateurDegagements = () => {
  const navigate = useNavigate();
  const [currentDegagement, setCurrentDegagement] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showCorrection, setShowCorrection] = useState(false);

  const degagements = [
    {
      id: 1,
      titre: "Dégagement 1 : Intersection avec STOP",
      description: "Vous arrivez à une intersection avec un panneau STOP.",
      panneaux: [
        { nom: "STOP", code: "B2", couleur: "Rouge", forme: "Octogone" }
      ],
      question: "Que devez-vous faire ?",
      options: [
        "Ralentir et céder le passage si nécessaire",
        "M'arrêter complètement au niveau du panneau, même sans véhicule",
        "Continuer si aucun véhicule n'arrive",
        "Accélérer pour passer rapidement"
      ],
      correctAnswer: 1,
      explication: "Le panneau STOP (B2) impose un ARRÊT OBLIGATOIRE complet, même en l'absence de tout autre véhicule. Vous devez marquer l'arrêt au niveau du panneau ou de la ligne blanche."
    },
    {
      id: 2,
      titre: "Dégagement 2 : Cédez le passage",
      description: "Vous approchez d'une intersection avec un panneau triangulaire pointe en bas.",
      panneaux: [
        { nom: "Cédez le passage", code: "B1", couleur: "Blanc/Rouge", forme: "Triangle inversé" }
      ],
      question: "Quelle est votre obligation ?",
      options: [
        "M'arrêter obligatoirement",
        "Ralentir et céder le passage aux véhicules venant de la droite",
        "Continuer sans ralentir",
        "Klaxonner pour signaler ma présence"
      ],
      correctAnswer: 1,
      explication: "Le panneau 'Cédez le passage' (B1) vous oblige à ralentir et à céder le passage aux véhicules circulant sur la voie que vous vous apprêtez à rejoindre. Contrairement au STOP, l'arrêt n'est pas obligatoire si la voie est libre."
    },
    {
      id: 3,
      titre: "Dégagement 3 : Sens interdit",
      description: "Vous voyez un panneau rond blanc avec une barre horizontale rouge.",
      panneaux: [
        { nom: "Sens interdit", code: "B2b", couleur: "Blanc/Rouge", forme: "Rond" }
      ],
      question: "Quelle action entreprendre ?",
      options: [
        "Continuer prudemment",
        "Ne pas m'engager dans cette voie",
        "M'engager si aucun véhicule ne vient",
        "Klaxonner avant de m'engager"
      ],
      correctAnswer: 1,
      explication: "Le panneau 'Sens interdit' (B2b) interdit formellement l'accès à cette voie dans le sens de circulation où vous vous trouvez. Vous devez chercher un autre itinéraire."
    },
    {
      id: 4,
      titre: "Dégagement 4 : Priorité à droite",
      description: "Vous arrivez à un carrefour sans signalisation particulière.",
      panneaux: [
        { nom: "Aucun panneau", code: "-", couleur: "-", forme: "-" }
      ],
      question: "Quelle règle appliquer ?",
      options: [
        "Je passe en premier car je suis sur la route principale",
        "Je dois céder le passage aux véhicules venant de ma droite",
        "Le premier arrivé passe en premier",
        "Je dois m'arrêter complètement"
      ],
      correctAnswer: 1,
      explication: "En l'absence de signalisation, la règle de la priorité à droite s'applique. Vous devez céder le passage à tous les véhicules venant de votre droite, sauf indication contraire."
    },
    {
      id: 5,
      titre: "Dégagement 5 : Rond-point",
      description: "Vous vous apprêtez à entrer dans un rond-point avec des panneaux bleus circulaires.",
      panneaux: [
        { nom: "Rond-point", code: "B21-2", couleur: "Bleu", forme: "Rond" },
        { nom: "Cédez le passage", code: "B1", couleur: "Blanc/Rouge", forme: "Triangle inversé" }
      ],
      question: "Comment aborder ce rond-point ?",
      options: [
        "J'ai la priorité car j'entre dans le rond-point",
        "Je cède le passage aux véhicules déjà engagés dans le rond-point",
        "Je m'arrête obligatoirement avant d'entrer",
        "Je passe si j'arrive en premier"
      ],
      correctAnswer: 1,
      explication: "À l'entrée d'un rond-point, le panneau 'Cédez le passage' vous oblige à céder la priorité aux véhicules circulant déjà dans le rond-point. Vous ne devez vous engager que lorsque la voie est libre."
    }
  ];

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentDegagement] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentDegagement < degagements.length - 1) {
      setCurrentDegagement(currentDegagement + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentDegagement > 0) {
      setCurrentDegagement(currentDegagement - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    degagements.forEach((deg, index) => {
      if (userAnswers[index] === deg.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleRestart = () => {
    setCurrentDegagement(0);
    setUserAnswers([]);
    setShowResult(false);
    setShowCorrection(false);
  };

  if (showResult) {
    const score = calculateScore();
    const percentage = (score / degagements.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold">Résultats du Simulateur</h1>
                <p className="text-blue-100">5 Dégagements</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-8">
            <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${
              percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}>
              <div className="text-white">
                <div className="text-5xl font-bold">{score}/5</div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {percentage >= 80 ? 'Excellent !' : percentage >= 60 ? 'Bien !' : 'À améliorer'}
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Vous avez obtenu {score} sur 5 ({percentage}%)
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setShowCorrection(true)}
                className="bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition-all"
              >
                Voir la correction
              </button>
              <button
                onClick={handleRestart}
                className="bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 transition-all"
              >
                Recommencer
              </button>
            </div>
          </div>

          {showCorrection && (
            <div className="space-y-6">
              {degagements.map((deg, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === deg.correctAnswer;

                return (
                  <div key={deg.id} className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${
                    isCorrect ? 'border-green-500' : 'border-red-500'
                  }`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {isCorrect ? (
                          <Check className="w-5 h-5 text-white" />
                        ) : (
                          <X className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{deg.titre}</h3>
                        <p className="text-gray-600 mb-4">{deg.description}</p>

                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h4 className="font-bold text-gray-800 mb-2">Panneaux présents :</h4>
                          {deg.panneaux.map((panneau, i) => (
                            <div key={i} className="text-sm text-gray-700">
                              • {panneau.nom} ({panneau.code}) - {panneau.couleur} - {panneau.forme}
                            </div>
                          ))}
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-semibold text-gray-700 mb-2">Votre réponse :</p>
                          <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            {deg.options[userAnswer]}
                          </p>
                        </div>

                        {!isCorrect && (
                          <div className="mb-4">
                            <p className="text-sm font-semibold text-gray-700 mb-2">Bonne réponse :</p>
                            <p className="text-sm text-green-700">
                              {deg.options[deg.correctAnswer]}
                            </p>
                          </div>
                        )}

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                          <p className="text-sm text-blue-900">
                            <strong>Explication :</strong> {deg.explication}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  const currentDeg = degagements[currentDegagement];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold mb-2">Simulateur de Dégagements</h1>
              <p className="text-blue-100">Dégagement {currentDegagement + 1} sur 5</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex gap-2">
            {degagements.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full transition-all ${
                  index === currentDegagement
                    ? 'bg-yellow-400'
                    : index < currentDegagement
                    ? 'bg-white'
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Titre du dégagement */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Navigation className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentDeg.titre}</h2>
            <p className="text-gray-600">{currentDeg.description}</p>
          </div>

          {/* Panneaux */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-blue-600" />
              Panneaux de signalisation présents :
            </h3>
            <div className="space-y-3">
              {currentDeg.panneaux.map((panneau, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 block mb-1">Nom :</span>
                      <span className="font-bold text-gray-800">{panneau.nom}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-1">Code :</span>
                      <span className="font-bold text-gray-800">{panneau.code}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-1">Couleur :</span>
                      <span className="font-bold text-gray-800">{panneau.couleur}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-1">Forme :</span>
                      <span className="font-bold text-gray-800">{panneau.forme}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{currentDeg.question}</h3>
            <div className="space-y-3">
              {currentDeg.options.map((option, index) => (
                <label
                  key={index}
                  className={`block p-4 rounded-lg cursor-pointer transition-all ${
                    userAnswers[currentDegagement] === index
                      ? 'bg-blue-500 text-white border-2 border-blue-600'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name={`degagement-${currentDegagement}`}
                    value={index}
                    checked={userAnswers[currentDegagement] === index}
                    onChange={() => handleAnswer(index)}
                    className="hidden"
                  />
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      userAnswers[currentDegagement] === index
                        ? 'border-white bg-white'
                        : 'border-gray-300'
                    }`}>
                      {userAnswers[currentDegagement] === index && (
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            {currentDegagement > 0 && (
              <button
                onClick={handlePrevious}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-300 transition-all"
              >
                ← Précédent
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={userAnswers[currentDegagement] === undefined}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentDegagement === degagements.length - 1 ? 'Voir les résultats' : 'Suivant →'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
          <p className="text-yellow-800 text-sm">
            <strong>Conseil :</strong> Prenez le temps de bien lire chaque situation et de réfléchir 
            aux panneaux présents avant de répondre. Ces situations sont conformes au code de la route ivoirien.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimulateurDegagements;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

// Base de 40 questions pour chaque quiz
const generateQuizQuestions = (quizId) => {
  const baseQuestions = [
    {
      question: "À quelle distance minimale devez-vous vous tenir d'un véhicule qui vous précède sur autoroute ?",
      options: ["30 mètres", "50 mètres", "70 mètres", "100 mètres"],
      correctAnswer: 1,
      explanation: "Sur autoroute, la distance de sécurité est d'au moins 50 mètres ou 2 secondes."
    },
    {
      question: "Quelle est la vitesse maximale autorisée en agglomération pour un véhicule léger ?",
      options: ["40 km/h", "50 km/h", "60 km/h", "70 km/h"],
      correctAnswer: 1,
      explanation: "En agglomération, la vitesse est limitée à 50 km/h sauf indication contraire."
    },
    {
      question: "Que signifie un panneau triangulaire avec bordure rouge ?",
      options: ["Interdiction", "Danger", "Obligation", "Indication"],
      correctAnswer: 1,
      explanation: "Les panneaux triangulaires à bordure rouge signalent un danger."
    },
    {
      question: "Combien de temps dure la période probatoire du permis de conduire ?",
      options: ["1 an", "2 ans", "3 ans", "4 ans"],
      correctAnswer: 2,
      explanation: "La période probatoire dure 3 ans (2 ans avec conduite accompagnée)."
    },
    {
      question: "Quel est le taux d'alcoolémie maximum autorisé pour un conducteur expérimenté ?",
      options: ["0,2 g/l", "0,5 g/l", "0,8 g/l", "1,0 g/l"],
      correctAnswer: 1,
      explanation: "Le taux maximum est de 0,5 g/l de sang (0,25 mg/l d'air expiré)."
    },
    {
      question: "À partir de quel âge un enfant peut-il voyager à l'avant d'un véhicule ?",
      options: ["8 ans", "10 ans", "12 ans", "14 ans"],
      correctAnswer: 1,
      explanation: "Un enfant peut voyager à l'avant à partir de 10 ans."
    },
    {
      question: "Quelle est la distance d'arrêt sur route sèche à 50 km/h ?",
      options: ["15 mètres", "25 mètres", "28 mètres", "35 mètres"],
      correctAnswer: 2,
      explanation: "À 50 km/h sur route sèche, la distance d'arrêt est d'environ 28 mètres."
    },
    {
      question: "Que devez-vous faire en cas de panne sur autoroute ?",
      options: ["Rester dans le véhicule", "Se mettre derrière la glissière", "Appeler la police", "Réparer sur place"],
      correctAnswer: 1,
      explanation: "En cas de panne sur autoroute, vous devez vous mettre en sécurité derrière la glissière."
    },
    {
      question: "Quelle est la vitesse maximale sur route nationale hors agglomération ?",
      options: ["70 km/h", "80 km/h", "90 km/h", "110 km/h"],
      correctAnswer: 1,
      explanation: "Sur route nationale bidirectionnelle, la vitesse est limitée à 80 km/h."
    },
    {
      question: "Combien de points comporte le permis de conduire ?",
      options: ["6 points", "8 points", "10 points", "12 points"],
      correctAnswer: 3,
      explanation: "Le permis de conduire comporte 12 points (6 en période probatoire)."
    },
    {
      question: "À quelle distance avant un obstacle devez-vous signaler votre ralentissement ?",
      options: ["50 mètres", "100 mètres", "150 mètres", "200 mètres"],
      correctAnswer: 2,
      explanation: "Vous devez signaler votre ralentissement 150 mètres avant l'obstacle."
    },
    {
      question: "Quelle est la durée de validité d'un contrôle technique ?",
      options: ["1 an", "2 ans", "3 ans", "4 ans"],
      correctAnswer: 1,
      explanation: "Le contrôle technique est valable 2 ans."
    },
    {
      question: "Que signifie un feu orange clignotant ?",
      options: ["Arrêt obligatoire", "Prudence", "Priorité à droite", "Ralentir"],
      correctAnswer: 1,
      explanation: "Un feu orange clignotant signale un danger et impose la prudence."
    },
    {
      question: "À partir de quelle heure est-il obligatoire d'allumer ses feux de croisement ?",
      options: ["18h", "19h", "20h", "Au coucher du soleil"],
      correctAnswer: 3,
      explanation: "Les feux doivent être allumés du coucher au lever du soleil et par mauvaise visibilité."
    },
    {
      question: "Quelle est l'amende pour excès de vitesse de 20 km/h en ville ?",
      options: ["68 euros", "90 euros", "135 euros", "200 euros"],
      correctAnswer: 2,
      explanation: "Un excès de vitesse de moins de 20 km/h en ville coûte 135 euros."
    },
    {
      question: "Combien de temps devez-vous garder un constat amiable après un accident ?",
      options: ["3 mois", "6 mois", "1 an", "5 ans"],
      correctAnswer: 3,
      explanation: "Vous devez conserver le constat amiable pendant au moins 1 an."
    },
    {
      question: "À quelle vitesse doit-on rouler sous la pluie sur autoroute ?",
      options: ["90 km/h", "100 km/h", "110 km/h", "120 km/h"],
      correctAnswer: 2,
      explanation: "Par temps de pluie, la vitesse sur autoroute est limitée à 110 km/h."
    },
    {
      question: "Que signifie un panneau rond bleu avec flèche blanche ?",
      options: ["Indication", "Obligation", "Interdiction", "Danger"],
      correctAnswer: 1,
      explanation: "Les panneaux ronds bleus avec pictogramme blanc indiquent une obligation."
    },
    {
      question: "À quelle fréquence devez-vous contrôler la pression de vos pneus ?",
      options: ["Chaque semaine", "Chaque mois", "Tous les 3 mois", "Tous les 6 mois"],
      correctAnswer: 1,
      explanation: "Il est recommandé de vérifier la pression des pneus une fois par mois."
    },
    {
      question: "Quelle est la distance de freinage sur route mouillée à 90 km/h ?",
      options: ["45 mètres", "60 mètres", "81 mètres", "120 mètres"],
      correctAnswer: 2,
      explanation: "Sur route mouillée à 90 km/h, la distance de freinage est d'environ 81 mètres."
    },
    {
      question: "Quel document n'est PAS obligatoire dans le véhicule ?",
      options: ["Permis de conduire", "Carte grise", "Attestation d'assurance", "Carnet d'entretien"],
      correctAnswer: 3,
      explanation: "Le carnet d'entretien n'est pas un document obligatoire à bord."
    },
    {
      question: "À quelle distance minimale doit-on se garer d'un passage piéton ?",
      options: ["3 mètres", "5 mètres", "10 mètres", "15 mètres"],
      correctAnswer: 1,
      explanation: "Il faut se garer à au moins 5 mètres avant un passage piéton."
    },
    {
      question: "Combien de temps après le lever du soleil peut-on éteindre ses feux ?",
      options: ["Immédiatement", "30 minutes", "1 heure", "Selon la visibilité"],
      correctAnswer: 3,
      explanation: "Les feux peuvent être éteints selon la visibilité, pas automatiquement au lever du soleil."
    },
    {
      question: "Quelle est la profondeur minimale des sculptures d'un pneu ?",
      options: ["0,8 mm", "1,0 mm", "1,6 mm", "2,0 mm"],
      correctAnswer: 2,
      explanation: "La profondeur minimale légale des sculptures est de 1,6 mm."
    },
    {
      question: "À quelle vitesse maximum un jeune conducteur peut-il rouler sur autoroute ?",
      options: ["90 km/h", "100 km/h", "110 km/h", "130 km/h"],
      correctAnswer: 2,
      explanation: "Les jeunes conducteurs sont limités à 110 km/h sur autoroute."
    },
    {
      question: "Que risquez-vous en téléphonant au volant ?",
      options: ["68 euros et 1 point", "90 euros et 2 points", "135 euros et 3 points", "200 euros et 4 points"],
      correctAnswer: 2,
      explanation: "Téléphoner au volant coûte 135 euros et 3 points de permis."
    },
    {
      question: "Quelle est la durée minimale de repos obligatoire après 4h30 de conduite ?",
      options: ["15 minutes", "30 minutes", "45 minutes", "1 heure"],
      correctAnswer: 2,
      explanation: "Après 4h30 de conduite, une pause de 45 minutes minimum est obligatoire."
    },
    {
      question: "À quelle distance peut-on doubler un cycliste en ville ?",
      options: ["0,5 mètre", "1 mètre", "1,5 mètres", "2 mètres"],
      correctAnswer: 1,
      explanation: "En ville, il faut laisser au moins 1 mètre lors du dépassement d'un cycliste."
    },
    {
      question: "Quel est le taux d'alcool maximum pour un jeune conducteur ?",
      options: ["0,0 g/l", "0,2 g/l", "0,3 g/l", "0,5 g/l"],
      correctAnswer: 1,
      explanation: "Pour un jeune conducteur, le taux maximum est de 0,2 g/l."
    },
    {
      question: "Combien de temps garde-t-on son dossier d'infraction ?",
      options: ["1 an", "3 ans", "5 ans", "10 ans"],
      correctAnswer: 1,
      explanation: "Le dossier d'infraction est conservé 3 ans."
    },
    {
      question: "À quelle vitesse doit-on rouler en cas de brouillard avec visibilité < 50m ?",
      options: ["30 km/h", "50 km/h", "70 km/h", "90 km/h"],
      correctAnswer: 1,
      explanation: "Avec une visibilité inférieure à 50 mètres, la vitesse est limitée à 50 km/h."
    },
    {
      question: "Que signifie une ligne discontinue au sol ?",
      options: ["Interdiction de franchir", "Franchissement autorisé", "Stationnement interdit", "Zone dangereuse"],
      correctAnswer: 1,
      explanation: "Une ligne discontinue peut être franchie si les conditions de sécurité le permettent."
    },
    {
      question: "Quelle distance parcourt-on en 1 seconde à 90 km/h ?",
      options: ["15 mètres", "20 mètres", "25 mètres", "30 mètres"],
      correctAnswer: 2,
      explanation: "À 90 km/h, on parcourt 25 mètres en 1 seconde (90 ÷ 3,6)."
    },
    {
      question: "Combien de passagers peut transporter un conducteur novice ?",
      options: ["Aucune limitation", "2 passagers", "4 passagers", "6 passagers"],
      correctAnswer: 0,
      explanation: "Il n'y a pas de limitation du nombre de passagers pour un conducteur novice."
    },
    {
      question: "À partir de quelle quantité d'alcool perd-on 6 points ?",
      options: ["0,4 g/l", "0,5 g/l", "0,8 g/l", "1,0 g/l"],
      correctAnswer: 2,
      explanation: "Au-delà de 0,8 g/l, on perd 6 points de permis."
    },
    {
      question: "Quelle est la vitesse maximale d'un tracteur agricole sur route ?",
      options: ["25 km/h", "30 km/h", "40 km/h", "50 km/h"],
      correctAnswer: 2,
      explanation: "Un tracteur agricole est limité à 40 km/h sur route."
    },
    {
      question: "Combien de temps après avoir bu peut-on conduire en toute sécurité ?",
      options: ["2 heures", "4 heures", "6 heures", "Dépend de la quantité"],
      correctAnswer: 3,
      explanation: "Le temps d'élimination dépend de la quantité d'alcool consommée (environ 1 verre par heure)."
    },
    {
      question: "À quelle distance doit-on placer le triangle de signalisation ?",
      options: ["30 mètres", "50 mètres", "100 mètres", "150 mètres"],
      correctAnswer: 0,
      explanation: "Le triangle doit être placé à au moins 30 mètres du véhicule."
    },
    {
      question: "Que faire si vous êtes ébloui par un véhicule venant en face ?",
      options: ["Klaxonner", "Faire des appels de phares", "Regarder sur le côté droit", "Accélérer"],
      correctAnswer: 2,
      explanation: "En cas d'éblouissement, il faut regarder vers le côté droit de la chaussée."
    },
    {
      question: "Quelle est la sanction pour conduite sans assurance ?",
      options: ["135 euros", "750 euros", "3750 euros", "7500 euros"],
      correctAnswer: 2,
      explanation: "Conduire sans assurance est passible d'une amende pouvant aller jusqu'à 3750 euros."
    }
  ];

  // Retourner 40 questions en mélangeant et en variant selon le quizId
  const seed = quizId * 7;
  const shuffled = [...baseQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 40);
};

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [questions] = useState(() => generateQuizQuestions(parseInt(quizId)));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (index) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleValidate = () => {
    if (selectedAnswer === null) return;
    
    setShowExplanation(true);
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    setAnswers([...answers, { questionIndex: currentQuestion, selectedAnswer, isCorrect }]);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    const score = answers.filter(a => a.isCorrect).length;
    
    // Sauvegarder le résultat
    const completedQuizzes = JSON.parse(localStorage.getItem('completedQuizzes') || '[]');
    completedQuizzes.push({
      quizId: parseInt(quizId),
      score,
      date: new Date().toISOString()
    });
    localStorage.setItem('completedQuizzes', JSON.stringify(completedQuizzes));

    // Mettre à jour les stats globales
    const stats = JSON.parse(localStorage.getItem('userStats') || '{"quizRealises":0,"noteMoyenne":0,"heuresFormation":0,"tauxReussite":0}');
    stats.quizRealises += 1;
    stats.noteMoyenne = Math.round((stats.noteMoyenne * (stats.quizRealises - 1) + score) / stats.quizRealises);
    stats.heuresFormation += 0.5;
    stats.tauxReussite = score >= 35 ? Math.min(stats.tauxReussite + 5, 100) : stats.tauxReussite;
    localStorage.setItem('userStats', JSON.stringify(stats));

    navigate(`/quiz-result/${quizId}/${score}`);
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => {
                if (window.confirm('Êtes-vous sûr de vouloir quitter ? Votre progression sera perdue.')) {
                  navigate('/entrainement-code');
                }
              }}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5" />
                <span className="font-bold">{formatTime(timeLeft)}</span>
              </div>
              
              <div className="text-right">
                <div className="font-bold">Série {quizId}</div>
                <div className="text-sm text-blue-100">{currentQuestion + 1}/40</div>
              </div>
            </div>
          </div>

          {/* Barre de progression */}
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="mb-6">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Question {currentQuestion + 1}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{question.question}</h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showCorrect = showExplanation && isCorrect;
              const showWrong = showExplanation && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showCorrect
                      ? 'bg-green-50 border-green-500'
                      : showWrong
                      ? 'bg-red-50 border-red-500'
                      : isSelected
                      ? 'bg-blue-50 border-blue-500'
                      : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                  } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showCorrect && <CheckCircle className="w-6 h-6 text-green-600" />}
                    {showWrong && <XCircle className="w-6 h-6 text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explication */}
          {showExplanation && (
            <div className={`p-4 rounded-lg mb-6 ${
              selectedAnswer === question.correctAnswer
                ? 'bg-green-50 border-l-4 border-green-500'
                : 'bg-red-50 border-l-4 border-red-500'
            }`}>
              <div className="flex items-start gap-3">
                <AlertCircle className={`w-6 h-6 flex-shrink-0 ${
                  selectedAnswer === question.correctAnswer ? 'text-green-600' : 'text-red-600'
                }`} />
                <div>
                  <div className={`font-bold mb-2 ${
                    selectedAnswer === question.correctAnswer ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {selectedAnswer === question.correctAnswer ? 'Bonne réponse !' : 'Mauvaise réponse'}
                  </div>
                  <p className={selectedAnswer === question.correctAnswer ? 'text-green-800' : 'text-red-800'}>
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex gap-4">
            {!showExplanation ? (
              <button
                onClick={handleValidate}
                disabled={selectedAnswer === null}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-lg font-bold hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Valider
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all"
              >
                {currentQuestion < questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
              </button>
            )}
          </div>
        </div>

        {/* Stats en cours */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-green-600 font-bold text-2xl">
              {answers.filter(a => a.isCorrect).length}
            </div>
            <div className="text-sm text-gray-600">Correctes</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-red-600 font-bold text-2xl">
              {answers.filter(a => !a.isCorrect).length}
            </div>
            <div className="text-sm text-gray-600">Incorrectes</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-gray-800 font-bold text-2xl">
              {40 - answers.length}
            </div>
            <div className="text-sm text-gray-600">Restantes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

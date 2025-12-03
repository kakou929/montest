import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckCircle, Clock, BookOpen, Car, Trophy, TrendingUp } from 'lucide-react';

const PlanApprentissage1Mois = () => {
  const navigate = useNavigate();
  const [completedDays, setCompletedDays] = useState([]);

  const semaines = [
    {
      numero: 1,
      titre: "Fondations du Code de la Route",
      objectif: "Maîtriser les bases essentielles",
      jours: [
        {
          jour: 1,
          titre: "Panneaux de signalisation - Partie 1",
          activites: [
            "Étudier les panneaux de danger (30 min)",
            "Faire 2 séries de quiz (40 min)",
            "Réviser les panneaux vus (15 min)"
          ],
          duree: "1h25"
        },
        {
          jour: 2,
          titre: "Panneaux de signalisation - Partie 2",
          activites: [
            "Étudier les panneaux d'interdiction (30 min)",
            "Faire 2 séries de quiz (40 min)",
            "Créer des fiches récapitulatives (15 min)"
          ],
          duree: "1h25"
        },
        {
          jour: 3,
          titre: "Les règles de priorité",
          activites: [
            "Comprendre la priorité à droite (20 min)",
            "Étudier les intersections (25 min)",
            "Faire 2 séries de quiz (40 min)"
          ],
          duree: "1h25"
        },
        {
          jour: 4,
          titre: "Limitations de vitesse",
          activites: [
            "Apprendre les limites selon les routes (30 min)",
            "Comprendre les distances de sécurité (20 min)",
            "Faire 2 séries de quiz (35 min)"
          ],
          duree: "1h25"
        },
        {
          jour: 5,
          titre: "Révision de la semaine",
          activites: [
            "Refaire les quiz où vous avez eu des erreurs (45 min)",
            "Revoir les panneaux difficiles (30 min)",
            "Faire un examen blanc (40 min)"
          ],
          duree: "2h"
        },
        {
          jour: 6,
          titre: "Première leçon de conduite",
          activites: [
            "Installation au poste de conduite",
            "Découverte des commandes",
            "Premiers démarrages"
          ],
          duree: "1h (pratique)"
        },
        {
          jour: 7,
          titre: "Repos / Révision libre",
          activites: [
            "Réviser à votre rythme",
            "Rattraper les points non compris",
            "Se reposer pour la semaine 2"
          ],
          duree: "Libre"
        }
      ]
    },
    {
      numero: 2,
      titre: "Approfondissement des Connaissances",
      objectif: "Maîtriser les situations courantes",
      jours: [
        {
          jour: 8,
          titre: "Stationnement et arrêt",
          activites: [
            "Règles de stationnement (25 min)",
            "Zones d'arrêt interdit (20 min)",
            "Faire 3 séries de quiz (60 min)"
          ],
          duree: "1h45"
        },
        {
          jour: 9,
          titre: "La signalisation routière",
          activites: [
            "Marquage au sol (30 min)",
            "Feux tricolores et signaux (25 min)",
            "Faire 3 séries de quiz (60 min)"
          ],
          duree: "1h55"
        },
        {
          jour: 10,
          titre: "Les intersections complexes",
          activites: [
            "Ronds-points (20 min)",
            "Intersections à feux (25 min)",
            "Faire 3 séries de quiz (60 min)"
          ],
          duree: "1h45"
        },
        {
          jour: 11,
          titre: "Circulation sur autoroute",
          activites: [
            "Règles spécifiques autoroute (30 min)",
            "Dépassement et distances (25 min)",
            "Faire 3 séries de quiz (60 min)"
          ],
          duree: "1h55"
        },
        {
          jour: 12,
          titre: "Révision approfondie",
          activites: [
            "Revoir tous les points faibles (60 min)",
            "Faire 4 séries de quiz (80 min)",
            "Analyser les erreurs (20 min)"
          ],
          duree: "2h40"
        },
        {
          jour: 13,
          titre: "Deuxième leçon de conduite",
          activites: [
            "Circulation en ville",
            "Arrêts et redémarrages",
            "Respect de la signalisation"
          ],
          duree: "1h (pratique)"
        },
        {
          jour: 14,
          titre: "Repos / Bilan mi-parcours",
          activites: [
            "Faire le point sur vos progrès",
            "Identifier les thèmes à renforcer",
            "Planifier la semaine 3"
          ],
          duree: "Libre"
        }
      ]
    },
    {
      numero: 3,
      titre: "Perfectionnement et Situations Spéciales",
      objectif: "Gérer les situations difficiles",
      jours: [
        {
          jour: 15,
          titre: "Conduite par mauvais temps",
          activites: [
            "Pluie, brouillard, neige (35 min)",
            "Visibilité réduite (20 min)",
            "Faire 3 séries de quiz (60 min)"
          ],
          duree: "1h55"
        },
        {
          jour: 16,
          titre: "Conduite de nuit",
          activites: [
            "Éclairage et visibilité (30 min)",
            "Règles spécifiques (25 min)",
            "Faire 3 séries de quiz (60 min)"
          ],
          duree: "1h55"
        },
        {
          jour: 17,
          titre: "Usagers vulnérables",
          activites: [
            "Piétons, cyclistes, 2-roues (35 min)",
            "Angles morts et distances (25 min)",
            "Faire 3 séries de quiz (60 min)"
          ],
          duree: "2h"
        },
        {
          jour: 18,
          titre: "Alcool, drogues et fatigue",
          activites: [
            "Effets et dangers (30 min)",
            "Réglementation (25 min)",
            "Faire 3 séries de quiz (60 min)"
          ],
          duree: "1h55"
        },
        {
          jour: 19,
          titre: "Questions logiques",
          activites: [
            "Développer la logique routière (45 min)",
            "Anticipation des dangers (40 min)",
            "Faire 3 séries de quiz (60 min)"
          ],
          duree: "2h25"
        },
        {
          jour: 20,
          titre: "Troisième leçon de conduite",
          activites: [
            "Circulation hors agglomération",
            "Dépassements",
            "Vitesse adaptée"
          ],
          duree: "1h (pratique)"
        },
        {
          jour: 21,
          titre: "Repos / Révision ciblée",
          activites: [
            "Revoir vos points faibles",
            "Refaire les quiz ratés",
            "Se préparer mentalement"
          ],
          duree: "Libre"
        }
      ]
    },
    {
      numero: 4,
      titre: "Préparation Finale à l'Examen",
      objectif: "Être prêt pour l'examen officiel",
      jours: [
        {
          jour: 22,
          titre: "Examen blanc #1",
          activites: [
            "Conditions réelles d'examen (40 min)",
            "Correction détaillée (30 min)",
            "Révision des erreurs (45 min)"
          ],
          duree: "2h"
        },
        {
          jour: 23,
          titre: "Examen blanc #2",
          activites: [
            "Deuxième test en conditions réelles (40 min)",
            "Analyse des progrès (30 min)",
            "Focus sur les thèmes faibles (45 min)"
          ],
          duree: "2h"
        },
        {
          jour: 24,
          titre: "Révision complète - Partie 1",
          activites: [
            "Tous les panneaux (60 min)",
            "Toutes les priorités (45 min)",
            "Faire 4 séries de quiz (80 min)"
          ],
          duree: "3h"
        },
        {
          jour: 25,
          titre: "Révision complète - Partie 2",
          activites: [
            "Limitations et distances (60 min)",
            "Situations spéciales (45 min)",
            "Faire 4 séries de quiz (80 min)"
          ],
          duree: "3h"
        },
        {
          jour: 26,
          titre: "Examen blanc #3",
          activites: [
            "Test final de préparation (40 min)",
            "Auto-évaluation (20 min)",
            "Dernières révisions ciblées (60 min)"
          ],
          duree: "2h"
        },
        {
          jour: 27,
          titre: "Quatrième leçon de conduite",
          activites: [
            "Parcours d'examen type",
            "Manœuvres",
            "Mise en situation réelle"
          ],
          duree: "1h30 (pratique)"
        },
        {
          jour: 28,
          titre: "Repos avant l'examen",
          activites: [
            "Révision légère",
            "Relaxation et confiance",
            "Préparation mentale"
          ],
          duree: "30 min max"
        }
      ]
    }
  ];

  const toggleDay = (semaineNum, jourNum) => {
    const key = `S${semaineNum}J${jourNum}`;
    if (completedDays.includes(key)) {
      setCompletedDays(completedDays.filter(d => d !== key));
    } else {
      setCompletedDays([...completedDays, key]);
    }
    localStorage.setItem('completedDays', JSON.stringify(completedDays));
  };

  const isDayCompleted = (semaineNum, jourNum) => {
    return completedDays.includes(`S${semaineNum}J${jourNum}`);
  };

  const progression = Math.round((completedDays.length / 28) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Plan d'Apprentissage - 1 Mois</h1>
              <p className="text-purple-100 text-sm">Programme intensif pour réussir rapidement</p>
            </div>
          </div>

          {/* Progression */}
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Votre progression</span>
              <span className="font-bold">{completedDays.length}/28 jours</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-3">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-500"
                style={{ width: `${progression}%` }}
              />
            </div>
            <div className="text-sm text-purple-100 mt-2">{progression}% complété</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Trophy className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Programme Intensif en 28 Jours</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Ce plan d'apprentissage vous permet de vous préparer efficacement à l'examen du code de la route 
                en seulement 1 mois. En suivant ce programme avec rigueur, vous maximisez vos chances de réussite 
                dès la première tentative.
              </p>
              <div className="grid md:grid-cols-4 gap-4 mt-4">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-blue-900">40+ Séries</div>
                  <div className="text-xs text-blue-700">de questions</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <Car className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-green-900">4 Leçons</div>
                  <div className="text-xs text-green-700">de conduite</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <Clock className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-purple-900">50+ Heures</div>
                  <div className="text-xs text-purple-700">d'étude</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 text-center">
                  <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-orange-900">85%</div>
                  <div className="text-xs text-orange-700">taux de réussite</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Semaines */}
        {semaines.map((semaine) => (
          <div key={semaine.numero} className="mb-8">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-xl p-6">
              <h2 className="text-2xl font-bold mb-2">Semaine {semaine.numero} : {semaine.titre}</h2>
              <p className="text-purple-100">Objectif : {semaine.objectif}</p>
            </div>

            <div className="bg-white rounded-b-xl shadow-lg p-6">
              <div className="space-y-4">
                {semaine.jours.map((jour) => {
                  const isCompleted = isDayCompleted(semaine.numero, jour.jour);
                  
                  return (
                    <div
                      key={jour.jour}
                      className={`border-2 rounded-lg p-4 transition-all ${
                        isCompleted 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            isCompleted 
                              ? 'bg-green-500 text-white' 
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {jour.jour}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">{jour.titre}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{jour.duree}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleDay(semaine.numero, jour.jour)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                            isCompleted
                              ? 'bg-green-500 text-white hover:bg-green-600'
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                        >
                          {isCompleted ? 'Terminé ✓' : 'Marquer comme fait'}
                        </button>
                      </div>

                      <ul className="space-y-2 ml-13">
                        {jour.activites.map((activite, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-700">
                            <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              isCompleted ? 'text-green-500' : 'text-gray-400'
                            }`} />
                            <span className="text-sm">{activite}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Conseils */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-bold text-yellow-900 mb-2">💡 Conseils pour réussir</h3>
          <ul className="text-yellow-800 space-y-2 text-sm">
            <li>• Suivez le plan jour après jour sans sauter d'étapes</li>
            <li>• Consacrez au moins 1h30 par jour à votre apprentissage</li>
            <li>• Refaites toujours les séries où vous avez eu moins de 35/40</li>
            <li>• Notez vos erreurs récurrentes dans un carnet</li>
            <li>• Prenez une vraie pause les jours de repos</li>
            <li>• Dormez bien la veille de vos leçons de conduite</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-8 text-white text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Prêt à commencer ?</h3>
          <p className="mb-6">Commencez dès aujourd'hui et obtenez votre code en 28 jours !</p>
          <button
            onClick={() => navigate('/entrainement-code')}
            className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold hover:bg-purple-50 transition-all"
          >
            Commencer le Jour 1
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanApprentissage1Mois;

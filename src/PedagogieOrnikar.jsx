import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Target, Clock, TrendingUp, CheckCircle, Book, Award, Zap } from 'lucide-react';

const PedagogieOrnikar = () => {
  const navigate = useNavigate();
  const [expandedModule, setExpandedModule] = useState(null);

  const methodologie = [
    {
      id: 1,
      titre: "Apprentissage Progressif",
      icon: <TrendingUp className="w-8 h-8" />,
      couleur: "from-blue-500 to-blue-600",
      description: "Une progression adaptée à votre rythme",
      contenu: [
        "Commencez par les bases : panneaux, priorités, distances de sécurité",
        "Passez aux situations complexes : intersections, dépassements, autoroutes",
        "Maîtrisez les cas particuliers : intempéries, circulation dense, nuit",
        "Révisez régulièrement pour ancrer les connaissances"
      ]
    },
    {
      id: 2,
      titre: "Répétition Espacée",
      icon: <Clock className="w-8 h-8" />,
      couleur: "from-purple-500 to-purple-600",
      description: "Mémorisez efficacement avec la répétition",
      contenu: [
        "Jour 1 : Première exposition à la notion",
        "Jour 3 : Première révision (après 2 jours)",
        "Jour 7 : Deuxième révision (après 1 semaine)",
        "Jour 30 : Révision de consolidation (après 1 mois)"
      ]
    },
    {
      id: 3,
      titre: "Compréhension Active",
      icon: <Brain className="w-8 h-8" />,
      couleur: "from-green-500 to-green-600",
      description: "Comprendre plutôt que mémoriser",
      contenu: [
        "Posez-vous la question : POURQUOI cette règle existe ?",
        "Visualisez les situations concrètes de conduite",
        "Imaginez-vous au volant dans chaque scénario",
        "Reliez chaque règle à la sécurité routière"
      ]
    },
    {
      id: 4,
      titre: "Pratique Immersive",
      icon: <Target className="w-8 h-8" />,
      couleur: "from-red-500 to-red-600",
      description: "Mettez-vous en situation réelle",
      contenu: [
        "Faites au moins 40 séries de questions",
        "Analysez vos erreurs après chaque quiz",
        "Refaites les séries où vous avez fait des erreurs",
        "Variez les types de questions (panneaux, priorités, règles...)"
      ]
    }
  ];

  const conseils = [
    {
      id: 1,
      titre: "Organisation du Temps",
      icon: <Clock className="w-6 h-6" />,
      conseils: [
        "Étudiez 30-45 minutes par jour plutôt que 3h une fois par semaine",
        "Choisissez un moment où vous êtes concentré (matin ou après-midi)",
        "Faites des pauses de 5 minutes toutes les 25 minutes",
        "Fixez-vous un objectif quotidien (ex: 2 séries de questions)"
      ]
    },
    {
      id: 2,
      titre: "Techniques de Mémorisation",
      icon: <Brain className="w-6 h-6" />,
      conseils: [
        "Créez des associations mentales (ex: triangle rouge = danger)",
        "Utilisez des moyens mnémotechniques pour les distances",
        "Dessinez les situations complexes sur papier",
        "Expliquez les règles à quelqu'un d'autre pour mieux les retenir"
      ]
    },
    {
      id: 3,
      titre: "Gestion des Erreurs",
      icon: <Target className="w-6 h-6" />,
      conseils: [
        "Ne vous découragez pas : les erreurs font partie de l'apprentissage",
        "Notez vos erreurs récurrentes dans un carnet",
        "Comprenez POURQUOI vous vous êtes trompé",
        "Revoyez spécifiquement les thèmes où vous faites des erreurs"
      ]
    },
    {
      id: 4,
      titre: "Préparation à l'Examen",
      icon: <Award className="w-6 h-6" />,
      conseils: [
        "Dormez bien la veille de l'examen",
        "Arrivez 15 minutes en avance le jour J",
        "Lisez chaque question attentivement",
        "Ne changez pas votre première réponse sauf si vous êtes sûr"
      ]
    }
  ];

  const statistiquesReussite = [
    { label: "Taux de réussite moyen", valeur: "78%", icon: <CheckCircle className="w-5 h-5" /> },
    { label: "Temps d'apprentissage moyen", valeur: "3 mois", icon: <Clock className="w-5 h-5" /> },
    { label: "Nombre de séries recommandées", valeur: "40+", icon: <Book className="w-5 h-5" /> },
    { label: "Note minimale pour réussir", valeur: "35/40", icon: <Award className="w-5 h-5" /> }
  ];

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
              <h1 className="text-3xl font-bold mb-2">Pédagogie Ornikar</h1>
              <p className="text-purple-100">Méthode d'apprentissage éprouvée pour réussir votre code</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Une méthode scientifique</h2>
              <p className="text-gray-600 leading-relaxed">
                La méthode Ornikar est basée sur les sciences cognitives et la psychologie de l'apprentissage. 
                Elle a fait ses preuves auprès de milliers d'élèves avec un taux de réussite supérieur à la moyenne nationale.
              </p>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statistiquesReussite.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="flex justify-center mb-2 text-purple-600">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-1">{stat.valeur}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Les 4 Piliers de la Méthode */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Les 4 Piliers de la Méthode</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {methodologie.map((module) => (
            <div
              key={module.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${module.couleur}`}></div>
              <div className="p-6">
                <div className={`inline-block p-3 rounded-lg bg-gradient-to-r ${module.couleur} text-white mb-4`}>
                  {module.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{module.titre}</h3>
                <p className="text-gray-600 mb-4">{module.description}</p>
                
                <button
                  onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                  className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                >
                  {expandedModule === module.id ? 'Voir moins' : 'En savoir plus'}
                </button>

                {expandedModule === module.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <ul className="space-y-2">
                      {module.contenu.map((point, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Conseils Pratiques */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Conseils Pratiques</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {conseils.map((conseil) => (
            <div key={conseil.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  {conseil.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800">{conseil.titre}</h3>
              </div>
              <ul className="space-y-2">
                {conseil.conseils.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                    <Zap className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Plan d'Apprentissage sur 3 Mois */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-6">Plan d'Apprentissage sur 3 Mois</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">Mois 1</div>
              <div className="text-purple-100 text-sm mb-4">Fondations</div>
              <ul className="space-y-2 text-sm">
                <li>• Panneaux de signalisation</li>
                <li>• Règles de priorité</li>
                <li>• Limitations de vitesse</li>
                <li>• 10 séries de questions</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">Mois 2</div>
              <div className="text-purple-100 text-sm mb-4">Approfondissement</div>
              <ul className="space-y-2 text-sm">
                <li>• Situations complexes</li>
                <li>• Autoroutes et routes</li>
                <li>• Stationnement et arrêt</li>
                <li>• 20 séries de questions</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">Mois 3</div>
              <div className="text-purple-100 text-sm mb-4">Préparation finale</div>
              <ul className="space-y-2 text-sm">
                <li>• Révisions ciblées</li>
                <li>• Examens blancs</li>
                <li>• Correction des erreurs</li>
                <li>• 10+ séries finales</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <Award className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Prêt à commencer ?</h3>
          <p className="text-gray-600 mb-6">
            Suivez cette méthode et maximisez vos chances de réussite dès la première tentative
          </p>
          <button
            onClick={() => navigate('/entrainement-code')}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-lg font-bold hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg"
          >
            Commencer les Séries d'Entraînement
          </button>
        </div>
      </div>
    </div>
  );
};

export default PedagogieOrnikar;

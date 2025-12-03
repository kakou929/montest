import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Users, Shield, Star, CheckCircle } from 'lucide-react';

const CharteMoniteurEleve = () => {
  const navigate = useNavigate();

  const charteEleve = [
    "Je m'engage à être ponctuel(le) et à prévenir en cas d'empêchement",
    "Je respecterai mon moniteur et suivrai ses instructions",
    "Je m'engage à réviser mes cours de code entre les leçons",
    "Je ne conduirai pas sous l'influence d'alcool ou de substances",
    "Je serai patient(e) et compréhensif(ve) envers mes erreurs",
    "Je poserai des questions si je ne comprends pas",
    "Je respecterai le véhicule école et le matériel pédagogique",
    "Je m'engage à suivre le plan de formation établi",
    "Je ne prendrai pas le volant sans mon moniteur durant la formation",
    "Je respecterai le code de la route dès mes premières leçons"
  ];

  const charteMoniteur = [
    "Je m'engage à être ponctuel et professionnel",
    "Je traiterai chaque élève avec respect et patience",
    "Je m'adapterai au rythme d'apprentissage de chaque élève",
    "Je fournirai des explications claires et compréhensibles",
    "Je créerai un environnement d'apprentissage sécurisé",
    "Je serai disponible pour répondre aux questions",
    "Je donnerai des retours constructifs et encourageants",
    "Je respecterai la confidentialité de mes élèves",
    "Je veillerai à la sécurité du véhicule et des élèves",
    "Je suivrai les programmes de formation officiels"
  ];

  const droitsEleve = [
    "Recevoir une formation de qualité",
    "Être traité avec respect et dignité",
    "Avoir un planning de formation clair",
    "Recevoir des explications compréhensibles",
    "Poser des questions sans jugement",
    "Avoir un véhicule en bon état",
    "Recevoir un suivi personnalisé",
    "Demander un changement de moniteur si nécessaire"
  ];

  const devoirsEleve = [
    "Être assidu aux cours théoriques et pratiques",
    "Respecter les horaires convenus",
    "Prévenir en cas d'absence (24h avant)",
    "Payer les prestations aux échéances prévues",
    "Avoir un comportement respectueux",
    "Suivre les conseils du moniteur",
    "S'entraîner régulièrement au code",
    "Respecter le matériel pédagogique"
  ];

  const handleDownload = () => {
    alert('Le téléchargement de la charte en PDF commence...\nCette fonctionnalité sera disponible prochainement.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold mb-2">Charte Moniteur / Élève</h1>
              <p className="text-indigo-100">Droits et devoirs de chacun</p>
            </div>
          </div>

          {/* Bouton de téléchargement */}
          <button
            onClick={handleDownload}
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-all flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Télécharger la charte (PDF)
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Un engagement mutuel</h2>
              <p className="text-gray-600 leading-relaxed">
                La relation entre le moniteur et l'élève est basée sur le respect, la confiance et l'engagement mutuel. 
                Cette charte définit les droits et devoirs de chacun pour garantir une formation de qualité dans un 
                environnement sain et sécurisé.
              </p>
            </div>
          </div>
        </div>

        {/* Charte de l'élève */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-blue-600" />
            Engagements de l'Élève
          </h2>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600 mb-4">En tant qu'élève de Mondiale Auto-École, je m'engage à :</p>
            <div className="space-y-3">
              {charteEleve.map((engagement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{engagement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charte du moniteur */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-indigo-600" />
            Engagements du Moniteur
          </h2>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600 mb-4">Le moniteur de Mondiale Auto-École s'engage à :</p>
            <div className="space-y-3">
              {charteMoniteur.map((engagement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{engagement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Droits et Devoirs */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Droits de l'élève */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5" />
              Vos Droits
            </h3>
            <ul className="space-y-2">
              {droitsEleve.map((droit, index) => (
                <li key={index} className="flex items-start gap-2 text-green-800">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-sm">{droit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Devoirs de l'élève */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Vos Devoirs
            </h3>
            <ul className="space-y-2">
              {devoirsEleve.map((devoir, index) => (
                <li key={index} className="flex items-start gap-2 text-blue-800">
                  <span className="text-blue-600 font-bold">•</span>
                  <span className="text-sm">{devoir}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Règlement intérieur */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Règlement Intérieur</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Article 1 - Inscription</h3>
              <p className="text-gray-600 text-sm">
                Toute inscription implique l'acceptation sans réserve de la présente charte et du règlement intérieur.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Article 2 - Annulation</h3>
              <p className="text-gray-600 text-sm">
                Toute annulation de leçon doit être signalée au minimum 24 heures avant. En cas d'annulation tardive, 
                la leçon sera due.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Article 3 - Comportement</h3>
              <p className="text-gray-600 text-sm">
                Un comportement irrespectueux envers le personnel ou les autres élèves peut entraîner l'exclusion 
                immédiate sans remboursement.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Article 4 - Sécurité</h3>
              <p className="text-gray-600 text-sm">
                Il est strictement interdit de conduire sous l'emprise d'alcool, de drogues ou de médicaments 
                altérant la vigilance.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Article 5 - Paiement</h3>
              <p className="text-gray-600 text-sm">
                Les prestations doivent être réglées selon les modalités définies lors de l'inscription. 
                Aucune leçon ne sera dispensée en cas de non-paiement.
              </p>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
          <h3 className="text-xl font-bold mb-4">Signature de la Charte</h3>
          <p className="mb-6">
            En m'inscrivant à Mondiale Auto-École, j'atteste avoir pris connaissance de cette charte et 
            m'engage à la respecter dans son intégralité.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-sm opacity-90 mb-2">L'élève</div>
              <div className="border-b-2 border-white/50 pb-2 mb-2">Signature</div>
              <div className="text-sm opacity-90">Date : ___/___/______</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-sm opacity-90 mb-2">Le représentant de l'auto-école</div>
              <div className="border-b-2 border-white/50 pb-2 mb-2">Signature et cachet</div>
              <div className="text-sm opacity-90">Date : ___/___/______</div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-blue-900 mb-2">📞 Besoin d'aide ?</h3>
          <p className="text-blue-800 text-sm mb-2">
            Pour toute question concernant cette charte, n'hésitez pas à nous contacter :
          </p>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Email : contact@mondiale-auto-ecole.ci</li>
            <li>• Téléphone : +225 XX XX XX XX XX</li>
            <li>• Adresse : Cocody, Abidjan, Côte d'Ivoire</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharteMoniteurEleve;

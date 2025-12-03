import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Image, BookOpen, FileCheck, Folder } from 'lucide-react';

const Telechargements = () => {
  const navigate = useNavigate();

  const documents = [
    {
      categorie: "Documents officiels",
      icon: <FileText className="w-6 h-6" />,
      couleur: "from-blue-500 to-blue-600",
      fichiers: [
        { nom: "Charte Moniteur-Élève", type: "PDF", taille: "245 KB", url: "#" },
        { nom: "Règlement intérieur", type: "PDF", taille: "189 KB", url: "#" },
        { nom: "Conditions générales", type: "PDF", taille: "320 KB", url: "#" },
        { nom: "Formulaire d'inscription", type: "PDF", taille: "156 KB", url: "#" }
      ]
    },
    {
      categorie: "Supports pédagogiques",
      icon: <BookOpen className="w-6 h-6" />,
      couleur: "from-green-500 to-green-600",
      fichiers: [
        { nom: "93 Panneaux de signalisation", type: "PDF", taille: "2.4 MB", url: "#" },
        { nom: "Méthode Ornikar - Guide complet", type: "PDF", taille: "1.8 MB", url: "#" },
        { nom: "Plan d'apprentissage 1 mois", type: "PDF", taille: "428 KB", url: "#" },
        { nom: "Fiches de révision", type: "PDF", taille: "856 KB", url: "#" }
      ]
    },
    {
      categorie: "Images et visuels",
      icon: <Image className="w-6 h-6" />,
      couleur: "from-purple-500 to-purple-600",
      fichiers: [
        { nom: "Logo Mondiale Auto-École", type: "PNG", taille: "45 KB", url: "#" },
        { nom: "Bannière réseaux sociaux", type: "JPG", taille: "328 KB", url: "#" },
        { nom: "Carte de visite digitale", type: "PNG", taille: "156 KB", url: "#" },
        { nom: "Pack d'icônes", type: "ZIP", taille: "1.2 MB", url: "#" }
      ]
    },
    {
      categorie: "Attestations et certificats",
      icon: <FileCheck className="w-6 h-6" />,
      couleur: "from-orange-500 to-orange-600",
      fichiers: [
        { nom: "Modèle d'attestation de formation", type: "PDF", taille: "234 KB", url: "#" },
        { nom: "Certificat de réussite (vierge)", type: "PDF", taille: "189 KB", url: "#" },
        { nom: "Attestation de présence", type: "PDF", taille: "145 KB", url: "#" }
      ]
    }
  ];

  const handleDownload = (fichier) => {
    alert(`Téléchargement de "${fichier.nom}" (${fichier.taille})\nCette fonctionnalité sera disponible prochainement.`);
  };

  const handleDownloadAll = (categorie) => {
    alert(`Téléchargement de tous les fichiers de "${categorie}"\nCette fonctionnalité sera disponible prochainement.`);
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
              <h1 className="text-3xl font-bold mb-2">Centre de Téléchargement</h1>
              <p className="text-indigo-100">Tous vos documents et ressources pédagogiques</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Folder className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Ressources disponibles</h2>
              <p className="text-gray-600 leading-relaxed">
                Téléchargez tous les documents nécessaires à votre formation : charte, supports pédagogiques, 
                fiches de révision, et bien plus encore. Tous les fichiers sont au format PDF pour une 
                consultation facile sur tous vos appareils.
              </p>
            </div>
          </div>
        </div>

        {/* Catégories de documents */}
        {documents.map((categorie, index) => (
          <div key={index} className="mb-8">
            <div className={`bg-gradient-to-r ${categorie.couleur} text-white rounded-t-xl p-6 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                {categorie.icon}
                <h2 className="text-2xl font-bold">{categorie.categorie}</h2>
              </div>
              <button
                onClick={() => handleDownloadAll(categorie.categorie)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Tout télécharger
              </button>
            </div>

            <div className="bg-white rounded-b-xl shadow-lg">
              {categorie.fichiers.map((fichier, fIndex) => (
                <div
                  key={fIndex}
                  className={`flex items-center justify-between p-6 hover:bg-gray-50 transition-colors ${
                    fIndex !== categorie.fichiers.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${categorie.couleur} rounded-lg flex items-center justify-center text-white font-bold`}>
                      {fichier.type}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">{fichier.nom}</h3>
                      <p className="text-sm text-gray-600">{fichier.taille}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(fichier)}
                    className={`bg-gradient-to-r ${categorie.couleur} text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2`}
                  >
                    <Download className="w-4 h-4" />
                    Télécharger
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Informations */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-blue-900 mb-2">📱 Sur mobile ?</h3>
            <p className="text-blue-800 text-sm">
              Tous les documents sont optimisés pour la lecture sur smartphone et tablette. 
              Téléchargez-les et consultez-les même hors ligne !
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-green-900 mb-2">✅ Besoin d'aide ?</h3>
            <p className="text-green-800 text-sm">
              Si vous ne trouvez pas un document ou si vous avez besoin d'un format spécifique, 
              contactez-nous à support@mondiale-auto-ecole.ci
            </p>
          </div>
        </div>

        {/* Note importante */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-yellow-900 mb-2">⚠️ Note importante</h3>
          <ul className="text-yellow-800 space-y-2 text-sm">
            <li>• Ces documents sont protégés par le droit d'auteur</li>
            <li>• Ils sont réservés à un usage personnel dans le cadre de votre formation</li>
            <li>• Toute reproduction ou diffusion non autorisée est interdite</li>
            <li>• Les documents sont régulièrement mis à jour, vérifiez les nouvelles versions</li>
          </ul>
        </div>

        {/* Mise à jour */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          Dernière mise à jour : Décembre 2025
        </div>
      </div>
    </div>
  );
};

export default Telechargements;

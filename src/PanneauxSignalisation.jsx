import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, AlertTriangle, Ban, Info, ArrowRight } from 'lucide-react';

const PanneauxSignalisation = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tous');

  // Liste des panneaux avec images
  const panneaux = [
    // Panneaux de Danger (Rouge/Blanc - Triangle)
    { 
      id: 1, 
      nom: 'Virage dangereux à gauche', 
      categorie: 'Danger', 
      description: 'Signale un virage serré sur la gauche nécessitant de ralentir', 
      forme: 'Triangle', 
      couleur: 'Rouge et blanc',
      image: 'retrecie-gauche.jpg' 
    },
    { 
      id: 2, 
      nom: 'Virage dangereux à droite', 
      categorie: 'Danger', 
      description: 'Signale un virage serré sur la droite nécessitant de ralentir', 
      forme: 'Triangle', 
      couleur: 'Rouge et blanc',
      code: 'A1b',
      image: 'retrecie-droite.jpg'
    },
    { 
      id: 3, 
      nom: 'Double virage dangereux à gauche', 
      categorie: 'Danger', 
      description: 'Signale un virage serré sur la gauche nécessitant de ralentir', 
      forme: 'Triangle', 
      couleur: 'Rouge et blanc',
      code: 'A3',
      image: 'double-gauche.jpg'
    },
    { 
      id: 4, 
      nom: 'Double virage dangereux à droite', 
      categorie: 'Danger', 
      description: 'La largeur de la chaussée diminue', 
      forme: 'Triangle', 
      couleur: 'Rouge et blanc',
      code: 'A2a',
      image: 'double-droite.jpg'
    },
      { 
      id: 5, 
      nom: 'Dos d\'âne', 
      categorie: 'Danger', 
      description: 'Ralentir pour franchir un dos d\'âne', 
      forme: 'Triangle', 
      couleur: 'Rouge et blanc',
      code: 'A2a',
      image: 'dos-ane.jpg'
    },
      { 
      id: 6, 
      nom: 'Double virage dangereux, dont le première est à gauche', 
      categorie: 'Danger', 
      description: 'le virage serré sur la gauche nécessitant de ralentir', 
      forme: 'Triangle', 
      couleur: 'Rouge et blanc',
      code: 'A2a',
      image: 'retrecie-droite.jpg'
    },
      { 
      id: 7, 
      nom: 'Double virage dangereux, dont le première est à gauche', 
      categorie: 'Danger', 
      description: 'Le virage serré sur la droite nécessitant de ralentir', 
      forme: 'Triangle', 
      couleur: 'Rouge et blanc',
      code: 'A2a',
      image: 'retrecie-droite.jpg'
    },
      { 
      id: 8, 
      nom: 'Chaussée glissante', 
      categorie: 'Danger', 
      description: 'La chaussée peut être glissante en cas de pluie', 
      forme: 'Triangle', 
      couleur: 'Rouge et blanc',
      code: 'A2a',
      image: 'chaussée-glissante.jpg'
    }, 
     { 
      id: 9, 
      nom: 'Pont mobile', 
      categorie: 'Danger', 
      description: 'pont mobile à proximité', 
      forme: 'Triangle', 
      couleur: 'Rouge et blanc',
      code: 'A2a',
      image: 'pont-mobile.jpg'
    },
      { 
      id: 10, 
      nom: 'Attention enfants', 
      categorie: 'Danger', 
      description: 'Attention, zone fréquentée par des enfants', 
      forme: 'Triangle', 
      couleur: 'Rouge et blanc',
      code: 'A2a',
      image: 'attention-enfant.jpg'
    },
      { 
      id: 11, 
      nom: 'Déboucher sur un quai', 
      categorie: 'Danger', 
      description: 'déboucher sur un quai ou une berge', 
      forme: 'Triangle', 
      couleur: 'Rouge et blanc',
      code: 'A2a',
      image: 'deboucher-quai.jpg'
    },
      { 
      id: 11, 
      nom: 'Attention aux piétons', 
      categorie: 'Danger', 
      description: 'attention aux piétons sur la chaussée', 
      forme: 'Triangle', 
      couleur: 'Rouge et blanc',
      code: 'A2a',
      image: 'attention-pieton.jpg'
      },
       { 
      id: 12, 
      nom: 'Attention aux animaux domestiques', 
      categorie: 'Danger', 
      description: 'attention aux animaux domestiques sur la chaussée', 
      forme: 'Triangle', 
      couleur: 'Rouge et blanc',
      code: 'A2a',
      image: 'domestik.jpg'
      },

    // Panneaux d'Interdiction (Rouge/Blanc - Rond)
    { 
      id: 5, 
      nom: 'STOP', 
      categorie: 'Interdiction', 
      description: 'Arrêt obligatoire au panneau. Marquez l\'arrêt complet avant de repartir', 
      forme: 'Octogone', 
      couleur: 'Rouge et blanc',
      code: 'B2',
      image: 'stop.png'
    },
    { 
      id: 6, 
      nom: 'Sens interdit', 
      categorie: 'Interdiction', 
      description: 'Interdit de s\'engager dans cette voie', 
      forme: 'Rond', 
      couleur: 'Rouge et blanc',
      code: 'B2b',
      image: 'sens-interdit.png'
    },
    { 
      id: 7, 
      nom: 'Interdiction de tourner à gauche', 
      categorie: 'Interdiction', 
      description: 'Il est interdit de tourner à gauche à la prochaine intersection', 
      forme: 'Rond', 
      couleur: 'Rouge et blanc',
      code: 'B2c',
      image: 'interdiction-gauche.png'
    },
    { 
      id: 8, 
      nom: 'Limitation de vitesse 50', 
      categorie: 'Interdiction', 
      description: 'Vitesse maximale autorisée : 50 km/h', 
      forme: 'Rond', 
      couleur: 'Rouge et blanc',
      code: 'B14',
      image: 'vitesse-50.png'
    },
    { 
      id: 9, 
      nom: 'Limitation de vitesse 90', 
      categorie: 'Interdiction', 
      description: 'Vitesse maximale autorisée : 90 km/h', 
      forme: 'Rond', 
      couleur: 'Rouge et blanc',
      code: 'B14',
      image: 'vitesse-90.png'
    },
    { 
      id: 10, 
      nom: 'Stationnement interdit', 
      categorie: 'Interdiction', 
      description: 'Il est interdit de stationner du côté du panneau', 
      forme: 'Rond', 
      couleur: 'Rouge et blanc',
      code: 'B6a',
      image: 'stationnement-interdit.png'
    },

    // Panneaux de Priorité
    { 
      id: 11, 
      nom: 'Cédez le passage', 
      categorie: 'Priorité', 
      description: 'Cédez le passage aux véhicules circulant sur la voie prioritaire', 
      forme: 'Triangle inversé', 
      couleur: 'Rouge et blanc',
      code: 'B1',
      image: 'cedez-passage.png'
    },
    { 
      id: 12, 
      nom: 'Route prioritaire', 
      categorie: 'Priorité', 
      description: 'Vous circulez sur une route prioritaire', 
      forme: 'Losange', 
      couleur: 'Jaune et blanc',
      code: 'B21',
      image: 'route-prioritaire.png'
    },
    { 
      id: 13, 
      nom: 'Fin de priorité', 
      categorie: 'Priorité', 
      description: 'Fin de la route prioritaire', 
      forme: 'Losange barré', 
      couleur: 'Jaune et blanc',
      code: 'B31',
      image: 'fin-priorite.png'
    },

    // Panneaux d'Obligation (Bleu - Rond)
    { 
      id: 14, 
      nom: 'Obligation de tourner à droite', 
      categorie: 'Obligation', 
      description: 'Direction obligatoire à la prochaine intersection : à droite', 
      forme: 'Rond', 
      couleur: 'Bleu et blanc',
      code: 'D21a',
      image: 'obligation-droite.png'
    },
    { 
      id: 15, 
      nom: 'Obligation de tourner à gauche', 
      categorie: 'Obligation', 
      description: 'Direction obligatoire à la prochaine intersection : à gauche', 
      forme: 'Rond', 
      couleur: 'Bleu et blanc',
      code: 'D21b',
      image: 'obligation-gauche.png'
    },
    { 
      id: 16, 
      nom: 'Sens giratoire obligatoire', 
      categorie: 'Obligation', 
      description: 'Obligation de contourner par la droite', 
      forme: 'Rond', 
      couleur: 'Bleu et blanc',
      code: 'D21-2',
      image: 'rond-point.png'
    },
    { 
      id: 17, 
      nom: 'Piste cyclable obligatoire', 
      categorie: 'Obligation', 
      description: 'Les cyclistes doivent emprunter la piste cyclable', 
      forme: 'Rond', 
      couleur: 'Bleu et blanc',
      code: 'D22a',
      image: 'piste-cyclable.png'
    },

    // Panneaux d'Indication
    { 
      id: 18, 
      nom: 'Parking', 
      categorie: 'Indication', 
      description: 'Indique un emplacement de stationnement autorisé', 
      forme: 'Carré', 
      couleur: 'Bleu et blanc',
      code: 'C1a',
      image: 'parking.png'
    },
    { 
      id: 19, 
      nom: 'Hôpital', 
      categorie: 'Indication', 
      description: 'Indique la présence d\'un hôpital ou centre de soins à proximité', 
      forme: 'Carré', 
      couleur: 'Bleu et blanc',
      code: 'C11',
      image: 'hopital.png'
    },
    { 
      id: 20, 
      nom: 'Station-service', 
      categorie: 'Indication', 
      description: 'Indique une station-service à proximité', 
      forme: 'Carré', 
      couleur: 'Bleu et blanc',
      code: 'C14',
      image: 'station-service.png'
    }
  ];

  const categories = [
    { id: 'tous', nom: 'Tous', icon: <Info className="w-4 h-4" />, couleur: 'gray' },
    { id: 'Danger', nom: 'Danger', icon: <AlertTriangle className="w-4 h-4" />, couleur: 'red' },
    { id: 'Interdiction', nom: 'Interdiction', icon: <Ban className="w-4 h-4" />, couleur: 'red' },
    { id: 'Priorité', nom: 'Priorité', icon: <ArrowRight className="w-4 h-4" />, couleur: 'yellow' },
    { id: 'Obligation', nom: 'Obligation', icon: <Info className="w-4 h-4" />, couleur: 'blue' },
    { id: 'Indication', nom: 'Indication', icon: <Info className="w-4 h-4" />, couleur: 'blue' }
  ];

  const filteredPanneaux = panneaux.filter(panneau => {
    const matchesCategory = selectedCategory === 'tous' || panneau.categorie === selectedCategory;
    const matchesSearch = panneau.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         panneau.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold mb-2">Panneaux de Signalisation</h1>
              <p className="text-red-100">93+ panneaux officiels à connaître</p>
            </div>
          </div>

          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un panneau..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filtres par catégorie */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat.icon}
              {cat.nom}
            </button>
          ))}
        </div>

        {/* Grille des panneaux */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPanneaux.map((panneau) => (
            <div 
              key={panneau.id} 
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-all cursor-pointer group"
            >
              {/* Image du panneau */}
              <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                <img 
                  src={`${process.env.PUBLIC_URL}/images/panneaux/${panneau.image}`}
                  alt={panneau.nom}
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform"
                  onError={(e) => {
                    // Si l'image n'existe pas, afficher un emoji
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="text-6xl">🚦</div>';
                  }}
                />
              </div>
              
              {/* Badge catégorie */}
              <div className="text-center mb-3">
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  panneau.categorie === 'Danger' ? 'bg-red-100 text-red-800' :
                  panneau.categorie === 'Interdiction' ? 'bg-red-100 text-red-800' :
                  panneau.categorie === 'Priorité' ? 'bg-yellow-100 text-yellow-800' :
                  panneau.categorie === 'Obligation' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {panneau.categorie}
                </span>
              </div>
              
              {/* Nom */}
              <h3 className="font-bold text-gray-800 text-center text-sm mb-2">
                {panneau.nom}
              </h3>
              
              {/* Code */}
              <p className="text-gray-500 text-xs text-center mb-3">
                Code : {panneau.code}
              </p>
              
              {/* Forme et couleur */}
              <div className="flex gap-2 justify-center mb-3">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {panneau.forme}
                </span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {panneau.couleur}
                </span>
              </div>
              
              {/* Description */}
              <p className="text-gray-600 text-xs text-center line-clamp-3">
                {panneau.description}
              </p>
            </div>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredPanneaux.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun panneau trouvé</p>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-blue-900 mb-2">ℹ️ À propos des images</h3>
          <p className="text-blue-800 text-sm">
            Les images des panneaux doivent être placées dans le dossier <code className="bg-blue-100 px-2 py-1 rounded">public/images/panneaux/</code>
            <br />
            Si une image n'apparaît pas, vérifiez que le fichier existe avec le bon nom.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PanneauxSignalisation;

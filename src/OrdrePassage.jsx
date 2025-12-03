import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Navigation2, CircleDot, StopCircle } from 'lucide-react';

const OrdrePassage = () => {
  const navigate = useNavigate();

  const situations = [
    {
      id: 1,
      titre: "Carrefour Sans Panneaux",
      icon: <Navigation2 className="w-12 h-12" />,
      couleur: "from-blue-500 to-blue-600",
      regle: "La priorité à droite s'applique. Le véhicule qui n'a personne sur sa droite passe en premier.",
      exemple: "Si vous avez trois voitures (blanche, jaune, rouge) à une intersection sans signalisation :",
      etapes: [
        "1️⃣ La voiture BLANCHE passe en premier car elle n'a personne à sa droite",
        "2️⃣ La voiture JAUNE passe ensuite (la blanche étant passée, elle n'a plus personne à droite)",
        "3️⃣ La voiture ROUGE passe en dernier"
      ],
      important: "Sans panneaux, regardez TOUJOURS à droite avant de vous engager !",
      schema: `
        ┌─────────┐
        │    ↑    │
        │    B    │  B = Blanche (passe 1ère)
        │         │  J = Jaune (passe 2ème)
    ────┤    X    ├──→ R = Rouge (passe 3ème)
        │    ↓    │  X = Intersection
        │    J    │
        └─────────┘
      `
    },
    {
      id: 2,
      titre: "Rond-Point",
      icon: <CircleDot className="w-12 h-12" />,
      couleur: "from-green-500 to-green-600",
      regle: "Le conducteur DÉJÀ ENGAGÉ dans le rond-point a la priorité.",
      exemple: "Vous arrivez sur un rond-point et un autre véhicule circule déjà à l'intérieur :",
      etapes: [
        "1️⃣ ARRÊTEZ-VOUS ou ralentissez à l'entrée du rond-point",
        "2️⃣ LAISSEZ PASSER tous les véhicules déjà engagés dans le rond-point",
        "3️⃣ ENGAGEZ-VOUS uniquement quand la voie est libre",
        "4️⃣ Une fois dans le rond-point, VOUS avez la priorité sur les véhicules qui arrivent"
      ],
      important: "Le panneau 'Cédez le passage' à l'entrée confirme cette règle !",
      schema: `
            ↑
            │
        ────┼────
            │○ ← Véhicule déjà
        ←───X───→   dans le rond-point
            │      (PRIORITAIRE)
        ────┼────
            ↓
            ▼ ← Vous (CEDEZ)
      `
    },
    {
      id: 3,
      titre: "Avec Panneaux de Signalisation",
      icon: <StopCircle className="w-12 h-12" />,
      couleur: "from-red-500 to-red-600",
      regle: "Les panneaux ANNULENT la priorité à droite. Vous devez TOUJOURS respecter la signalisation.",
      exemple: "Différents cas selon les panneaux :",
      etapes: [
        "🔷 ROUTE PRIORITAIRE (losange jaune) : Vous avez la priorité, même aux intersections",
        "🛑 STOP (octogone rouge) : Arrêt OBLIGATOIRE complet, même sans véhicule. Ensuite, cédez le passage",
        "🔻 CÉDEZ LE PASSAGE (triangle inversé) : Ralentissez et cédez aux véhicules sur la voie prioritaire",
        "⭕ SENS INTERDIT (rond blanc/rouge) : INTERDIT de s'engager dans cette voie"
      ],
      important: "Les panneaux ont TOUJOURS la priorité sur les règles générales !",
      schema: `
        Route prioritaire (vous) :
        ════════X═══════► PRIORITÉ
                │
                ↑ STOP (cède)
                
        Vous au STOP :
                │ Route prioritaire
        ════════X═══════►
                ↑
                ● STOP → CEDEZ
      `
    }
  ];

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
              <h1 className="text-3xl font-bold mb-2">Ordre de Passage</h1>
              <p className="text-indigo-100">Les règles essentielles de priorité</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-bold text-yellow-900 mb-2">
                ⚠️ Règle d'Or de la Priorité
              </h3>
              <p className="text-yellow-800">
                <strong>Sans panneau</strong> : Priorité à droite<br />
                <strong>Avec panneau</strong> : Le panneau décide<br />
                <strong>Rond-point</strong> : Priorité à ceux déjà engagés<br />
                <strong>Toujours</strong> : Prudence et courtoisie !
              </p>
            </div>
          </div>
        </div>

        {/* Les 3 situations */}
        <div className="space-y-8">
          {situations.map((situation) => (
            <div key={situation.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header de la situation */}
              <div className={`bg-gradient-to-r ${situation.couleur} text-white px-8 py-6`}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    {situation.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{situation.titre}</h2>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        Situation {situation.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-8">
                {/* Règle principale */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-500 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    📖 Règle Principale
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {situation.regle}
                  </p>
                </div>

                {/* Exemple */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    💡 Exemple Concret
                  </h3>
                  <p className="text-gray-700 mb-4">{situation.exemple}</p>
                  
                  {/* Schéma */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-700">{situation.schema}</pre>
                  </div>

                  {/* Étapes */}
                  <div className="space-y-3">
                    {situation.etapes.map((etape, index) => (
                      <div key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                        <div className="flex-1">
                          <p className="text-gray-800">{etape}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Point important */}
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2">
                    🚨 À Retenir Absolument
                  </h3>
                  <p className="text-red-800 font-semibold">
                    {situation.important}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Récapitulatif */}
        <div className="mt-8 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">✅ Récapitulatif Complet</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">1️⃣ Sans Panneaux</h3>
              <ul className="space-y-2 text-sm">
                <li>✓ Priorité à droite</li>
                <li>✓ Regarder à droite avant</li>
                <li>✓ Cédez si véhicule à droite</li>
              </ul>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">2️⃣ Rond-Point</h3>
              <ul className="space-y-2 text-sm">
                <li>✓ Priorité aux véhicules dedans</li>
                <li>✓ Cédez à l'entrée</li>
                <li>✓ Priorité une fois engagé</li>
              </ul>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3">3️⃣ Avec Panneaux</h3>
              <ul className="space-y-2 text-sm">
                <li>✓ Panneau = loi absolue</li>
                <li>✓ STOP = arrêt complet</li>
                <li>✓ Cédez = ralentir et céder</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl font-semibold">
              En cas de doute : RALENTISSEZ et CÉDEZ le passage !<br />
              Mieux vaut être prudent que d'avoir un accident. 🚗
            </p>
          </div>
        </div>

        {/* Quiz rapide */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🎯 Testez vos Connaissances
          </h2>
          
          <div className="space-y-4">
            <div className="border-2 border-blue-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
              <p className="font-semibold text-gray-800 mb-2">
                Question 1 : À un carrefour sans panneaux, trois voitures arrivent en même temps. Qui passe en premier ?
              </p>
              <p className="text-gray-600 text-sm">
                ✅ Réponse : Le véhicule qui n'a personne sur sa droite
              </p>
            </div>

            <div className="border-2 border-green-200 rounded-lg p-4 hover:border-green-400 transition-colors">
              <p className="font-semibold text-gray-800 mb-2">
                Question 2 : Au rond-point, qui a la priorité ?
              </p>
              <p className="text-gray-600 text-sm">
                ✅ Réponse : Les véhicules déjà engagés dans le rond-point
              </p>
            </div>

            <div className="border-2 border-red-200 rounded-lg p-4 hover:border-red-400 transition-colors">
              <p className="font-semibold text-gray-800 mb-2">
                Question 3 : Que faire au panneau STOP ?
              </p>
              <p className="text-gray-600 text-sm">
                ✅ Réponse : S'arrêter complètement, même si aucun véhicule n'arrive
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/simulateur-degagements')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
            >
              Pratiquer avec le Simulateur 5 Dégagements →
            </button>
          </div>
        </div>

        {/* Retour */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
          >
            ← Retour au Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdrePassage;

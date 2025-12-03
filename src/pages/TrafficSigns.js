import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function TrafficSigns() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const categories = {
    'Danger': { color: '#e74c3c', icon: '⚠️' },
    'Interdiction': { color: '#c0392b', icon: '🚫' },
    'Obligation': { color: '#3498db', icon: '🔵' },
    'Indication': { color: '#2ecc71', icon: '✅' },
    'Priorité': { color: '#f39c12', icon: '🔶' },
    'Temporaire': { color: '#e67e22', icon: '🚧' }
  };

  const trafficSigns = [
    // Danger (20)
    { id: 1, nom: 'Virage dangereux à droite', icon: '↗️', description: 'Indique un virage prononcé vers la droite', category: 'Danger' },
    { id: 2, nom: 'Virage dangereux à gauche', icon: '↖️', description: 'Indique un virage prononcé vers la gauche', category: 'Danger' },
    { id: 3, nom: 'Succession de virages', icon: '〰️', description: 'Plusieurs virages rapprochés', category: 'Danger' },
    { id: 4, nom: 'Cassis ou dos-d\'âne', icon: '⛰️', description: 'Ralentissement nécessaire', category: 'Danger' },
    { id: 5, nom: 'Chaussée rétrécie', icon: '⬌', description: 'Largeur de route diminuée', category: 'Danger' },
    { id: 6, nom: 'Chaussée glissante', icon: '🌊', description: 'Risque de dérapage', category: 'Danger' },
    { id: 7, nom: 'Débouché de cyclistes', icon: '🚴', description: 'Attention aux vélos', category: 'Danger' },
    { id: 8, nom: 'Passage pour piétons', icon: '🚶', description: 'Zone de traversée piétons', category: 'Danger' },
    { id: 9, nom: 'Enfants', icon: '👶', description: 'Proximité d\'école ou aire de jeux', category: 'Danger' },
    { id: 10, nom: 'Travaux', icon: '🚧', description: 'Chantier en cours', category: 'Danger' },
    { id: 11, nom: 'Chute de pierres', icon: '🪨', description: 'Risque de chute de pierres', category: 'Danger' },
    { id: 12, nom: 'Passage d\'animaux', icon: '🦌', description: 'Animaux sauvages ou domestiques', category: 'Danger' },
    { id: 13, nom: 'Descente dangereuse', icon: '⬇️', description: 'Forte pente descendante', category: 'Danger' },
    { id: 14, nom: 'Montée dangereuse', icon: '⬆️', description: 'Forte pente montante', category: 'Danger' },
    { id: 15, nom: 'Chaussée déformée', icon: '🛣️', description: 'Route en mauvais état', category: 'Danger' },
    { id: 16, nom: 'Pont mobile', icon: '🌉', description: 'Pont levant ou tournant', category: 'Danger' },
    { id: 17, nom: 'Débouché sur un quai', icon: '⚓', description: 'Route menant à un quai', category: 'Danger' },
    { id: 18, nom: 'Passage à niveau sans barrière', icon: '🚂', description: 'Traversée voie ferrée', category: 'Danger' },
    { id: 19, nom: 'Circulation dans les deux sens', icon: '⇄', description: 'Route à double sens', category: 'Danger' },
    { id: 20, nom: 'Risque d\'accident', icon: '⚡', description: 'Zone accidentogène', category: 'Danger' },

    // Interdiction (20)
    { id: 21, nom: 'Sens interdit', icon: '⛔', description: 'Entrée interdite', category: 'Interdiction' },
    { id: 22, nom: 'Interdiction de tourner à gauche', icon: '⬅️🚫', description: 'Pas de virage gauche', category: 'Interdiction' },
    { id: 23, nom: 'Interdiction de tourner à droite', icon: '➡️🚫', description: 'Pas de virage droite', category: 'Interdiction' },
    { id: 24, nom: 'Interdiction de faire demi-tour', icon: '🔄🚫', description: 'Demi-tour interdit', category: 'Interdiction' },
    { id: 25, nom: 'Interdiction de dépasser', icon: '🚗🚫', description: 'Dépassement interdit', category: 'Interdiction' },
    { id: 26, nom: 'Limitation de vitesse 30', icon: '3️⃣0️⃣', description: 'Vitesse maximale 30 km/h', category: 'Interdiction' },
    { id: 27, nom: 'Limitation de vitesse 50', icon: '5️⃣0️⃣', description: 'Vitesse maximale 50 km/h', category: 'Interdiction' },
    { id: 28, nom: 'Limitation de vitesse 90', icon: '9️⃣0️⃣', description: 'Vitesse maximale 90 km/h', category: 'Interdiction' },
    { id: 29, nom: 'Interdiction de stationner', icon: '🅿️🚫', description: 'Stationnement interdit', category: 'Interdiction' },
    { id: 30, nom: 'Interdiction de s\'arrêter', icon: '🛑🚫', description: 'Arrêt et stationnement interdits', category: 'Interdiction' },
    { id: 31, nom: 'Accès interdit aux piétons', icon: '🚶🚫', description: 'Piétons interdits', category: 'Interdiction' },
    { id: 32, nom: 'Accès interdit aux cycles', icon: '🚲🚫', description: 'Vélos interdits', category: 'Interdiction' },
    { id: 33, nom: 'Accès interdit aux motos', icon: '🏍️🚫', description: 'Motos interdites', category: 'Interdiction' },
    { id: 34, nom: 'Accès interdit aux poids lourds', icon: '🚛🚫', description: 'Camions interdits', category: 'Interdiction' },
    { id: 35, nom: 'Interdiction de klaxonner', icon: '📢🚫', description: 'Usage avertisseur interdit', category: 'Interdiction' },
    { id: 36, nom: 'Accès interdit aux véhicules à moteur', icon: '🚗🚫', description: 'Tous véhicules motorisés interdits', category: 'Interdiction' },
    { id: 37, nom: 'Hauteur limitée', icon: '📏⬆️', description: 'Limitation hauteur véhicule', category: 'Interdiction' },
    { id: 38, nom: 'Largeur limitée', icon: '📏↔️', description: 'Limitation largeur véhicule', category: 'Interdiction' },
    { id: 39, nom: 'Poids limité', icon: '⚖️', description: 'Limitation poids véhicule', category: 'Interdiction' },
    { id: 40, nom: 'Fin d\'interdiction de vitesse', icon: '✓', description: 'Fin limitation vitesse', category: 'Interdiction' },

    // Obligation (15)
    { id: 41, nom: 'Direction obligatoire à droite', icon: '➡️', description: 'Tourner obligatoirement à droite', category: 'Obligation' },
    { id: 42, nom: 'Direction obligatoire à gauche', icon: '⬅️', description: 'Tourner obligatoirement à gauche', category: 'Obligation' },
    { id: 43, nom: 'Direction obligatoire tout droit', icon: '⬆️', description: 'Continuer tout droit', category: 'Obligation' },
    { id: 44, nom: 'Contournement obligatoire par la droite', icon: '↗️', description: 'Contourner obstacle par droite', category: 'Obligation' },
    { id: 45, nom: 'Contournement obligatoire par la gauche', icon: '↖️', description: 'Contourner obstacle par gauche', category: 'Obligation' },
    { id: 46, nom: 'Piste obligatoire pour cycles', icon: '🚴', description: 'Piste cyclable obligatoire', category: 'Obligation' },
    { id: 47, nom: 'Chaînes à neige obligatoires', icon: '🔗', description: 'Équipement spécial requis', category: 'Obligation' },
    { id: 48, nom: 'Voie réservée aux bus', icon: '🚌', description: 'Couloir bus', category: 'Obligation' },
    { id: 49, nom: 'Vitesse minimale obligatoire', icon: '⚡', description: 'Vitesse minimum à respecter', category: 'Obligation' },
    { id: 50, nom: 'Obligation de tourner à droite avant le panneau', icon: '🔄➡️', description: 'Virage immédiat droite', category: 'Obligation' },
    { id: 51, nom: 'Obligation de tourner à gauche avant le panneau', icon: '🔄⬅️', description: 'Virage immédiat gauche', category: 'Obligation' },
    { id: 52, nom: 'Sens giratoire', icon: '⭕', description: 'Rond-point obligatoire', category: 'Obligation' },
    { id: 53, nom: 'Arrêt au poste de péage', icon: '💰', description: 'Péage obligatoire', category: 'Obligation' },
    { id: 54, nom: 'Arrêt au poste de douane', icon: '🛃', description: 'Contrôle douanier', category: 'Obligation' },
    { id: 55, nom: 'Allumage des feux', icon: '💡', description: 'Feux obligatoires', category: 'Obligation' },

    // Indication (25)
    { id: 56, nom: 'Parking', icon: '🅿️', description: 'Zone de stationnement', category: 'Indication' },
    { id: 57, nom: 'Hôpital', icon: '🏥', description: 'Centre hospitalier', category: 'Indication' },
    { id: 58, nom: 'Station-service', icon: '⛽', description: 'Essence/Diesel disponible', category: 'Indication' },
    { id: 59, nom: 'Téléphone', icon: '📞', description: 'Cabine téléphonique', category: 'Indication' },
    { id: 60, nom: 'Restaurant', icon: '🍽️', description: 'Point restauration', category: 'Indication' },
    { id: 61, nom: 'Hôtel', icon: '🏨', description: 'Hébergement', category: 'Indication' },
    { id: 62, nom: 'Aire de repos', icon: '🛌', description: 'Zone repos', category: 'Indication' },
    { id: 63, nom: 'Point d\'information', icon: 'ℹ️', description: 'Renseignements', category: 'Indication' },
    { id: 64, nom: 'Poste de police', icon: '👮', description: 'Commissariat', category: 'Indication' },
    { id: 65, nom: 'Premiers secours', icon: '⚕️', description: 'Centre médical', category: 'Indication' },
    { id: 66, nom: 'Passage pour piétons', icon: '🚶‍♂️', description: 'Traversée piétons', category: 'Indication' },
    { id: 67, nom: 'Début d\'autoroute', icon: '🛣️', description: 'Entrée autoroute', category: 'Indication' },
    { id: 68, nom: 'Fin d\'autoroute', icon: '🛣️❌', description: 'Sortie autoroute', category: 'Indication' },
    { id: 69, nom: 'Sens unique', icon: '➡️', description: 'Circulation à sens unique', category: 'Indication' },
    { id: 70, nom: 'Impasse', icon: '🚫', description: 'Voie sans issue', category: 'Indication' },
    { id: 71, nom: 'Zone résidentielle', icon: '🏘️', description: 'Quartier habitation', category: 'Indication' },
    { id: 72, nom: 'Zone 30', icon: '3️⃣0️⃣', description: 'Zone limitation 30', category: 'Indication' },
    { id: 73, nom: 'Toilettes', icon: '🚻', description: 'Sanitaires publics', category: 'Indication' },
    { id: 74, nom: 'Camping', icon: '⛺', description: 'Terrain camping', category: 'Indication' },
    { id: 75, nom: 'Aire de pique-nique', icon: '🧺', description: 'Zone pique-nique', category: 'Indication' },
    { id: 76, nom: 'Point de vue', icon: '👁️', description: 'Vue panoramique', category: 'Indication' },
    { id: 77, nom: 'Monument historique', icon: '🏛️', description: 'Site historique', category: 'Indication' },
    { id: 78, nom: 'Aéroport', icon: '✈️', description: 'Aérodrome', category: 'Indication' },
    { id: 79, nom: 'Gare ferroviaire', icon: '🚉', description: 'Station train', category: 'Indication' },
    { id: 80, nom: 'Embarcadère', icon: '⛴️', description: 'Port/quai', category: 'Indication' },

    // Priorité (8)
    { id: 81, nom: 'Priorité à la circulation en sens inverse', icon: '⬆️', description: 'Laisser passer sens inverse', category: 'Priorité' },
    { id: 82, nom: 'Priorité par rapport à la circulation en sens inverse', icon: '⬇️', description: 'Vous avez priorité', category: 'Priorité' },
    { id: 83, nom: 'Cédez le passage', icon: '🔻', description: 'Céder priorité', category: 'Priorité' },
    { id: 84, nom: 'Arrêt obligatoire (STOP)', icon: '🛑', description: 'Arrêt complet obligatoire', category: 'Priorité' },
    { id: 85, nom: 'Priorité ponctuelle', icon: '⬆️✓', description: 'Priorité temporaire', category: 'Priorité' },
    { id: 86, nom: 'Route prioritaire', icon: '◇', description: 'Vous êtes prioritaire', category: 'Priorité' },
    { id: 87, nom: 'Fin de route prioritaire', icon: '◇🚫', description: 'Fin priorité', category: 'Priorité' },
    { id: 88, nom: 'Intersection avec priorité à droite', icon: '✖️', description: 'Priorité à droite', category: 'Priorité' },

    // Temporaire (5)
    { id: 89, nom: 'Déviation', icon: '↗️', description: 'Itinéraire alternatif', category: 'Temporaire' },
    { id: 90, nom: 'Travaux temporaires', icon: '🚧', description: 'Chantier temporaire', category: 'Temporaire' },
    { id: 91, nom: 'Chaussée rétrécie temporaire', icon: '⬌🚧', description: 'Rétrécissement provisoire', category: 'Temporaire' },
    { id: 92, nom: 'Circulation alternée', icon: '🔴🟢', description: 'Feux alternatifs', category: 'Temporaire' },
    { id: 93, nom: 'Route barrée', icon: '❌', description: 'Voie fermée', category: 'Temporaire' }
  ];

  const filteredSigns = trafficSigns.filter(sign => {
    const matchesSearch = sign.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || sign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Navbar */}
      <nav style={{ 
        background: 'white',
        padding: '20px 60px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{
            width: '45px',
            height: '45px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '24px',
            color: 'white'
          }}>
            M
          </div>
          <h1 style={{ fontSize: '28px', margin: 0, color: '#1a1a1a', fontWeight: '700' }}>
            mondiale
          </h1>
        </div>
      </nav>

      {/* Conteneur Principal */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 20px' }}>
        {/* Flèche Retour + Titre */}
        <div style={{ marginBottom: '40px' }}>
          <Link 
            to="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#666',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              marginBottom: '25px',
              transition: 'color 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B35'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Retour au tableau de bord
          </Link>

          <h2 style={{ fontSize: '42px', marginBottom: '15px', color: '#1a1a1a', fontWeight: '700' }}>
            🚦 Panneaux de signalisation
          </h2>
          <p style={{ fontSize: '18px', color: '#666' }}>
            Apprenez à reconnaître et comprendre les {trafficSigns.length} panneaux officiels
          </p>
        </div>

        {/* Barre de recherche */}
        <div style={{ marginBottom: '35px' }}>
          <input
            type="text"
            placeholder="🔍 Rechercher un panneau..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '18px 25px',
              fontSize: '16px',
              border: '2px solid #e0e0e0',
              borderRadius: '50px',
              outline: 'none',
              transition: 'border-color 0.3s',
              background: 'white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
            onFocus={(e) => e.target.style.borderColor = '#FF6B35'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
        </div>

        {/* Filtres catégories */}
        <div style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          marginBottom: '50px'
        }}>
          <button
            onClick={() => setSelectedCategory('Tous')}
            style={{
              padding: '14px 28px',
              fontSize: '15px',
              fontWeight: '600',
              border: selectedCategory === 'Tous' ? '2px solid #FF6B35' : '2px solid #e0e0e0',
              borderRadius: '50px',
              background: selectedCategory === 'Tous' ? '#FFE5D9' : 'white',
              color: selectedCategory === 'Tous' ? '#FF6B35' : '#666',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            📊 Tous ({trafficSigns.length})
          </button>
          {Object.entries(categories).map(([category, { color, icon }]) => {
            const count = trafficSigns.filter(s => s.category === category).length;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '14px 28px',
                  fontSize: '15px',
                  fontWeight: '600',
                  border: selectedCategory === category ? `2px solid ${color}` : '2px solid #e0e0e0',
                  borderRadius: '50px',
                  background: selectedCategory === category ? `${color}15` : 'white',
                  color: selectedCategory === category ? color : '#666',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {icon} {category} ({count})
              </button>
            );
          })}
        </div>

        {/* Grille de panneaux */}
        {filteredSigns.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '25px'
          }}>
            {filteredSigns.map((sign) => {
              const categoryInfo = categories[sign.category];
              return (
                <div
                  key={sign.id}
                  style={{
                    background: 'white',
                    padding: '30px',
                    borderRadius: '20px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    borderTop: `4px solid ${categoryInfo.color}`,
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
                  }}
                >
                  {/* Icône panneau */}
                  <div style={{
                    width: '90px',
                    height: '90px',
                    margin: '0 auto 20px',
                    background: `${categoryInfo.color}15`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '42px',
                    border: `3px solid ${categoryInfo.color}20`
                  }}>
                    {sign.icon}
                  </div>

                  {/* Nom */}
                  <h3 style={{
                    fontSize: '17px',
                    marginBottom: '12px',
                    color: '#1a1a1a',
                    fontWeight: '700',
                    lineHeight: '1.4',
                    minHeight: '48px'
                  }}>
                    {sign.nom}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: '1.6',
                    marginBottom: '15px',
                    minHeight: '44px'
                  }}>
                    {sign.description}
                  </p>

                  {/* Badge catégorie */}
                  <span style={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    background: categoryInfo.color,
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '700'
                  }}>
                    {categoryInfo.icon} {sign.category}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
          }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>🔍</div>
            <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#1a1a1a', fontWeight: '700' }}>
              Aucun panneau trouvé
            </h3>
            <p style={{ fontSize: '16px', color: '#666' }}>
              Essayez une autre recherche ou catégorie
            </p>
          </div>
        )}
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          nav {
            padding: 15px 20px !important;
          }
          h2 {
            font-size: 32px !important;
          }
          .categories-filter {
            gap: 10px !important;
          }
          .category-btn {
            padding: 12px 20px !important;
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default TrafficSigns;

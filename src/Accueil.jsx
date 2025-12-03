import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Award, Clock, Star, Phone, MapPin, Menu, X } from 'lucide-react';

const Accueil = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const avantages = [
    { icon: <CheckCircle className="w-6 h-6" />, titre: "Taux de réussite 85%", description: "Nos élèves réussissent du premier coup" },
    { icon: <Users className="w-6 h-6" />, titre: "Moniteurs diplômés", description: "Plus de 10 ans d'expérience" },
    { icon: <Award className="w-6 h-6" />, titre: "Formation complète", description: "Code + Conduite + Examen" },
    { icon: <Clock className="w-6 h-6" />, titre: "Horaires flexibles", description: "7 jours sur 7, de 8h à 18h" }
  ];

  const formules = [
    {
      nom: "Toutes Catégories",
      prix: "150 000",
      badge: "Le plus complet",
      couleur: "from-blue-500 to-blue-600",
      avantages: [
        "Code de la route complet",
        "40 séries de quiz en ligne",
        "93+ panneaux de signalisation",
        "Toutes catégories de permis",
        "Support moniteur 24/7",
        "Accès à vie à la plateforme",
        "Simulateur de 5 dégagements",
        "Leçons de conduite incluses"
      ]
    },
    {
      nom: "Catégorie A (Moto)",
      prix: "120 000",
      badge: "Spécial Moto",
      couleur: "from-orange-500 to-orange-600",
      avantages: [
        "Code de la route moto",
        "30 séries de quiz moto",
        "Panneaux spécifiques",
        "Formation catégorie A",
        "Support moniteur 24/7",
        "Accès 6 mois",
        "Simulateur moto",
        "Leçons pratiques"
      ]
    }
  ];

  const temoignages = [
    { nom: "Konan Marie", note: 5, texte: "Excellente école ! J'ai eu mon permis en 2 mois. Les moniteurs sont patients et professionnels." },
    { nom: "Yao Patrick", note: 5, texte: "Formation complète et pédagogie moderne. La plateforme en ligne est très pratique." },
    { nom: "Diallo Aminata", note: 5, texte: "Je recommande à 100% ! Prix abordable et équipe très compétente." }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="text-2xl font-bold text-white">M</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-800">Mondiale Auto-École</div>
                <div className="text-xs text-gray-600">Abidjan, Côte d'Ivoire</div>
              </div>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => navigate('/')} className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                Accueil
              </button>
              <button onClick={() => navigate('/dashboard')} className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                Mes Cours
              </button>
              <button onClick={() => navigate('/admin')} className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                Admin
              </button>
              <a href="tel:0788005332" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" />
                0788005332
              </a>
              <button
                onClick={() => navigate('/inscription')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                S'inscrire
              </button>
            </div>

            {/* Menu Mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Menu Mobile Dropdown */}
          {menuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <button
                onClick={() => { navigate('/'); setMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold"
              >
                Accueil
              </button>
              <button
                onClick={() => { navigate('/dashboard'); setMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold"
              >
                Mes Cours
              </button>
              <button
                onClick={() => { navigate('/admin'); setMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold"
              >
                Admin
              </button>
              <a
                href="tel:0788005332"
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold"
              >
                📞 0788005332
              </a>
              <button
                onClick={() => { navigate('/inscription'); setMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 bg-blue-600 text-white font-bold mx-4 my-2 rounded-lg hover:bg-blue-700"
              >
                S'inscrire maintenant
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Texte */}
            <div>
              <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-bold text-sm mb-6 animate-bounce">
                🏆 Taux de réussite 85%
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Passez Votre Permis Chez Nous !
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Formation complète au code de la route et à la conduite. 
                Méthode moderne, moniteurs expérimentés, résultats garantis.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => navigate('/inscription')}
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg flex items-center gap-2"
                >
                  S'inscrire maintenant
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all"
                >
                  Se connecter
                </button>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>0788005332</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>Cocody, Abidjan</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">85%</div>
                    <div className="text-blue-200 text-sm">Taux de réussite</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">2000+</div>
                    <div className="text-blue-200 text-sm">Élèves formés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">15+</div>
                    <div className="text-blue-200 text-sm">Ans d'expérience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">24/7</div>
                    <div className="text-blue-200 text-sm">Support disponible</div>
                  </div>
                </div>
              </div>

              {/* Badge flottant */}
              <div className="absolute -top-6 -right-6 bg-yellow-400 text-blue-900 p-6 rounded-full shadow-2xl">
                <div className="text-center">
                  <div className="text-3xl font-bold">N°1</div>
                  <div className="text-xs font-semibold">À Abidjan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Avantages */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Pourquoi Choisir Mondiale ?</h2>
            <p className="text-xl text-gray-600">Les meilleures conditions pour réussir votre permis</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {avantages.map((avantage, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {avantage.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{avantage.titre}</h3>
                <p className="text-gray-600">{avantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nos Formules */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nos Formules</h2>
            <p className="text-xl text-gray-600">Choisissez la formation adaptée à vos besoins</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {formules.map((formule, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all">
                <div className={`bg-gradient-to-r ${formule.couleur} text-white px-8 py-6`}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-bold">{formule.nom}</h3>
                    <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold">
                      {formule.badge}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">{formule.prix}</span>
                    <span className="text-xl">FCFA</span>
                  </div>
                  <p className="text-sm mt-2 opacity-90">ou 3 x {Math.ceil(parseInt(formule.prix.replace(/\s/g, '')) / 3).toLocaleString()} FCFA</p>
                </div>

                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    {formule.avantages.map((avantage, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{avantage}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => navigate('/inscription')}
                    className={`w-full bg-gradient-to-r ${formule.couleur} text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all`}
                  >
                    Choisir cette formule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Témoignages */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Ce Que Disent Nos Élèves</h2>
            <p className="text-xl text-gray-600">Des centaines d'élèves satisfaits</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {temoignages.map((temoignage, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex gap-1 mb-4">
                  {[...Array(temoignage.note)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{temoignage.texte}"</p>
                <div className="font-bold text-gray-800">{temoignage.nom}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Prêt à Commencer ?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez les milliers d'élèves qui ont obtenu leur permis avec Mondiale Auto-École
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/inscription')}
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg"
            >
              S'inscrire maintenant
            </button>
            <a
              href="tel:0788005332"
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Appelez-nous
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <div className="text-xl font-bold">M</div>
                </div>
                <div className="font-bold text-lg">Mondiale Auto-École</div>
              </div>
              <p className="text-gray-400 text-sm">
                L'auto-école de référence à Abidjan pour votre permis de conduire.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Navigation</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button onClick={() => navigate('/')} className="hover:text-white">Accueil</button></li>
                <li><button onClick={() => navigate('/dashboard')} className="hover:text-white">Mes Cours</button></li>
                <li><button onClick={() => navigate('/inscription')} className="hover:text-white">S'inscrire</button></li>
                <li><button onClick={() => navigate('/admin')} className="hover:text-white">Admin</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Formations</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Toutes catégories</li>
                <li>Catégorie A (Moto)</li>
                <li>Code de la route</li>
                <li>Leçons de conduite</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  0788005332
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Cocody, Abidjan, CI
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 Mondiale Auto-École - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Accueil;

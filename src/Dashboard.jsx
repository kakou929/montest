import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  TrendingUp, 
  Award,
  CheckCircle,
  Target,
  MessageSquare,
  Zap,
  Car,
  FileText,
  Calendar,
  BarChart3,
  Navigation,
  Menu,
  X,
  Shield
} from 'lucide-react';
import PWAInstall from './PWAInstall';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    quizRealises: 0,
    noteMoyenne: 0,
    heuresFormation: 0,
    tauxReussite: 0
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedStats = localStorage.getItem('userStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  const features = [
    {
      title: 'Entraînement au Code',
      description: '40 séries de questions pour vous préparer',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      link: '/entrainement-code',
      badge: '40 Quiz'
    },
    {
      title: 'Panneaux de Signalisation',
      description: 'Apprenez tous les panneaux officiels',
      icon: <Target className="w-8 h-8" />,
      color: 'from-red-500 to-red-600',
      link: '/panneaux-signalisation',
      badge: '93+ Panneaux'
    },
    {
      title: 'Ordre de Passage',
      description: 'Règles de priorité et situations',
      icon: <Navigation className="w-8 h-8" />,
      color: 'from-indigo-500 to-indigo-600',
      link: '/ordre-passage',
      badge: '3 Situations'
    },
    {
      title: 'Messagerie Moniteur',
      description: 'Posez vos questions au moniteur',
      icon: <MessageSquare className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      link: '/messagerie-moniteur',
      badge: 'Direct'
    },
    {
      title: 'Questions Logiques',
      description: 'Développez votre logique routière',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-yellow-500 to-yellow-600',
      link: '/questions-logiques',
      badge: 'Premium'
    },
    {
      title: 'Réserver une Leçon',
      description: 'Conduite avec moniteur - 5000 FCFA/h',
      icon: <Car className="w-8 h-8" />,
      color: 'from-cyan-500 to-cyan-600',
      link: '/reservation-conduite',
      badge: '5000F'
    },
    {
      title: 'Charte Moniteur/Élève',
      description: 'Droits et devoirs de chacun',
      icon: <FileText className="w-8 h-8" />,
      color: 'from-indigo-500 to-indigo-600',
      link: '/charte-moniteur-eleve',
      badge: 'Important'
    },
    {
      title: 'Plan 1 Mois',
      description: 'Programme intensif de préparation',
      icon: <Calendar className="w-8 h-8" />,
      color: 'from-pink-500 to-pink-600',
      link: '/plan-apprentissage-1-mois',
      badge: '28 jours'
    },
    {
      title: 'Mes Résultats',
      description: 'Téléchargez votre relevé de notes',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      link: '/espace-resultats',
      badge: 'PDF'
    },
    {
      title: 'Simulateur 5 Dégagements',
      description: 'Testez-vous en situation réelle',
      icon: <Navigation className="w-8 h-8" />,
      color: 'from-orange-500 to-orange-600',
      link: '/simulateur-degagements',
      badge: 'Nouveau'
    },
    {
      title: 'Admin',
      description: 'Interface d\'administration',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-gray-700 to-gray-900',
      link: '/admin',
      badge: 'Réservé'
    }
  ];

  const statsCards = [
    {
      label: 'Quiz Réalisés',
      value: stats.quizRealises,
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'text-green-500'
    },
    {
      label: 'Note Moyenne',
      value: `${stats.noteMoyenne}/40`,
      icon: <Award className="w-6 h-6" />,
      color: 'text-blue-500'
    },
    {
      label: 'Heures de Formation',
      value: `${stats.heuresFormation}h`,
      icon: <Clock className="w-6 h-6" />,
      color: 'text-purple-500'
    },
    {
      label: 'Taux de Réussite',
      value: `${stats.tauxReussite}%`,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header avec logo */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            {/* Logo - Cliquable vers l'accueil */}
            <div 
              className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
              title="Retour à l'accueil"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="text-4xl font-bold text-blue-600">M</div>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Mondiale Auto-École</h1>
                <p className="text-blue-100 text-sm">Votre succès est notre mission</p>
              </div>
            </div>

            {/* Menu mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Navigation mobile */}
          {menuOpen && (
            <div className="md:hidden bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
              <button
                onClick={() => navigate('/inscription')}
                className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-yellow-600 transition-colors"
              >
                S'inscrire - 150 000 FCFA
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statsCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className={stat.color}>{stat.icon}</div>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Banner d'inscription */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Trophy className="w-12 h-12" />
              <div>
                <h3 className="text-2xl font-bold mb-1">Inscrivez-vous maintenant !</h3>
                <p className="text-yellow-50">150 000 FCFA (toutes catégories) • 120 000 FCFA (moto)</p>
                <p className="text-sm text-yellow-100">Paiement en 1 ou 3 fois • Wave : 0788005332 • Accès immédiat dès le 1er versement</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/inscription')}
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-yellow-50 transition-colors shadow-lg"
            >
              S'inscrire
            </button>
          </div>
        </div>

        {/* Modules de Formation */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Modules de Formation</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigate(feature.link)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
            >
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white`}>
                    {feature.icon}
                  </div>
                  {feature.badge && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      {feature.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Progression */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Votre Progression</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Progression globale</span>
                <span className="font-semibold text-blue-600">{Math.min(stats.quizRealises * 2.5, 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(stats.quizRealises * 2.5, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2025 Mondiale Auto-École - Abidjan, Côte d'Ivoire</p>
          <p className="mt-1">Contact : 0788005332</p>
        </div>
      </div>

      {/* Composant PWA Install */}
      <PWAInstall />
    </div>
  );
};

export default Dashboard;

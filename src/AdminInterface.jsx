import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  CheckCircle, 
  XCircle, 
  User, 
  Phone, 
  Mail,
  Calendar,
  Award,
  Car,
  FileText,
  Search,
  Filter
} from 'lucide-react';

const AdminInterface = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [eleves, setEleves] = useState([]);
  const [selectedEleve, setSelectedEleve] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('tous');

  // Mot de passe admin (à changer en production)
  const ADMIN_PASSWORD = 'admin123';

  useEffect(() => {
    if (isAuthenticated) {
      loadEleves();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin-session', 'true');
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const loadEleves = () => {
    // Charger tous les élèves (simulation avec localStorage)
    const eleveData = localStorage.getItem('eleveData');
    const userStats = localStorage.getItem('userStats');
    const completedQuizzes = localStorage.getItem('completedQuizzes');
    
    if (eleveData) {
      const eleve = JSON.parse(eleveData);
      const stats = userStats ? JSON.parse(userStats) : {};
      const quizzes = completedQuizzes ? JSON.parse(completedQuizzes) : [];
      
      setEleves([{
        ...eleve,
        stats,
        quizzes,
        id: eleve.telephone || '1'
      }]);
    }
  };

  const handleValidateCode = (eleveId) => {
    const eleveData = JSON.parse(localStorage.getItem('eleveData'));
    eleveData.codeValide = true;
    eleveData.dateValidationCode = new Date().toISOString();
    localStorage.setItem('eleveData', JSON.stringify(eleveData));
    loadEleves();
    alert('Code validé avec succès !');
  };

  const handleValidateConduite = (eleveId) => {
    const eleveData = JSON.parse(localStorage.getItem('eleveData'));
    eleveData.conduiteValide = true;
    eleveData.dateValidationConduite = new Date().toISOString();
    localStorage.setItem('eleveData', JSON.stringify(eleveData));
    loadEleves();
    alert('Conduite validée avec succès !');
  };

  const handleInvalidateCode = (eleveId) => {
    const eleveData = JSON.parse(localStorage.getItem('eleveData'));
    eleveData.codeValide = false;
    delete eleveData.dateValidationCode;
    localStorage.setItem('eleveData', JSON.stringify(eleveData));
    loadEleves();
    alert('Validation du code annulée');
  };

  const handleInvalidateConduite = (eleveId) => {
    const eleveData = JSON.parse(localStorage.getItem('eleveData'));
    eleveData.conduiteValide = false;
    delete eleveData.dateValidationConduite;
    localStorage.setItem('eleveData', JSON.stringify(eleveData));
    loadEleves();
    alert('Validation de la conduite annulée');
  };

  const handleDownloadResults = (eleve) => {
    const textContent = `
===========================================
    MONDIALE AUTO-ÉCOLE - RELEVÉ ADMIN
===========================================

INFORMATIONS ÉLÈVE
-------------------------------------------
Nom complet : ${eleve.prenom} ${eleve.nom}
Date de naissance : ${new Date(eleve.dateNaissance).toLocaleDateString('fr-FR')}
Téléphone : ${eleve.telephone}
Email : ${eleve.email || 'Non renseigné'}
Adresse : ${eleve.adresse}, ${eleve.quartier}, ${eleve.commune}
Formule : ${eleve.formule === 'toutes-categories' ? 'Toutes Catégories' : 'Catégorie A (Moto)'}
Date d'inscription : ${new Date(eleve.dateInscription).toLocaleDateString('fr-FR')}

STATUT DES EXAMENS
-------------------------------------------
Code de la route : ${eleve.codeValide ? '✓ VALIDÉ le ' + new Date(eleve.dateValidationCode).toLocaleDateString('fr-FR') : '✗ NON VALIDÉ'}
Conduite : ${eleve.conduiteValide ? '✓ VALIDÉ le ' + new Date(eleve.dateValidationConduite).toLocaleDateString('fr-FR') : '✗ NON VALIDÉ'}

STATISTIQUES D'APPRENTISSAGE
-------------------------------------------
Quiz réalisés : ${eleve.stats?.quizRealises || 0}
Note moyenne : ${eleve.stats?.noteMoyenne || 0}/40
Heures de formation : ${eleve.stats?.heuresFormation || 0}h
Taux de réussite : ${eleve.stats?.tauxReussite || 0}%

DÉTAIL DES QUIZ
-------------------------------------------
${eleve.quizzes && eleve.quizzes.length > 0 ? 
  eleve.quizzes.map((q, i) => 
    `${i + 1}. Série ${q.quizId} - ${q.score}/40 - ${new Date(q.date).toLocaleDateString('fr-FR')}`
  ).join('\n') 
  : 'Aucun quiz réalisé'}

APPRÉCIATION GÉNÉRALE
-------------------------------------------
${getAppreciation(eleve.stats?.noteMoyenne || 0, eleve.codeValide, eleve.conduiteValide)}

===========================================
Document généré le ${new Date().toLocaleString('fr-FR')}
Par : Mondiale Auto-École
Tél : 0788005332
===========================================
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Releve_${eleve.nom}_${eleve.prenom}_${new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getAppreciation = (moyenne, codeValide, conduiteValide) => {
    let appreciation = '';
    
    if (codeValide && conduiteValide) {
      appreciation = '🎉 FÉLICITATIONS ! L\'élève a réussi le code ET la conduite.\nIl/Elle peut obtenir son permis de conduire.';
    } else if (codeValide) {
      appreciation = '✓ Code de la route validé. L\'élève doit maintenant se concentrer sur la pratique.';
    } else if (moyenne >= 35) {
      appreciation = '✓ Très bon niveau théorique. L\'élève est prêt pour l\'examen du code.';
    } else if (moyenne >= 30) {
      appreciation = '→ Bon niveau. Quelques révisions supplémentaires sont recommandées.';
    } else {
      appreciation = '→ L\'élève doit poursuivre son apprentissage théorique.';
    }
    
    return appreciation;
  };

  const filteredEleves = eleves.filter(eleve => {
    const matchesSearch = 
      eleve.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eleve.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eleve.telephone?.includes(searchTerm);
    
    const matchesFilter = 
      filterStatus === 'tous' ||
      (filterStatus === 'code-valide' && eleve.codeValide) ||
      (filterStatus === 'conduite-valide' && eleve.conduiteValide) ||
      (filterStatus === 'en-cours' && (!eleve.codeValide || !eleve.conduiteValide));
    
    return matchesSearch && matchesFilter;
  });

  // Page de connexion
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Administration</h1>
              <p className="text-gray-600">Mondiale Auto-École</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mot de passe administrateur
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Entrez le mot de passe"
                />
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Se connecter
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
              >
                Retour
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              Accès réservé aux administrateurs
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Interface admin
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Interface d'Administration</h1>
                <p className="text-gray-300 text-sm">Gestion des élèves</p>
              </div>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('admin-session');
                setIsAuthenticated(false);
              }}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Recherche et filtres */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Search className="inline w-4 h-4 mr-2" />
                Rechercher un élève
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nom, prénom ou téléphone"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Filter className="inline w-4 h-4 mr-2" />
                Filtrer par statut
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="tous">Tous les élèves</option>
                <option value="code-valide">Code validé</option>
                <option value="conduite-valide">Conduite validée</option>
                <option value="en-cours">En cours de formation</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des élèves */}
        {filteredEleves.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Aucun élève trouvé</h3>
            <p className="text-gray-600">Aucun élève ne correspond à vos critères de recherche</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredEleves.map((eleve) => (
              <div key={eleve.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header élève */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{eleve.prenom} {eleve.nom}</h3>
                        <p className="text-blue-100 text-sm">
                          Inscrit le {new Date(eleve.dateInscription).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadResults(eleve)}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Télécharger relevé
                    </button>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  {/* Informations */}
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">Contact</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{eleve.telephone}</span>
                        </div>
                        {eleve.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span>{eleve.email}</span>
                          </div>
                        )}
                        <div className="flex items-start gap-2">
                          <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                          <span>{eleve.adresse}, {eleve.commune}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">Formation</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">Formule:</span>
                          <span className="font-semibold ml-2">
                            {eleve.formule === 'toutes-categories' ? 'Toutes Catégories' : 'Catégorie A'}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Paiement:</span>
                          <span className="font-semibold ml-2">
                            {eleve.paiement === 'trois-fois' ? 'En 3 fois' : 'En une fois'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-800 mb-3">Statistiques</h4>
                      <div className="space-y-2 text-sm">
                        <div>Quiz: <span className="font-semibold">{eleve.stats?.quizRealises || 0}</span></div>
                        <div>Moyenne: <span className="font-semibold">{eleve.stats?.noteMoyenne || 0}/40</span></div>
                        <div>Heures: <span className="font-semibold">{eleve.stats?.heuresFormation || 0}h</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Validations */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Code */}
                    <div className={`border-2 rounded-lg p-4 ${
                      eleve.codeValide ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-gray-700" />
                          <span className="font-bold text-gray-800">Code de la route</span>
                        </div>
                        {eleve.codeValide ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <XCircle className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      {eleve.codeValide ? (
                        <>
                          <p className="text-green-700 text-sm mb-3">
                            ✓ Validé le {new Date(eleve.dateValidationCode).toLocaleDateString('fr-FR')}
                          </p>
                          <button
                            onClick={() => handleInvalidateCode(eleve.id)}
                            className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-all"
                          >
                            Annuler la validation
                          </button>
                        </>
                      ) : (
                        <>
                          <p className="text-gray-600 text-sm mb-3">
                            Code non validé
                          </p>
                          <button
                            onClick={() => handleValidateCode(eleve.id)}
                            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all"
                          >
                            Valider le code
                          </button>
                        </>
                      )}
                    </div>

                    {/* Conduite */}
                    <div className={`border-2 rounded-lg p-4 ${
                      eleve.conduiteValide ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Car className="w-5 h-5 text-gray-700" />
                          <span className="font-bold text-gray-800">Conduite</span>
                        </div>
                        {eleve.conduiteValide ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <XCircle className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      {eleve.conduiteValide ? (
                        <>
                          <p className="text-green-700 text-sm mb-3">
                            ✓ Validé le {new Date(eleve.dateValidationConduite).toLocaleDateString('fr-FR')}
                          </p>
                          <button
                            onClick={() => handleInvalidateConduite(eleve.id)}
                            className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-all"
                          >
                            Annuler la validation
                          </button>
                        </>
                      ) : (
                        <>
                          <p className="text-gray-600 text-sm mb-3">
                            Conduite non validée
                          </p>
                          <button
                            onClick={() => handleValidateConduite(eleve.id)}
                            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all"
                          >
                            Valider la conduite
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Badge de réussite complète */}
                  {eleve.codeValide && eleve.conduiteValide && (
                    <div className="mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4 text-center">
                      <Award className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-bold text-lg">🎉 Permis obtenu !</p>
                      <p className="text-sm text-green-100">L'élève a réussi toute sa formation</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInterface;

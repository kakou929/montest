import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, MapPin, Calendar, Upload, CheckCircle, AlertCircle } from 'lucide-react';

const Inscription = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Informations personnelles
    nom: '',
    prenom: '',
    dateNaissance: '',
    lieuNaissance: '',
    sexe: '',
    
    // Contact
    telephone: '',
    email: '',
    adresse: '',
    quartier: '',
    commune: '',
    
    // Formation
    formule: 'toutes-categories', // ou 'categorie-a'
    paiement: 'une-fois', // ou 'trois-fois'
    
    // Documents (simulation)
    pieceIdentite: null,
    photo: null,
    certificatMedical: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
    if (!formData.dateNaissance) newErrors.dateNaissance = 'La date de naissance est requise';
    if (!formData.lieuNaissance.trim()) newErrors.lieuNaissance = 'Le lieu de naissance est requis';
    if (!formData.sexe) newErrors.sexe = 'Le sexe est requis';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Le téléphone est requis';
    } else if (formData.telephone.replace(/\s/g, '').length < 10) {
      newErrors.telephone = 'Numéro de téléphone invalide';
    }
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.adresse.trim()) newErrors.adresse = 'L\'adresse est requise';
    if (!formData.commune.trim()) newErrors.commune = 'La commune est requise';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simuler l'envoi des données
    setTimeout(() => {
      // Sauvegarder les données de l'élève
      const eleveData = {
        ...formData,
        dateInscription: new Date().toISOString(),
        statut: 'inscrit',
        premiumStartDate: new Date().toISOString(),
        codeValide: false,
        conduiteValide: false
      };
      
      localStorage.setItem('eleveData', JSON.stringify(eleveData));
      localStorage.setItem('userPhone', formData.telephone);
      localStorage.setItem('isPremium', 'true'); // Accès immédiat
      localStorage.setItem('premiumPlan', formData.formule);
      localStorage.setItem('premiumStartDate', new Date().toISOString());
      
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 2000);
  };

  const montantTotal = formData.formule === 'toutes-categories' ? 150000 : 120000;
  const montantPremierVersement = formData.paiement === 'trois-fois' 
    ? Math.ceil(montantTotal / 3) 
    : montantTotal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => step === 1 ? navigate('/') : setStep(step - 1)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold mb-2">Formulaire d'Inscription</h1>
              <p className="text-blue-100">Étape {step} sur 4</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full transition-all ${
                  s <= step ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Étape 1: Informations personnelles */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-blue-600" />
              Informations Personnelles
            </h2>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                      errors.nom ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    placeholder="Votre nom"
                  />
                  {errors.nom && (
                    <p className="text-red-500 text-sm mt-1">{errors.nom}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                      errors.prenom ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    placeholder="Votre prénom"
                  />
                  {errors.prenom && (
                    <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date de naissance <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateNaissance"
                    value={formData.dateNaissance}
                    onChange={handleChange}
                    max={new Date(Date.now() - 567648000000).toISOString().split('T')[0]} // 18 ans
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                      errors.dateNaissance ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                  />
                  {errors.dateNaissance && (
                    <p className="text-red-500 text-sm mt-1">{errors.dateNaissance}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Lieu de naissance <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lieuNaissance"
                    value={formData.lieuNaissance}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                      errors.lieuNaissance ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    placeholder="Ville de naissance"
                  />
                  {errors.lieuNaissance && (
                    <p className="text-red-500 text-sm mt-1">{errors.lieuNaissance}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sexe <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sexe"
                      value="M"
                      checked={formData.sexe === 'M'}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">Masculin</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sexe"
                      value="F"
                      checked={formData.sexe === 'F'}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">Féminin</span>
                  </label>
                </div>
                {errors.sexe && (
                  <p className="text-red-500 text-sm mt-1">{errors.sexe}</p>
                )}
              </div>
            </div>

            <button
              onClick={handleNextStep}
              className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              Continuer
            </button>
          </div>
        )}

        {/* Étape 2: Contact */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Phone className="w-6 h-6 text-blue-600" />
              Coordonnées
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                    errors.telephone ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                  }`}
                  placeholder="XX XX XX XX XX"
                />
                {errors.telephone && (
                  <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email (optionnel)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                    errors.email ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                  }`}
                  placeholder="votre.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Adresse <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                    errors.adresse ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                  }`}
                  placeholder="Numéro et rue"
                />
                {errors.adresse && (
                  <p className="text-red-500 text-sm mt-1">{errors.adresse}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quartier
                  </label>
                  <input
                    type="text"
                    name="quartier"
                    value={formData.quartier}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Votre quartier"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Commune <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="commune"
                    value={formData.commune}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${
                      errors.commune ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                  >
                    <option value="">Sélectionnez</option>
                    <option value="Cocody">Cocody</option>
                    <option value="Plateau">Plateau</option>
                    <option value="Adjamé">Adjamé</option>
                    <option value="Yopougon">Yopougon</option>
                    <option value="Abobo">Abobo</option>
                    <option value="Marcory">Marcory</option>
                    <option value="Treichville">Treichville</option>
                    <option value="Koumassi">Koumassi</option>
                    <option value="Port-Bouët">Port-Bouët</option>
                    <option value="Attécoubé">Attécoubé</option>
                  </select>
                  {errors.commune && (
                    <p className="text-red-500 text-sm mt-1">{errors.commune}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-300 transition-all"
              >
                Retour
              </button>
              <button
                onClick={handleNextStep}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Continuer
              </button>
            </div>
          </div>
        )}

        {/* Étape 3: Choix de la formule */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Choisissez votre Formation</h2>

            {/* Formules */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <label
                className={`cursor-pointer border-2 rounded-xl p-6 transition-all ${
                  formData.formule === 'toutes-categories'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <input
                  type="radio"
                  name="formule"
                  value="toutes-categories"
                  checked={formData.formule === 'toutes-categories'}
                  onChange={handleChange}
                  className="hidden"
                />
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Toutes Catégories</h3>
                  {formData.formule === 'toutes-categories' && (
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">150 000 FCFA</div>
                <p className="text-sm text-gray-600">Formation complète pour tous types de permis</p>
              </label>

              <label
                className={`cursor-pointer border-2 rounded-xl p-6 transition-all ${
                  formData.formule === 'categorie-a'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <input
                  type="radio"
                  name="formule"
                  value="categorie-a"
                  checked={formData.formule === 'categorie-a'}
                  onChange={handleChange}
                  className="hidden"
                />
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Catégorie A (Moto)</h3>
                  {formData.formule === 'categorie-a' && (
                    <CheckCircle className="w-6 h-6 text-orange-600" />
                  )}
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-2">120 000 FCFA</div>
                <p className="text-sm text-gray-600">Formation spécialisée moto</p>
              </label>
            </div>

            {/* Mode de paiement */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Mode de paiement</h3>
              <div className="space-y-3">
                <label
                  className={`cursor-pointer border-2 rounded-lg p-4 flex items-center justify-between transition-all ${
                    formData.paiement === 'une-fois'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paiement"
                      value="une-fois"
                      checked={formData.paiement === 'une-fois'}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <div>
                      <div className="font-semibold text-gray-800">Paiement en une fois</div>
                      <div className="text-sm text-gray-600">Accès immédiat complet</div>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-blue-600">
                    {montantTotal.toLocaleString()} F
                  </div>
                </label>

                <label
                  className={`cursor-pointer border-2 rounded-lg p-4 flex items-center justify-between transition-all ${
                    formData.paiement === 'trois-fois'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paiement"
                      value="trois-fois"
                      checked={formData.paiement === 'trois-fois'}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <div>
                      <div className="font-semibold text-gray-800">Paiement en 3 fois</div>
                      <div className="text-sm text-gray-600">Accès immédiat dès le 1er versement</div>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-blue-600">
                    {montantPremierVersement.toLocaleString()} F
                  </div>
                </label>
              </div>
            </div>

            {/* Info importante */}
            <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-green-900 mb-1">Accès immédiat !</p>
                  <p className="text-green-800 text-sm">
                    Vous aurez accès à toute la plateforme dès le premier versement. 
                    Plus besoin d'attendre !
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-300 transition-all"
              >
                Retour
              </button>
              <button
                onClick={handleNextStep}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Continuer
              </button>
            </div>
          </div>
        )}

        {/* Étape 4: Paiement et validation */}
        {step === 4 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Paiement Wave Money</h2>

            {/* Récapitulatif */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-800 mb-4">Récapitulatif</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nom complet :</span>
                  <span className="font-semibold">{formData.prenom} {formData.nom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Téléphone :</span>
                  <span className="font-semibold">{formData.telephone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Formation :</span>
                  <span className="font-semibold">
                    {formData.formule === 'toutes-categories' ? 'Toutes Catégories' : 'Catégorie A (Moto)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Paiement :</span>
                  <span className="font-semibold">
                    {formData.paiement === 'trois-fois' ? 'En 3 fois' : 'En une fois'}
                  </span>
                </div>
                <div className="border-t border-gray-200 my-3"></div>
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-gray-800">À payer maintenant :</span>
                  <span className="font-bold text-blue-600">{montantPremierVersement.toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>

            {/* Instructions Wave */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white mb-6">
              <h3 className="text-xl font-bold mb-4">💰 Envoyez votre paiement Wave</h3>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="text-sm text-gray-600 mb-1">Numéro Wave</div>
                <div className="text-3xl font-bold text-gray-800">0788005332</div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-lg font-semibold mb-2">Montant : {montantPremierVersement.toLocaleString()} FCFA</p>
                {formData.paiement === 'trois-fois' && (
                  <p className="text-sm text-yellow-100">
                    Premier versement • Il vous restera 2 versements à régler
                  </p>
                )}
              </div>
            </div>

            {/* Alerte */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-blue-900 mb-1">Important</p>
                  <p className="text-blue-800 text-sm">
                    Après avoir effectué le paiement Wave au <strong>0788005332</strong>, 
                    cliquez sur "Confirmer mon inscription" ci-dessous. Vous aurez un accès immédiat 
                    à toute la plateforme !
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-300 transition-all"
                disabled={isSubmitting}
              >
                Retour
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-bold hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Confirmation...
                  </span>
                ) : (
                  'Confirmer mon inscription'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inscription;

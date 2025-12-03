import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Phone, Copy, CheckCircle, AlertCircle } from 'lucide-react';

const PremiumWave = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('toutes-categories');
  const [paymentOption, setPaymentOption] = useState('une-fois');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const WAVE_NUMBER = '0788005332';

  const plans = [
    {
      id: 'toutes-categories',
      nom: 'Toutes Catégories',
      prix: 150000,
      description: 'Formation complète pour toutes les catégories de permis',
      badge: 'Le plus complet',
      couleur: 'from-blue-500 to-blue-600',
      includes: [
        'Code de la route complet',
        'Toutes catégories de permis',
        '40 séries de quiz',
        '93+ panneaux de signalisation',
        'Support 24/7',
        'Cours en ligne illimités',
        'Accès à vie'
      ]
    },
    {
      id: 'categorie-a',
      nom: 'Catégorie A (Moto)',
      prix: 120000,
      description: 'Formation spécialisée pour le permis moto',
      badge: 'Spécial Moto',
      couleur: 'from-orange-500 to-orange-600',
      includes: [
        'Code de la route moto',
        'Formation catégorie A',
        '30 séries de quiz moto',
        'Panneaux spécifiques',
        'Support 24/7',
        'Cours en ligne',
        'Accès 6 mois'
      ]
    }
  ];

  const selectedPlanDetails = plans.find(p => p.id === selectedPlan);
  const montantTotal = selectedPlanDetails?.prix || 0;
  const montantPaiement = paymentOption === 'trois-fois' ? Math.ceil(montantTotal / 3) : montantTotal;

  const copyWaveNumber = () => {
    navigator.clipboard.writeText(WAVE_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert('Veuillez entrer votre numéro de téléphone');
      return;
    }

    setIsProcessing(true);

    // Simuler la validation
    setTimeout(() => {
      localStorage.setItem('isPremium', 'true');
      localStorage.setItem('premiumPlan', selectedPlan);
      localStorage.setItem('premiumStartDate', new Date().toISOString());
      localStorage.setItem('userPhone', phoneNumber);
      
      setIsProcessing(false);
      setShowSuccess(true);

      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Merci !</h2>
            <p className="text-gray-600 mb-4">Nous avons bien reçu votre demande</p>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded text-left mb-6">
              <p className="text-green-800 text-sm">
                Nous allons vérifier votre paiement Wave et vous contacter sous peu pour confirmer votre inscription.
              </p>
            </div>
            <p className="text-gray-500 text-sm">Redirection...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold mb-2">Inscription & Paiement</h1>
              <p className="text-blue-100">Paiement sécurisé via Wave Money</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Plans */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Choisissez votre formation</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden ${
                  selectedPlan === plan.id ? 'ring-4 ring-blue-500' : ''
                }`}
              >
                <div className={`bg-gradient-to-r ${plan.couleur} text-white px-6 py-4`}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-bold">{plan.nom}</h3>
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                      {plan.badge}
                    </span>
                  </div>
                  <p className="text-sm opacity-90">{plan.description}</p>
                </div>
                
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-gray-800 mb-1">
                      {plan.prix.toLocaleString()} FCFA
                    </div>
                    <div className="text-sm text-gray-600">ou 3 x {Math.ceil(plan.prix / 3).toLocaleString()} FCFA</div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.includes.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  {selectedPlan === plan.id && (
                    <div className="flex items-center gap-2 text-blue-600 font-semibold">
                      <Check className="w-5 h-5" />
                      <span>Sélectionné</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Options de paiement */}
        <div className="max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Mode de paiement</h2>
          <div className="space-y-4">
            <label
              className={`flex items-center gap-4 p-4 bg-white rounded-xl cursor-pointer transition-all ${
                paymentOption === 'une-fois' ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
              }`}
            >
              <input
                type="radio"
                name="paymentOption"
                value="une-fois"
                checked={paymentOption === 'une-fois'}
                onChange={(e) => setPaymentOption(e.target.value)}
                className="w-5 h-5"
              />
              <div className="flex-1">
                <div className="font-bold text-gray-800">Paiement en une fois</div>
                <div className="text-sm text-gray-600">Payez le montant total maintenant</div>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {montantTotal.toLocaleString()} FCFA
              </div>
            </label>

            <label
              className={`flex items-center gap-4 p-4 bg-white rounded-xl cursor-pointer transition-all ${
                paymentOption === 'trois-fois' ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
              }`}
            >
              <input
                type="radio"
                name="paymentOption"
                value="trois-fois"
                checked={paymentOption === 'trois-fois'}
                onChange={(e) => setPaymentOption(e.target.value)}
                className="w-5 h-5"
              />
              <div className="flex-1">
                <div className="font-bold text-gray-800">Paiement en 3 fois</div>
                <div className="text-sm text-gray-600">Divisez en 3 mensualités égales</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.ceil(montantTotal / 3).toLocaleString()} FCFA
                </div>
                <div className="text-xs text-gray-500">par mois</div>
              </div>
            </label>
          </div>
        </div>

        {/* Instructions de paiement Wave */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg p-8 text-white mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              💰 Paiement Wave Money
            </h2>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-6">
              <p className="text-lg mb-4">1️⃣ Envoyez votre paiement Wave à ce numéro :</p>
              
              <div className="bg-white rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Numéro Wave</div>
                  <div className="text-3xl font-bold text-gray-800">{WAVE_NUMBER}</div>
                </div>
                <button
                  onClick={copyWaveNumber}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      Copié !
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copier
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
              <p className="text-lg mb-2">2️⃣ Montant à envoyer :</p>
              <div className="text-4xl font-bold">
                {montantPaiement.toLocaleString()} FCFA
              </div>
              {paymentOption === 'trois-fois' && (
                <p className="text-sm mt-2 text-yellow-100">
                  Premier versement (il vous restera 2 versements)
                </p>
              )}
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-lg">3️⃣ Confirmez votre paiement ci-dessous</p>
            </div>
          </div>

          {/* Formulaire de confirmation */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Confirmation de paiement</h3>

            {/* Alerte importante */}
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-orange-900 mb-1">Important</p>
                  <p className="text-orange-800 text-sm">
                    Après avoir envoyé votre paiement Wave au <strong>{WAVE_NUMBER}</strong>, 
                    entrez votre numéro de téléphone ci-dessous pour confirmation.
                  </p>
                </div>
              </div>
            </div>

            {/* Récapitulatif */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Formation :</span>
                <span className="font-bold text-gray-800">{selectedPlanDetails?.nom}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Paiement :</span>
                <span className="font-bold text-gray-800">
                  {paymentOption === 'trois-fois' ? 'En 3 fois' : 'En une fois'}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Numéro Wave :</span>
                <span className="font-bold text-blue-600">{WAVE_NUMBER}</span>
              </div>
              <div className="border-t border-gray-200 my-3"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">
                  {paymentOption === 'trois-fois' ? 'À payer maintenant :' : 'Total :'}
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  {montantPaiement.toLocaleString()} FCFA
                </span>
              </div>
            </div>

            {/* Votre numéro */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone className="inline w-4 h-4 mr-2" />
                Votre numéro de téléphone
              </label>
              <input
                type="tel"
                placeholder="XX XX XX XX XX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
              />
              <p className="text-sm text-gray-500 mt-2">
                Nous vous contacterons pour confirmer votre inscription
              </p>
            </div>

            {/* Bouton de confirmation */}
            <button
              onClick={handleConfirm}
              disabled={isProcessing || !phoneNumber}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Confirmation en cours...
                </span>
              ) : (
                'Confirmer mon paiement'
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              En confirmant, vous acceptez nos conditions générales
            </p>
          </div>

          {/* Support */}
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-blue-900 mb-2">
              <Phone className="inline w-5 h-5 mr-2" />
              Besoin d'aide ?
            </h3>
            <p className="text-blue-800 text-sm mb-2">
              Contactez-nous directement pour toute question :
            </p>
            <a href={`tel:${WAVE_NUMBER}`} className="text-xl font-bold text-blue-600 hover:text-blue-700">
              {WAVE_NUMBER}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumWave;

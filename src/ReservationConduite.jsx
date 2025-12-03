import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Car, Calendar, Clock, User, Phone, MapPin, CreditCard, CheckCircle } from 'lucide-react';

const ReservationConduite = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    date: '',
    heure: '',
    duree: 1,
    lieu: '',
    typeVehicule: 'Manuel',
    moniteur: 'Auto'
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const heuresDisponibles = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const moniteurs = [
    { id: 1, nom: 'M. Kouassi Jean', specialite: 'Boîte manuelle', experience: '15 ans' },
    { id: 2, nom: 'Mme Diallo Aminata', specialite: 'Boîte automatique', experience: '10 ans' },
    { id: 3, nom: 'M. Yao Patrick', specialite: 'Conduite urbaine', experience: '12 ans' },
    { id: 4, nom: 'Attribution automatique', specialite: 'Selon disponibilité', experience: '-' }
  ];

  const lieuxRdv = [
    'Siège Mondiale - Cocody',
    'Agence Adjamé',
    'Agence Yopougon',
    'À votre domicile (+2000 FCFA)'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    // Calculer le prix total
    const prixBase = 5000;
    const prixTotal = prixBase * formData.duree;
    const supplement = formData.lieu === 'À votre domicile (+2000 FCFA)' ? 2000 : 0;
    const total = prixTotal + supplement;

    // Sauvegarder la réservation
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    reservations.push({
      ...formData,
      prix: total,
      date: new Date().toISOString(),
      status: 'En attente'
    });
    localStorage.setItem('reservations', JSON.stringify(reservations));

    setShowSuccess(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  const prixTotal = 5000 * formData.duree + (formData.lieu === 'À votre domicile (+2000 FCFA)' ? 2000 : 0);

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Réservation Confirmée !</h2>
            <p className="text-gray-600 mb-4">Votre leçon de conduite est réservée</p>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded text-left mb-6">
              <p className="text-green-800 text-sm mb-2">
                <strong>Date :</strong> {formData.date} à {formData.heure}
              </p>
              <p className="text-green-800 text-sm mb-2">
                <strong>Durée :</strong> {formData.duree}h
              </p>
              <p className="text-green-800 text-sm">
                <strong>Prix :</strong> {prixTotal.toLocaleString()} FCFA
              </p>
            </div>
            <p className="text-gray-500 text-sm">Un SMS de confirmation vous sera envoyé</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold mb-2">Réserver une Leçon de Conduite</h1>
              <p className="text-blue-100">5000 FCFA / heure avec moniteur professionnel</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2">
            <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-white' : 'bg-white/30'}`}></div>
            <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-white' : 'bg-white/30'}`}></div>
            <div className={`flex-1 h-2 rounded-full ${step >= 3 ? 'bg-white' : 'bg-white/30'}`}></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Étape 1: Informations personnelles */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-blue-600" />
              Vos informations
            </h2>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Votre prénom"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="XX XX XX XX XX"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type de véhicule</label>
                <select
                  name="typeVehicule"
                  value={formData.typeVehicule}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="Manuel">Boîte manuelle</option>
                  <option value="Automatique">Boîte automatique</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!formData.nom || !formData.prenom || !formData.telephone}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuer
            </button>
          </div>
        )}

        {/* Étape 2: Date et heure */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-600" />
              Date et horaire
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date de la leçon</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Heure de début</label>
                <div className="grid grid-cols-5 gap-2">
                  {heuresDisponibles.map((heure) => (
                    <button
                      key={heure}
                      onClick={() => setFormData({ ...formData, heure })}
                      className={`py-2 rounded-lg font-semibold transition-all ${
                        formData.heure === heure
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {heure}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Durée (heures)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((duree) => (
                    <button
                      key={duree}
                      onClick={() => setFormData({ ...formData, duree })}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                        formData.duree === duree
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {duree}h
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Lieu de rendez-vous</label>
                <select
                  name="lieu"
                  value={formData.lieu}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Sélectionnez un lieu</option>
                  {lieuxRdv.map((lieu) => (
                    <option key={lieu} value={lieu}>{lieu}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-300 transition-all"
              >
                Retour
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!formData.date || !formData.heure || !formData.lieu}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continuer
              </button>
            </div>
          </div>
        )}

        {/* Étape 3: Confirmation et paiement */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-blue-600" />
              Récapitulatif et paiement
            </h2>

            {/* Récapitulatif */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-800 mb-4">Détails de votre réservation</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Élève :</span>
                  <span className="font-semibold">{formData.prenom} {formData.nom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Téléphone :</span>
                  <span className="font-semibold">{formData.telephone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date :</span>
                  <span className="font-semibold">{formData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Heure :</span>
                  <span className="font-semibold">{formData.heure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Durée :</span>
                  <span className="font-semibold">{formData.duree} heure(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type de véhicule :</span>
                  <span className="font-semibold">{formData.typeVehicule}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lieu :</span>
                  <span className="font-semibold">{formData.lieu}</span>
                </div>
                <div className="border-t border-gray-200 my-3"></div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prix unitaire :</span>
                  <span className="font-semibold">5 000 FCFA/h</span>
                </div>
                {formData.lieu === 'À votre domicile (+2000 FCFA)' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Supplément domicile :</span>
                    <span className="font-semibold">2 000 FCFA</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-blue-600 mt-2">
                  <span>TOTAL :</span>
                  <span>{prixTotal.toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>

            {/* Mode de paiement */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-4">Mode de paiement</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-4 border-2 border-blue-500 rounded-lg bg-blue-50 cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">Paiement sur place</div>
                    <div className="text-sm text-gray-600">Payez en espèces au moniteur</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer">
                  <input type="radio" name="payment" className="w-4 h-4" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">Wave Money</div>
                    <div className="text-sm text-gray-600">Paiement mobile sécurisé</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-300 transition-all"
              >
                Retour
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-bold hover:from-green-700 hover:to-green-800 transition-all"
              >
                Confirmer la réservation
              </button>
            </div>
          </div>
        )}

        {/* Info supplémentaire */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-blue-900 mb-2">ℹ️ Informations importantes</h3>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>• Annulation gratuite jusqu'à 24h avant la leçon</li>
            <li>• Pensez à apporter votre pièce d'identité</li>
            <li>• Le moniteur vous contactera 1h avant la leçon</li>
            <li>• Véhicules équipés de double commande pour votre sécurité</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReservationConduite;

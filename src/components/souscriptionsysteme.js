import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doc, updateDoc, addDoc, collection, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function SubscriptionSystem({ user }) {
  const [userData, setUserData] = useState(null);
  const [trialDaysLeft, setTrialDaysLeft] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTrialStatus = async () => {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);

          // Vérifier si l'utilisateur est en période d'essai
          if (!data.isPremium && data.createdAt) {
            const createdDate = new Date(data.createdAt);
            const today = new Date();
            const daysSinceCreation = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24));
            const daysLeft = 3 - daysSinceCreation;

            setTrialDaysLeft(daysLeft);

            // Si la période d'essai est terminée, bloquer l'accès
            if (daysLeft <= 0 && !data.isPremium) {
              setShowPaymentModal(true);
            }
          }
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    checkTrialStatus();
  }, [user]);

  const plans = [
    {
      id: 'one-time',
      name: 'Paiement en une fois',
      price: 120000,
      priceText: '120 000 FCFA',
      duration: 'Accès à vie',
      savings: '✅ Meilleur Prix',
      color: '#2563eb',
      features: [
        '✅ Accès illimité à tous les quiz',
        '✅ Tous les panneaux officiels (93+)',
        '✅ Situations routières avec images',
        '✅ Tutoriels de dégagement',
        '✅ Contact moniteur par SMS',
        '✅ Réservation cours de conduite',
        '✅ Suivi progression détaillé',
        '✅ Support prioritaire 24/7',
        '✅ Certificat de formation',
        '✅ Garantie satisfait ou remboursé'
      ],
      popular: true
    },
    {
      id: 'three-times',
      name: 'Paiement en 3 fois',
      priceText: '3 × 40 000 FCFA',
      price: 40000,
      totalPrice: 120000,
      duration: 'Paiement échelonné',
      color: '#10b981',
      features: [
        '✅ Paiement échelonné sur 3 mois',
        '✅ Accès immédiat à la plateforme',
        '✅ Tous les contenus premium',
        '✅ Quiz illimités',
        '✅ Panneaux officiels complets',
        '✅ Support personnalisé',
        '✅ Suivi de progression',
        '✅ Sans engagement'
      ]
    }
  ];

  const handlePayment = async () => {
    if (!selectedPlan) {
      setMessage('⚠️ Veuillez sélectionner un plan');
      setMessageType('error');
      return;
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      setMessage('⚠️ Numéro Wave Money invalide');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Simulation paiement Wave Money (3 secondes)
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Enregistrer la transaction
      await addDoc(collection(db, 'transactions'), {
        userId: user.uid,
        phoneNumber: phoneNumber,
        amount: selectedPlan.price,
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        status: 'completed',
        paymentMethod: 'wave',
        createdAt: new Date().toISOString()
      });

      // Mettre à jour le statut premium
      await updateDoc(doc(db, 'users', user.uid), {
        isPremium: true,
        subscriptionType: selectedPlan.id,
        subscriptionDate: new Date().toISOString(),
        subscriptionAmount: selectedPlan.price,
        trialEnded: true
      });

      setMessage('✅ Paiement réussi ! Votre compte Premium est actif.');
      setMessageType('success');
      setShowPaymentModal(false);

      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (error) {
      console.error('Erreur:', error);
      setMessage('❌ Erreur lors du paiement. Réessayez.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  // Bannière période d'essai
  const TrialBanner = () => {
    if (userData?.isPremium || trialDaysLeft === null || trialDaysLeft > 3) return null;

    if (trialDaysLeft > 0) {
      return (
        <div style={{
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
          position: 'sticky',
          top: '0',
          zIndex: 100,
          boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏰ Période d'essai gratuite</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Il vous reste {trialDaysLeft} jour{trialDaysLeft > 1 ? 's' : ''} gratuit{trialDaysLeft > 1 ? 's' : ''} !
          </div>
          <button
            onClick={() => setShowPaymentModal(true)}
            style={{
              marginTop: '15px',
              background: 'white',
              color: '#10b981',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '25px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            🎁 Passer Premium maintenant
          </button>
        </div>
      );
    }

    return null;
  };

  // Modal paiement obligatoire (après 3 jours)
  const PaymentModal = () => {
    if (!showPaymentModal) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative'
        }}>
          {/* En-tête */}
          <div style={{
            background: 'linear-gradient(135deg, #2563eb, #1e40af)',
            color: 'white',
            padding: '40px 30px',
            textAlign: 'center',
            borderRadius: '20px 20px 0 0'
          }}>
            <div style={{ fontSize: '60px', marginBottom: '15px' }}>⏰</div>
            <h2 style={{ fontSize: '32px', marginBottom: '15px', margin: 0 }}>
              Période d'essai terminée
            </h2>
            <p style={{ fontSize: '18px', opacity: 0.95, margin: 0 }}>
              Continuez votre formation en passant Premium
            </p>
          </div>

          {/* Plans */}
          <div style={{ padding: '40px 30px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: window.innerWidth > 768 ? 'repeat(2, 1fr)' : '1fr',
              gap: '25px',
              marginBottom: '40px'
            }}>
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  style={{
                    border: selectedPlan?.id === plan.id ? `4px solid ${plan.color}` : '2px solid #e9ecef',
                    borderRadius: '15px',
                    padding: '30px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    position: 'relative',
                    background: selectedPlan?.id === plan.id ? `${plan.color}10` : 'white'
                  }}
                >
                  {plan.popular && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                      color: '#001F3F',
                      padding: '6px 20px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: 'bold'
                    }}>
                      ⭐ {plan.savings}
                    </div>
                  )}

                  {selectedPlan?.id === plan.id && (
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: plan.color,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold'
                    }}>
                      ✓
                    </div>
                  )}

                  <h3 style={{ fontSize: '22px', marginBottom: '15px', marginTop: plan.popular ? '15px' : '0', color: '#001F3F' }}>
                    {plan.name}
                  </h3>

                  <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <div style={{ fontSize: '38px', fontWeight: 'bold', color: plan.color }}>
                      {plan.priceText}
                    </div>
                    {plan.totalPrice && (
                      <div style={{ fontSize: '13px', color: '#6c757d', marginTop: '5px' }}>
                        Total: {plan.totalPrice.toLocaleString()} FCFA
                      </div>
                    )}
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {plan.features.map((feature, i) => (
                      <li key={i} style={{ 
                        padding: '8px 0',
                        fontSize: '14px',
                        color: '#001F3F'
                      }}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Formulaire paiement */}
            {selectedPlan && (
              <div style={{
                background: '#f8f9fa',
                padding: '30px',
                borderRadius: '15px',
                border: `3px solid ${selectedPlan.color}`
              }}>
                <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#001F3F', textAlign: 'center' }}>
                  💳 Paiement Wave Money
                </h3>

                {message && (
                  <div style={{
                    background: messageType === 'success' ? '#d4edda' : '#f8d7da',
                    color: messageType === 'success' ? '#155724' : '#721c24',
                    padding: '15px',
                    borderRadius: '10px',
                    marginBottom: '20px',
                    borderLeft: `5px solid ${messageType === 'success' ? '#28a745' : '#dc3545'}`
                  }}>
                    {message}
                  </div>
                )}

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#001F3F' }}>
                    📱 Numéro Wave Money
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+225 XX XX XX XX XX"
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '15px',
                      border: '2px solid #e9ecef',
                      borderRadius: '10px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '18px',
                    background: loading ? '#95a5a6' : `linear-gradient(135deg, ${selectedPlan.color}, ${selectedPlan.color}dd)`,
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: loading ? 'none' : `0 8px 20px ${selectedPlan.color}40`
                  }}
                >
                  {loading ? '⏳ Traitement...' : `💳 Payer ${selectedPlan.price.toLocaleString()} FCFA`}
                </button>

                <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '13px', color: '#6c757d' }}>
                  🔒 Paiement 100% sécurisé avec Wave
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <TrialBanner />
      <PaymentModal />
    </>
  );
}

export default SubscriptionSystem;
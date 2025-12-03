import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Subscription({ user }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const plans = [
    {
      id: 'plan-1',
      name: 'Paiement une fois',
      price: '120 000',
      period: 'Paiement unique',
      badge: '⭐ Meilleure offre',
      badgeColor: '#FFD700',
      features: [
        '✅ Accès à vie à tous les contenus',
        '✅ Quiz illimités',
        '✅ 93 panneaux de signalisation',
        '✅ Cours de conduite théorique',
        '✅ Suivi de progression',
        '✅ Statistiques détaillées',
        '✅ Certificats de réussite',
        '✅ Support prioritaire 24/7',
        '✅ Mises à jour gratuites',
        '✅ Garantie satisfait ou remboursé'
      ],
      color: '#2ecc71'
    },
    {
      id: 'plan-2',
      name: 'Paiement 3 fois',
      price: '3 × 40 000',
      period: 'Sur 3 mois',
      badge: '💳 Facilité de paiement',
      badgeColor: '#3498db',
      features: [
        '✅ Même contenu que le plan unique',
        '✅ Paiement échelonné sans frais',
        '✅ Accès immédiat dès le 1er paiement',
        '✅ Quiz illimités',
        '✅ 93 panneaux de signalisation',
        '✅ Cours de conduite théorique',
        '✅ Suivi de progression',
        '✅ Statistiques détaillées',
        '✅ Certificats de réussite',
        '✅ Support prioritaire 24/7'
      ],
      color: '#3498db'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedPlan) {
      setError('Veuillez sélectionner un plan');
      return;
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Veuillez entrer un numéro Wave Money valide');
      return;
    }

    setLoading(true);

    try {
      // Simulation paiement (3 secondes)
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Enregistrer la transaction
      const plan = plans.find(p => p.id === selectedPlan);
      await addDoc(collection(db, 'transactions'), {
        userId: user.uid,
        phoneNumber: phoneNumber,
        amount: plan.id === 'plan-1' ? 120000 : 40000,
        planId: plan.id,
        planName: plan.name,
        status: 'completed',
        paymentMethod: 'Wave Money',
        createdAt: new Date().toISOString()
      });

      // Mettre à jour le statut Premium de l'utilisateur
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        isPremium: true,
        subscriptionType: plan.id,
        subscriptionDate: new Date().toISOString(),
        subscriptionAmount: plan.id === 'plan-1' ? 120000 : 120000
      });

      setSuccess(true);

      // Redirection après 3 secondes
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);

    } catch (err) {
      console.error('Erreur:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          background: 'white',
          padding: '70px 50px',
          borderRadius: '20px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <div style={{ fontSize: '90px', marginBottom: '30px' }}>🎉</div>
          <h2 style={{ fontSize: '36px', marginBottom: '20px', color: '#1a1a1a', fontWeight: '700' }}>
            Paiement réussi !
          </h2>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
            Votre compte Premium a été activé avec succès
          </p>
          <div style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            color: 'white',
            padding: '20px',
            borderRadius: '15px',
            marginBottom: '30px'
          }}>
            <div style={{ fontSize: '24px', fontWeight: '700' }}>⭐ Compte Premium actif</div>
          </div>
          <p style={{ fontSize: '15px', color: '#999' }}>
            Redirection vers votre tableau de bord...
          </p>
        </div>
      </div>
    );
  }

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
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        {/* Flèche Retour */}
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
            marginBottom: '30px',
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

        {/* Titre */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '42px', marginBottom: '15px', color: '#1a1a1a', fontWeight: '700' }}>
            💳 Choisissez votre plan
          </h2>
          <p style={{ fontSize: '18px', color: '#666' }}>
            Devenez Premium et accédez à tous les contenus sans limite
          </p>
        </div>

        {/* Plans */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '30px',
          marginBottom: '60px'
        }}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              style={{
                background: 'white',
                padding: '45px',
                borderRadius: '20px',
                boxShadow: selectedPlan === plan.id 
                  ? `0 12px 40px ${plan.color}40`
                  : '0 8px 30px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: selectedPlan === plan.id 
                  ? `3px solid ${plan.color}`
                  : '3px solid transparent',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (selectedPlan !== plan.id) {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedPlan !== plan.id) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                }
              }}
            >
              {/* Badge */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: plan.badgeColor,
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '700'
              }}>
                {plan.badge}
              </div>

              {/* Check si sélectionné */}
              {selectedPlan === plan.id && (
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  width: '35px',
                  height: '35px',
                  background: plan.color,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}>
                  ✓
                </div>
              )}

              <h3 style={{ fontSize: '28px', marginBottom: '15px', marginTop: '20px', color: '#1a1a1a', fontWeight: '700' }}>
                {plan.name}
              </h3>

              <div style={{ marginBottom: '25px' }}>
                <div style={{ fontSize: '48px', fontWeight: '700', color: plan.color, marginBottom: '5px' }}>
                  {plan.price} F
                </div>
                <div style={{ fontSize: '16px', color: '#999' }}>
                  {plan.period}
                </div>
              </div>

              <div style={{ marginBottom: '30px' }}>
                {plan.features.map((feature, i) => (
                  <div key={i} style={{ 
                    padding: '12px 0',
                    borderBottom: i < plan.features.length - 1 ? '1px solid #f0f0f0' : 'none',
                    fontSize: '15px',
                    color: '#666'
                  }}>
                    {feature}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedPlan(plan.id)}
                style={{
                  width: '100%',
                  padding: '18px',
                  background: selectedPlan === plan.id ? plan.color : '#f0f0f0',
                  color: selectedPlan === plan.id ? 'white' : '#999',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {selectedPlan === plan.id ? 'Plan sélectionné ✓' : 'Sélectionner ce plan'}
              </button>
            </div>
          ))}
        </div>

        {/* Formulaire paiement */}
        {selectedPlan && (
          <div style={{
            background: 'white',
            padding: '50px',
            borderRadius: '20px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h3 style={{ fontSize: '28px', marginBottom: '30px', color: '#1a1a1a', fontWeight: '700', textAlign: 'center' }}>
              💰 Finaliser le paiement
            </h3>

            {error && (
              <div style={{ 
                background: '#fff5f5',
                border: '2px solid #fc8181',
                color: '#c53030',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '25px',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{ fontSize: '20px' }}>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Plan sélectionné */}
              <div style={{
                background: '#f8f9fa',
                padding: '25px',
                borderRadius: '15px',
                marginBottom: '30px',
                border: `3px solid ${plans.find(p => p.id === selectedPlan)?.color}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a', marginBottom: '5px' }}>
                      {plans.find(p => p.id === selectedPlan)?.name}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      {plans.find(p => p.id === selectedPlan)?.period}
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: '32px', 
                    fontWeight: '700',
                    color: plans.find(p => p.id === selectedPlan)?.color
                  }}>
                    {plans.find(p => p.id === selectedPlan)?.price} F
                  </div>
                </div>
              </div>

              {/* Numéro Wave */}
              <div style={{ marginBottom: '30px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '12px', 
                  fontWeight: '600',
                  color: '#1a1a1a',
                  fontSize: '16px'
                }}>
                  📱 Numéro Wave Money
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  placeholder="+225 XX XX XX XX XX"
                  disabled={loading}
                  style={{ 
                    width: '100%', 
                    padding: '18px 20px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    fontSize: '16px',
                    transition: 'border-color 0.3s',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#FF6B35'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
                <p style={{ fontSize: '13px', color: '#999', marginTop: '10px' }}>
                  💡 Assurez-vous que votre compte Wave dispose du montant nécessaire
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: loading ? '#ccc' : 'linear-gradient(135deg, #FF6B35, #FF8E53)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: loading ? 'none' : '0 4px 12px rgba(255, 107, 53, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 53, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.3)';
                  }
                }}
              >
                {loading ? '⏳ Traitement en cours...' : '💳 Payer maintenant'}
              </button>
            </form>

            {/* Sécurité */}
            <div style={{ 
              marginTop: '30px',
              padding: '20px',
              background: '#E8F5E9',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔒</div>
              <div style={{ fontSize: '14px', color: '#2e7d32', fontWeight: '600' }}>
                Paiement 100% sécurisé via Wave Money
              </div>
              <div style={{ fontSize: '13px', color: '#4caf50', marginTop: '5px' }}>
                Garantie satisfait ou remboursé 30 jours
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div style={{ 
          marginTop: '60px',
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <h4 style={{ fontSize: '24px', marginBottom: '30px', color: '#1a1a1a', fontWeight: '700', textAlign: 'center' }}>
            💡 Comment ça marche ?
          </h4>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px'
          }}>
            {[
              { step: '1', icon: '📋', text: 'Choisissez votre plan' },
              { step: '2', icon: '📱', text: 'Entrez votre numéro Wave' },
              { step: '3', icon: '✅', text: 'Confirmez le paiement' },
              { step: '4', icon: '🎉', text: 'Accédez au contenu Premium' }
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  margin: '0 auto 15px',
                  background: 'linear-gradient(135deg, #FF6B35, #FF8E53)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: '700',
                  color: 'white'
                }}>
                  {item.step}
                </div>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>{item.icon}</div>
                <div style={{ fontSize: '15px', color: '#666', fontWeight: '500' }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
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
          .plans-grid {
            grid-template-columns: 1fr !important;
          }
          .plan-card {
            padding: 30px 25px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Subscription;

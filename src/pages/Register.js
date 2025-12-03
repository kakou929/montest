import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function Register() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.nom || !formData.prenom || !formData.telephone) {
        setError('Veuillez remplir tous les champs');
        return;
      }
      setError('');
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        telephone: formData.telephone,
        role: 'student',
        isPremium: false,
        quizzesCompleted: 0,
        createdAt: new Date().toISOString()
      });

      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur Firebase:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Cet email est déjà utilisé');
      } else if (err.code === 'auth/invalid-email') {
        setError('Email invalide');
      } else if (err.code === 'auth/weak-password') {
        setError('Le mot de passe est trop faible');
      } else {
        setError('Une erreur est survenue : ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Navbar */}
      <nav style={{ 
        background: 'white',
        padding: '20px 60px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <Link to="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px',
          textDecoration: 'none'
        }}>
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
            color: 'white',
            boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)'
          }}>
            M
          </div>
          <h1 style={{ 
            fontSize: '28px', 
            margin: 0, 
            color: '#1a1a1a',
            fontWeight: '700'
          }}>
            mondiale
          </h1>
        </Link>
      </nav>

      {/* Conteneur Principal */}
      <div style={{ 
        maxWidth: '580px', 
        margin: '0 auto', 
        padding: '60px 20px' 
      }}>
        {/* Flèche Retour */}
        <Link 
          to={step === 1 ? "/" : "#"}
          onClick={(e) => {
            if (step === 2) {
              e.preventDefault();
              setStep(1);
              setError('');
            }
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#666',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            marginBottom: '30px',
            transition: 'color 0.3s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#FF6B35'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          {step === 1 ? 'Retour à l\'accueil' : 'Retour'}
        </Link>

        {/* Formulaire */}
        <div style={{
          background: 'white',
          padding: '50px 40px',
          borderRadius: '20px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
        }}>
          {/* Progress */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ 
                fontSize: '14px', 
                fontWeight: '600',
                color: step >= 1 ? '#FF6B35' : '#ccc'
              }}>
                1. Informations
              </span>
              <span style={{ 
                fontSize: '14px', 
                fontWeight: '600',
                color: step >= 2 ? '#FF6B35' : '#ccc'
              }}>
                2. Connexion
              </span>
            </div>
            <div style={{ 
              height: '6px', 
              background: '#f0f0f0',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                height: '100%', 
                width: step === 1 ? '50%' : '100%',
                background: '#FF6B35',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
          </div>

          <h2 style={{ 
            fontSize: '36px', 
            marginBottom: '10px', 
            color: '#1a1a1a',
            fontWeight: '700',
            textAlign: 'center'
          }}>
            {step === 1 ? 'Créez votre compte' : 'Finalisez votre inscription'}
          </h2>
          <p style={{ 
            fontSize: '16px', 
            color: '#666', 
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            {step === 1 ? 'Commencez votre formation dès maintenant' : 'Dernière étape avant de commencer'}
          </p>

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

          <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNextStep(); }}>
            {step === 1 ? (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontWeight: '600',
                      color: '#1a1a1a',
                      fontSize: '15px'
                    }}>
                      Nom
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      placeholder="Kouassi"
                      style={{ 
                        width: '100%', 
                        padding: '16px 18px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '12px',
                        fontSize: '16px',
                        transition: 'border-color 0.3s',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#FF6B35'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                  </div>

                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontWeight: '600',
                      color: '#1a1a1a',
                      fontSize: '15px'
                    }}>
                      Prénom
                    </label>
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      required
                      placeholder="Kakou"
                      style={{ 
                        width: '100%', 
                        padding: '16px 18px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '12px',
                        fontSize: '16px',
                        transition: 'border-color 0.3s',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#FF6B35'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '10px', 
                    fontWeight: '600',
                    color: '#1a1a1a',
                    fontSize: '15px'
                  }}>
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    placeholder="+225 XX XX XX XX XX"
                    style={{ 
                      width: '100%', 
                      padding: '16px 18px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '12px',
                      fontSize: '16px',
                      transition: 'border-color 0.3s',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#FF6B35'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>

                <button 
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '18px',
                    background: '#FF6B35',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 53, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.3)';
                  }}
                >
                  Continuer
                </button>
              </>
            ) : (
              <>
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '10px', 
                    fontWeight: '600',
                    color: '#1a1a1a',
                    fontSize: '15px'
                  }}>
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.com"
                    disabled={loading}
                    style={{ 
                      width: '100%', 
                      padding: '16px 18px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '12px',
                      fontSize: '16px',
                      transition: 'border-color 0.3s',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#FF6B35'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '10px', 
                    fontWeight: '600',
                    color: '#1a1a1a',
                    fontSize: '15px'
                  }}>
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    disabled={loading}
                    style={{ 
                      width: '100%', 
                      padding: '16px 18px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '12px',
                      fontSize: '16px',
                      transition: 'border-color 0.3s',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#FF6B35'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                  <p style={{ 
                    fontSize: '13px', 
                    color: '#999', 
                    marginTop: '8px' 
                  }}>
                    Minimum 6 caractères
                  </p>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '10px', 
                    fontWeight: '600',
                    color: '#1a1a1a',
                    fontSize: '15px'
                  }}>
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    disabled={loading}
                    style={{ 
                      width: '100%', 
                      padding: '16px 18px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '12px',
                      fontSize: '16px',
                      transition: 'border-color 0.3s',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#FF6B35'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '18px',
                    background: loading ? '#ccc' : '#FF6B35',
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
                  {loading ? 'Création du compte...' : 'Créer mon compte'}
                </button>
              </>
            )}
          </form>

          <div style={{ 
            marginTop: '30px', 
            textAlign: 'center',
            paddingTop: '30px',
            borderTop: '1px solid #e0e0e0'
          }}>
            <p style={{ color: '#666', fontSize: '15px' }}>
              Vous avez déjà un compte ?{' '}
              <Link to="/login" style={{ 
                color: '#FF6B35', 
                fontWeight: '700',
                textDecoration: 'none'
              }}>
                Connectez-vous
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          nav {
            padding: 15px 20px !important;
          }
          .form-container {
            padding: 35px 25px !important;
          }
          .grid-cols-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Register;

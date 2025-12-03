import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Email ou mot de passe incorrect');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Trop de tentatives. Réessayez plus tard.');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Navbar Simple */}
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
        maxWidth: '480px', 
        margin: '0 auto', 
        padding: '60px 20px' 
      }}>
        {/* Flèche Retour */}
        <Link 
          to="/"
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
          Retour à l'accueil
        </Link>

        {/* Formulaire */}
        <div style={{
          background: 'white',
          padding: '50px 40px',
          borderRadius: '20px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ 
            fontSize: '36px', 
            marginBottom: '10px', 
            color: '#1a1a1a',
            fontWeight: '700',
            textAlign: 'center'
          }}>
            Bon retour !
          </h2>
          <p style={{ 
            fontSize: '16px', 
            color: '#666', 
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            Connectez-vous pour continuer votre formation
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

          <form onSubmit={handleSubmit}>
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
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="votre@email.com"
                disabled={loading}
                style={{ 
                  width: '100%', 
                  padding: '16px 18px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  transition: 'all 0.3s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#FF6B35'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
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
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="••••••••"
                disabled={loading}
                style={{ 
                  width: '100%', 
                  padding: '16px 18px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  transition: 'all 0.3s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#FF6B35'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <a href="#" style={{ 
                  color: '#FF6B35', 
                  fontSize: '14px',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}>
                  Mot de passe oublié ?
                </a>
              </div>
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
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div style={{ 
            marginTop: '30px', 
            textAlign: 'center',
            paddingTop: '30px',
            borderTop: '1px solid #e0e0e0'
          }}>
            <p style={{ color: '#666', fontSize: '15px' }}>
              Pas encore de compte ?{' '}
              <Link to="/register" style={{ 
                color: '#FF6B35', 
                fontWeight: '700',
                textDecoration: 'none'
              }}>
                Inscrivez-vous gratuitement
              </Link>
            </p>
          </div>
        </div>

        {/* Avantages */}
        <div style={{ 
          marginTop: '40px',
          background: 'white',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ 
            fontSize: '18px', 
            marginBottom: '20px',
            color: '#1a1a1a',
            fontWeight: '700',
            textAlign: 'center'
          }}>
            Pourquoi choisir Mondiale ?
          </h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            {[
              { icon: '📚', text: 'Quiz illimités et actualisés' },
              { icon: '🚗', text: 'Formation de qualité professionnelle' },
              { icon: '📱', text: 'Accessible 24h/24 sur mobile' },
              { icon: '💰', text: 'Prix le plus avantageux du marché' }
            ].map((item, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px' 
              }}>
                <span style={{ fontSize: '24px' }}>{item.icon}</span>
                <span style={{ color: '#666', fontSize: '15px' }}>{item.text}</span>
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
          nav h1 {
            font-size: 22px !important;
          }
          .form-container {
            padding: 35px 25px !important;
          }
          h2 {
            font-size: 28px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Login;

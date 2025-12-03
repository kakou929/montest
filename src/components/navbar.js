import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function Navbar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      };
      fetchUserData();
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav style={{ 
      background: '#001F3F',
      padding: '15px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'relative',
      zIndex: 1000
    }}>
      {/* Logo et Titre */}
      <Link to={user ? "/dashboard" : "/"} style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '15px',
        textDecoration: 'none'
      }}>
        <div style={{
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          background: '#2563eb', // Bleu chic moderne
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '24px',
          color: 'white',
          boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)'
        }}>
          M
        </div>
        <h1 style={{ fontSize: '22px', margin: 0, color: 'white' }}>
          Mondiale Auto-École
        </h1>
      </Link>

      {/* Desktop Menu */}
      {user ? (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '20px' 
        }} className="desktop-menu">
          <span style={{ color: 'white', fontSize: '16px' }}>
            👋 {userData?.prenom} {userData?.nom}
          </span>
          
          {userData?.isPremium && (
            <span style={{ 
              background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
              color: '#001F3F',
              padding: '6px 15px',
              borderRadius: '20px',
              fontWeight: 'bold',
              fontSize: '12px'
            }}>
              ⭐ PREMIUM
            </span>
          )}

          {/* Menu déroulant Desktop */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                alignItems: 'flex-end'
              }}
            >
              <div style={{ width: '25px', height: '3px', background: '#2563eb', borderRadius: '2px' }}></div>
              <div style={{ width: '20px', height: '3px', background: '#2563eb', borderRadius: '2px' }}></div>
              <div style={{ width: '15px', height: '3px', background: '#2563eb', borderRadius: '2px' }}></div>
            </button>

            {menuOpen && (
              <div style={{
                position: 'absolute',
                top: '50px',
                right: '0',
                background: 'white',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                minWidth: '250px',
                overflow: 'hidden',
                animation: 'slideDown 0.3s ease-out'
              }}>
                <Link to="/dashboard" style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '15px 20px', 
                  color: '#001F3F',
                  textDecoration: 'none',
                  transition: 'background 0.3s',
                  borderBottom: '1px solid #f0f0f0'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                onClick={() => setMenuOpen(false)}>
                  <span style={{ fontSize: '20px' }}>🏠</span>
                  <span style={{ fontWeight: '500' }}>Tableau de bord</span>
                </Link>

                <Link to="/quiz" style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '15px 20px', 
                  color: '#001F3F',
                  textDecoration: 'none',
                  transition: 'background 0.3s',
                  borderBottom: '1px solid #f0f0f0'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                onClick={() => setMenuOpen(false)}>
                  <span style={{ fontSize: '20px' }}>📚</span>
                  <span style={{ fontWeight: '500' }}>Quiz</span>
                </Link>

                <Link to="/panneaux" style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '15px 20px', 
                  color: '#001F3F',
                  textDecoration: 'none',
                  transition: 'background 0.3s',
                  borderBottom: '1px solid #f0f0f0'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                onClick={() => setMenuOpen(false)}>
                  <span style={{ fontSize: '20px' }}>🚦</span>
                  <span style={{ fontWeight: '500' }}>Panneaux</span>
                </Link>

                <Link to="/abonnement" style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '15px 20px', 
                  color: '#001F3F',
                  textDecoration: 'none',
                  transition: 'background 0.3s',
                  borderBottom: '1px solid #f0f0f0'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                onClick={() => setMenuOpen(false)}>
                  <span style={{ fontSize: '20px' }}>💳</span>
                  <span style={{ fontWeight: '500' }}>Abonnement</span>
                </Link>

                <button 
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '15px 20px',
                    background: 'white',
                    border: 'none',
                    color: '#dc3545',
                    cursor: 'pointer',
                    transition: 'background 0.3s',
                    fontWeight: '500',
                    fontSize: '16px',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#fff5f5'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                >
                  <span style={{ fontSize: '20px' }}>🚪</span>
                  <span>Déconnexion</span>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }} className="desktop-menu">
          <Link to="/login" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            fontSize: '16px',
            fontWeight: '500',
            transition: 'opacity 0.3s'
          }}>
            Connexion
          </Link>
          <Link to="/register" style={{ 
            backgroundColor: '#2563eb', 
            color: 'white', 
            padding: '12px 30px', 
            borderRadius: '25px', 
            textDecoration: 'none', 
            fontWeight: 'bold',
            fontSize: '16px',
            transition: 'transform 0.3s, box-shadow 0.3s',
            boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)'
          }}>
            Inscription gratuite
          </Link>
        </div>
      )}

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          display: 'none',
          flexDirection: 'column',
          gap: '4px',
          alignItems: 'flex-end'
        }}
        className="mobile-menu-btn"
      >
        <div style={{ width: '25px', height: '3px', background: '#2563eb', borderRadius: '2px' }}></div>
        <div style={{ width: '20px', height: '3px', background: '#2563eb', borderRadius: '2px' }}></div>
        <div style={{ width: '15px', height: '3px', background: '#2563eb', borderRadius: '2px' }}></div>
      </button>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div 
          className="mobile-menu-dropdown"
          style={{
            position: 'fixed',
            top: '70px',
            left: '0',
            right: '0',
            background: 'white',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            maxHeight: 'calc(100vh - 70px)',
            overflowY: 'auto',
            zIndex: 999,
            animation: 'slideDown 0.3s ease-out'
          }}
        >
          {user ? (
            <>
              <div style={{ padding: '20px', background: '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
                <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#001F3F', marginBottom: '5px' }}>
                  {userData?.prenom} {userData?.nom}
                </div>
                <div style={{ fontSize: '14px', color: '#6c757d' }}>
                  {userData?.email}
                </div>
                {userData?.isPremium && (
                  <span style={{ 
                    display: 'inline-block',
                    marginTop: '10px',
                    background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                    color: '#001F3F',
                    padding: '6px 15px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    fontSize: '12px'
                  }}>
                    ⭐ PREMIUM
                  </span>
                )}
              </div>

              <Link to="/dashboard" style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '18px 20px', 
                color: '#001F3F',
                textDecoration: 'none',
                borderBottom: '1px solid #f0f0f0'
              }}
              onClick={() => setMenuOpen(false)}>
                <span style={{ fontSize: '24px' }}>🏠</span>
                <span style={{ fontWeight: '500', fontSize: '16px' }}>Tableau de bord</span>
              </Link>

              <Link to="/quiz" style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '18px 20px', 
                color: '#001F3F',
                textDecoration: 'none',
                borderBottom: '1px solid #f0f0f0'
              }}
              onClick={() => setMenuOpen(false)}>
                <span style={{ fontSize: '24px' }}>📚</span>
                <span style={{ fontWeight: '500', fontSize: '16px' }}>Quiz</span>
              </Link>

              <Link to="/panneaux" style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '18px 20px', 
                color: '#001F3F',
                textDecoration: 'none',
                borderBottom: '1px solid #f0f0f0'
              }}
              onClick={() => setMenuOpen(false)}>
                <span style={{ fontSize: '24px' }}>🚦</span>
                <span style={{ fontWeight: '500', fontSize: '16px' }}>Panneaux</span>
              </Link>

              <Link to="/abonnement" style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '18px 20px', 
                color: '#001F3F',
                textDecoration: 'none',
                borderBottom: '1px solid #f0f0f0'
              }}
              onClick={() => setMenuOpen(false)}>
                <span style={{ fontSize: '24px' }}>💳</span>
                <span style={{ fontWeight: '500', fontSize: '16px' }}>Abonnement</span>
              </Link>

              <button 
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  padding: '18px 20px',
                  background: 'white',
                  border: 'none',
                  color: '#dc3545',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '16px',
                  textAlign: 'left'
                }}
              >
                <span style={{ fontSize: '24px' }}>🚪</span>
                <span>Déconnexion</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '18px 20px', 
                color: '#001F3F',
                textDecoration: 'none',
                borderBottom: '1px solid #f0f0f0'
              }}
              onClick={() => setMenuOpen(false)}>
                <span style={{ fontSize: '24px' }}>🔑</span>
                <span style={{ fontWeight: '500', fontSize: '16px' }}>Connexion</span>
              </Link>

              <Link to="/register" style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '18px 20px', 
                color: '#2563eb',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
              onClick={() => setMenuOpen(false)}>
                <span style={{ fontSize: '24px' }}>✨</span>
                <span>Inscription gratuite</span>
              </Link>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          nav {
            padding: 15px 20px !important;
          }

          nav h1 {
            font-size: 18px !important;
          }

          .desktop-menu {
            display: none !important;
          }

          .mobile-menu-btn {
            display: flex !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu-dropdown {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
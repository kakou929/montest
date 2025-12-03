import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Navbar Ornikar Style */}
      <nav style={{ 
        background: 'white',
        padding: '20px 60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {/* Logo Mondiale */}
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
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            mondiale
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <Link to="/login" style={{ 
            color: '#1a1a1a', 
            textDecoration: 'none', 
            fontSize: '16px',
            fontWeight: '500',
            transition: 'color 0.3s'
          }}>
            Code de la route
          </Link>
          <Link to="/login" style={{ 
            color: '#1a1a1a', 
            textDecoration: 'none', 
            fontSize: '16px',
            fontWeight: '500',
            transition: 'color 0.3s'
          }}>
            Permis de conduire
          </Link>
          <Link to="/login" style={{ 
            backgroundColor: 'transparent',
            color: '#1a1a1a',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '15px',
            border: '2px solid #e0e0e0',
            transition: 'all 0.3s'
          }}>
            Se connecter
          </Link>
          <Link to="/register" style={{ 
            backgroundColor: '#FF6B35',
            color: 'white',
            padding: '12px 28px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '15px',
            border: 'none',
            transition: 'all 0.3s',
            boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)'
          }}>
            S'inscrire
          </Link>
        </div>
      </nav>

      {/* Hero Section - Style Ornikar */}
      <section style={{ 
        background: 'white',
        padding: '80px 60px 60px',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          fontSize: '48px', 
          fontWeight: '700', 
          marginBottom: '20px',
          color: '#1a1a1a',
          lineHeight: '1.2',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          L'auto-école en ligne qui<br/>révolutionne le permis !
        </h2>
      </section>

      {/* Cards Section - Exactement comme Ornikar */}
      <section style={{ 
        maxWidth: '1000px', 
        margin: '0 auto',
        padding: '0 60px 80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '40px'
      }}>
        {/* Card Code de la route */}
        <div style={{
          background: 'white',
          padding: '50px 40px',
          borderRadius: '20px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          textAlign: 'center',
          transition: 'transform 0.3s, box-shadow 0.3s',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
        }}>
          {/* Badge "Populaire" */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#FFE5D9',
            color: '#FF6B35',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '700'
          }}>
            LE PLUS POPULAIRE
          </div>

          {/* Illustration téléphone/tablette */}
          <div style={{ 
            marginBottom: '30px',
            display: 'flex',
            justifyContent: 'center',
            gap: '15px'
          }}>
            {/* Tablette */}
            <div style={{
              width: '120px',
              height: '140px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              position: 'relative',
              boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(-8deg)'
            }}>
              <div style={{
                width: '90%',
                height: '85%',
                background: 'white',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px'
              }}>
                <div style={{ 
                  width: '35px', 
                  height: '35px', 
                  borderRadius: '50%', 
                  background: '#4CAF50' 
                }}></div>
                <div style={{ 
                  width: '35px', 
                  height: '35px', 
                  borderRadius: '50%', 
                  background: '#FF6B35' 
                }}></div>
                <div style={{ 
                  width: '35px', 
                  height: '35px', 
                  borderRadius: '50%', 
                  background: '#2196F3' 
                }}></div>
              </div>
            </div>
            
            {/* Téléphone */}
            <div style={{
              width: '70px',
              height: '130px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '10px',
              position: 'relative',
              boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(5deg)',
              marginTop: '10px'
            }}>
              <div style={{
                width: '85%',
                height: '90%',
                background: 'white',
                borderRadius: '6px'
              }}></div>
            </div>
          </div>

          <h3 style={{ 
            fontSize: '28px', 
            marginBottom: '15px',
            color: '#1a1a1a',
            fontWeight: '700'
          }}>
            Code
          </h3>
          <p style={{ 
            fontSize: '18px',
            color: '#666',
            marginBottom: '25px',
            fontWeight: '500'
          }}>
            de la route
          </p>

          <div style={{ 
            fontSize: '42px', 
            fontWeight: '700', 
            color: '#FF6B35',
            marginBottom: '8px'
          }}>
            29 990 F
          </div>
          <p style={{ 
            fontSize: '14px', 
            color: '#999',
            marginBottom: '30px'
          }}>
            Ou en plusieurs fois
          </p>

          <Link to="/register" style={{
            display: 'inline-block',
            width: '100%',
            padding: '16px',
            background: '#FF6B35',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '16px',
            transition: 'all 0.3s',
            boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)'
          }}>
            Je commence
          </Link>
        </div>

        {/* Card Permis de conduire */}
        <div style={{
          background: 'white',
          padding: '50px 40px',
          borderRadius: '20px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          textAlign: 'center',
          transition: 'transform 0.3s, box-shadow 0.3s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
        }}>
          {/* Illustration voiture */}
          <div style={{ 
            marginBottom: '30px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '180px',
              height: '140px',
              position: 'relative'
            }}>
              {/* Voiture orange */}
              <div style={{
                width: '160px',
                height: '90px',
                background: '#FF6B35',
                borderRadius: '40px 40px 15px 15px',
                position: 'absolute',
                top: '30px',
                left: '10px',
                boxShadow: '0 8px 20px rgba(255, 107, 53, 0.4)'
              }}>
                {/* Fenêtres */}
                <div style={{
                  width: '50px',
                  height: '30px',
                  background: '#4A90E2',
                  borderRadius: '8px 8px 0 0',
                  position: 'absolute',
                  top: '-25px',
                  left: '20px',
                  opacity: 0.9
                }}></div>
                <div style={{
                  width: '50px',
                  height: '30px',
                  background: '#4A90E2',
                  borderRadius: '8px 8px 0 0',
                  position: 'absolute',
                  top: '-25px',
                  right: '20px',
                  opacity: 0.9
                }}></div>
                
                {/* Panneau L */}
                <div style={{
                  width: '35px',
                  height: '35px',
                  background: 'white',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '-15px',
                  right: '-15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  color: '#FF6B35',
                  border: '3px solid #FF6B35',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}>
                  L
                </div>
              </div>
              
              {/* Roues */}
              <div style={{
                width: '35px',
                height: '35px',
                background: '#333',
                borderRadius: '50%',
                position: 'absolute',
                bottom: '0',
                left: '25px',
                border: '4px solid #666'
              }}></div>
              <div style={{
                width: '35px',
                height: '35px',
                background: '#333',
                borderRadius: '50%',
                position: 'absolute',
                bottom: '0',
                right: '25px',
                border: '4px solid #666'
              }}></div>
            </div>
          </div>

          <h3 style={{ 
            fontSize: '28px', 
            marginBottom: '15px',
            color: '#1a1a1a',
            fontWeight: '700'
          }}>
            Permis
          </h3>
          <p style={{ 
            fontSize: '18px',
            color: '#666',
            marginBottom: '25px',
            fontWeight: '500'
          }}>
            de conduire
          </p>

          <div style={{ 
            fontSize: '42px', 
            fontWeight: '700', 
            color: '#FF6B35',
            marginBottom: '8px'
          }}>
            749 000 F
          </div>
          <p style={{ 
            fontSize: '14px', 
            color: '#999',
            marginBottom: '30px'
          }}>
            20h de leçons de conduite
          </p>

          <Link to="/register" style={{
            display: 'inline-block',
            width: '100%',
            padding: '16px',
            background: '#FF6B35',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '16px',
            transition: 'all 0.3s',
            boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)'
          }}>
            Je commence
          </Link>
        </div>
      </section>

      {/* Section Info */}
      <section style={{
        background: 'white',
        padding: '60px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ 
            fontSize: '16px', 
            color: '#666', 
            lineHeight: '1.8',
            marginBottom: '15px'
          }}>
            <strong>Dès le code ?</strong> Accédez à la carte dès 14,90 € <span style={{ padding: '2px 8px', background: '#FFE5D9', borderRadius: '4px', color: '#FF6B35', fontWeight: '600' }}>Je saisis ici</span>
          </p>
          <p style={{ 
            fontSize: '16px', 
            color: '#666', 
            lineHeight: '1.8',
            marginBottom: '15px'
          }}>
            <strong>Conduite accompagnée</strong> à 999 € au lieu de 1499 € • <span style={{ color: '#FF6B35', fontWeight: '600' }}>Offre de lancement</span> <span style={{ padding: '2px 8px', background: '#E8F5E9', borderRadius: '4px', color: '#4CAF50', fontWeight: '600' }}>Je saisis ici</span>
          </p>
        </div>
      </section>

      {/* Footer Badge */}
      <section style={{
        background: '#f5f5f5',
        padding: '40px',
        textAlign: 'center'
      }}>
        <p style={{ 
          fontSize: '20px', 
          color: '#1a1a1a',
          fontWeight: '700',
          margin: 0
        }}>
          *Mondiale est leader
        </p>
        <p style={{ 
          fontSize: '14px', 
          color: '#999',
          marginTop: '10px'
        }}>
          C'est 80 fois moins cher
        </p>
      </section>

      {/* Version Mobile Responsive */}
      <style>{`
        @media (max-width: 768px) {
          nav {
            padding: 15px 20px !important;
            flex-wrap: wrap;
          }
          
          nav h1 {
            font-size: 22px !important;
          }
          
          nav > div:last-child {
            display: none;
          }
          
          section:first-of-type {
            padding: 40px 20px 30px !important;
          }
          
          section:first-of-type h2 {
            font-size: 32px !important;
          }
          
          section:nth-of-type(2) {
            padding: 0 20px 40px !important;
            grid-template-columns: 1fr !important;
            gap: 25px !important;
          }
          
          .card {
            padding: 35px 25px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;

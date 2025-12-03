import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <nav style={{ 
        background: 'white', 
        padding: '20px 40px', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ color: '#667eea', margin: 0 }}>🚗 Admin - Mondiale Auto-École</h1>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/dashboard" style={{ 
            background: 'white',
            color: '#667eea',
            padding: '10px 20px',
            border: '2px solid #667eea',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Tableau de bord
          </Link>
          <button 
            onClick={handleLogout}
            style={{
              background: '#ff4757',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Déconnexion
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '30px', color: '#333' }}>
          Tableau de bord administrateur
        </h2>
        
        <div style={{ 
          background: 'white', 
          padding: '60px', 
          borderRadius: '15px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>🚧</div>
          <h3 style={{ fontSize: '28px', marginBottom: '20px', color: '#333' }}>
            Page en construction
          </h3>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
            Le tableau de bord administrateur sera bientôt disponible !
          </p>
          <Link to="/dashboard" className="btn btn-primary">
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

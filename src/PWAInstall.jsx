import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, CheckCircle } from 'lucide-react';

const PWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Vérifier si déjà installé
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
      return;
    }

    // Vérifier si l'utilisateur a déjà refusé l'installation
    const installDismissed = localStorage.getItem('pwa-install-dismissed');
    if (!installDismissed) {
      // Afficher la bannière après 10 secondes
      setTimeout(() => {
        setShowBanner(true);
      }, 10000);
    }

    // Écouter l'événement beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Écouter l'événement appinstalled
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallButton(false);
      setShowBanner(false);
      localStorage.removeItem('pwa-install-dismissed');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Afficher les instructions manuelles
      alert(
        'Pour installer l\'application :\n\n' +
        'Sur Android :\n' +
        '1. Appuyez sur le menu (⋮)\n' +
        '2. Sélectionnez "Ajouter à l\'écran d\'accueil"\n\n' +
        'Sur iPhone :\n' +
        '1. Appuyez sur le bouton Partager\n' +
        '2. Sélectionnez "Sur l\'écran d\'accueil"'
      );
      return;
    }

    // Afficher le prompt d'installation
    deferredPrompt.prompt();
    
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('Installation acceptée');
    } else {
      console.log('Installation refusée');
    }
    
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  const dismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Si déjà installé, ne rien afficher
  if (isInstalled) {
    return null;
  }

  return (
    <>
      {/* Bouton d'installation fixe (petit) */}
      {showInstallButton && (
        <button
          onClick={handleInstallClick}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 flex items-center gap-2"
          title="Installer l'application"
        >
          <Download className="w-6 h-6" />
          <span className="hidden md:inline font-semibold">Installer</span>
        </button>
      )}

      {/* Bannière d'installation (grande) */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-2xl">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="text-3xl font-bold text-blue-600">M</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Installez Mondiale Auto-École</h3>
                  <p className="text-sm text-blue-100">
                    Accédez rapidement à vos cours, même hors ligne !
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={handleInstallClick}
                  className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-all flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Installer
                </button>
                <button
                  onClick={dismissBanner}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions manuelles (si le navigateur ne supporte pas l'API) */}
      {!showInstallButton && !isInstalled && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => {
              const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
              const isAndroid = /Android/.test(navigator.userAgent);
              
              let instructions = '';
              if (isIOS) {
                instructions = '📱 Sur iPhone/iPad :\n\n1. Appuyez sur le bouton Partager (⬆️)\n2. Faites défiler et appuyez sur "Sur l\'écran d\'accueil"\n3. Appuyez sur "Ajouter"';
              } else if (isAndroid) {
                instructions = '📱 Sur Android :\n\n1. Appuyez sur le menu (⋮) en haut à droite\n2. Appuyez sur "Installer l\'application" ou "Ajouter à l\'écran d\'accueil"\n3. Confirmez l\'installation';
              } else {
                instructions = '💻 Pour installer l\'application :\n\nUtilisez Chrome ou Safari sur votre téléphone pour installer l\'application.';
              }
              
              alert(instructions);
            }}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
            title="Voir les instructions d'installation"
          >
            <Smartphone className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
};

export default PWAInstall;

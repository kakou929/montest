// Enregistrer le service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW enregistré:', registration);
      })
      .catch(error => {
        console.log('Erreur SW:', error);
      });
  });
}
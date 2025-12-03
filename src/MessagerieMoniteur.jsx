import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, User, CheckCheck, Clock, AlertCircle } from 'lucide-react';

const MessagerieMoniteur = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userPhone, setUserPhone] = useState('');

  useEffect(() => {
    // Charger le numéro de téléphone
    const phone = localStorage.getItem('userPhone') || 'Non renseigné';
    setUserPhone(phone);

    // Charger les messages sauvegardés
    const savedMessages = localStorage.getItem('moniteurMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Message de bienvenue
      setMessages([
        {
          id: 1,
          text: "Bonjour ! Je suis votre moniteur. N'hésitez pas à me poser vos questions sur la formation, les leçons de conduite ou tout autre sujet lié à votre apprentissage.",
          sender: 'moniteur',
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          status: 'read',
          date: new Date().toLocaleDateString('fr-FR')
        }
      ]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (message.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'eleve',
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      date: new Date().toLocaleDateString('fr-FR')
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem('moniteurMessages', JSON.stringify(updatedMessages));
    setMessage('');

    // Simuler une réponse du moniteur
    setIsTyping(true);
    setTimeout(() => {
      const moniteurReply = {
        id: updatedMessages.length + 1,
        text: getMoniteurReply(message),
        sender: 'moniteur',
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        status: 'read',
        date: new Date().toLocaleDateString('fr-FR')
      };
      const finalMessages = [...updatedMessages, moniteurReply];
      setMessages(finalMessages);
      localStorage.setItem('moniteurMessages', JSON.stringify(finalMessages));
      setIsTyping(false);
    }, 2000);
  };

  const getMoniteurReply = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('leçon') || msg.includes('conduite') || msg.includes('cours')) {
      return "Pour réserver une leçon de conduite, rendez-vous dans la section 'Réserver une Leçon' du menu principal. Vous pourrez choisir votre date et horaire. Le tarif est de 5000 FCFA/heure.";
    }
    if (msg.includes('examen') || msg.includes('test') || msg.includes('épreuve')) {
      return "L'examen du code nécessite au moins 35 bonnes réponses sur 40. Je vous recommande de faire toutes les séries de quiz disponibles et d'obtenir régulièrement plus de 35/40 avant de vous présenter.";
    }
    if (msg.includes('quiz') || msg.includes('série') || msg.includes('question')) {
      return "Vous avez accès à 40 séries de questions dans l'onglet 'Entraînement au Code'. Faites au moins 2-3 séries par jour pour progresser rapidement. N'hésitez pas à refaire les séries où vous avez eu moins de 35/40.";
    }
    if (msg.includes('panneau') || msg.includes('signalisation')) {
      return "Dans la section 'Panneaux de Signalisation', vous trouverez plus de 93 panneaux officiels avec leurs explications. C'est essentiel de tous les connaître pour l'examen.";
    }
    if (msg.includes('difficile') || msg.includes('compliqué') || msg.includes('comprends pas')) {
      return "Ne vous découragez pas ! L'apprentissage prend du temps. Concentrez-vous sur vos points faibles, refaites les quiz ratés, et n'hésitez pas à me poser des questions précises sur ce que vous ne comprenez pas.";
    }
    if (msg.includes('horaire') || msg.includes('disponible') || msg.includes('rendez-vous')) {
      return "Je suis disponible du lundi au samedi de 8h à 18h pour les leçons de conduite. Pour les questions par messagerie, je réponds généralement dans l'heure. Quel créneau vous conviendrait ?";
    }
    if (msg.includes('prix') || msg.includes('tarif') || msg.includes('coût')) {
      return "Formation complète (toutes catégories) : 150 000 FCFA. Catégorie A (moto) : 120 000 FCFA. Possibilité de paiement en 3 fois. Leçon de conduite seule : 5000 FCFA/heure.";
    }
    if (msg.includes('merci')) {
      return "Avec plaisir ! Je suis là pour vous aider à réussir. N'hésitez pas si vous avez d'autres questions. Bon courage dans votre formation ! 🚗";
    }
    if (msg.includes('bonjour') || msg.includes('salut')) {
      return "Bonjour ! Comment puis-je vous aider aujourd'hui ? Vous avez des questions sur votre formation ?";
    }
    
    return "J'ai bien reçu votre message. Un moniteur vous répondra dans les plus brefs délais. Pour une réponse immédiate, vous pouvez appeler au 0788005332.";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Votre Moniteur</h1>
                  <p className="text-xs text-green-100">Mondiale Auto-École • En ligne</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info élève */}
      <div className="bg-yellow-50 border-b border-yellow-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4 text-yellow-700" />
            <span className="text-yellow-800">
              Votre numéro : <strong>{userPhone}</strong> • Réponse sous 1h en moyenne
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="space-y-4">
            {messages.map((msg, index) => {
              const showDate = index === 0 || messages[index - 1].date !== msg.date;
              
              return (
                <React.Fragment key={msg.id}>
                  {showDate && (
                    <div className="text-center my-4">
                      <span className="bg-white px-4 py-1 rounded-full text-xs text-gray-600 shadow-sm">
                        {msg.date}
                      </span>
                    </div>
                  )}
                  
                  <div className={`flex ${msg.sender === 'eleve' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-xs md:max-w-md lg:max-w-lg ${
                        msg.sender === 'eleve'
                          ? 'bg-blue-600 text-white rounded-l-2xl rounded-tr-2xl'
                          : 'bg-white text-gray-800 rounded-r-2xl rounded-tl-2xl shadow-sm'
                      } px-4 py-3`}
                    >
                      {msg.sender === 'moniteur' && (
                        <div className="text-xs font-semibold text-green-600 mb-1">Moniteur</div>
                      )}
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      <div className={`flex items-center gap-1 justify-end mt-1 ${
                        msg.sender === 'eleve' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <span className="text-xs">{msg.time}</span>
                        {msg.sender === 'eleve' && (
                          msg.status === 'read' ? (
                            <CheckCheck className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-r-2xl rounded-tl-2xl shadow-sm px-4 py-3">
                  <div className="text-xs font-semibold text-green-600 mb-2">Moniteur</div>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Posez votre question au moniteur..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full focus:border-green-500 focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={message.trim() === ''}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white p-3 rounded-full hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-green-50 border-t border-green-100">
        <div className="max-w-4xl mx-auto px-4 py-2 text-center">
          <p className="text-xs text-green-700">
            📞 Urgent ? Appelez le <strong>0788005332</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessagerieMoniteur;

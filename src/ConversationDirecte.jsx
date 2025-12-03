import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Phone, Video, MoreVertical, User, CheckCheck, Clock } from 'lucide-react';

const ConversationDirecte = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Charger les messages sauvegardés
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Message de bienvenue par défaut
      setMessages([
        {
          id: 1,
          text: "Bonjour ! Je suis votre assistant Mondiale Auto-École. Comment puis-je vous aider aujourd'hui ?",
          sender: 'moniteur',
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          status: 'read'
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
      sender: 'user',
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
    setMessage('');

    // Simuler une réponse automatique
    setIsTyping(true);
    setTimeout(() => {
      const autoReply = {
        id: updatedMessages.length + 1,
        text: getAutoReply(message),
        sender: 'moniteur',
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      };
      const finalMessages = [...updatedMessages, autoReply];
      setMessages(finalMessages);
      localStorage.setItem('chatMessages', JSON.stringify(finalMessages));
      setIsTyping(false);
    }, 1500);
  };

  const getAutoReply = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('prix') || msg.includes('coût') || msg.includes('tarif')) {
      return "Nos tarifs : A B C D E à 150.000 FCFA et le permis A B à 120.000 FCFA | au prémiér versement vous avez drois à l'accés premium. Besoin de plus d'infos ?";
    }
    if (msg.includes('horaire') || msg.includes('heure') || msg.includes('ouverture')) {
      return "Nous sommes ouverts du lundi au samedi de 8h à 18h. Le dimanche sur rendez-vous. Quand souhaitez-vous venir ?";
    }
    if (msg.includes('réserver') || msg.includes('rdv') || msg.includes('rendez-vous')) {
      return "Pour réserver un véhicule de conduite, cliquez sur 'Réserver une Leçon' dans le menu principal. Vous pouvez choisir votre date et horaire préféré.";
    }
    if (msg.includes('code') || msg.includes('quiz') || msg.includes('examen')) {
      return "Vous pouvez vous entraîner avec nos 40 séries de quiz dans l'onglet 'Entraînement au Code'. Chaque série contient 40 questions. Besoin d'aide pour commencer ?";
    }
    if (msg.includes('moniteur') || msg.includes('instructeur')) {
      return "Tous nos moniteurs sont diplômés d'État et ont plus de 10 ans d'expérience. Vous pouvez choisir votre moniteur lors de la réservation.";
    }
    if (msg.includes('document') || msg.includes('papier') || msg.includes('dossier')) {
      return "Documents à fournir : Pièce d'identité NCI+Extrait de naissance, pour les non nationaux une pièce CDEAO,";
    }
    if (msg.includes('bonjour') || msg.includes('salut') || msg.includes('hello')) {
      return "Bonjour ! Comment puis-je vous aider aujourd'hui ? 😊";
    }
    if (msg.includes('merci')) {
      return "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. Bonne formation ! 🚗";
    }
    if (msg.includes('bonjour') || msg.includes('salut') || msg.includes('hello')) {
      return "Bonjour ! Comment puis-je vous aider aujourd'hui ? 😊";
    }
    if (msg.includes('merci')) {
      return "Nous sommes situé à Yopougon Sogephia Solic 1, rue des Flamboyants";
    }
    
    return "Je suis là pour répondre à vos questions sur notre auto-école. Vous pouvez me demander : prix, horaires, réservations, quiz, documents nécessaires, etc.";
  };

  const quickReplies = [
    "Quels sont vos tarifs ?",
    "Comment réserver une leçon ?",
    "Documents nécessaires ?",
    "Horaires d'ouverture ?",
     "Ou etes vous située ?",
     "document à fournir pour l'inscription ?"
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
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
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Support Mondiale</h1>
                  <p className="text-xs text-blue-100">En ligne • Répond en quelques minutes</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Date */}
          <div className="text-center mb-6">
            <span className="bg-white px-4 py-2 rounded-full text-sm text-gray-600 shadow-sm">
              {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          {/* Messages */}
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-l-2xl rounded-tr-2xl'
                      : 'bg-white text-gray-800 rounded-r-2xl rounded-tl-2xl shadow-sm'
                  } px-4 py-3`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div className={`flex items-center gap-1 justify-end mt-1 ${
                    msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    <span className="text-xs">{msg.time}</span>
                    {msg.sender === 'user' && (
                      msg.status === 'read' ? (
                        <CheckCheck className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-r-2xl rounded-tl-2xl shadow-sm px-4 py-3">
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

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-3">Questions rapides :</p>
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(reply)}
                    className="bg-white text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}
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
              placeholder="Tapez votre message..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={message.trim() === ''}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-blue-50 border-t border-blue-100">
        <div className="max-w-4xl mx-auto px-4 py-2 text-center">
          <p className="text-xs text-blue-700">
            💬 Support disponible 24/7 • Réponse en moins de 5 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationDirecte;

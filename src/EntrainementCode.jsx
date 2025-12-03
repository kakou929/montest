import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PlayCircle, CheckCircle, Clock, Award } from 'lucide-react';

const EntrainementCode = () => {
  const navigate = useNavigate();
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, average: 0 });

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedQuizzes') || '[]');
    setCompletedQuizzes(completed);
    
    // Calculer les statistiques
    const total = 40;
    const completedCount = completed.length;
    const average = completed.length > 0 
      ? completed.reduce((sum, q) => sum + q.score, 0) / completed.length 
      : 0;
    
    setStats({ total, completed: completedCount, average: Math.round(average) });
  }, []);

  const quizzes = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    title: `Série ${i + 1}`,
    description: `40 questions sur le code de la route`,
    difficulty: i < 10 ? 'Facile' : i < 25 ? 'Moyen' : 'Difficile',
    questions: 40,
    duration: '30 min'
  }));

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Facile': return 'text-green-600 bg-green-100';
      case 'Moyen': return 'text-yellow-600 bg-yellow-100';
      case 'Difficile': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const isQuizCompleted = (quizId) => {
    return completedQuizzes.some(q => q.quizId === quizId);
  };

  const getQuizScore = (quizId) => {
    const quiz = completedQuizzes.find(q => q.quizId === quizId);
    return quiz ? quiz.score : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Entraînement au Code</h1>
              <p className="text-blue-100 text-sm">40 séries de questions</p>
            </div>
          </div>

          {/* Stats rapides */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="text-2xl font-bold">{stats.completed}/{stats.total}</div>
              <div className="text-xs text-blue-100">Séries complétées</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="text-2xl font-bold">{stats.average}/40</div>
              <div className="text-xs text-blue-100">Note moyenne</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="text-2xl font-bold">{Math.round((stats.completed / stats.total) * 100)}%</div>
              <div className="text-xs text-blue-100">Progression</div>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des quiz */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => {
            const completed = isQuizCompleted(quiz.id);
            const score = getQuizScore(quiz.id);

            return (
              <div
                key={quiz.id}
                onClick={() => navigate(`/quiz/${quiz.id}`)}
                className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden group ${
                  completed ? 'ring-2 ring-green-500' : ''
                }`}
              >
                {/* Badge de complétion */}
                {completed && (
                  <div className="bg-green-500 text-white px-4 py-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-semibold">Complété - {score}/40</span>
                  </div>
                )}

                <div className="p-6">
                  {/* Numéro du quiz */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      {quiz.id}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(quiz.difficulty)}`}>
                      {quiz.difficulty}
                    </span>
                  </div>

                  {/* Info quiz */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>

                  {/* Détails */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>{quiz.questions} questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{quiz.duration}</span>
                    </div>
                  </div>

                  {/* Bouton */}
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg">
                    <PlayCircle className="w-5 h-5" />
                    {completed ? 'Refaire' : 'Commencer'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message encourageant */}
        {stats.completed === 0 && (
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-blue-900 mb-2">🚀 Commencez votre apprentissage !</h3>
            <p className="text-blue-700">
              Commencez par la Série 1 (Facile) pour vous familiariser avec les questions du code de la route.
            </p>
          </div>
        )}

        {stats.completed > 0 && stats.completed < 40 && (
          <div className="mt-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-green-900 mb-2">💪 Continuez comme ça !</h3>
            <p className="text-green-700">
              Vous avez complété {stats.completed} séries sur 40. Continuez pour améliorer vos compétences !
            </p>
          </div>
        )}

        {stats.completed === 40 && (
          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-yellow-900 mb-2">🎉 Félicitations !</h3>
            <p className="text-yellow-700">
              Vous avez complété toutes les séries ! Votre note moyenne est de {stats.average}/40. 
              Vous pouvez maintenant passer à l'examen blanc !
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntrainementCode;

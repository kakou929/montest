import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, addDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';

function Quiz({ user }) {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState(null);

  // Charger les quiz depuis Firestore
  useEffect(() => {
    loadQuizzes();
    loadUserStats();
  }, [user]);

  const loadQuizzes = async () => {
    try {
      const quizzesSnapshot = await getDocs(collection(db, 'quizzes'));
      const quizzesData = quizzesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Si pas de quiz, créer les quiz par défaut
      if (quizzesData.length === 0) {
        await createDefaultQuizzes();
        await loadQuizzes();
      } else {
        setQuizzes(quizzesData);
      }
    } catch (error) {
      console.error('Erreur chargement quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserStats = async () => {
    try {
      const statsSnapshot = await getDocs(collection(db, 'quizResults'));
      const userResults = statsSnapshot.docs
        .map(doc => doc.data())
        .filter(result => result.userId === user.uid);
      
      if (userResults.length > 0) {
        const totalScore = userResults.reduce((acc, r) => acc + r.score, 0);
        const avgScore = (totalScore / userResults.length).toFixed(1);
        
        setUserStats({
          quizzesTaken: userResults.length,
          averageScore: avgScore,
          bestScore: Math.max(...userResults.map(r => r.score))
        });
      }
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    }
  };

  const createDefaultQuizzes = async () => {
    const defaultQuizzes = [
      {
        title: 'Quiz Débutant',
        description: 'Code de la route - Niveau Facile',
        difficulty: 'Facile',
        color: '#2ecc71',
        questions: [
          {
            question: "Quelle est la vitesse maximale autorisée en ville en Côte d'Ivoire ?",
            options: ['40 km/h', '50 km/h', '60 km/h', '70 km/h'],
            correctAnswer: 1,
            explanation: "La vitesse maximale en ville est de 50 km/h."
          },
          {
            question: "Que signifie un panneau triangulaire rouge avec un point d'exclamation ?",
            options: ['Danger', 'Interdiction', 'Obligation', 'Indication'],
            correctAnswer: 0,
            explanation: "Les panneaux triangulaires rouges indiquent un danger."
          },
          {
            question: "À quelle distance minimum devez-vous vous arrêter avant un passage piéton ?",
            options: ['1 mètre', '2 mètres', '3 mètres', '5 mètres'],
            correctAnswer: 2,
            explanation: "Vous devez vous arrêter à au moins 3 mètres d'un passage piéton."
          },
          {
            question: "Quel document doit TOUJOURS être dans votre véhicule ?",
            options: ['Passeport', 'Carte grise', 'Acte de naissance', "Carte d'identité"],
            correctAnswer: 1,
            explanation: "La carte grise doit toujours être dans le véhicule."
          },
          {
            question: "À quel âge peut-on passer le permis de conduire catégorie B ?",
            options: ['16 ans', '17 ans', '18 ans', '21 ans'],
            correctAnswer: 2,
            explanation: "Il faut avoir 18 ans pour passer le permis B."
          }
        ],
        createdAt: new Date().toISOString()
      }
    ];

    for (const quiz of defaultQuizzes) {
      await addDoc(collection(db, 'quizzes'), quiz);
    }
  };

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const handleAnswerClick = async (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === selectedQuiz.questions[currentQuestion].correctAnswer;
    
    const newAnswers = [...answers, {
      questionIndex: currentQuestion,
      userAnswer: answerIndex,
      correctAnswer: selectedQuiz.questions[currentQuestion].correctAnswer,
      isCorrect
    }];
    setAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(async () => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < selectedQuiz.questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
        await saveQuizResult(score + (isCorrect ? 1 : 0), selectedQuiz.questions.length);
      }
    }, 2000);
  };

  const saveQuizResult = async (finalScore, totalQuestions) => {
    try {
      const percentage = (finalScore / totalQuestions) * 100;
      
      await addDoc(collection(db, 'quizResults'), {
        userId: user.uid,
        quizId: selectedQuiz.id,
        quizTitle: selectedQuiz.title,
        score: finalScore,
        totalQuestions: totalQuestions,
        percentage: percentage,
        answers: answers,
        completedAt: new Date().toISOString()
      });

      // Mettre à jour les stats utilisateur
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        quizzesCompleted: increment(1),
        lastQuizDate: new Date().toISOString()
      });

      await loadUserStats();
    } catch (error) {
      console.error('Erreur sauvegarde résultat:', error);
    }
  };

  const handleRestart = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '50px', marginBottom: '20px' }}>📚</div>
          <div style={{ fontSize: '20px', color: '#001F3F' }}>Chargement des quiz...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Navbar */}
      <nav style={{ 
        background: 'white',
        padding: '20px 60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
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
            color: 'white'
          }}>
            M
          </div>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: '#1a1a1a' }}>
            <h1 style={{ fontSize: '28px', margin: 0, fontWeight: '700' }}>mondiale</h1>
          </Link>
        </div>
        <Link to="/dashboard" style={{ 
          color: '#1a1a1a',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '16px'
        }}>
          ← Retour au tableau de bord
        </Link>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px' }}>
        {!selectedQuiz && !showResult && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <h2 style={{ fontSize: '42px', marginBottom: '15px', color: '#1a1a1a', fontWeight: '700' }}>
                📚 Quiz de Formation
              </h2>
              <p style={{ fontSize: '18px', color: '#666' }}>
                Testez vos connaissances du code de la route
              </p>

              {/* Stats utilisateur */}
              {userStats && (
                <div style={{ 
                  maxWidth: '600px',
                  margin: '30px auto 0',
                  background: 'white',
                  padding: '25px',
                  borderRadius: '15px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px'
                }}>
                  <div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#FF6B35' }}>
                      {userStats.quizzesTaken}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>Quiz réalisés</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#2ecc71' }}>
                      {userStats.averageScore}%
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>Moyenne</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#3498db' }}>
                      {userStats.bestScore}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>Meilleur score</div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gap: '25px' }}>
              {quizzes.map((quiz) => (
                <div 
                  key={quiz.id}
                  onClick={() => handleStartQuiz(quiz)}
                  style={{
                    background: 'white',
                    padding: '35px',
                    borderRadius: '20px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    borderLeft: `5px solid ${quiz.color}`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '28px', marginBottom: '10px', color: '#1a1a1a', fontWeight: '700' }}>
                        {quiz.title}
                      </h3>
                      <p style={{ color: '#666', marginBottom: '15px', fontSize: '16px' }}>
                        {quiz.description}
                      </p>
                      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <span style={{
                          padding: '6px 15px',
                          borderRadius: '20px',
                          background: quiz.color,
                          color: 'white',
                          fontSize: '13px',
                          fontWeight: '700'
                        }}>
                          {quiz.difficulty}
                        </span>
                        <span style={{ color: '#666', fontSize: '15px' }}>
                          📝 {quiz.questions.length} questions
                        </span>
                      </div>
                    </div>
                    <div style={{
                      padding: '15px 35px',
                      background: quiz.color,
                      color: 'white',
                      borderRadius: '10px',
                      fontWeight: '700',
                      fontSize: '16px'
                    }}>
                      Commencer →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {selectedQuiz && !showResult && (
          <div style={{
            background: 'white',
            padding: '50px',
            borderRadius: '20px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
          }}>
            {/* Progress Bar */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span style={{ color: '#666', fontSize: '16px', fontWeight: '600' }}>
                  Question {currentQuestion + 1}/{selectedQuiz.questions.length}
                </span>
                <span style={{ 
                  color: selectedQuiz.color, 
                  fontWeight: '700',
                  fontSize: '20px'
                }}>
                  Score: {score}
                </span>
              </div>
              
              <div style={{ 
                height: '12px', 
                background: '#f0f0f0',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  height: '100%', 
                  width: `${((currentQuestion + 1) / selectedQuiz.questions.length) * 100}%`,
                  background: selectedQuiz.color,
                  transition: 'width 0.3s ease',
                  borderRadius: '6px'
                }}></div>
              </div>
            </div>

            {/* Question */}
            <h3 style={{ 
              fontSize: '26px', 
              marginBottom: '35px', 
              color: '#1a1a1a',
              lineHeight: '1.5',
              fontWeight: '600'
            }}>
              {selectedQuiz.questions[currentQuestion].question}
            </h3>

            {/* Options */}
            <div style={{ display: 'grid', gap: '15px' }}>
              {selectedQuiz.questions[currentQuestion].options.map((option, index) => {
                let bgColor = 'white';
                let borderColor = '#e0e0e0';
                let textColor = '#1a1a1a';
                
                if (selectedAnswer !== null) {
                  if (index === selectedQuiz.questions[currentQuestion].correctAnswer) {
                    bgColor = '#d4edda';
                    borderColor = '#28a745';
                    textColor = '#155724';
                  } else if (index === selectedAnswer) {
                    bgColor = '#f8d7da';
                    borderColor = '#dc3545';
                    textColor = '#721c24';
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={selectedAnswer !== null}
                    style={{
                      padding: '22px 30px',
                      fontSize: '18px',
                      border: `3px solid ${borderColor}`,
                      borderRadius: '12px',
                      background: bgColor,
                      color: textColor,
                      cursor: selectedAnswer !== null ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s',
                      fontWeight: '500',
                      textAlign: 'left',
                      position: 'relative'
                    }}
                  >
                    <span style={{ 
                      marginRight: '15px',
                      fontWeight: '700',
                      color: selectedQuiz.color
                    }}>
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                    {selectedAnswer !== null && index === selectedQuiz.questions[currentQuestion].correctAnswer && (
                      <span style={{ 
                        position: 'absolute',
                        right: '30px',
                        fontSize: '28px'
                      }}>✓</span>
                    )}
                    {selectedAnswer === index && index !== selectedQuiz.questions[currentQuestion].correctAnswer && (
                      <span style={{ 
                        position: 'absolute',
                        right: '30px',
                        fontSize: '28px'
                      }}>✗</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {selectedAnswer !== null && (
              <div style={{
                marginTop: '30px',
                padding: '25px',
                background: '#e3f2fd',
                borderLeft: `4px solid ${selectedQuiz.color}`,
                borderRadius: '10px'
              }}>
                <p style={{ 
                  fontSize: '16px',
                  color: '#1a1a1a',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  💡 <strong>Explication :</strong> {selectedQuiz.questions[currentQuestion].explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {showResult && (
          <div style={{
            background: 'white',
            padding: '70px 50px',
            borderRadius: '20px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '90px', marginBottom: '30px' }}>
              {score / selectedQuiz.questions.length >= 0.8 ? '🎉' : 
               score / selectedQuiz.questions.length >= 0.6 ? '😊' : 
               score / selectedQuiz.questions.length >= 0.4 ? '📚' : '💪'}
            </div>
            <h3 style={{ fontSize: '42px', marginBottom: '25px', color: '#1a1a1a', fontWeight: '700' }}>
              Quiz terminé !
            </h3>
            <div style={{ 
              fontSize: '60px', 
              marginBottom: '20px', 
              color: selectedQuiz.color,
              fontWeight: '700'
            }}>
              {score}/{selectedQuiz.questions.length}
            </div>
            <p style={{ 
              fontSize: '24px', 
              marginBottom: '20px',
              color: '#666',
              fontWeight: '600'
            }}>
              {Math.round((score / selectedQuiz.questions.length) * 100)}% de réussite
            </p>
            <p style={{ fontSize: '18px', marginBottom: '50px', color: '#666' }}>
              {score / selectedQuiz.questions.length >= 0.8 
                ? 'Excellent ! Vous maîtrisez parfaitement le sujet. 🏆' 
                : score / selectedQuiz.questions.length >= 0.6
                ? 'Bon travail ! Continuez à vous entraîner. 👍'
                : score / selectedQuiz.questions.length >= 0.4
                ? 'Pas mal, mais vous devez encore réviser. 📖'
                : 'Continuez à vous entraîner, vous allez y arriver ! 💪'}
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={handleRestart}
                style={{
                  padding: '18px 45px',
                  background: selectedQuiz.color,
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'transform 0.3s'
                }}
              >
                Choisir un autre quiz
              </button>
              <Link 
                to="/dashboard"
                style={{
                  padding: '18px 45px',
                  background: 'white',
                  color: selectedQuiz.color,
                  border: `3px solid ${selectedQuiz.color}`,
                  borderRadius: '10px',
                  fontSize: '18px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.3s'
                }}
              >
                Retour au tableau de bord
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;

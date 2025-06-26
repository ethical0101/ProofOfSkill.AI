import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase, QuizResult } from '../lib/supabase';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  DocumentArrowDownIcon,
  ArrowPathIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

export function ResultsPage() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const quizData = location.state;

  useEffect(() => {
    if (!quizData) {
      navigate('/quiz');
      return;
    }

    // Save quiz result to Supabase
    const saveQuizResult = async () => {
      if (!user || saving) return;
      
      setSaving(true);
      try {
        const result: Omit<QuizResult, 'id' | 'created_at'> = {
          user_id: user.id,
          skill: quizData.skill,
          score: quizData.score,
          total_questions: quizData.totalQuestions,
          user_name: quizData.userName
        };

        const { error } = await supabase
          .from('quiz_results')
          .insert([result]);

        if (error) {
          console.error('Error saving quiz result:', error);
        }
      } catch (error) {
        console.error('Error saving quiz result:', error);
      } finally {
        setSaving(false);
      }
    };

    saveQuizResult();
  }, [quizData, user, navigate, saving]);

  if (!quizData) {
    return null;
  }

  const { skill, score, totalQuestions, questions, selectedAnswers, userName } = quizData;
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= 60;

  const handleDownloadCertificate = () => {
    const certificateData = {
      userName,
      skill,
      score,
      totalQuestions,
      percentage,
      date: new Date().toLocaleDateString()
    };
    
    navigate('/certificate', { state: certificateData });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            {passed ? (
              <CheckCircleIcon className="h-24 w-24 text-green-400" />
            ) : (
              <XCircleIcon className="h-24 w-24 text-red-400" />
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {passed ? 'Congratulations!' : 'Keep Learning!'}
          </h1>
          
          <p className="text-xl text-gray-400 mb-2">
            Your {skill} Assessment Results
          </p>
          
          <div className="text-6xl font-bold mb-4">
            <span className={passed ? 'text-green-400' : 'text-red-400'}>
              {percentage}%
            </span>
          </div>
          
          <p className="text-lg text-gray-300">
            You scored {score} out of {totalQuestions} questions correctly
          </p>
          
          {passed ? (
            <p className="text-green-400 text-lg font-medium mt-2">
              🎉 You passed! You can download your certificate below.
            </p>
          ) : (
            <p className="text-red-400 text-lg font-medium mt-2">
              You need 60% or higher to pass. Don't give up - try again!
            </p>
          )}
        </div>

        {/* Question Review */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 mb-8 animate-slide-up">
          <h2 className="text-2xl font-semibold text-white mb-6">Question Review</h2>
          
          <div className="space-y-6">
            {questions.map((question: any, index: number) => {
              const isCorrect = selectedAnswers[index] === question.correctAnswer;
              const userAnswer = selectedAnswers[index];
              const correctAnswer = question.correctAnswer;
              
              return (
                <div key={index} className="border border-gray-700 rounded-xl p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    {isCorrect ? (
                      <CheckCircleIcon className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircleIcon className="h-6 w-6 text-red-400 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white mb-3">
                        Question {index + 1}: {question.question}
                      </h3>
                      
                      <div className="space-y-2">
                        {question.options.map((option: string, optionIndex: number) => {
                          let className = "p-3 rounded-lg border ";
                          
                          if (optionIndex === correctAnswer) {
                            className += "border-green-500 bg-green-500/10 text-green-300";
                          } else if (optionIndex === userAnswer && !isCorrect) {
                            className += "border-red-500 bg-red-500/10 text-red-300";
                          } else {
                            className += "border-gray-600 bg-gray-700/30 text-gray-400";
                          }
                          
                          return (
                            <div key={optionIndex} className={className}>
                              {option}
                              {optionIndex === correctAnswer && (
                                <span className="ml-2 text-sm text-green-400">✓ Correct</span>
                              )}
                              {optionIndex === userAnswer && !isCorrect && (
                                <span className="ml-2 text-sm text-red-400">✗ Your answer</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      
                      {question.explanation && (
                        <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <p className="text-blue-300 text-sm">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {passed && (
            <button
              onClick={handleDownloadCertificate}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 rounded-2xl hover:from-green-500 hover:to-green-400 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl animate-pulse-slow"
            >
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              Download Certificate
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-200"></div>
            </button>
          )}
          
          <Link
            to="/quiz"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-300 bg-gray-800/50 backdrop-blur-sm rounded-2xl hover:text-white hover:bg-gray-700/50 transform hover:scale-105 transition-all duration-200 border border-gray-700/50"
          >
            <ArrowPathIcon className="h-5 w-5 mr-2" />
            Retake Quiz
          </Link>
          
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-300 bg-gray-800/50 backdrop-blur-sm rounded-2xl hover:text-white hover:bg-gray-700/50 transform hover:scale-105 transition-all duration-200 border border-gray-700/50"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
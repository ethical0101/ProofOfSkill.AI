import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { generateQuizQuestions, QuizQuestion } from '../lib/gemini';
import { ChevronDownIcon, SparklesIcon } from '@heroicons/react/24/outline';

const AVAILABLE_SKILLS = [
  'JavaScript',
  'React',
  'Python',
  'TypeScript',
  'Node.js',
  'CSS',
  'HTML',
  'Vue.js',
  'Angular',
  'PHP'
];

export function QuizPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedSkill, setSelectedSkill] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const startQuiz = async () => {
    if (!selectedSkill) return;
    
    setLoading(true);
    try {
      const generatedQuestions = await generateQuizQuestions(selectedSkill);
      setQuestions(generatedQuestions);
      setSelectedAnswers(new Array(generatedQuestions.length).fill(-1));
      setQuizStarted(true);
      setCurrentQuestion(0);
    } catch (error) {
      console.error('Error starting quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = () => {
    const score = selectedAnswers.reduce((total, answer, index) => {
      return total + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);

    // Store quiz data and navigate to results
    const quizData = {
      skill: selectedSkill,
      questions,
      selectedAnswers,
      score,
      totalQuestions: questions.length,
      userName: user?.user_metadata?.full_name || user?.email || 'User'
    };

    navigate('/results', { state: quizData });
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Skill</span>
            </h1>
            <p className="text-lg text-gray-400">
              Select a technology to test your knowledge with AI-generated questions
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 animate-slide-up">
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Technology
                </label>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  >
                    <span className={selectedSkill ? 'text-white' : 'text-gray-400'}>
                      {selectedSkill || 'Choose a skill...'}
                    </span>
                    <ChevronDownIcon className={`h-5 w-5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-xl shadow-lg max-h-60 overflow-auto">
                      {AVAILABLE_SKILLS.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => {
                            setSelectedSkill(skill);
                            setShowDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left text-white hover:bg-gray-600 transition-colors first:rounded-t-xl last:rounded-b-xl"
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={startQuiz}
                disabled={!selectedSkill || loading}
                className="group relative w-full flex items-center justify-center px-6 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl hover:from-primary-500 hover:to-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  <>
                    <SparklesIcon className="h-5 w-5 mr-2" />
                    Generate Quiz
                  </>
                )}
              </button>

              <div className="text-sm text-gray-400 text-center">
                <p>• 5 AI-generated questions</p>
                <p>• Pass with 60% or higher</p>
                <p>• Get your certificate instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-primary-400">
              {selectedSkill}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary-500 to-accent-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 mb-8 animate-slide-up">
          <h2 className="text-2xl font-semibold text-white mb-8 leading-relaxed">
            {questions[currentQuestion]?.question}
          </h2>

          <div className="space-y-4">
            {questions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-primary-500 bg-primary-500/10 text-white'
                    : 'border-gray-600 bg-gray-700/30 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-500'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-lg">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className="px-6 py-3 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex space-x-4">
            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={nextQuestion}
                disabled={selectedAnswers[currentQuestion] === -1}
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl hover:from-primary-500 hover:to-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={submitQuiz}
                disabled={selectedAnswers[currentQuestion] === -1}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:from-green-500 hover:to-green-400 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
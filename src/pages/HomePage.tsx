import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  AcademicCapIcon, 
  SparklesIcon, 
  DocumentCheckIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';

export function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-blue-800/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-400 rounded-full blur-lg opacity-30 animate-pulse-slow"></div>
                <AcademicCapIcon className="relative h-24 w-24 text-primary-500" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                CertiAI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              AI-Powered Smart Certificate Generator
            </p>
            
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Take AI-generated skill assessments and earn professional certificates. 
              Test your knowledge in JavaScript, React, Python, and more!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={user ? "/quiz" : "/auth"}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl hover:from-primary-500 hover:to-primary-400 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <SparklesIcon className="h-5 w-5" />
                  <span>Get Started</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-200"></div>
              </Link>
              
              {user && (
                <Link
                  to="/history"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-300 bg-gray-800/50 backdrop-blur-sm rounded-2xl hover:text-white hover:bg-gray-700/50 transform hover:scale-105 transition-all duration-200 border border-gray-700/50"
                >
                  <ChartBarIcon className="h-5 w-5 mr-2" />
                  My Results
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Get certified in your favorite tech skills with our AI-powered assessment platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group animate-slide-up">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-xl p-4 w-fit mb-6">
                <SparklesIcon className="h-8 w-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Choose Your Skill</h3>
              <p className="text-gray-400">
                Select from JavaScript, React, Python, and more. Our AI generates personalized questions based on your chosen technology.
              </p>
            </div>
          </div>

          <div className="group animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-br from-accent-400/20 to-accent-500/20 rounded-xl p-4 w-fit mb-6">
                <DocumentCheckIcon className="h-8 w-8 text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Take the Quiz</h3>
              <p className="text-gray-400">
                Answer 5 AI-generated questions testing your practical knowledge. Pass with 60% or higher to earn your certificate.
              </p>
            </div>
          </div>

          <div className="group animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-4 w-fit mb-6">
                <AcademicCapIcon className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Get Certified</h3>
              <p className="text-gray-400">
                Download your professional certificate as a PDF. Share it on LinkedIn or add it to your portfolio.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600/10 to-accent-400/10 border-t border-gray-700/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Certified?
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Join thousands of developers who have validated their skills with CertiAI
          </p>
          <Link
            to={user ? "/quiz" : "/auth"}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl hover:from-primary-500 hover:to-primary-400 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10">Start Your Assessment</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-200"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
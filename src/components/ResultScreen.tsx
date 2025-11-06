import React, { useState } from 'react'
import { Share2, RotateCcw, Download, Sparkles } from 'lucide-react'
import { PersonalityType } from '../App'
import { personalities } from '../data/personalities'
import PaymentModal from './PaymentModal'

interface ResultScreenProps {
  personality: PersonalityType
  onRestart: () => void
}

const ResultScreen: React.FC<ResultScreenProps> = ({ personality, onRestart }) => {
  const result = personalities[personality]
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [isPremium, setIsPremium] = useState(false)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `I'm a ${result.name}!`,
        text: `I just took the personality quiz and I'm a ${result.name}! ${result.tagline}`,
        url: window.location.href,
      })
    } else {
      alert('Sharing not supported on this browser')
    }
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    setIsPremium(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <div className="max-w-4xl w-full">
        {/* Celebration header */}
        <div className="text-center mb-8 animate-bounce">
          <h1 className="font-baloo font-extrabold text-5xl md:text-7xl text-shadow mb-4">
            <span className="text-coral">You're</span>{' '}
            <span className="text-purple">a</span>{' '}
            <span className={`text-${result.color}`}>{result.name}!</span>
          </h1>
          <div className="text-7xl md:text-9xl">{result.emoji}</div>
        </div>

        {/* Premium Upgrade Banner */}
        {!isPremium && (
          <div className="bg-gradient-to-r from-purple to-pink border-4 border-black rounded-3xl p-6 mb-8 box-shadow-brutal">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-300 rounded-full p-3 border-2 border-black">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-fredoka font-bold text-xl text-white">
                    Unlock Your Full Personality Report
                  </h3>
                  <p className="font-fredoka text-white/90">
                    Get detailed insights, career matches, and relationship tips
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="bg-yellow-300 hover:bg-yellow-400 text-black font-fredoka font-bold py-3 px-6 rounded-xl border-3 border-black box-shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200 whitespace-nowrap"
              >
                Upgrade for $9.99
              </button>
            </div>
          </div>
        )}

        {/* Main result card */}
        <div className={`bg-white rounded-3xl p-8 md:p-12 border-4 border-black box-shadow-brutal relative overflow-hidden mb-8`}>
          {/* Premium Badge */}
          {isPremium && (
            <div className="absolute top-4 right-4 bg-yellow-300 border-2 border-black rounded-full px-4 py-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="font-fredoka font-bold text-sm">Premium</span>
            </div>
          )}

          {/* Decorative elements */}
          <div className={`absolute top-0 right-0 w-40 h-40 bg-${result.color} rounded-full -translate-y-1/2 translate-x-1/2 opacity-40`} />
          <div className={`absolute bottom-0 left-0 w-32 h-32 bg-${result.secondaryColor} rotate-45 translate-y-1/2 -translate-x-1/2 opacity-40`} />
          
          <div className="relative z-10">
            {/* Tagline */}
            <div className={`bg-${result.color}/20 border-4 border-black rounded-2xl p-6 mb-8 box-shadow-brutal-sm`}>
              <p className="font-baloo font-bold text-2xl md:text-3xl text-center text-gray-800">
                "{result.tagline}"
              </p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-baloo font-bold text-3xl text-purple mb-4">About You:</h2>
              <p className="font-fredoka text-xl text-gray-700 leading-relaxed">
                {result.description}
              </p>
            </div>

            {/* Traits */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-baloo font-bold text-2xl text-coral mb-4">✨ Your Superpowers:</h3>
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="font-fredoka text-lg flex items-start">
                      <span className="text-coral mr-2">•</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-baloo font-bold text-2xl text-purple mb-4">🎯 Growth Areas:</h3>
                <ul className="space-y-2">
                  {result.weaknesses.map((weakness, index) => (
                    <li key={index} className="font-fredoka text-lg flex items-start">
                      <span className="text-purple mr-2">•</span>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Perfect day */}
            <div className="bg-yellow/30 border-4 border-black rounded-2xl p-6 mb-8 box-shadow-brutal-sm">
              <h3 className="font-baloo font-bold text-2xl text-lime mb-3">🌟 Your Perfect Day:</h3>
              <p className="font-fredoka text-lg text-gray-700">
                {result.perfectDay}
              </p>
            </div>

            {/* Famous matches */}
            <div className="mb-8">
              <h3 className="font-baloo font-bold text-2xl text-cyan mb-4">🎭 Famous Vibes Like You:</h3>
              <div className="flex flex-wrap gap-3">
                {result.famousMatches.map((match, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-pink to-cyan/40 font-fredoka font-semibold px-4 py-2 rounded-full border-2 border-black"
                  >
                    {match}
                  </span>
                ))}
              </div>
            </div>

            {/* Premium Content Preview */}
            {!isPremium && (
              <div className="relative mb-8">
                <div className="blur-sm pointer-events-none">
                  <h3 className="font-baloo font-bold text-2xl text-purple mb-4">💼 Career Matches:</h3>
                  <div className="space-y-2">
                    <div className="bg-gray-200 h-6 rounded"></div>
                    <div className="bg-gray-200 h-6 rounded w-3/4"></div>
                    <div className="bg-gray-200 h-6 rounded w-5/6"></div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="bg-yellow-300 hover:bg-yellow-400 text-black font-fredoka font-bold py-3 px-6 rounded-xl border-3 border-black box-shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
                  >
                    Unlock Premium Content
                  </button>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleShare}
                className="flex-1 bg-purple hover:bg-purple/90 text-white font-baloo font-bold text-xl py-4 px-6 rounded-2xl border-4 border-black box-shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Share2 className="w-6 h-6" />
                Share Results
              </button>
              <button
                onClick={onRestart}
                className="flex-1 bg-coral hover:bg-coral/90 text-white font-baloo font-bold text-xl py-4 px-6 rounded-2xl border-4 border-black box-shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-6 h-6" />
                Take Again
              </button>
            </div>
          </div>
        </div>

        {/* Footer message */}
        <div className="text-center">
          <p className="font-fredoka text-xl text-gray-700 mb-4">
            Share this quiz with your friends and see what vibe they get! 🎉
          </p>
          <div className="flex justify-center gap-4">
            <div className="w-8 h-8 bg-coral rounded-full animate-pulse" />
            <div className="w-8 h-8 bg-purple rotate-45 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-8 h-8 bg-lime rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        amount={9.99}
        description="Premium Personality Report"
      />
    </div>
  )
}

export default ResultScreen

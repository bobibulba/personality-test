import React from 'react'
import { Sparkles, Heart, Star } from 'lucide-react'

interface WelcomeScreenProps {
  onStart: () => void
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Floating icons */}
        <div className="relative mb-8">
          <Sparkles className="absolute -top-8 -left-8 w-12 h-12 text-yellow animate-bounce" />
          <Heart className="absolute -top-4 -right-4 w-10 h-10 text-coral animate-pulse" />
          <Star className="absolute -bottom-4 left-1/4 w-8 h-8 text-purple animate-spin" style={{ animationDuration: '3s' }} />
        </div>

        {/* Main card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 box-shadow-brutal border-4 border-black relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-lime rounded-full -translate-y-1/2 translate-x-1/2 opacity-60" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-coral rotate-45 -translate-y-1/2 -translate-x-1/2 opacity-50" />
          
          <div className="relative z-10">
            <h1 className="font-baloo font-extrabold text-5xl md:text-7xl text-center mb-4 text-shadow">
              <span className="text-coral">What's</span>{' '}
              <span className="text-purple">Your</span>{' '}
              <span className="text-lime">Vibe</span>
              <span className="text-cyan">?</span>
            </h1>
            
            <p className="font-fredoka text-xl md:text-2xl text-center text-gray-700 mb-8">
              Discover your quirky personality type in just 10 fun questions! 🎨✨
            </p>

            <div className="bg-yellow/30 border-4 border-black rounded-2xl p-6 mb-8 box-shadow-brutal-sm">
              <h2 className="font-baloo font-bold text-2xl mb-4 text-purple">How it works:</h2>
              <ul className="space-y-3 font-fredoka text-lg">
                <li className="flex items-start">
                  <span className="text-coral font-bold mr-3">1.</span>
                  <span>Answer 10 super fun questions honestly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple font-bold mr-3">2.</span>
                  <span>No right or wrong answers - just be YOU!</span>
                </li>
                <li className="flex items-start">
                  <span className="text-lime font-bold mr-3">3.</span>
                  <span>Get your unique personality type & share with friends</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onStart}
              className="w-full bg-coral hover:bg-coral/90 text-white font-baloo font-bold text-2xl py-6 px-8 rounded-2xl border-4 border-black box-shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
            >
              Let's Go! 🚀
            </button>

            <p className="text-center mt-6 font-fredoka text-gray-600">
              Takes only 2 minutes • 100% free • No signup required
            </p>
          </div>
        </div>

        {/* Bottom decorative shapes */}
        <div className="flex justify-center gap-4 mt-8">
          <div className="w-12 h-12 bg-purple rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-12 h-12 bg-coral rotate-45 animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-12 h-12 bg-lime rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen

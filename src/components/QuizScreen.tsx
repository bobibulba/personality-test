import React, { useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { questions } from '../data/questions'

interface QuizScreenProps {
  onComplete: (answers: number[]) => void
}

const QuizScreen: React.FC<QuizScreenProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 300)
    } else {
      setTimeout(() => {
        onComplete(newAnswers)
      }, 300)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <div className="max-w-3xl w-full">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-fredoka font-bold text-purple text-lg">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="font-fredoka font-bold text-coral text-lg">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-4 bg-white rounded-full border-4 border-black overflow-hidden box-shadow-brutal-sm">
            <div
              className="h-full bg-gradient-to-r from-coral via-purple to-lime transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border-4 border-black box-shadow-brutal relative overflow-hidden">
          {/* Decorative corner shapes */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow rounded-full -translate-y-1/2 translate-x-1/2 opacity-60" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-cyan rotate-45 translate-y-1/2 -translate-x-1/2 opacity-50" />
          
          <div className="relative z-10">
            <div className="mb-8">
              <span className="inline-block bg-lime text-black font-baloo font-bold text-lg px-4 py-2 rounded-full border-2 border-black mb-4">
                {question.category}
              </span>
              <h2 className="font-baloo font-bold text-3xl md:text-4xl text-gray-800 mb-4">
                {question.question}
              </h2>
              {question.emoji && (
                <div className="text-6xl mb-4">{question.emoji}</div>
              )}
            </div>

            {/* Answer options */}
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full text-left bg-gradient-to-r from-pink to-yellow/40 hover:from-coral hover:to-purple/40 p-6 rounded-2xl border-4 border-black box-shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-fredoka font-semibold text-xl text-gray-800 group-hover:text-white transition-colors">
                      {option.text}
                    </span>
                    <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                </button>
              ))}
            </div>

            {/* Back button */}
            {currentQuestion > 0 && (
              <button
                onClick={handleBack}
                className="mt-6 flex items-center gap-2 font-fredoka font-semibold text-purple hover:text-coral transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous Question
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizScreen

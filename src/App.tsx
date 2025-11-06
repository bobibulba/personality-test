import React, { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import LoginScreen from './components/LoginScreen'
import PaymentScreen from './components/PaymentScreen'
import WelcomeScreen from './components/WelcomeScreen'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'
import BackgroundPattern from './components/BackgroundPattern'
import Toast from './components/Toast'

export type PersonalityType = 'sunshine' | 'cosmic' | 'forest' | 'ocean' | 'fire'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasPaid, setHasPaid] = useState(false)
  const [loading, setLoading] = useState(true)
  const [screen, setScreen] = useState<'payment' | 'welcome' | 'quiz' | 'result'>('payment')
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<PersonalityType | null>(null)
  const [showConfirmationToast, setShowConfirmationToast] = useState(false)
  const [showPaymentSuccessToast, setShowPaymentSuccessToast] = useState(false)

  useEffect(() => {
    // Check for email confirmation in URL hash
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const type = hashParams.get('type')
    
    if (type === 'signup') {
      setShowConfirmationToast(true)
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    // Check active session and payment status
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        setIsAuthenticated(true)
        
        // Check payment status from user metadata
        const paymentStatus = session.user.user_metadata?.has_paid || false
        setHasPaid(paymentStatus)
        
        // Set initial screen based on payment status
        if (paymentStatus) {
          setScreen('welcome')
        } else {
          setScreen('payment')
        }
      }
      
      setLoading(false)
    }

    initializeAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setIsAuthenticated(!!session)
      
      if (session) {
        // Check payment status
        const paymentStatus = session.user.user_metadata?.has_paid || false
        setHasPaid(paymentStatus)
        
        // Show toast on email confirmation
        if (event === 'SIGNED_IN') {
          const emailConfirmed = session.user?.email_confirmed_at
          if (emailConfirmed) {
            setShowConfirmationToast(true)
          }
        }
      } else {
        setHasPaid(false)
        setScreen('payment')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
    setScreen('payment')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsAuthenticated(false)
    setHasPaid(false)
    setScreen('payment')
    setAnswers([])
    setResult(null)
  }

  const handlePaymentSuccess = async () => {
    // Update user metadata to mark as paid
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      await supabase.auth.updateUser({
        data: { has_paid: true }
      })
      
      setHasPaid(true)
      setShowPaymentSuccessToast(true)
      setScreen('welcome')
    }
  }

  const startQuiz = () => {
    setScreen('quiz')
    setAnswers([])
  }

  const handleQuizComplete = (finalAnswers: number[]) => {
    setAnswers(finalAnswers)
    const personalityResult = calculatePersonality(finalAnswers)
    setResult(personalityResult)
    setScreen('result')
  }

  const restartQuiz = () => {
    setScreen('welcome')
    setAnswers([])
    setResult(null)
  }

  const calculatePersonality = (answers: number[]): PersonalityType => {
    const sum = answers.reduce((acc, val) => acc + val, 0)
    
    if (sum <= 15) return 'sunshine'
    if (sum <= 25) return 'cosmic'
    if (sum <= 35) return 'forest'
    if (sum <= 45) return 'ocean'
    return 'fire'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-fredoka">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <BackgroundPattern />
        <div className="relative z-10">
          <LoginScreen onLogin={handleLogin} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundPattern />
      
      {showConfirmationToast && (
        <Toast
          message="🎉 Email confirmed successfully! Welcome aboard!"
          onClose={() => setShowConfirmationToast(false)}
        />
      )}
      
      {showPaymentSuccessToast && (
        <Toast
          message="✨ Payment successful! You now have full access to the quiz!"
          onClose={() => setShowPaymentSuccessToast(false)}
        />
      )}
      
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 z-50 bg-white hover:bg-gray-100 text-gray-800 font-fredoka font-semibold py-2 px-6 rounded-xl border-3 border-black box-shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200"
      >
        Logout
      </button>
      
      <div className="relative z-10">
        {!hasPaid && screen === 'payment' && (
          <PaymentScreen onPaymentSuccess={handlePaymentSuccess} />
        )}
        {hasPaid && screen === 'welcome' && <WelcomeScreen onStart={startQuiz} />}
        {hasPaid && screen === 'quiz' && <QuizScreen onComplete={handleQuizComplete} />}
        {hasPaid && screen === 'result' && result && (
          <ResultScreen personality={result} onRestart={restartQuiz} />
        )}
      </div>
    </div>
  )
}

export default App

import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Sparkles, Mail, Lock, UserPlus, LogIn } from 'lucide-react'

interface LoginScreenProps {
  onLogin: () => void
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: 'https://cute-quirky-personality-1759320708325.chatand.build'
          }
        })
        
        if (error) throw error
        
        setMessage('Account created! Please check your email to confirm your account.')
        setIsSignUp(false)
        setPassword('')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        
        if (error) throw error
        
        onLogin()
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl border-4 border-black box-shadow-brutal p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-yellow-300 rounded-full p-4 border-3 border-black">
              <Sparkles className="w-8 h-8" />
            </div>
          </div>
          
          <h1 className="text-4xl font-fredoka font-bold text-center mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back!'}
          </h1>
          
          <p className="text-center text-gray-600 mb-8 font-fredoka">
            {isSignUp 
              ? 'Sign up to discover your personality type' 
              : 'Sign in to continue your journey'}
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border-2 border-red-500 rounded-xl">
              <p className="text-red-700 font-fredoka text-sm">{error}</p>
            </div>
          )}

          {message && (
            <div className="mb-4 p-4 bg-green-100 border-2 border-green-500 rounded-xl">
              <p className="text-green-700 font-fredoka text-sm">{message}</p>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-fredoka font-semibold mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 border-3 border-black rounded-xl font-fredoka focus:outline-none focus:ring-4 focus:ring-yellow-300"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-fredoka font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-12 pr-4 py-3 border-3 border-black rounded-xl font-fredoka focus:outline-none focus:ring-4 focus:ring-yellow-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-fredoka font-bold py-4 px-6 rounded-xl border-3 border-black box-shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                'Loading...'
              ) : isSignUp ? (
                <>
                  <UserPlus className="w-5 h-5" />
                  Sign Up
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError(null)
                setMessage(null)
              }}
              className="text-sm font-fredoka text-gray-600 hover:text-black transition-colors"
            >
              {isSignUp 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen

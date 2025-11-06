import React, { useState } from 'react'
import { Sparkles, Lock, Check, CreditCard } from 'lucide-react'
import PaymentModal from './PaymentModal'

interface PaymentScreenProps {
  onPaymentSuccess: () => void
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ onPaymentSuccess }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [processing, setProcessing] = useState(false)

  const handlePaymentSuccess = () => {
    setProcessing(true)
    setShowPaymentModal(false)
    
    // Simulate a brief processing delay for better UX
    setTimeout(() => {
      onPaymentSuccess()
    }, 1000)
  }

  const features = [
    'Complete personality assessment',
    'Detailed personality analysis',
    'Personalized insights and recommendations',
    'Beautiful shareable results',
    'Instant access - no waiting',
  ]

  // Price matches Stripe product: prod_TMi8mnBq7lL65d
  const PRICE = 1.00

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-3xl border-4 border-black box-shadow-brutal p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-300 rounded-full border-4 border-black mb-6 animate-bounce-slow">
              <Sparkles className="w-10 h-10" />
            </div>
            
            <h1 className="font-fredoka font-bold text-4xl md:text-5xl mb-4">
              Unlock Your Personality Quiz
            </h1>
            
            <p className="font-fredoka text-xl text-gray-600">
              Discover your unique personality type with our comprehensive assessment
            </p>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl border-3 border-black p-8 mb-8">
            <div className="text-center mb-6">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="font-fredoka text-5xl md:text-6xl font-bold">${PRICE.toFixed(2)}</span>
                <span className="font-fredoka text-xl text-gray-600">one-time</span>
              </div>
              <p className="font-fredoka text-gray-600">
                Lifetime access • No subscriptions
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white rounded-xl border-2 border-black p-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-green-400 rounded-full border-2 border-black flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="font-fredoka font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setShowPaymentModal(true)}
            disabled={processing}
            className="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-fredoka font-bold text-xl py-4 px-8 rounded-xl border-4 border-black box-shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {processing ? (
              <>
                <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-6 h-6" />
                Get Instant Access
              </>
            )}
          </button>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
            <Lock className="w-4 h-4" />
            <span className="font-fredoka">
              Secure payment powered by Stripe
            </span>
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-6 text-center">
            <div className="inline-block bg-green-100 border-2 border-green-500 rounded-full px-4 py-2">
              <p className="font-fredoka font-semibold text-green-700 text-sm">
                ✓ 30-Day Money Back Guarantee
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 text-center">
          <p className="font-fredoka text-gray-600 text-sm">
            Join thousands of people who've discovered their personality type
          </p>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        amount={PRICE}
        description="Personality Quiz Access"
      />
    </div>
  )
}

export default PaymentScreen

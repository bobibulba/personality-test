import React, { useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '../lib/stripe'
import CheckoutForm from './CheckoutForm'
import { X, Lock, CreditCard } from 'lucide-react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  amount: number
  description: string
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  amount,
  description,
}) => {
  if (!isOpen) return null

  const options = {
    mode: 'payment' as const,
    amount: amount * 100, // Convert to cents
    currency: 'usd',
    appearance: {
      theme: 'flat' as const,
      variables: {
        colorPrimary: '#FCD34D',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#ef4444',
        fontFamily: 'Fredoka, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '12px',
      },
    },
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl border-4 border-black box-shadow-brutal max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b-4 border-black p-6 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-300 rounded-full p-2 border-2 border-black">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="font-fredoka font-bold text-2xl">Secure Payment</h2>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full p-2 transition-colors border-2 border-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Payment Details */}
          <div className="bg-yellow-50 border-3 border-black rounded-2xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-fredoka font-semibold text-gray-700">
                {description}
              </span>
              <span className="font-fredoka font-bold text-2xl">
                ${amount.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-600 font-fredoka">
              One-time payment • Secure checkout
            </p>
          </div>

          {/* Security Badge */}
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
            <Lock className="w-4 h-4" />
            <span className="font-fredoka">
              Secured by Stripe • Your payment info is encrypted
            </span>
          </div>

          {/* Stripe Elements */}
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm
              amount={amount}
              onSuccess={onSuccess}
              onCancel={onClose}
            />
          </Elements>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal

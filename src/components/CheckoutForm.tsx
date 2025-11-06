import React, { useState } from 'react'
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js'
import { Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface CheckoutFormProps {
  amount: number
  onSuccess: () => void
  onCancel: () => void
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  amount,
  onSuccess,
  onCancel,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Submit the form to validate
      const { error: submitError } = await elements.submit()
      
      if (submitError) {
        setError(submitError.message || 'An error occurred')
        setLoading(false)
        return
      }

      // Get the Supabase function URL
      const { data: { session } } = await supabase.auth.getSession()
      const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`

      // Call backend to create payment intent with product info
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          amount,
          currency: 'usd',
          description: 'Personality Quiz Access',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create payment intent')
      }

      const { clientSecret, productId } = await response.json()

      // Confirm the payment with Stripe
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: window.location.origin,
        },
        redirect: 'if_required',
      })

      if (confirmError) {
        setError(confirmError.message || 'Payment failed')
        setLoading(false)
        return
      }

      // Payment successful - store product info in user metadata
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        await supabase.auth.updateUser({
          data: { 
            has_paid: true,
            product_id: productId,
            purchase_date: new Date().toISOString(),
          }
        })
      }

      setLoading(false)
      onSuccess()

    } catch (err: any) {
      console.error('Payment error:', err)
      setError(err.message || 'Payment failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      {error && (
        <div className="p-4 bg-red-100 border-2 border-red-500 rounded-xl">
          <p className="text-red-700 font-fredoka text-sm">{error}</p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-fredoka font-bold py-3 px-6 rounded-xl border-3 border-black box-shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 bg-yellow-300 hover:bg-yellow-400 text-black font-fredoka font-bold py-3 px-6 rounded-xl border-3 border-black box-shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </button>
      </div>

      <p className="text-xs text-center text-gray-500 font-fredoka">
        By confirming your payment, you agree to our terms of service
      </p>
    </form>
  )
}

export default CheckoutForm

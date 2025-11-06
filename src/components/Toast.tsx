import React, { useEffect } from 'react'
import { CheckCircle, X } from 'lucide-react'

interface ToastProps {
  message: string
  onClose: () => void
  duration?: number
}

const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
      <div className="bg-green-400 border-3 border-black rounded-xl box-shadow-brutal p-4 flex items-center gap-3 min-w-[320px]">
        <div className="bg-white rounded-full p-1 border-2 border-black">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <p className="font-fredoka font-semibold text-black flex-1">{message}</p>
        <button
          onClick={onClose}
          className="hover:bg-green-500 rounded-full p-1 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default Toast

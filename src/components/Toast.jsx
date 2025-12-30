import { useEffect } from 'react'

function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const bgColor =
    type === 'success'
      ? 'bg-green-500'
      : type === 'error'
      ? 'bg-red-500'
      : type === 'warning'
      ? 'bg-yellow-500'
      : 'bg-blue-500'

  const icon =
    type === 'success'
      ? '✓'
      : type === 'error'
      ? '✕'
      : type === 'warning'
      ? '⚠'
      : 'ℹ'

  return (
    <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
      <div
        className={`${bgColor} text-white px-5 py-3 rounded-xl shadow-md flex items-center gap-3 min-w-[300px] max-w-[90vw]`}
      >
        <span className="text-xl font-bold">{icon}</span>
        <span className="flex-1">{message}</span>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 font-bold text-lg"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default Toast


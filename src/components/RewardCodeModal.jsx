import { useState } from 'react'

function RewardCodeModal({ reward, onClose }) {
  const [copySuccess, setCopySuccess] = useState(false)

  const handleCopy = () => {
    if (reward.rewardCode) {
      navigator.clipboard.writeText(reward.rewardCode).then(() => {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      })
    }
  }

  if (!reward || !reward.rewardCode) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 animate-scale-in">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            🎁 リワードコード
          </h3>
          <div className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-xl p-6 mb-6 border border-secondary-200">
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">コード</p>
            <p className="text-4xl font-bold text-secondary-700 font-mono tracking-wider">
              {reward.rewardCode}
            </p>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            このコードを店員さんに見せてください
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className={`flex-1 px-5 py-3 font-semibold rounded-xl transition-all duration-200 text-sm ${
                copySuccess
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {copySuccess ? '✓ コピーしました' : 'コピー'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-5 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-200 text-sm shadow-sm hover:shadow-md"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RewardCodeModal


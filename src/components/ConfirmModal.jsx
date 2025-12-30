function ConfirmModal({ title, message, onConfirm, onCancel, confirmText = '確認', cancelText = 'キャンセル', confirmColor = 'primary' }) {
  const confirmBgColor =
    confirmColor === 'primary'
      ? 'bg-primary-500 hover:bg-primary-600'
      : confirmColor === 'danger'
      ? 'bg-red-500 hover:bg-red-600'
      : 'bg-secondary-500 hover:bg-secondary-600'

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-scale-in">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-5 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-5 py-2.5 ${confirmBgColor} text-white font-semibold rounded-xl transition-colors text-sm`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal


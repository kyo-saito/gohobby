function Announcement({ title, message, items = [], buttonText = 'ホームに戻る', onButtonClick, icon = '📢' }) {
  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="bg-white rounded-xl p-8 animate-fade-in">
        <div className="text-center mb-6">
          <span className="text-6xl mb-4 block">{icon}</span>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
          {message && <p className="text-gray-600 text-base leading-relaxed">{message}</p>}
        </div>

        {items.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <ul className="space-y-2.5">
              {items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary-500 font-bold mt-0.5">•</span>
                  <span className="text-gray-700 flex-1 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={onButtonClick}
          className="w-full px-6 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-200 text-base shadow-sm hover:shadow-md"
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default Announcement


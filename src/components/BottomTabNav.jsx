function BottomTabNav({ currentPage, setCurrentPage }) {
  const tabs = [
    { id: 'home', label: 'ホーム', icon: '🏠' },
    { id: 'goals', label: '目標', icon: '🎯' },
    { id: 'rewards', label: 'リワード', icon: '🎁' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentPage(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              currentPage === tab.id
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="text-2xl mb-1">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default BottomTabNav


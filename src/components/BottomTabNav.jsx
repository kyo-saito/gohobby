function BottomTabNav({ currentPage, setCurrentPage }) {
  const tabs = [
    { id: 'home', label: 'ホーム', icon: '🏠' },
    { id: 'goals', label: '目標', icon: '🎯' },
    { id: 'rewards', label: 'ご褒美', icon: '🎁' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
      <div className="flex justify-around items-center h-14">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentPage(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 ${
              currentPage === tab.id
                ? 'text-primary-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="text-xl mb-0.5">{tab.icon}</span>
            <span className="text-[10px] font-medium leading-tight">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default BottomTabNav


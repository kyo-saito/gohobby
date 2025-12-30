function Header({ currentPage, setCurrentPage }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1
            className="text-2xl font-bold text-primary-600 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            🎯 GoHobby
          </h1>
          <nav className="flex gap-4">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'home'
                  ? 'bg-primary-100 text-primary-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              ホーム
            </button>
            <button
              onClick={() => setCurrentPage('goal-form')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'goal-form'
                  ? 'bg-primary-100 text-primary-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              目標を登録
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header


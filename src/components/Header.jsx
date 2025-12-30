import { useState } from 'react'

function Header({ currentPage, setCurrentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [iconError, setIconError] = useState(false)

  const menuItems = [
    { id: 'home', label: 'ホーム', icon: '🏠' },
    { id: 'goals', label: '目標', icon: '🎯' },
    { id: 'rewards', label: 'リワード', icon: '🎁' },
  ]

  const handleMenuClick = (pageId) => {
    setCurrentPage(pageId)
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between">
          <h1
            className="text-xl font-bold text-gray-800 cursor-pointer flex items-center gap-2.5"
            onClick={() => setCurrentPage('home')}
          >
            {!iconError ? (
              <img
                src="/icon.png"
                alt="GoHobby"
                className="w-20 h-20 object-contain"
                onError={() => setIconError(true)}
              />
            ) : (
              <span className="text-5xl">🎯</span>
            )}
            <span className="hidden sm:inline">GoHobby</span>
          </h1>

          {/* ハンバーガーメニューボタン */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
            aria-label="メニュー"
          >
            <span className="text-2xl">≡</span>
          </button>

          {/* デスクトップ用ナビゲーション */}
          <nav className="hidden md:flex gap-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  currentPage === item.id
                    ? 'bg-primary-100 text-primary-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* モバイル用ドロップダウンメニュー */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col gap-2 mt-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`px-4 py-3 rounded-lg transition-colors flex items-center gap-3 text-left ${
                    currentPage === item.id
                      ? 'bg-primary-100 text-primary-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

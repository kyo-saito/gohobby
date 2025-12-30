import { useState, useEffect } from 'react'

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

  // メニュー表示中は背景のスクロールを停止
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

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
            <span>GoHobby</span>
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

        {/* モバイル用オーバーレイメニュー */}
        {isMenuOpen && (
          <>
            {/* 背景オーバーレイ */}
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-50 md:hidden animate-fade-in"
              onClick={() => setIsMenuOpen(false)}
            />
            {/* メニュー本体（右上からドロップダウン） */}
            <div className="fixed top-16 right-4 bg-white rounded-xl shadow-xl z-50 md:hidden min-w-[200px] animate-scale-in">
              <div className="p-2">
                <div className="flex items-center justify-between mb-2 px-2 py-1">
                  <span className="text-sm font-semibold text-gray-700">メニュー</span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    aria-label="閉じる"
                  >
                    <span className="text-xl">×</span>
                  </button>
                </div>
                <nav className="flex flex-col gap-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleMenuClick(item.id)}
                      className={`px-4 py-3 rounded-lg transition-colors flex items-center gap-3 text-left ${
                        currentPage === item.id
                          ? 'bg-primary-100 text-primary-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default Header

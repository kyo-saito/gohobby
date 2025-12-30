function Footer() {
  // Viteの環境変数からバージョンを取得（vite.config.jsで注入）
  const version = import.meta.env.VITE_APP_VERSION || '1.1.1'

  return (
    <footer className="fixed bottom-16 left-0 right-0 bg-gray-50 border-t border-gray-200 py-1.5 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <p className="text-xs text-gray-400">
            GoHobby v{version}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


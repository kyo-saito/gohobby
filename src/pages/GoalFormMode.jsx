import StepIndicator from '../components/StepIndicator'

function GoalFormMode({ setCurrentPage, setMode }) {
  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="bg-white rounded-xl p-8">
        <StepIndicator currentStep={1} totalSteps={3} stepName="目標の入力" />
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          目標を登録
        </h2>
        <p className="text-gray-600 mb-8">
          目標の登録方法を選択してください
        </p>

        <div className="space-y-4">
          <button
            onClick={() => {
              setMode('simple')
              setCurrentPage('goal-form')
            }}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-4 rounded-lg transition-colors text-left flex items-center justify-between"
          >
            <div>
              <div className="text-lg font-bold mb-1">かんたん設定</div>
              <div className="text-sm opacity-90">
                候補から選んで素早く登録
              </div>
            </div>
            <span className="text-2xl">⚡</span>
          </button>

          <button
            onClick={() => {
              setMode('detailed')
              setCurrentPage('goal-form')
            }}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-4 rounded-lg transition-colors text-left flex items-center justify-between"
          >
            <div>
              <div className="text-lg font-bold mb-1">詳細設定</div>
              <div className="text-sm opacity-90">
                自分の言葉で自由に入力
              </div>
            </div>
            <span className="text-2xl">✏️</span>
          </button>
        </div>

        <button
          onClick={() => setCurrentPage('home')}
          className="mt-6 w-full px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          キャンセル
        </button>
      </div>
    </div>
  )
}

export default GoalFormMode


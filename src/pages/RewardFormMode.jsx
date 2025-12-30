import { useState, useEffect } from 'react'
import { useGoal } from '../context/GoalContext'

const GIFT_OPTIONS = [
  {
    id: 'ice-cream',
    title: 'アイス',
    benefit: 'トッピング無料',
    description: '通常よりお得',
    icon: '🍦',
  },
  {
    id: 'manga',
    title: '漫画',
    benefit: '1巻無料',
    description: '通常よりお得',
    icon: '📚',
  },
  {
    id: 'ramen',
    title: 'ラーメン',
    benefit: 'トッピング無料',
    description: '通常よりお得',
    icon: '🍜',
  },
  {
    id: 'cafe',
    title: 'カフェ',
    benefit: 'サイズアップ無料',
    description: '通常よりお得',
    icon: '☕',
  },
  {
    id: 'movie',
    title: '映画',
    benefit: 'ポップコーン無料',
    description: '通常よりお得',
    icon: '🎬',
  },
]

import StepIndicator from '../components/StepIndicator'

function RewardFormMode({ setCurrentPage, setMode }) {
  const { state } = useGoal()
  const goalId = state.selectedGoalId
  const latestGoal = state.goals.find((goal) => goal.id === goalId)

  useEffect(() => {
    if (!goalId && state.goals.length === 0) {
      setCurrentPage('goal-form-mode')
    }
  }, [goalId, state.goals.length, setCurrentPage])

  if (!latestGoal) {
    return (
      <div className="max-w-2xl mx-auto pb-20">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 mb-4">目標が見つかりません</p>
          <button
            onClick={() => setCurrentPage('goal-form-mode')}
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
          >
            目標を登録する
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="bg-white rounded-xl p-8">
        <StepIndicator currentStep={2} totalSteps={3} stepName="リワードの設定" />
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            リワードを設定
          </h2>
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <p className="text-sm text-primary-700 font-medium mb-1">
              目標: {latestGoal.title}
            </p>
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          リワードの設定方法を選択してください
        </p>

        <div className="space-y-4">
          <button
            onClick={() => {
              setMode('select')
              setCurrentPage('reward-form')
            }}
            className="w-full bg-secondary-500 hover:bg-secondary-600 text-white font-semibold px-6 py-4 rounded-lg transition-colors text-left flex items-center justify-between"
          >
            <div>
              <div className="text-lg font-bold mb-1">選択式（デモ用）</div>
              <div className="text-sm opacity-90">
                ギフト5つから選んで素早く設定
              </div>
            </div>
            <span className="text-2xl">🎁</span>
          </button>

          <button
            onClick={() => {
              setMode('custom')
              setCurrentPage('reward-form')
            }}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-4 rounded-lg transition-colors text-left flex items-center justify-between"
          >
            <div>
              <div className="text-lg font-bold mb-1">自分でアレンジ</div>
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

export default RewardFormMode


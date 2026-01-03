import { useGoal } from '../context/GoalContext'
import { useEffect } from 'react'

function RewardReceiveConfirm({ setCurrentPage }) {
  const { state, dispatch } = useGoal()
  const goalId = state.selectedGoalId
  const goal = state.goals.find((g) => g.id === goalId)
  const reward = state.rewards.find((r) => r.goalId === goalId)
  const achievement = state.achievements.find((a) => a.goalId === goalId)

  // ページ表示時にページ最上部にスクロール
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleConfirm = () => {
    if (!goalId) {
      setCurrentPage('rewards')
      return
    }
    dispatch({ type: 'GIVE_REWARD', payload: goalId })
    setCurrentPage('reward-receive-success')
  }

  const handleCancel = () => {
    setCurrentPage('rewards')
  }

  if (!goal || !reward) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 mb-4">ご褒美が見つかりません</p>
          <button
            onClick={() => setCurrentPage('rewards')}
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
          >
            ご褒美一覧に戻る
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎁</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ご褒美を受け取りますか？
          </h2>
        </div>

        <div className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-lg p-6 mb-6 border border-secondary-200">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">目標</p>
            <p className="text-lg font-semibold text-gray-800">{goal.title}</p>
          </div>
          <div className="border-t border-secondary-200 pt-4">
            <p className="text-sm text-gray-600 mb-2">ご褒美</p>
            <p className="text-xl font-bold text-secondary-700">{reward.title}</p>
            {reward.description && (
              <p className="text-sm text-gray-600 mt-2">{reward.description}</p>
            )}
          </div>
          {achievement && (
            <div className="border-t border-secondary-200 pt-4 mt-4">
              <p className="text-sm text-gray-600">
                達成日: {new Date(achievement.completedAt).toLocaleDateString('ja-JP')}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleCancel}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
          >
            キャンセル
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-lg transition-colors"
          >
            受け取る 🎉
          </button>
        </div>
      </div>
    </div>
  )
}

export default RewardReceiveConfirm


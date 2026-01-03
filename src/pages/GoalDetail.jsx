import { useState } from 'react'
import { useGoal } from '../context/GoalContext'
import ConfirmModal from '../components/ConfirmModal'
import Toast from '../components/Toast'

function GoalDetail({ setCurrentPage }) {
  const { state, dispatch } = useGoal()
  const selectedGoalId = state.selectedGoalId
  const [showCodeModal, setShowCodeModal] = useState(false)
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false)
  const [toast, setToast] = useState(null)

  const goal = state.goals.find((g) => g.id === selectedGoalId)
  const reward = state.rewards.find((r) => r.goalId === selectedGoalId)
  const achievement = state.achievements.find((a) => a.goalId === selectedGoalId)
  const isCompleted = goal?.status === 'completed'

  const handleCompleteGoal = () => {
    if (!selectedGoalId) return
    setShowCompleteConfirm(true)
  }

  const confirmCompleteGoal = () => {
    dispatch({ type: 'COMPLETE_GOAL', payload: selectedGoalId })
    setShowCompleteConfirm(false)
    setToast({ message: '目標達成おめでとうございます！🎉', type: 'success' })
  }

  const handleReceiveReward = () => {
    if (!selectedGoalId || goal.rewarded) return
    setCurrentPage('reward-receive-confirm')
  }

  if (!goal) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 mb-4">目標が見つかりません</p>
          <button
            onClick={() => setCurrentPage('home')}
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-primary-600 hover:text-primary-700 mb-4 flex items-center gap-2"
          >
            ← ホームに戻る
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {goal.title}
          </h2>
          {goal.description && (
            <p className="text-gray-600 mb-4">{goal.description}</p>
          )}
          <div
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              isCompleted
                ? 'bg-secondary-100 text-secondary-700'
                : 'bg-primary-100 text-primary-700'
            }`}
          >
            {isCompleted ? '✓ 達成済み' : '進行中'}
          </div>
        </div>

        {reward && (
          <div className="mb-6 bg-gradient-to-r from-secondary-50 to-primary-50 rounded-xl p-5 border border-secondary-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              🎁 ご褒美
            </h3>
            <p className="text-xl font-bold text-secondary-700 mb-2">
              {reward.title}
            </p>
            {reward.description && (
              <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
            )}
            {isCompleted && !goal.rewarded && (
              <button
                onClick={handleReceiveReward}
                className="mt-4 px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-xl transition-all duration-200 w-full shadow-sm hover:shadow-md"
              >
                ご褒美を受け取る 🎉
              </button>
            )}
            {goal.rewarded && (
              <div className="mt-4 space-y-3">
                <div className="px-4 py-2.5 bg-secondary-50 rounded-xl border border-secondary-200">
                  <p className="text-secondary-700 font-semibold mb-2 text-sm">
                    ✓ ご褒美をあげました
                  </p>
                  {goal.rewardedAt && (
                    <p className="text-xs text-gray-600 mb-2">
                      ご褒美日: {new Date(goal.rewardedAt).toLocaleDateString('ja-JP')}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {achievement && (
          <div className="mb-6 bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              達成日時
            </h3>
            <p className="text-gray-600">
              {new Date(achievement.completedAt).toLocaleString('ja-JP')}
            </p>
          </div>
        )}

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => setCurrentPage('goal-edit')}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            編集
          </button>
          {!isCompleted && (
            <button
              onClick={handleCompleteGoal}
              className="flex-1 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
            >
              目標を達成した！
            </button>
          )}
        </div>
      </div>
      {showCompleteConfirm && (
        <ConfirmModal
          title="目標を達成しましたか？"
          message="達成すると、リワードを受け取ることができます。"
          onConfirm={confirmCompleteGoal}
          onCancel={() => setShowCompleteConfirm(false)}
          confirmText="達成した"
          cancelText="キャンセル"
        />
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default GoalDetail


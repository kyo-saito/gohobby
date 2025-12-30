import { useState } from 'react'
import { useGoal } from '../context/GoalContext'
import RewardCodeModal from '../components/RewardCodeModal'

function RewardList({ setCurrentPage }) {
  const { state } = useGoal()
  const [showCodeModal, setShowCodeModal] = useState(false)
  const [selectedReward, setSelectedReward] = useState(null)

  // すべてのリワードを取得し、達成状況で分類
  const rewardsWithGoals = state.rewards.map((reward) => {
    const goal = state.goals.find((g) => g.id === reward.goalId)
    const achievement = state.achievements.find((a) => a.goalId === reward.goalId)
    const isCompleted = goal?.status === 'completed'
    const isReceived = reward.received

    return {
      ...reward,
      goal,
      achievement,
      isCompleted,
      isReceived,
    }
  })

  // 達成済み（取得済み）のリワード
  const receivedRewards = rewardsWithGoals.filter((r) => r.isReceived)

  // 達成済みだが未取得のリワード
  const completedButNotReceived = rewardsWithGoals.filter(
    (r) => r.isCompleted && !r.isReceived
  )

  // 未達成のリワード
  const pendingRewards = rewardsWithGoals.filter(
    (r) => !r.isCompleted && !r.isReceived
  )

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          リワード一覧
        </h2>
        <p className="text-gray-600 text-sm">
          達成状況に応じて表示されます
        </p>
      </div>

      {/* 取得済みリワード（強調表示） */}
      {receivedRewards.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-secondary-700 mb-4 flex items-center gap-2">
            <span>🎁</span>
            <span>取得済みリワード</span>
          </h3>
          <div className="space-y-3">
            {receivedRewards.map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-xl p-5 border border-secondary-200 shadow-sm animate-fade-in"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🎁</span>
                      <h4 className="text-lg font-bold text-secondary-700">
                        {item.title}
                      </h4>
                      <span className="bg-secondary-200 text-secondary-800 text-xs font-semibold px-2 py-1 rounded">
                        取得済み
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-gray-700 text-sm mb-2">
                        {item.description}
                      </p>
                    )}
                    {item.goal && (
                      <p className="text-sm text-gray-600">
                        目標: {item.goal.title}
                      </p>
                    )}
                    {item.achievement && (
                      <p className="text-xs text-gray-500 mt-2">
                        取得日:{' '}
                        {new Date(item.achievement.completedAt).toLocaleDateString(
                          'ja-JP'
                        )}
                      </p>
                    )}
                    {item.rewardCode && (
                      <p className="text-xs text-gray-600 mt-2 font-mono">
                        コード: {item.rewardCode}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedReward(item)
                    setShowCodeModal(true)
                  }}
                  className="mt-4 w-full px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-lg transition-colors"
                >
                  コードを見る
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 達成済みだが未取得のリワード */}
      {completedButNotReceived.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-primary-700 mb-4 flex items-center gap-2">
            <span>⏳</span>
            <span>受け取り待ち</span>
          </h3>
          <div className="space-y-3">
            {completedButNotReceived.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg p-6 border-2 border-primary-300 shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🎁</span>
                      <h4 className="text-lg font-bold text-primary-700">
                        {item.title}
                      </h4>
                      <span className="bg-primary-200 text-primary-800 text-xs font-semibold px-2 py-1 rounded">
                        受け取り待ち
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-gray-700 text-sm mb-2">
                        {item.description}
                      </p>
                    )}
                    {item.goal && (
                      <p className="text-sm text-gray-600">
                        目標: {item.goal.title}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 未達成のリワード（薄く表示） */}
      {pendingRewards.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-gray-500 mb-4 flex items-center gap-2">
            <span>📋</span>
            <span>未達成のリワード</span>
          </h3>
          <div className="space-y-3">
            {pendingRewards.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg p-6 border border-gray-200 opacity-50 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl opacity-60">🎁</span>
                      <h4 className="text-base font-medium text-gray-500">
                        {item.title}
                      </h4>
                      <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-1 rounded">
                        未達成
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-gray-400 text-sm mb-2">
                        {item.description}
                      </p>
                    )}
                    {item.goal && (
                      <p className="text-sm text-gray-400">
                        目標: {item.goal.title}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* リワードがない場合 */}
      {rewardsWithGoals.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 mb-4">まだリワードが登録されていません</p>
          <button
            onClick={() => setCurrentPage('goal-form-mode')}
            className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            目標を登録する
          </button>
        </div>
      )}
      {showCodeModal && selectedReward && (
        <RewardCodeModal
          reward={selectedReward}
          onClose={() => {
            setShowCodeModal(false)
            setSelectedReward(null)
          }}
        />
      )}
    </div>
  )
}

export default RewardList


import { useEffect } from 'react'
import { useGoal } from '../context/GoalContext'

function RewardList({ setCurrentPage }) {
  const { state, dispatch } = useGoal()

  // ページ表示時にページ最上部にスクロール
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleReceiveReward = (goalId) => {
    dispatch({ type: 'SET_SELECTED_GOAL', payload: goalId })
    setCurrentPage('reward-receive-confirm')
  }

  // 達成済みでまだご褒美をあげていない目標
  const unreceivedGoals = state.goals
    .filter((goal) => goal.status === 'completed' && !goal.rewarded)
    .sort((a, b) => {
      const achievementA = state.achievements.find((ach) => ach.goalId === a.id)
      const achievementB = state.achievements.find((ach) => ach.goalId === b.id)
      const dateA = achievementA ? new Date(achievementA.completedAt) : new Date(a.createdAt)
      const dateB = achievementB ? new Date(achievementB.completedAt) : new Date(b.createdAt)
      return dateB - dateA // 新しい順
    })

  // ご褒美を受け取った目標
  const receivedGoals = state.goals
    .filter((goal) => goal.rewarded)
    .sort((a, b) => {
      const dateA = goal.rewardedAt ? new Date(goal.rewardedAt) : new Date(goal.createdAt)
      const dateB = goal.rewardedAt ? new Date(goal.rewardedAt) : new Date(goal.createdAt)
      return dateB - dateA // 新しい順
    })

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          ご褒美一覧
        </h2>
        <p className="text-gray-600 text-sm">
          達成状況に応じて表示されます
        </p>
      </div>

      {unreceivedGoals.length === 0 && receivedGoals.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 mb-4">まだご褒美がありません</p>
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            ホームに戻る
          </button>
        </div>
      ) : (
        <>
          {/* 受け取り待ちの目標 */}
          {unreceivedGoals.length > 0 && (
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-primary-700 mb-4 flex items-center gap-2">
                <span>⏳</span>
                <span>受け取り待ち</span>
              </h3>
              <div className="space-y-3">
                {unreceivedGoals.map((goal) => {
                  const reward = state.rewards.find(
                    (r) => r.goalId === goal.id
                  )
                  const achievement = state.achievements.find(
                    (a) => a.goalId === goal.id
                  )
                  return (
                    <div
                      key={goal.id}
                      className="bg-white rounded-lg p-6 border-2 border-primary-300 shadow-md"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">🎁</span>
                            <h4 className="text-lg font-bold text-primary-700">
                              {reward ? reward.title : goal.title}
                            </h4>
                            <span className="bg-primary-200 text-primary-800 text-xs font-semibold px-2 py-1 rounded">
                              受け取り待ち
                            </span>
                          </div>
                          {reward && reward.description && (
                            <p className="text-gray-700 text-sm mb-2">
                              {reward.description}
                            </p>
                          )}
                          {goal && (
                            <p className="text-sm text-gray-600">
                              目標: {goal.title}
                            </p>
                          )}
                          {achievement && (
                            <p className="text-xs text-gray-500 mt-2">
                              達成日: {new Date(achievement.completedAt).toLocaleDateString('ja-JP')}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleReceiveReward(goal.id)}
                        className="mt-4 w-full px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-lg transition-colors"
                      >
                        ご褒美を受け取る 🎉
                      </button>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* ご褒美を受け取った目標（薄く表示） */}
          {receivedGoals.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold text-secondary-700 mb-4 flex items-center gap-2">
                <span>🎁</span>
                <span>受け取り済み</span>
              </h3>
              <div className="space-y-3">
                {receivedGoals.map((goal) => {
                  const reward = state.rewards.find(
                    (r) => r.goalId === goal.id
                  )
                  const achievement = state.achievements.find(
                    (a) => a.goalId === goal.id
                  )
                  return (
                    <div
                      key={goal.id}
                      className="bg-white rounded-lg p-6 border border-secondary-200 opacity-60 shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">🎁</span>
                            <h4 className="text-lg font-bold text-secondary-700">
                              {reward ? reward.title : goal.title}
                            </h4>
                            <span className="bg-secondary-200 text-secondary-800 text-xs font-semibold px-2 py-1 rounded">
                              受け取り済み
                            </span>
                          </div>
                          {reward && reward.description && (
                            <p className="text-gray-700 text-sm mb-2">
                              {reward.description}
                            </p>
                          )}
                          {goal && (
                            <p className="text-sm text-gray-600">
                              目標: {goal.title}
                            </p>
                          )}
                          {achievement && (
                            <p className="text-xs text-gray-500 mt-2">
                              達成日: {new Date(achievement.completedAt).toLocaleDateString('ja-JP')}
                            </p>
                          )}
                          {goal.rewardedAt && (
                            <p className="text-xs text-gray-500 mt-2">
                              ご褒美日: {new Date(goal.rewardedAt).toLocaleDateString('ja-JP')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}

export default RewardList


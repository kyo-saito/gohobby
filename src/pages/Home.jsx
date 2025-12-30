import { useGoal } from '../context/GoalContext'

function Home({ setCurrentPage }) {
  const { state, dispatch } = useGoal()
  const activeGoals = state.goals.filter((goal) => goal.status === 'active')
  const completedGoals = state.goals.filter((goal) => goal.status === 'completed')

  const handleGoalClick = (goalId) => {
    dispatch({ type: 'SET_SELECTED_GOAL', payload: goalId })
    setCurrentPage('goal-detail')
  }

  // 最近追加した目標を取得（作成日時の降順）
  const recentGoals = [...state.goals]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          努力に、ご褒美を。
        </h2>
        <p className="text-gray-600">
          目標を決めて達成したら、自分にリワード。毎日のストレスを達成感に変えよう。
        </p>
      </div>

      {/* 常設: 新しい目標を追加ボタン */}
      <div className="mb-8">
        <button
          onClick={() => setCurrentPage('goal-form-mode')}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          <span className="text-xl">＋</span>
          <span>新しい目標を追加</span>
        </button>
      </div>

      {/* 最近追加した目標一覧 */}
      {recentGoals.length > 0 ? (
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            最近追加した目標
          </h3>
          <div className="space-y-3">
            {recentGoals.map((goal) => {
              const reward = state.rewards.find((r) => r.goalId === goal.id)
              return (
                <div
                  key={goal.id}
                  onClick={() => handleGoalClick(goal.id)}
                  className={`bg-white rounded-xl p-4 cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 ${
                    goal.status === 'completed'
                      ? 'border-secondary-400 opacity-90'
                      : 'border-primary-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">
                        {goal.title}
                      </h4>
                      {goal.description && (
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {goal.description}
                        </p>
                      )}
                      {reward && (
                        <p className="text-sm text-secondary-600 font-medium">
                          🎁 {reward.title}
                        </p>
                      )}
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ml-2 ${
                        goal.status === 'completed'
                          ? 'bg-secondary-50 text-secondary-600'
                          : 'bg-primary-50 text-primary-600'
                      }`}
                    >
                      {goal.status === 'completed' ? '✓ 達成済み' : '進行中'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
          <p className="text-gray-500">まだ目標が登録されていません</p>
        </div>
      )}

      {/* アクティブな目標（従来の表示も残す） */}
      {activeGoals.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            アクティブな目標
          </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {activeGoals.map((goal) => {
                  const reward = state.rewards.find(
                    (r) => r.goalId === goal.id
                  )
                  return (
                    <div
                      key={goal.id}
                      onClick={() => handleGoalClick(goal.id)}
                      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-primary-500"
                    >
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        {goal.title}
                      </h4>
                      {goal.description && (
                        <p className="text-gray-600 text-sm mb-3">
                          {goal.description}
                        </p>
                      )}
                      {reward && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm text-gray-500">リワード:</p>
                          <p className="text-secondary-600 font-medium">
                            🎁 {reward.title}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {completedGoals.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                達成済み目標
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {completedGoals.map((goal) => {
                  const reward = state.rewards.find(
                    (r) => r.goalId === goal.id
                  )
                  const achievement = state.achievements.find(
                    (a) => a.goalId === goal.id
                  )
                  return (
                    <div
                      key={goal.id}
                      className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary-500 opacity-75"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-gray-800">
                          {goal.title}
                        </h4>
                        <span className="text-secondary-600 font-semibold">
                          ✓ 達成
                        </span>
                      </div>
                      {achievement && (
                        <p className="text-sm text-gray-500 mb-3">
                          達成日: {new Date(achievement.completedAt).toLocaleDateString('ja-JP')}
                        </p>
                      )}
                      {reward && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm text-gray-500">リワード:</p>
                          <p
                            className={`font-medium ${
                              reward.received
                                ? 'text-secondary-600'
                                : 'text-gray-400'
                            }`}
                          >
                            🎁 {reward.title}
                            {reward.received && ' ✓ 受け取り済み'}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>
          )}
    </div>
  )
}

export default Home


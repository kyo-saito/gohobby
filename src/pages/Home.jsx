import { useGoal } from '../context/GoalContext'

function Home({ setCurrentPage }) {
  const { state, dispatch } = useGoal()
  const activeGoals = state.goals.filter((goal) => goal.status === 'active')
  const completedGoals = state.goals.filter((goal) => goal.status === 'completed')

  const handleGoalClick = (goalId) => {
    dispatch({ type: 'SET_SELECTED_GOAL', payload: goalId })
    setCurrentPage('goal-detail')
  }

  // アクティブな目標を新しい順で取得
  const sortedActiveGoals = [...activeGoals].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

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

      {/* 進行中の目標 */}
      {sortedActiveGoals.length > 0 ? (
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            進行中の目標
          </h3>
          <div className="space-y-3">
            {sortedActiveGoals.map((goal) => {
              const reward = state.rewards.find((r) => r.goalId === goal.id)
              return (
                <div
                  key={goal.id}
                  onClick={() => handleGoalClick(goal.id)}
                  className="bg-white rounded-xl p-5 cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 border-primary-500"
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
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full ml-2 bg-primary-50 text-primary-600">
                      進行中
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ) : (
        <div className="bg-white rounded-xl p-8 text-center mb-8">
          <p className="text-gray-500 mb-4">進行中の目標はありません</p>
          <button
            onClick={() => setCurrentPage('goal-form-mode')}
            className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            新しい目標を追加
          </button>
        </div>
      )}
    </div>
  )
}

export default Home


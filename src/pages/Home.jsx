import { useGoal } from '../context/GoalContext'

function Home({ setCurrentPage }) {
  const { state, dispatch } = useGoal()
  const activeGoals = state.goals.filter((goal) => goal.status === 'active')
  const completedGoals = state.goals.filter((goal) => goal.status === 'completed')

  const handleGoalClick = (goalId) => {
    dispatch({ type: 'SET_SELECTED_GOAL', payload: goalId })
    setCurrentPage('goal-detail')
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          目標達成とリワードシステム
        </h2>
        <p className="text-gray-600">
          日々の努力にすぐに報酬を。ストレスを報酬に変えましょう。
        </p>
      </div>

      {activeGoals.length === 0 && completedGoals.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 mb-4">まだ目標が登録されていません</p>
          <button
            onClick={() => setCurrentPage('goal-form-mode')}
            className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            最初の目標を登録する
          </button>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}

export default Home


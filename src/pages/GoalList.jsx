import { useGoal } from '../context/GoalContext'

function GoalList({ setCurrentPage }) {
  const { state, dispatch } = useGoal()
  const allGoals = [...state.goals].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

  const handleGoalClick = (goalId) => {
    dispatch({ type: 'SET_SELECTED_GOAL', payload: goalId })
    setCurrentPage('goal-detail')
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          保存した目標一覧
        </h2>
        <p className="text-gray-600 text-sm">
          過去に登録した目標を確認・再利用できます
        </p>
      </div>

      {allGoals.length === 0 ? (
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
        <div className="space-y-4">
          {allGoals.map((goal) => {
            const reward = state.rewards.find((r) => r.goalId === goal.id)
            const achievement = state.achievements.find(
              (a) => a.goalId === goal.id
            )
            return (
              <div
                key={goal.id}
                onClick={() => handleGoalClick(goal.id)}
                className={`bg-white rounded-xl p-5 cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 ${
                  goal.status === 'completed'
                    ? 'border-secondary-400 opacity-90'
                    : 'border-primary-500'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 flex-1">
                    {goal.title}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      goal.status === 'completed'
                        ? 'bg-secondary-50 text-secondary-600'
                        : 'bg-primary-50 text-primary-600'
                    }`}
                  >
                    {goal.status === 'completed' ? '✓ 達成済み' : '進行中'}
                  </span>
                </div>
                {goal.description && (
                  <p className="text-gray-600 text-sm mb-3">{goal.description}</p>
                )}
                {reward && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-1">リワード:</p>
                    <p className="text-secondary-600 font-medium">
                      🎁 {reward.title}
                    </p>
                  </div>
                )}
                {achievement && (
                  <p className="text-xs text-gray-400 mt-2">
                    達成日:{' '}
                    {new Date(achievement.completedAt).toLocaleDateString(
                      'ja-JP'
                    )}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  登録日:{' '}
                  {new Date(goal.createdAt).toLocaleDateString('ja-JP')}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default GoalList


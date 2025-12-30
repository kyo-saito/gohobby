import { useState, useEffect } from 'react'
import { useGoal } from '../context/GoalContext'

function RewardForm({ setCurrentPage }) {
  const { state, dispatch } = useGoal()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  // selectedGoalIdから目標を取得
  const goalId = state.selectedGoalId
  const latestGoal = state.goals.find((goal) => goal.id === goalId)

  useEffect(() => {
    if (!goalId && state.goals.length === 0) {
      // 目標がない場合は目標登録画面に戻る
      setCurrentPage('goal-form')
    }
  }, [goalId, state.goals.length, setCurrentPage])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      alert('リワード名を入力してください')
      return
    }

    if (!goalId) {
      alert('目標が見つかりません。最初からやり直してください。')
      setCurrentPage('goal-form')
      return
    }

    dispatch({
      type: 'ADD_REWARD',
      payload: {
        goalId,
        title: title.trim(),
        description: description.trim(),
      },
    })

    alert('目標とリワードが登録されました！')
    setCurrentPage('home')

    // フォームをリセット
    setTitle('')
    setDescription('')
  }

  if (!latestGoal) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 mb-4">目標が見つかりません</p>
          <button
            onClick={() => setCurrentPage('goal-form')}
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
          >
            目標を登録する
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="reward-title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              リワード名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="reward-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例: 好きなレストランでディナー"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="reward-description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              説明（任意）
            </label>
            <textarea
              id="reward-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="リワードの詳細を記入してください"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              💡 目標を達成したら、このリワードを受け取ることができます。
              自分へのご褒美を楽しみに、目標達成に向けて頑張りましょう！
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setCurrentPage('home')}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              スキップ
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-lg transition-colors"
            >
              リワードを登録
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RewardForm


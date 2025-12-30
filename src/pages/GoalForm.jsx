import { useState } from 'react'
import { useGoal } from '../context/GoalContext'

function GoalForm({ setCurrentPage }) {
  const { dispatch } = useGoal()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      alert('目標名を入力してください')
      return
    }

    // 目標を追加（ADD_GOALアクションでselectedGoalIdも自動設定される）
    dispatch({
      type: 'ADD_GOAL',
      payload: {
        title: title.trim(),
        description: description.trim(),
      },
    })

    // リワード登録画面に遷移
    setCurrentPage('reward-form')

    // フォームをリセット
    setTitle('')
    setDescription('')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          新しい目標を登録
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              目標名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例: 今週のプレゼン資料を完成させる"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              説明（任意）
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="目標の詳細や背景を記入してください"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setCurrentPage('home')}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
            >
              次へ（リワードを設定）
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GoalForm


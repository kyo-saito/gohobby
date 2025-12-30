import { useState, useEffect } from 'react'
import { useGoal } from '../context/GoalContext'
import Toast from '../components/Toast'

const GOAL_TEMPLATES = [
  '運動する',
  '勉強する',
  '片付ける',
  '読書',
  '早寝',
  'プレゼン資料を完成させる',
  '会議の準備をする',
  'メールを整理する',
  '新しいスキルを学ぶ',
  '健康診断を受ける',
]

function GoalEdit({ setCurrentPage }) {
  const { state, dispatch } = useGoal()
  const goal = state.goals.find((g) => g.id === state.selectedGoalId)
  const reward = state.rewards.find((r) => r.goalId === state.selectedGoalId)

  const [title, setTitle] = useState(goal?.title || '')
  const [description, setDescription] = useState(goal?.description || '')
  const [rewardTitle, setRewardTitle] = useState(reward?.title || '')
  const [rewardDescription, setRewardDescription] = useState(
    reward?.description || ''
  )
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [mode, setMode] = useState('detailed')
  const [toast, setToast] = useState(null)
  const [titleError, setTitleError] = useState('')

  useEffect(() => {
    if (!goal) {
      setCurrentPage('home')
    }
  }, [goal, setCurrentPage])

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
    setTitle(template)
    setTitleError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setTitleError('目標名を入力してください')
      return
    }

    if (!goal) {
      setToast({ message: '目標が見つかりません', type: 'error' })
      return
    }
    setTitleError('')

    // 目標を更新
    dispatch({
      type: 'UPDATE_GOAL',
      payload: {
        id: goal.id,
        updates: {
          title: title.trim(),
          description: description.trim(),
        },
      },
    })

    // リワードを更新（既存のリワードがある場合）
    if (reward && rewardTitle.trim()) {
      dispatch({
        type: 'UPDATE_REWARD',
        payload: {
          id: reward.id,
          updates: {
            title: rewardTitle.trim(),
            description: rewardDescription.trim(),
          },
        },
      })
    }

    setToast({ message: '目標を更新しました！', type: 'success' })
    setTimeout(() => {
      setCurrentPage('goal-detail')
    }, 1500)
  }

  if (!goal) {
    return null
  }

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <button
            onClick={() => setCurrentPage('goal-detail')}
            className="text-primary-600 hover:text-primary-700 mb-4 flex items-center gap-2"
          >
            ← 戻る
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            目標を編集
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* モード選択 */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setMode('simple')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === 'simple'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              かんたん
            </button>
            <button
              type="button"
              onClick={() => setMode('detailed')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === 'detailed'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              詳細
            </button>
          </div>

          {/* 目標入力 */}
          {mode === 'simple' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                目標を選択 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {GOAL_TEMPLATES.map((template) => (
                  <button
                    key={template}
                    type="button"
                    onClick={() => handleTemplateSelect(template)}
                    className={`px-4 py-3 border-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedTemplate === template || title === template
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50'
                    }`}
                  >
                    {template}
                  </button>
                ))}
              </div>
              <div className="mt-4">
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
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          ) : (
            <>
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
                  onChange={(e) => {
                    setTitle(e.target.value)
                    setTitleError('')
                  }}
                  placeholder="例: 今週のプレゼン資料を完成させる"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    titleError ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                />
                {titleError && (
                  <p className="mt-1 text-sm text-red-600">{titleError}</p>
                )}
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
            </>
          )}

          {/* リワード編集 */}
          {reward && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                リワードを編集
              </h3>
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
                  value={rewardTitle}
                  onChange={(e) => setRewardTitle(e.target.value)}
                  placeholder="例: 好きなレストランでディナー"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="reward-description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  説明（任意）
                </label>
                <textarea
                  id="reward-description"
                  value={rewardDescription}
                  onChange={(e) => setRewardDescription(e.target.value)}
                  placeholder="リワードの詳細を記入してください"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setCurrentPage('goal-detail')}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
            >
              保存
            </button>
          </div>
        </form>
      </div>
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

export default GoalEdit


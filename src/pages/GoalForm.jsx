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

function GoalForm({ setCurrentPage, mode = 'detailed' }) {
  const { dispatch } = useGoal()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [toast, setToast] = useState(null)
  const [titleError, setTitleError] = useState('')

  useEffect(() => {
    // URLパラメータやstateからmodeを取得する場合はここで処理
  }, [])

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
    setTitleError('')

    // 目標を追加（ADD_GOALアクションでselectedGoalIdも自動設定される）
    dispatch({
      type: 'ADD_GOAL',
      payload: {
        title: title.trim(),
        description: description.trim(),
      },
    })

    // リワード登録画面に遷移
    setCurrentPage('reward-form-mode')

    // フォームをリセット
    setTitle('')
    setDescription('')
    setSelectedTemplate('')
  }

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="bg-white rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          新しい目標を登録
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
                    className={`px-4 py-3 border-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      selectedTemplate === template
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
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-colors"
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
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-300 transition-colors"
                />
              </div>
            </>
          )}

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

export default GoalForm


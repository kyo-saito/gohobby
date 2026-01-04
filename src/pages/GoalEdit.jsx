import { useState, useEffect } from 'react'
import { useGoal } from '../context/GoalContext'
import Toast from '../components/Toast'
import ConfirmModal from '../components/ConfirmModal'
import { REWARD_PRESETS } from '../constants/rewardPresets'

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
  const [rewardMode, setRewardMode] = useState(null) // 'select' | 'custom' | null
  const [selectedRewardPreset, setSelectedRewardPreset] = useState(null)
  const [toast, setToast] = useState(null)
  const [titleError, setTitleError] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // 初期化：既存のご褒美がテンプレートに一致するかチェック
  useEffect(() => {
    if (reward && rewardTitle) {
      const matchingPreset = REWARD_PRESETS.find(preset => preset.title === rewardTitle)
      if (matchingPreset) {
        setRewardMode('select')
        setSelectedRewardPreset(matchingPreset.id)
      } else {
        setRewardMode('custom')
      }
    } else if (!reward) {
      // ご褒美未設定の場合はnullのまま
      setRewardMode(null)
    }
  }, [reward, rewardTitle])

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

    // ご褒美を更新または追加
    if (rewardTitle.trim()) {
      if (reward) {
        // 既存のご褒美を更新
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
      } else {
        // 新規ご褒美を追加
        dispatch({
          type: 'ADD_REWARD',
          payload: {
            goalId: goal.id,
            title: rewardTitle.trim(),
            description: rewardDescription.trim(),
          },
        })
      }
    }

    setToast({ message: '目標を更新しました！', type: 'success' })
    setTimeout(() => {
      setCurrentPage('goal-detail')
    }, 1500)
  }

  const handleDeleteGoal = () => {
    if (!goal) return
    setShowDeleteConfirm(true)
  }

  const confirmDeleteGoal = () => {
    if (!goal) return
    dispatch({ type: 'DELETE_GOAL', payload: goal.id })
    setShowDeleteConfirm(false)
    setToast({ message: '目標を削除しました', type: 'success' })
    setTimeout(() => {
      setCurrentPage('home')
    }, 1000)
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

          {/* ご褒美編集/追加 */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {reward ? 'ご褒美を編集' : 'ご褒美を設定'}
            </h3>

            {/* モード切替ボタン（ご褒美未設定の場合） */}
            {!reward && rewardMode === null && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-3">ご褒美の設定方法を選択してください</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setRewardMode('select')}
                    className="flex-1 px-4 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-lg transition-colors"
                  >
                    選択式
                  </button>
                  <button
                    type="button"
                    onClick={() => setRewardMode('custom')}
                    className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors"
                  >
                    自分でアレンジ
                  </button>
                </div>
              </div>
            )}

            {/* モード選択（ご褒美がある場合） */}
            {reward && rewardMode !== null && (
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setRewardMode('select')
                    setSelectedRewardPreset(null)
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    rewardMode === 'select'
                      ? 'bg-secondary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  選択式
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRewardMode('custom')
                    setSelectedRewardPreset(null)
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    rewardMode === 'custom'
                      ? 'bg-secondary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  自分でアレンジ
                </button>
              </div>
            )}

            {/* 選択式 */}
            {rewardMode === 'select' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  ご褒美を選択 <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {REWARD_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setSelectedRewardPreset(preset.id)
                        setRewardTitle(preset.title)
                        setRewardDescription('')
                        setRewardMode('select')
                      }}
                      className={`w-full p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                        selectedRewardPreset === preset.id || rewardTitle === preset.title
                          ? 'border-secondary-500 bg-secondary-50'
                          : 'border-gray-200 bg-white hover:border-secondary-300 hover:bg-secondary-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{preset.icon}</span>
                        <div className="font-semibold text-gray-800">
                          {preset.title}
                        </div>
                        {(selectedRewardPreset === preset.id || rewardTitle === preset.title) && (
                          <span className="ml-auto text-secondary-600 text-xl">✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 自分でアレンジ */}
            {rewardMode === 'custom' && (
              <>
                <div>
                  <label
                    htmlFor="reward-title"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    ご褒美名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="reward-title"
                    value={rewardTitle}
                    onChange={(e) => {
                      setRewardTitle(e.target.value)
                      setSelectedRewardPreset(null)
                      setRewardMode('custom')
                    }}
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
                    placeholder="ご褒美の詳細を記入してください"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </>
            )}
          </div>

          <div className="space-y-3">
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
            <button
              type="button"
              onClick={handleDeleteGoal}
              className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>🗑️</span>
              目標を削除
            </button>
          </div>
          {!reward && rewardMode === null && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-700">
                💡 ご褒美を設定すると、目標達成時にご褒美をあげることができます。
              </p>
            </div>
          )}
        </form>
      </div>
      {showDeleteConfirm && (
        <ConfirmModal
          title="目標を削除しますか？"
          message="この操作は元に戻せません。目標と関連するご褒美、達成記録がすべて削除されます。"
          onConfirm={confirmDeleteGoal}
          onCancel={() => setShowDeleteConfirm(false)}
          confirmText="削除する"
          cancelText="キャンセル"
          confirmColor="danger"
        />
      )}
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


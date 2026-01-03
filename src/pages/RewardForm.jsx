import { useState, useEffect } from 'react'
import { useGoal } from '../context/GoalContext'
import Toast from '../components/Toast'
import Announcement from './Announcement'
import StepIndicator from '../components/StepIndicator'

// 選択式ご褒美のリスト（具体的な行動ベース）
const GIFT_OPTIONS = [
  {
    id: 'ice-cream',
    title: '仕事帰りにコンビニでアイスを食べる',
    icon: '🍦',
  },
  {
    id: 'ramen',
    title: '好きなラーメン屋で一杯食べる',
    icon: '🍜',
  },
  {
    id: 'cafe',
    title: 'カフェでゆっくりコーヒーを飲む',
    icon: '☕',
  },
  {
    id: 'manga',
    title: '気になっていた漫画を1冊読む',
    icon: '📚',
  },
  {
    id: 'movie',
    title: '家で映画を1本観る',
    icon: '🎬',
  },
  {
    id: 'walk',
    title: '好きな音楽を聴きながら散歩する',
    icon: '🚶',
  },
  {
    id: 'shopping',
    title: 'お気に入りのお店で買い物をする',
    icon: '🛍️',
  },
  {
    id: 'bath',
    title: '温泉やお風呂でゆっくりする',
    icon: '♨️',
  },
]

function RewardForm({ setCurrentPage, mode = 'custom', onBack = null }) {
  const { state, dispatch } = useGoal()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedGift, setSelectedGift] = useState(null)
  const [toast, setToast] = useState(null)
  const [showAnnouncement, setShowAnnouncement] = useState(false)
  const [errors, setErrors] = useState({})

  // selectedGoalIdから目標を取得
  const goalId = state.selectedGoalId
  const latestGoal = state.goals.find((goal) => goal.id === goalId)

  useEffect(() => {
    if (!goalId && state.goals.length === 0) {
      // 目標がない場合は目標登録画面に戻る
      setCurrentPage('goal-form-mode')
    }
  }, [goalId, state.goals.length, setCurrentPage])

  const handleGiftSelect = (gift) => {
    setSelectedGift(gift)
    setTitle(gift.title)
    setDescription('')
    setErrors({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (mode === 'select' && !selectedGift) {
      newErrors.gift = 'ギフトを選択してください'
    }
    if (mode === 'custom' && !title.trim()) {
      newErrors.title = 'ご褒美名を入力してください'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (!goalId) {
      setToast({
        message: '目標が見つかりません。最初からやり直してください。',
        type: 'error',
      })
      setTimeout(() => {
        setCurrentPage('goal-form-mode')
      }, 2000)
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

    // フォームをリセット
    setTitle('')
    setDescription('')
    setSelectedGift(null)
    setErrors({})

    // アナウンスページを表示
    setShowAnnouncement(true)
  }

  if (showAnnouncement) {
    return (
      <div className="max-w-2xl mx-auto pb-20">
        <StepIndicator currentStep={3} totalSteps={3} stepName="完了" />
        <Announcement
          title="目標とご褒美が登録されました！"
          message="目標を達成すると、ご褒美をあげることができます。"
          items={[
            '目標を達成したら「目標を達成した！」ボタンを押してください',
            '「ご褒美をあげる」ボタンからご褒美をあげることができます',
          ]}
          buttonText="ホームに戻る"
          onButtonClick={() => {
            setShowAnnouncement(false)
            setCurrentPage('home')
          }}
          icon="🎉"
        />
      </div>
    )
  }

  if (!latestGoal) {
    return (
      <div className="max-w-2xl mx-auto pb-20">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 mb-4">目標が見つかりません</p>
          <button
            onClick={() => setCurrentPage('goal-form-mode')}
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
          >
            目標を登録する
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="bg-white rounded-xl p-8">
        <StepIndicator 
          currentStep={2} 
          totalSteps={3} 
          stepName="ご褒美の設定" 
          onBack={onBack}
          showBack={true}
        />
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ご褒美を設定
          </h2>
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <p className="text-sm text-primary-700 font-medium mb-1">
              目標: {latestGoal.title}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'select' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                ギフトを選択 <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {errors.gift && (
                  <p className="text-sm text-red-600 mb-2">{errors.gift}</p>
                )}
                {GIFT_OPTIONS.map((gift) => (
                  <button
                    key={gift.id}
                    type="button"
                    onClick={() => handleGiftSelect(gift)}
                    className={`w-full p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                      selectedGift?.id === gift.id
                        ? 'border-secondary-500 bg-secondary-50'
                        : errors.gift
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-200 bg-white hover:border-secondary-300 hover:bg-secondary-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{gift.icon}</span>
                        <div>
                          <div className="font-semibold text-gray-800">
                            {gift.title}
                          </div>
                        </div>
                      </div>
                      {selectedGift?.id === gift.id && (
                        <span className="text-secondary-600 text-xl">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
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
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value)
                    setErrors({ ...errors, title: '' })
                  }}
                  placeholder="例: 好きなレストランでディナー"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
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
                  placeholder="ご褒美の詳細を記入してください"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              💡 目標を達成したら、このご褒美をあげることができます。
              自分へのご褒美を楽しみに、目標達成に向けて頑張りましょう！
            </p>
          </div>

          <div className="flex gap-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm"
              >
                ← 戻る
              </button>
            )}
            <button
              type="button"
              onClick={() => setCurrentPage('home')}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-lg transition-colors"
            >
              ご褒美を登録
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

export default RewardForm


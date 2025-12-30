import { createContext, useContext, useReducer, useEffect } from 'react'

const GoalContext = createContext()

const STORAGE_KEY = 'gohobby-data'

const initialState = {
  goals: [],
  rewards: [],
  achievements: [],
  selectedGoalId: null,
}

function goalReducer(state, action) {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        goals: action.payload.goals || [],
        rewards: action.payload.rewards || [],
        achievements: action.payload.achievements || [],
      }
    case 'ADD_GOAL':
      const newGoal = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: 'active',
      }
      return {
        ...state,
        goals: [...state.goals, newGoal],
        selectedGoalId: newGoal.id, // 新しく追加した目標を選択状態にする
      }
    case 'ADD_REWARD':
      const newReward = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        received: false,
      }
      return {
        ...state,
        rewards: [...state.rewards, newReward],
      }
    case 'COMPLETE_GOAL':
      const goalId = action.payload
      const achievement = {
        id: Date.now().toString(),
        goalId,
        completedAt: new Date().toISOString(),
        note: '',
      }
      return {
        ...state,
        goals: state.goals.map((goal) =>
          goal.id === goalId ? { ...goal, status: 'completed' } : goal
        ),
        achievements: [...state.achievements, achievement],
      }
    case 'RECEIVE_REWARD':
      // ランダムコードを生成（例: RWD-XXXX-XXXX形式）
      const generateRewardCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        const randomChars = () => {
          let result = ''
          for (let i = 0; i < 4; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
          }
          return result
        }
        return `RWD-${randomChars()}-${randomChars()}`
      }

      return {
        ...state,
        rewards: state.rewards.map((reward) =>
          reward.id === action.payload
            ? {
                ...reward,
                received: true,
                rewardCode: reward.rewardCode || generateRewardCode(), // 既にコードがある場合は保持
                receivedAt: reward.receivedAt || new Date().toISOString(),
              }
            : reward
        ),
      }
    case 'UPDATE_GOAL':
      return {
        ...state,
        goals: state.goals.map((goal) =>
          goal.id === action.payload.id
            ? { ...goal, ...action.payload.updates }
            : goal
        ),
      }
    case 'UPDATE_REWARD':
      return {
        ...state,
        rewards: state.rewards.map((reward) =>
          reward.id === action.payload.id
            ? { ...reward, ...action.payload.updates }
            : reward
        ),
      }
    case 'SET_SELECTED_GOAL':
      return {
        ...state,
        selectedGoalId: action.payload,
      }
    default:
      return state
  }
}

export function GoalProvider({ children }) {
  const [state, dispatch] = useReducer(goalReducer, initialState)

  // データの読み込み
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        dispatch({ type: 'LOAD_DATA', payload: data })
      } catch (error) {
        console.error('Failed to load data:', error)
      }
    }
  }, [])

  // データの保存
  useEffect(() => {
    const dataToSave = {
      goals: state.goals,
      rewards: state.rewards,
      achievements: state.achievements,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
  }, [state.goals, state.rewards, state.achievements])

  return (
    <GoalContext.Provider value={{ state, dispatch }}>
      {children}
    </GoalContext.Provider>
  )
}

export function useGoal() {
  const context = useContext(GoalContext)
  if (!context) {
    throw new Error('useGoal must be used within a GoalProvider')
  }
  return context
}


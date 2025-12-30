import { useState } from 'react'
import BottomTabNav from './components/BottomTabNav'
import Footer from './components/Footer'
import Home from './pages/Home'
import GoalList from './pages/GoalList'
import GoalFormMode from './pages/GoalFormMode'
import GoalForm from './pages/GoalForm'
import RewardFormMode from './pages/RewardFormMode'
import RewardForm from './pages/RewardForm'
import GoalDetail from './pages/GoalDetail'
import { GoalProvider } from './context/GoalContext'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [goalFormMode, setGoalFormMode] = useState('detailed')
  const [rewardFormMode, setRewardFormMode] = useState('custom')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />
      case 'goals':
        return <GoalList setCurrentPage={setCurrentPage} />
      case 'rewards':
        return <div className="pb-20 p-4 text-center text-gray-600">リワード一覧（今後実装予定）</div>
      case 'goal-form-mode':
        return (
          <GoalFormMode
            setCurrentPage={setCurrentPage}
            setMode={setGoalFormMode}
          />
        )
      case 'goal-form':
        return (
          <GoalForm
            setCurrentPage={setCurrentPage}
            mode={goalFormMode}
          />
        )
      case 'reward-form-mode':
        return (
          <RewardFormMode
            setCurrentPage={setCurrentPage}
            setMode={setRewardFormMode}
          />
        )
      case 'reward-form':
        return (
          <RewardForm
            setCurrentPage={setCurrentPage}
            mode={rewardFormMode}
          />
        )
      case 'goal-detail':
        return <GoalDetail setCurrentPage={setCurrentPage} />
      default:
        return <Home setCurrentPage={setCurrentPage} />
    }
  }

  // タブナビゲーションを表示しないページ
  const hideTabNavPages = [
    'goal-form-mode',
    'goal-form',
    'reward-form-mode',
    'reward-form',
    'goal-detail',
  ]

  return (
    <GoalProvider>
      <div className="min-h-screen bg-gray-50 pb-20">
        <main className="container mx-auto px-4 py-4">
          {renderPage()}
        </main>
        {!hideTabNavPages.includes(currentPage) && (
          <>
            <Footer />
            <BottomTabNav
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>
    </GoalProvider>
  )
}

export default App


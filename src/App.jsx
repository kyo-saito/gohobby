import { useState } from 'react'
import Header from './components/Header'
import BottomTabNav from './components/BottomTabNav'
import Footer from './components/Footer'
import Home from './pages/Home'
import GoalList from './pages/GoalList'
import RewardList from './pages/RewardList'
import GoalFormMode from './pages/GoalFormMode'
import GoalForm from './pages/GoalForm'
import RewardFormMode from './pages/RewardFormMode'
import RewardForm from './pages/RewardForm'
import GoalDetail from './pages/GoalDetail'
import GoalEdit from './pages/GoalEdit'
import RewardReceiveConfirm from './pages/RewardReceiveConfirm'
import RewardReceiveSuccess from './pages/RewardReceiveSuccess'
import { GoalProvider } from './context/GoalContext'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [goalFormMode, setGoalFormMode] = useState('detailed')
  const [rewardFormMode, setRewardFormMode] = useState('custom')

  // 戻る機能（登録フロー内のみ）
  const goBack = () => {
    switch (currentPage) {
      case 'goal-form':
        setCurrentPage('goal-form-mode')
        break
      case 'reward-form-mode':
        setCurrentPage('goal-form')
        break
      case 'reward-form':
        setCurrentPage('reward-form-mode')
        break
      default:
        setCurrentPage('home')
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />
      case 'goals':
        return <GoalList setCurrentPage={setCurrentPage} />
      case 'rewards':
        return <RewardList setCurrentPage={setCurrentPage} />
      case 'goal-form-mode':
        return (
          <GoalFormMode
            setCurrentPage={setCurrentPage}
            setMode={setGoalFormMode}
            onBack={goBack}
          />
        )
      case 'goal-form':
        return (
          <GoalForm
            setCurrentPage={setCurrentPage}
            mode={goalFormMode}
            onBack={goBack}
          />
        )
      case 'reward-form-mode':
        return (
          <RewardFormMode
            setCurrentPage={setCurrentPage}
            setMode={setRewardFormMode}
            onBack={goBack}
          />
        )
      case 'reward-form':
        return (
          <RewardForm
            setCurrentPage={setCurrentPage}
            mode={rewardFormMode}
            onBack={goBack}
          />
        )
      case 'goal-detail':
        return <GoalDetail setCurrentPage={setCurrentPage} />
      case 'goal-edit':
        return <GoalEdit setCurrentPage={setCurrentPage} />
      case 'reward-receive-confirm':
        return <RewardReceiveConfirm setCurrentPage={setCurrentPage} />
      case 'reward-receive-success':
        return <RewardReceiveSuccess setCurrentPage={setCurrentPage} />
      default:
        return <Home setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <GoalProvider>
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="container mx-auto px-4 py-4">
          {renderPage()}
        </main>
        {/* フッタータブは全画面で常時表示 */}
        <Footer />
        <BottomTabNav
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </GoalProvider>
  )
}

export default App


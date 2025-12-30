import { useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import GoalForm from './pages/GoalForm'
import RewardForm from './pages/RewardForm'
import GoalDetail from './pages/GoalDetail'
import { GoalProvider } from './context/GoalContext'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <GoalProvider>
      <div className="min-h-screen bg-gray-50">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="container mx-auto px-4 py-8">
          {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
          {currentPage === 'goal-form' && (
            <GoalForm setCurrentPage={setCurrentPage} />
          )}
          {currentPage === 'reward-form' && (
            <RewardForm setCurrentPage={setCurrentPage} />
          )}
          {currentPage === 'goal-detail' && (
            <GoalDetail setCurrentPage={setCurrentPage} />
          )}
        </main>
      </div>
    </GoalProvider>
  )
}

export default App


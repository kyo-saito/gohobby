function StepIndicator({ currentStep, totalSteps, stepName = '' }) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">
            ステップ {currentStep} / {totalSteps}
          </span>
          {stepName && (
            <span className="text-sm text-gray-500">- {stepName}</span>
          )}
        </div>
      </div>
      {/* 進捗バー */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default StepIndicator


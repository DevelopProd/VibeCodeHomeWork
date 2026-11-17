const PASSING_PERCENTAGE = 67

function isArray(value) {
  return Array.isArray(value)
}

export function validateQuizData(data) {
  // TODO: проверьте корень, quizTitle, correctAnswers и attempts.
  // Для массивов вызывайте готовую функцию isArray(value).
  // У каждой попытки должны быть непустое имя и массив answers нужной длины.
  // 1. корень: объект, не null, не массив
  function validateQuizData(data) {
  if (typeof data !== 'object' || data === null || isArray(data)) return false

  if (typeof data.quizTitle !== 'string' || data.quizTitle.trim() === '') return false

  if (!isArray(data.correctAnswers) || data.correctAnswers.length === 0) return false

  if (!isArray(data.attempts) || data.attempts.length === 0) return false

  const answersLength = data.correctAnswers.length

  return data.attempts.every((attempt) =>
    typeof attempt === 'object' &&
    attempt !== null &&
    !isArray(attempt) &&
    typeof attempt.name === 'string' &&
    attempt.name.trim() !== '' &&
    isArray(attempt.answers) &&
    attempt.answers.length === answersLength
  )
}
  return false
}

export function calculateAttempt(attempt, correctAnswers) {
  // TODO: посчитайте score, percentage и passed для одной попытки.
  // Процент округлите через Math.round(); порог хранится в PASSING_PERCENTAGE.
  return null
}

export function calculateReport(data) {
  // TODO: рассчитайте все попытки и сводку.
  // При равном score оставьте первого лучшего участника.
  return null
}

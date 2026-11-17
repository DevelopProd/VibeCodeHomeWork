// Готовая защитная механика. Не изменяйте эту функцию.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function selectAttempts(filter) {
  const attempts = window.reportData.attempts
  switch(filter){
    case 'all':
      return attempts
    case 'passed':
      return attempts.filter((at) => at.passed === true)
    case 'failed':
      return attempts.filter((at) => at.passed === false)
  }
  return []
}

function renderAttempts(attempts) {
  let html = ''
  attempts.forEach((attempt) => {
    html += '<li>' + escapeHtml(attempt.name) + '</li>' 
  })

  document.querySelector('#result-list').innerHTML = html
  document.querySelector('#result-count').textContent =
    `Показано: ${attempts.length} из ${window.reportData.attempts.length}`
}


function startFilter() {
  const form = document.querySelector('#filter-form')
  const select = document.querySelector('#filter')

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const attempts = selectAttempts(select.value)
    renderAttempts(attempts)
  })
}

startFilter()
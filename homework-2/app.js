const sourceJson = `{
  "event": {
    "title": "Ночь в музее",
    "date": "15 ноября, 18:30",
    "place": "Музей космонавтики, проспект Мира, 111",
    "description": "Вечерняя программа с выставкой и экскурсиями",
    "meeting": "Сбор: 18:30. Начало: 19:00."
  },
  "services": [
    { "id": "guide", "title": "  Экскурсия с гидом  ", "price": 500 },
    { "id": "audio", "title": "Аудиогид", "price": 350 },
    { "id": "catalog", "title": "Каталог выставки", "price": 250 }
  ]
}`;

let data

try {
  data = JSON.parse(sourceJson)
} catch (error) {
  console.log('Не удалось разобрать JSON:', error.message)
}

function buildReport(services, guideChecked, audioChecked, catalogChecked) {
  const selectedIds = []
  if (guideChecked) {
    selectedIds.push('guide')
  }
  if (audioChecked) {
    selectedIds.push('audio')
  }
  if (catalogChecked) {
    selectedIds.push('catalog')
  }

  const selected = services.filter((service) => selectedIds.includes(service.id))

  const items = selected.map((service) => {
    const { title, price } = service
    return { title: title.trim(), price }
  })

  const total = items.reduce((sum, item) => sum + item.price, 0)

  return {
    count: items.length,
    total: total,
    items: items,
  }
}

const form = document.querySelector('#service-form')
const showButton = document.querySelector('#show-program')
const program = document.querySelector('#program')
const choiceError = document.querySelector('#choice-error')
const dataError = document.querySelector('#data-error')
const result = document.querySelector('#result')
const reportJson = document.querySelector('#report-json')

function showProgram() {
  program.hidden = false
}

function handleSubmit(event) {
  event.preventDefault()

  const guideChecked = document.querySelector('#guide').checked
  const audioChecked = document.querySelector('#audio').checked
  const catalogChecked = document.querySelector('#catalog').checked

  const report = buildReport(data.services, guideChecked, audioChecked, catalogChecked)

  if (report.count === 0) {
    choiceError.hidden = false
    result.hidden = true
    reportJson.hidden = true
    return
  }

  choiceError.hidden = true

  const titles = report.items.map((item) => item.title)
  result.innerHTML = `Выбрано услуг: ${report.count}<br>Итого: ${report.total} руб.<br>` + titles.join('<br>')
  result.hidden = false

  const json = JSON.stringify(report)
  JSON.parse(json)
  reportJson.textContent = json
  reportJson.hidden = false
}

if (data) {
  document.querySelector('#event-title').textContent = data.event.title
  document.querySelector('#event-date').textContent = data.event.date
  document.querySelector('#event-place').textContent = data.event.place
  document.querySelector('#event-description').textContent = data.event.description

  program.innerHTML = data.event.meeting
  showButton.addEventListener('click', showProgram)

  form.hidden = false
  form.addEventListener('submit', handleSubmit)
} else {
  dataError.hidden = false
}

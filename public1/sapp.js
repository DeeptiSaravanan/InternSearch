const SearchIntern = document.querySelector('.SearchIntern')
SearchIntern.addEventListener('submit', (e) => {
  e.preventDefault()
  const field = SearchIntern.querySelector('.field').value
  post('/searchIntern', { field})
})


function post (path, data) {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

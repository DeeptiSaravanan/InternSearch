const CreateUser = document.querySelector('.CreateUser')
CreateUser.addEventListener('submit', (e) => {
  e.preventDefault()
  const username = CreateUser.querySelector('.username').value
  const password = CreateUser.querySelector('.password').value
  const category = CreateUser.querySelector('.category').value
  post('/createUser', { username, password, category})
})

const CreateIntern = document.querySelector('.CreateIntern')
CreateIntern.addEventListener('submit', (e) => {
  e.preventDefault()
  const id = CreateIntern.querySelector('.id').value
  const title = CreateIntern.querySelector('.title').value
  const field = CreateIntern.querySelector('.field').value
  const description = CreateIntern.querySelector('.description').value
  post('/createIntern', { id, title, field, description})
})

const Login = document.querySelector('.Login')
Login.addEventListener('submit', (e) => {
  console.log("Entered log function")
  e.preventDefault()
  const username = Login.querySelector('.username').value
  const password = Login.querySelector('.password').value
  const category = CreateUser.querySelector('.category').value
  post('/login', { username, password, category })
    .then(({ status }) => {
      if (status === 200) alert('login success')
      else alert('login failed')
    })
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

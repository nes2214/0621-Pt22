const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const messageError = document.getElementById('messageError')
    messageError.textContent = ''
    
    const email = document.querySelector('#email').value.trim()
    const password = document.querySelector('#password').value.trim()

    const Users = JSON.parse(localStorage.getItem('users')) || []
    const validUser = Users.find(user => user.email === email && user.password === password)

    if (!validUser) {
        messageError.textContent = 'Usuario y/o contraseña incorrectos!'
        return
    }

    alert(`Bienvenido ${validUser.name}`)
    localStorage.setItem('login_success', JSON.stringify(validUser))
    window.location.href = 'index.html'
})

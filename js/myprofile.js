document.addEventListener('DOMContentLoaded', () => {
  const loggedUser = JSON.parse(localStorage.getItem('login_success'))

  if (!loggedUser) {
    alert('No has iniciado sesión.')
    window.location.href = 'login.html'
    return
  }

  // Rellenar el formulario con los datos guardados
  document.getElementById('id').value = loggedUser.id || ''
  document.getElementById('name').value = loggedUser.name || ''
  document.getElementById('email').value = loggedUser.email || ''
  document.getElementById('password').value = loggedUser.password || ''
  document.getElementById('dob').value = loggedUser.dob || ''
  document.getElementById('gs').value = loggedUser.gs || ''

  // FORMULARIO
  const profileForm = document.getElementById('profileForm')
  profileForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const dob = document.getElementById('dob').value
    const gs = document.getElementById('gs').value

    let valid = true
    const messageError = document.getElementById('messageError')
    messageError.textContent = ''
    messageError.className = 'text-red-500 text-sm mt-2'

    // Validaciones
    if (!validateName(name)) {
      messageError.textContent = 'Nombre inválido: sólo texto, máx. 50 caracteres.'
      valid = false
    } else if (!validateEmail(email)) {
      messageError.textContent = 'Email inválido.'
      valid = false
    } else if (!validatePassword(password)) {
      messageError.textContent = 'Contraseña inválida: mínimo 8 caracteres, al menos una letra y un número.'
      valid = false
    } else if (!validateDOB(dob)) {
      messageError.textContent = 'Fecha de nacimiento inválida: debe ser anterior a hoy.'
      valid = false
    } else if (!validateGS(gs)) {
      messageError.textContent = 'Debes seleccionar un grupo sanguíneo.'
      valid = false
    }

    // Si hay error, no continuar
    if (!valid) return

    // Guardar cambios
    loggedUser.name = name
    loggedUser.email = email
    loggedUser.password = password
    loggedUser.dob = dob
    loggedUser.gs = gs

    localStorage.setItem('login_success', JSON.stringify(loggedUser))

    const Users = JSON.parse(localStorage.getItem('users')) || []
    const userIndex = Users.findIndex(u => u.id === loggedUser.id)
    if (userIndex !== -1) {
      Users[userIndex] = loggedUser
    }
    localStorage.setItem('users', JSON.stringify(Users))

    alert('Cambios guardados correctamente!')
  })

  // Cerrar sesión
  const logoutBtn = document.getElementById('logoutBtn')
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('login_success')
    window.location.href = 'login.html'
  })
})

// FUNCIONES DE VALIDACIÓN
function validateName(name) {
  const regex = /^[A-Za-zÀ-ÿ\s]{1,50}$/
  return regex.test(name)
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

function validatePassword(password) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,40}$/
  return regex.test(password)
}

function validateDOB(dob) {
  const birthDate = new Date(dob)
  const today = new Date()
  return dob && birthDate < today
}

function validateGS(gs) {
  return typeof gs === 'string' && gs.trim() !== ''
}

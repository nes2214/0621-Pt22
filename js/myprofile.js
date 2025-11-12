document.addEventListener('DOMContentLoaded', () => {
  // Obtener usuario logueado del localStorage
  const loggedUser = JSON.parse(localStorage.getItem('login_success'))

  // Si no hay usuario, redirigir al login
  if (!loggedUser) {
    alert('No has iniciado sesión.')
    window.location.href = 'login.html'
    return
  }

  // Campos que queremos mostrar
  const fields = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'email', label: 'Correo electrónico' },
    { key: 'dob', label: 'Fecha de nacimiento' },
    { key: 'gs', label: 'Grupo sanguíneo' }
  ]

  const tbody = document.querySelector('#userTable tbody')
  tbody.innerHTML = ''

  fields.forEach(field => {
    const tr = document.createElement('tr')

    const tdKey = document.createElement('td')
    tdKey.textContent = field.label

    const tdValue = document.createElement('td')
    tdValue.textContent = loggedUser[field.key] || '—'

    tr.appendChild(tdKey)
    tr.appendChild(tdValue)
    tbody.appendChild(tr)
  })

  
  // Cerrar sesión
  const logoutBtn = document.getElementById('logoutBtn')
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('login_success')
    window.location.href = 'login.html'
  })
})

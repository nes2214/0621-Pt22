const signupForm = document.querySelector('#signupForm')

signupForm.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const name = document.querySelector('#name')?.value.trim() || ''
    const email = document.querySelector('#email')?.value.trim() || ''
    const password = document.querySelector('#password')?.value || ''
    const confirmPassword = document.querySelector('#confirmPassword')?.value || ''
    const dob = document.querySelector('#dob')?.value || ''

    // seleccionar con seguridad el select de grupo sanguíneo
    const gsElem = document.querySelector('#gs')
    const gs = gsElem ? gsElem.value : ''

    const Users = JSON.parse(localStorage.getItem('users')) || []
    const isUserRegistered = Users.find(user => user.email === email)

    // === VALIDACIONES ===

    if (!validateName(name)) {
        return alert('Nombre inválido: sólo texto, máx. 50 caracteres.')
    }

    if (!validateEmail(email)) {
        return alert('Email inválido.')
    }

    if (isUserRegistered) {
        return alert('Este email ya está registrado!')
    }

    if (!validatePassword(password)) {
        return alert('Contraseña inválida: mínimo 8 caracteres, al menos una letra y un número.')
    }

    if (password !== confirmPassword) {
        return alert('Las contraseñas no coinciden.')
    }

    if (!validateDOB(dob)) {
        return alert('Fecha de nacimiento inválida: debe ser anterior a hoy.')
    }

    if (!validateGS(gs)) {
        return alert('Debes seleccionar un grupo sanguíneo.')
    }

    Users.push({ name, email, password, dob, gs })
    localStorage.setItem('users', JSON.stringify(Users))
    alert('Registro completado con éxito!')
    window.location.href = 'login.html'
})


// === FUNCIONES DE VALIDACIÓN ===

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
    if (!dob) return false
    const birthDate = new Date(dob)
    if (isNaN(birthDate.getTime())) return false
    const today = new Date()
    birthDate.setHours(0,0,0,0)
    today.setHours(0,0,0,0)
    return birthDate < today
}

function validateGS(gs) {
    return typeof gs === 'string' && gs.trim() !== ''
}

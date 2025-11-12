const signupForm = document.querySelector('#signupForm')

signupForm.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const name = document.querySelector('#name')?.value.trim() || ''
    const email = document.querySelector('#email')?.value.trim() || ''
    const password = document.querySelector('#password')?.value || ''
    const confirmPassword = document.querySelector('#confirmPassword')?.value || ''
    const dob = document.querySelector('#dob')?.value || ''
    const gsElem = document.querySelector('#gs')
    const gs = gsElem ? gsElem.value : ''

    const Users = JSON.parse(localStorage.getItem('users')) || []
    const isUserRegistered = Users.find(user => user.email === email)

    const messageError = document.getElementById('messageError')
    const messageValid = document.getElementById('messageValid')
    messageError.textContent = ''
    messageValid.textContent = ''
    let valid = true 

    // === VALIDACIONES ===
    if (!validateName(name)) {
        messageError.textContent = 'Nombre inválido: sólo texto, máx. 50 caracteres.'
        valid = false
    } else if (!validateEmail(email)) {
        messageError.textContent = 'Email inválido.'
        valid = false
    } else if (isUserRegistered) {
        messageError.textContent = 'Este email ya está registrado!'
        valid = false
    } else if (!validatePassword(password)) {
        messageError.textContent = 'Contraseña inválida: mínimo 8 caracteres, al menos una letra y un número.'
        valid = false
    } else if (password !== confirmPassword) {
        messageError.textContent = 'Las contraseñas no coinciden.'
        valid = false
    } else if (!validateDOB(dob)) {
        messageError.textContent = 'Fecha de nacimiento inválida: debe ser anterior a hoy.'
        valid = false
    } else if (!validateGS(gs)) {
        messageError.textContent = 'Debes seleccionar un grupo sanguíneo.'
        valid = false
    }

    if (!valid) return


    const id = Users.length + 1
    Users.push({ id, name, email, password, dob, gs })
    localStorage.setItem('users', JSON.stringify(Users))
    messageValid.textContent = 'Registro completado con éxito!'
    window.location.href = 'login.html'
})

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

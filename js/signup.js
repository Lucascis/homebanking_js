let formulario = document.getElementById('formularioSignup');
let inputs = document.querySelectorAll('#formularioSignup input');
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    password: /^.{8,16}$/, // 8 a 16 caracteres.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    dni: /^\d{8}$/ // 8 digitos.
}

const campos = {
    nombre: false,
    apellido: false,
    dni: false,
    email: false,
    password: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "apellido":
            validarCampo(expresiones.nombre, e.target, 'apellido');
            break;
        case "password":
            validarCampo(expresiones.password, e.target, 'password');
            break;
        case "email":
            validarCampo(expresiones.email, e.target, 'email');
            break;
        case "dni":
            validarCampo(expresiones.dni, e.target, 'dni');
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        campos[campo] = true;
    } else {
        campos[campo] = false;
    }
}

//Ahora no hace mucho.
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    let send = true
    for (element in campos) {
        if (campos[element]) {
            document.getElementById('error').classList.remove('mostrar');
            document.getElementById('error').classList.add('noMostrar');
        } else {
            document.getElementById('error').innerHTML = capitalize(`${element} incorrecto`);
            document.getElementById('error').classList.add('mostrar');
            document.getElementById('error').classList.remove('noMostrar');
            send = false
            break;
        }
    }
    if (send) {
        let userData = {
            firstName: capitalize(document.getElementById("nombre").value),
            lastName: capitalize(document.getElementById("apellido").value),
            dni: document.getElementById("dni").value,
            email: document.getElementById("email").value.toLowerCase(),
            password: btoa(document.getElementById("password").value)
        }
        if (validateAccount(userData.dni, userData.email)) {
            document.getElementById('error').classList.add('mostrar');
            document.getElementById('error').classList.remove('noMostrar');
            document.getElementById('error').innerHTML = `Parece que ya tienes una cuenta. <a href="./login.html">Ingresá</a>`;
        } else {
            document.getElementById('error').classList.add('mostrar');
            document.getElementById('error').classList.remove('noMostrar');
            document.getElementById('error').innerHTML = `Cuenta creada con exito! <a href="./login.html">Ingresá</a>`;
            crearCuenta(
                userData.firstName,
                userData.lastName,
                userData.dni,
                userData.email,
                userData.password
            );
            formulario.reset()
        }
    }
});
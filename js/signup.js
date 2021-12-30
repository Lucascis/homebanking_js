let formulario = $('#formularioSignup');
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

formulario.on('submit', (e) => {
    e.preventDefault();
    let send = true
    let errorSignup = $("#error");
    for (element in campos) {
        if (campos[element]) {
            errorSignup.removeClass('mostrar');
            errorSignup.addClass('noMostrar');
        } else {
            errorSignup.text(capitalize(`${element} incorrecto`));
            errorSignup.addClass('mostrar');
            errorSignup.removeClass('noMostrar');
            send = false
            break;
        }
    }
    if (send) {
        let userData = {
            firstName: capitalize($("#nombre").val()),
            lastName: capitalize($("#apellido").val()),
            dni: $("#dni").val(),
            email: $("#email").val().toLowerCase(),
            password: btoa($("#password").val())
        }
        if (validateAccount(userData.dni, userData.email)) {
            errorSignup.addClass('mostrar');
            errorSignup.removeClass('noMostrar');
            errorSignup.text(`Parece que ya tienes una cuenta. `);
            errorSignup.append('<a href="./login.html">Ingresá</a>');
        } else {
            errorSignup.addClass('mostrar');
            errorSignup.removeClass('noMostrar');
            errorSignup.text(`Cuenta creada con exito! `);
            errorSignup.append('<a href="./login.html">Ingresá</a>');
            crearCuenta(
                userData.firstName,
                userData.lastName,
                userData.dni,
                userData.email,
                userData.password,
                cbuGenerator(userData.dni), //retorna el cbu que se asociara a la cuenta
                0 //saldo inicial
            );
            formulario[0].reset()
        }
    }
});
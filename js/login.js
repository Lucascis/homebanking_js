let dataLogin = null;

function signin() {
    let formularioSignin = $('#formularioSignin');
    let inputsSignin = document.querySelectorAll('#formularioSignin input');
    const expresionesSignin = {
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^.{0,32}$/
    }

    const camposSignin = {
        email: false,
        password: false
    }

    const validarFormularioSignin = (e) => {
        switch (e.target.name) {
            case "password":
                validarCampoSignin(expresionesSignin.password, e.target, 'password');
                break;
            case "email":
                validarCampoSignin(expresionesSignin.email, e.target, 'email');
                break;
        }
    }

    const validarCampoSignin = (expresion, input, campo) => {
        if (expresion.test(input.value)) {
            camposSignin[campo] = true;
        } else {
            camposSignin[campo] = false;
        }
    }

    //Ahora no hace mucho.
    inputsSignin.forEach((input) => {
        input.addEventListener('keyup', validarFormularioSignin);
        input.addEventListener('blur', validarFormularioSignin);
    });


    formularioSignin.on('submit', (e) => {
        e.preventDefault();
        let send = true
        let errorLogin = $("#errorLogin");
        for (element in camposSignin) {
            if (camposSignin[element]) {
                errorLogin.removeClass('mostrar');
                errorLogin.removeClass('mostrar-login');
                errorLogin.addClass('noMostrar');
            } else {
                errorLogin.text(capitalize(`Correo y/o contraseña incorrectos`));
                errorLogin.addClass('mostrar');
                errorLogin.addClass('mostrar-login');
                errorLogin.removeClass('noMostrar');
                send = false
                break;
            }
        }
        if (send) {
            let userDataLogin = {
                email: $("#emailLogin").val().toLowerCase(),
                password: $("#passwordLogin").val()
            }
            try {
                dataLogin = login(userDataLogin.email, btoa(userDataLogin.password));
                sessionStorage.setItem('dataLogin', dataLogin);
            } catch (DOMException) {
            }

            if (dataLogin) {
                errorLogin.text(capitalize(`Ingreso con éxito`));
                errorLogin.addClass('mostrar');
                errorLogin.addClass('mostrar-login');
                errorLogin.removeClass('noMostrar');
            } else {
                errorLogin.text(capitalize(`Correo y/o contraseña incorrectos`));
                errorLogin.addClass('mostrar');
                errorLogin.addClass('mostrar-login');
                errorLogin.removeClass('noMostrar');
                formularioSignin[0].reset();
            }
        }
    });
}

function login(userEmail, userPassword) {
    let indexEmail = cuentas.findIndex(elemento => elemento.userEmail == userEmail);
    if (indexEmail != -1) {
        if (cuentas[indexEmail].userPassword == userPassword){
            window.location.assign('./index.html');
            return indexEmail;
        } else {
            return false;
        }
    } else {
        return false;
    }
};


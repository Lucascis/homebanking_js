let dataLogin = null;

function signin() {
    let formularioSignin = document.getElementById('formularioSignin');
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


    formularioSignin.addEventListener('submit', (e) => {
        e.preventDefault();
        let send = true
        for (element in camposSignin) {
            if (camposSignin[element]) {
                document.getElementById('errorLogin').classList.remove('mostrar');
                document.getElementById('errorLogin').classList.remove('mostrar-login');
                document.getElementById('errorLogin').classList.add('noMostrar');
            } else {
                document.getElementById('errorLogin').innerHTML = capitalize(`Correo y/o contraseña incorrectos`);
                document.getElementById('errorLogin').classList.add('mostrar');
                document.getElementById('errorLogin').classList.add('mostrar-login');
                document.getElementById('errorLogin').classList.remove('noMostrar');
                send = false
                break;
            }
        }
        if (send) {
            let userDataLogin = {
                email: document.getElementById("emailLogin").value.toLowerCase(),
                password: document.getElementById("passwordLogin").value
            }
            try {
                dataLogin = login(userDataLogin.email, btoa(userDataLogin.password));
                sessionStorage.setItem('dataLogin', dataLogin);
            } catch (DOMException) {
            }

            if (dataLogin) {
                document.getElementById('errorLogin').innerHTML = capitalize(`Ingreso con exito`);
                document.getElementById('errorLogin').classList.add('mostrar');
                document.getElementById('errorLogin').classList.add('mostrar-login');
                document.getElementById('errorLogin').classList.remove('noMostrar');
            } else {
                document.getElementById('errorLogin').innerHTML = capitalize(`Correo y/o contraseña incorrectos`);
                document.getElementById('errorLogin').classList.add('mostrar');
                document.getElementById('errorLogin').classList.add('mostrar-login');
                document.getElementById('errorLogin').classList.remove('noMostrar');
                formularioSignin.reset()
            }
        }
    });
}

function login(userEmail, userPassword) {
    let indexEmail = cuentas.findIndex(elemento => elemento.userEmail == userEmail);
    let indexPassword = cuentas.findIndex(elemento => elemento.userPassword == userPassword);
    if ((indexEmail != -1 && indexPassword != -1) && indexEmail == indexPassword) {
        let index = indexEmail;
        if (cuentas[index].userEmail == userEmail && cuentas[index].userPassword == userPassword) {
            window.location.assign('./index.html')
            return index;
        } else {
            return false;
        }
    } else {
        return false;
    }
};


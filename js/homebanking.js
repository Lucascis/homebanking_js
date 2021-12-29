let cuentas = []
//Si la lista esta vacia y hay datos de cuentas guardados...
//Se vuelven a agregar como objetos de la clase Cuenta para usar sus metodos.

class Cuenta {
    constructor(userFirstName, userLastName, userDni, userEmail, userPassword) {
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userDni = userDni;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userCBU = 0.0 //generadorCBU(); //escribir codigo
        this.userSaldo = 0.0;
    }

    verSaldo() {
        return this.userSaldo
    }

    retirarDinero(retiradaUsuario) {
        if (retiradaUsuario > 0 && (this.userSaldo - retiradaUsuario >= 0)) {
            this.userSaldo -= retiradaUsuario;
            alert(`Retiraste con exito $${retiradaUsuario}`);
        } else if (retiradaUsuario <= 0) {
            alert('Ingresaste un valor igual o menor a cero. Intenta nuevamente.')
        } else if (this.userSaldo - retiradaUsuario < 0) {
            alert('No tienes la cantidad suficiente. Prueba con otra cantidad.')
        }
    }

    depositarDinero(depositoUsuario) {
        if (depositoUsuario > 0) {
            this.userSaldo += depositoUsuario;
            alert(`Depositaste $${depositoUsuario} en tu cuenta.`)
        } else {
            alert('No se pudo realizar el deposito. Intenta nuevamente.')
        }
    }
}

function recoverData() {
    if (!cuentas.length && localStorage.getItem('dataAccounts') != null) {
        dataParsed = JSON.parse(localStorage.getItem('dataAccounts'))
        for (item of dataParsed) {
            cuentas.push(new Cuenta(item.userFirstName, item.userLastName, item.userDni, item.userEmail, item.userPassword));
        }
    }
}

function crearCuenta(userFirstName, userLastName, userDni, userEmail, userPassword) {
    cuentas.push(new Cuenta(userFirstName, userLastName, userDni, userEmail, userPassword));
    localStorage.setItem('dataAccounts', JSON.stringify(cuentas))
}

recoverData();
dataLogin = sessionStorage.getItem('dataLogin')
if(dataLogin){
    document.getElementById('bienvenida').innerHTML = `Bienvenido ${cuentas[dataLogin].userFirstName}`
}

let cuentas = []
//Si la lista esta vacia y hay datos de cuentas guardados...
//Se vuelven a agregar como objetos de la clase Cuenta para usar sus metodos.

class Cuenta {
    constructor(userFirstName, userLastName, userDni, userEmail, userPassword, userCBU, userSaldo) {
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userDni = userDni;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userCBU = userCBU; //Recibe valor de la funcion cbuGenerator() en 'js/tools.js'
        this.userSaldo = parseFloat(userSaldo).toFixed(2);
    }

    verSaldo() {
        return this.userSaldo;
    }

    verCBU() {
        return this.userCBU;
    }

    retirarDinero(retiradaUsuario) {
        if (retiradaUsuario > 0 && (this.userSaldo - retiradaUsuario >= 0)) {
            this.userSaldo -= parseFloat(retiradaUsuario);
        }
    }

    depositarDinero(depositoUsuario) {
        if (depositoUsuario > 0) {
            this.userSaldo += parseFloat(depositoUsuario);
        } 
    }

    transferirDinero(transferenciaUsuario, targetCBU) {
        if( targetCBU ) {
            this.userSaldo -= parseFloat(transferenciaUsuario);
            cuentas[targetCBU].userSaldo += parseFloat(transferenciaUsuario);
        }
    }
}

function recoverData() {
    if (!cuentas.length && localStorage.getItem('dataAccounts') != null) {
        dataParsed = JSON.parse(localStorage.getItem('dataAccounts'))
        for (item of dataParsed) {
            cuentas.push(new Cuenta(item.userFirstName, item.userLastName, item.userDni, item.userEmail, item.userPassword, item.userCBU, item.userSaldo));
        }
    }
}

function crearCuenta(userFirstName, userLastName, userDni, userEmail, userPassword, userCBU, userSaldo) {
    cuentas.push(new Cuenta(userFirstName, userLastName, userDni, userEmail, userPassword, userCBU, userSaldo));
    guardarDatos();
}

function mostrarRetirar() {
    $('#details').text('')
    $('#box-info').text('Ingrese la cantidad a retirar')
    $('#saldo-cuenta').html(`<input type="" name="extraer" id="extraer"> <button onclick="retirar()"> Retirar
    </button>`)
}

function retirar() {
    let montoExtraer= $('#extraer').val()
    if (montoExtraer > 0 && cuentas[dataLogin].verSaldo() - montoExtraer >= 0 ){
        cuentas[dataLogin].retirarDinero(montoExtraer);
        guardarDatos();
        $('#details').text('Operacion realizada con exito!');
    } else{
        $('#details').text('No se pudo realizar la operacion, intente nuevamente.');
    }
}

function mostrarDepositar() {
    $('#details').text('')
    $('#box-info').text('Ingrese la cantidad a depositar')
    $('#saldo-cuenta').html(`<input type="" name="depositar" id="depositar"> <button onclick="depositar()"> Depositar
    </button>`)
}

function depositar() {
    let montoDepositar= $('#depositar').val()
    if (montoDepositar > 0){
        cuentas[dataLogin].depositarDinero(montoDepositar);
        guardarDatos();
        $('#details').text('Operacion realizada con exito!');
    } else{
        $('#details').text('No se pudo realizar la operacion, intente nuevamente.');
    }
}

function mostrarTransferir() {
    $('#details').text('')
    $('#box-info').text('Ingrese la cantidad a transferir')
    $('#saldo-cuenta').html(`<input type="" name="transferir" id="transferir"> <p>Ingrese el CBU al que desea transferir</p> <input type="" name="CBU" id="CBU"> <button onclick="transferir()"> Transferir
    </button>`)
}

function transferir() {
    let montoTransferir= $('#transferir').val()
    let CBU = $('#CBU').val()
    let targetCBU = findCBU(CBU)
    if (montoTransferir > 0 && targetCBU && (cuentas[dataLogin].userSaldo - montoTransferir >= 0) ){
        cuentas[dataLogin].transferirDinero(montoTransferir, targetCBU);
        guardarDatos();
        $('#details').text('Operacion realizada con exito!');
    } else {
        $('#details').text('No se pudo realizar la operacion, intente nuevamente.')
    }
}


function saldo() {
    $('#details').text('')
    $('#box-info').text('Saldo en tu cuenta')
    $('#saldo-cuenta').text(`$${cuentas[dataLogin].verSaldo()}`);
    $('#details').text(`CBU: ${cuentas[dataLogin].verCBU()}`)
}

recoverData();
console.log(cuentas)
dataLogin = sessionStorage.getItem('dataLogin')
if (dataLogin) {
    $('#bienvenida').text(`¡Bienvenid@ ${cuentas[dataLogin].userFirstName}!`);
}

const URLJSON = "data/fakeUsers.json"
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
        this.userSaldo = userSaldo;
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
        this.userSaldo -= parseFloat(transferenciaUsuario);
        cuentas[targetCBU].userSaldo += parseFloat(transferenciaUsuario);
    }
}

function recoverData() {
    if (!cuentas.length && localStorage.getItem('dataAccounts') != null) {
        dataParsed = JSON.parse(localStorage.getItem('dataAccounts'))
        for (item of dataParsed) {
            cuentas.push(new Cuenta(item.userFirstName, item.userLastName, item.userDni, item.userEmail, item.userPassword, item.userCBU, parseFloat(item.userSaldo)));
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
    $('#saldo-cuenta').html(`<input autocomplete="off" class="inputs" name="extraer" id="extraer">`)
    $('#details').append(`<button class='interfaceBtn' onclick="retirar()">Retirar</button>`)
}

function retirar() {
    let montoExtraer = $('#extraer').val()
    if (montoExtraer > 0 && cuentas[dataLogin].verSaldo() - montoExtraer >= 0) {
        cuentas[dataLogin].retirarDinero(montoExtraer);
        guardarDatos();
        $('#details').text('Operacion realizada con exito!');
    } else {
        $('#details').text('No se pudo realizar la operacion.')
            .delay(2000)
            .fadeOut(1000, () => {
                $('#details').text('Asegurese de tener fondos en su cuenta e intente nuevamente.')
                    .fadeIn(2000)
                    .fadeOut(2000, function () {
                        $('#details').fadeIn()
                        mostrarRetirar();
                    })
            })
    }
}

function mostrarDepositar() {
    $('#details').text('')
    $('#box-info').text('Ingrese la cantidad a depositar')
    $('#saldo-cuenta').html('<input autocomplete="off" class="inputs" name="depositar" id="depositar">')
    $('#details').html('<button class="interfaceBtn" onclick="depositar()">Depositar</button>')
}

function depositar() {
    let montoDepositar = $('#depositar').val()
    if (montoDepositar > 0) {
        cuentas[dataLogin].depositarDinero(montoDepositar);
        guardarDatos();
        $('#details').text('Operacion realizada con exito!');
    } else {
        $('#details').text('No se pudo realizar la operacion.')
            .delay(2000)
            .fadeOut(1000, () => {
                $('#details').text('Asegurese de que el monto sea mayor a cero e intente nuevamente.')
                    .fadeIn(2000)
                    .fadeOut(2000, function () {
                        $('#details').fadeIn()
                        mostrarDepositar();
                    })
            });
    }
}

function mostrarTransferir() {
    $('#details').text('')
    $('#box-info').text('Ingrese la cantidad a transferir')
    $('#saldo-cuenta').html('<input autocomplete="off" class="inputs" name="transferir" id="transferir"> <p>Ingrese el CBU al que desea transferir</p> <input autocomplete="off" class="inputs" name="CBU" id="CBU">')
    $('#details').html(`<button class="interfaceBtn" onclick="transferir()">Transferir</button>`)
}

function transferir() {
    let montoTransferir = $('#transferir').val()
    let targetCBU = findCBU($('#CBU').val())
    if (montoTransferir > 0 && targetCBU != -1 && (cuentas[dataLogin].userSaldo - montoTransferir >= 0)) {
        swal({
            title: `Transferencia`,
            text: `¿Realizar transferencia a ${cuentas[targetCBU].userFirstName} ${cuentas[targetCBU].userLastName}?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    cuentas[dataLogin].transferirDinero(montoTransferir, targetCBU);
                    guardarDatos();
                    $('#details').text('Operacion realizada con exito!')
                        .fadeIn('slow');
                }
            });
    } else {
        $('#details').text('No se pudo realizar la operacion.')
            .delay(2000)
            .fadeOut(1000, () => {
                $('#details').text('Asegurese de ingresar los datos de manera correcta e intente nuevamente.')
                    .fadeIn(2000)
                    .fadeOut(2000, function () {
                        $('#details').fadeIn()
                        mostrarTransferir();
                    })
            });
    }
}

function saldo() {
    $('#details').text('');
    $('#box-info').text('Saldo en tu cuenta');
    $('#saldo-cuenta').text(`$${cuentas[dataLogin].verSaldo()}`);
    $('#details').prepend(`<button id='showCBU' class="interfaceBtn">Mostrar CBU</button>`);
    $('#showCBU').click(() => {
        $('#details').text(`${cuentas[dataLogin].verCBU()}`);
    })
}

recoverData();
dataLogin = sessionStorage.getItem('dataLogin');
if (dataLogin) {
    $('#bienvenida').text(`¡Hola ${cuentas[dataLogin].userFirstName}!`);
}

$.getJSON(URLJSON, function (respuesta, estado) {
    if (estado === "success") {
        let misDatos = respuesta;
        for (let dato of misDatos) {
            console.log(dato.firstname)
            $('#anuncios').fadeOut(3000, () => {
                $('#anuncios').text(`¡${dato.firstname} ${dato.message}!`)
            })
                .delay(3000)
                .fadeIn(2000)
        }
        $('#anuncios').fadeOut(2000)
    }
})
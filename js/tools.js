function capitalize(string) {
    if (string.includes(" ")) {
        let nombres = (string.toLowerCase()).split(" ")
        let nombre = []
        for (let str of nombres) {
            nombre.push(str[0].toUpperCase() + str.slice(1))
        }
        return nombre.join(" ")
    } else {
        string = string.toLowerCase();
        return string[0].toUpperCase() + string.slice(1);
    }
}

function validateAccount(userDni, userEmail) {
    let indexDni = cuentas.findIndex(elemento => elemento.userDni == userDni);
    let indexEmail = cuentas.findIndex(elemento => elemento.userEmail == userEmail);
    if (cuentas.length && (indexDni != -1 || indexEmail != -1)){
        return true;
    } else{
        return false;
    };
}

function logout(){
    window.location.assign('./login.html');
    sessionStorage.removeItem('dataLogin');
}

function checkLogin(){
    if(!dataLogin){
        window.location.assign('./login.html')
    }

    
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function reverseString(string){
    return string.split("").reverse().join("");
}

function cbuGenerator(dni){
    dni = reverseString((dni).toString())
    return `${randomInt(4000, 6000)}` + `${dni.slice(0,4)}` + `${randomInt(10000, 99999)}` + `${dni.slice(4)}` + `${randomInt(10000, 99999)}`
}

function findCBU(CBU) {
    let indexCBU = cuentas.findIndex(elemento => elemento.userCBU === CBU);
    if ( indexCBU != -1 ) {
        return indexCBU;
    } else {
        return false;
    }
}

function guardarDatos(){
    localStorage.setItem('dataAccounts', JSON.stringify(cuentas))
}

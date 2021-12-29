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
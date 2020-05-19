export default function validateLogin(value) {
    let errors = {};
    const checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkPassword = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;

    if(!value.email) {
        errors.email="El Email es obligatorio";
    }else if(!checkEmail.test(value.email)){
        errors.email = "Email no válido";
    }
    if(!value.password) {
        errors.password = "El password es obligatorio";
    }else if(!checkPassword.test(value.password)){
        errors.password = "La contraseña debe de tener al menos 8 letras, un caracter especial una letra y un número";
    }
    return errors;

}
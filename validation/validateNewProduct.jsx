export default function validateCreateAccount(value) {
    let errors = {};
    const url = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;

    if (!value.name) {
        errors.name = 'El nombre es obligatorio';
    }
    if (!value.company) {
        errors.company = 'La Empresa o Compañia son obligatorios';
    }

    if (!value.company) {
        errors.company = 'La Empresa o Compañia son obligatorios';
    }
    if (!value.url) {
        errors.url = 'La Empresa o Compañia son obligatorios';
    }else if(!url.test(value.url)){
        errors.url = 'Url no válida';
    }
    if (!value.description) {
        errors.description = 'Introduzca la descripción del producto';
    }

    return errors;

}
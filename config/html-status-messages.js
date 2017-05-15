module.exports = function(code, typeMessage){
    messageCode = {
        500: "Ha ocurrido un error. Vuelve a intentarlo",
        401: {
            invalidData: 'Introduzca datos válidos',
            notFound: "El correo electrónico no está registrado",
            found: "El correo electrónico ya ha sido registrado",
            incorrectPassword: "Contraseña incorrecta"
        },
        200: 'Ok'
    }
    return {
        code: code,
        msg: typeMessage? messageCode[code][typeMessage] : messageCode[code]
    }
}

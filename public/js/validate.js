'use strict'
var EMAIL_REGEX = /\S+@\S+\.\S+/;

class Validation {
    constructor(toValid, assertions){
        this.assertions = Object.assign(assertions);
        this.toValid= toValid;
    }
    get failMessage(){
        for(var a in this.assertions) {
            var params = this.assertions[a];
            var validator = new Validation[a](this.toValid, params);
            if (!validator.assert())
                return validator.failMessage;
        }
        return null;
    }

}

class Required{
    constructor(toValid){
        this.toValid = toValid;
    }
    assert(){
        return this.toValid != '';
    }
    get failMessage(){
        return 'Este campo es requerido';
    }
}
Validation.required = Required;

class MinLength{
    constructor(toValid, min){
        this.min = min;
        this.toValid = toValid;
    }
    assert(){
        return this.toValid.length >= this.min;
    }
    get failMessage(){
        return `Introduzca como mínimo ${this.min} caracteres`;
    }
}
Validation.minLength = MinLength;

class MaxLength{
    constructor(toValid, max){
        this.max = max;
        this.toValid = toValid;
    }
    assert(){
        return this.toValid.length <= this.max;
    }
    get failMessage(){
        return `Introduzca como máximo ${this.max} caracteres`;
    }
}
Validation.maxLength = MaxLength;

class EmailFormat {
    constructor(toValid){
        this.toValid = toValid;
    }
    assert(){
        return EMAIL_REGEX.test(this.toValid);
    }
    get failMessage(){
        return 'Introduzca un correo electronico válido'
    }
}
Validation.emailFormat = EmailFormat;

class Min {
    constructor(toValid, minNumber){
        this.min = minNumber
        this.toValid = toValid;
    }
    assert(){
        return this.toValid >= this.min;
    }
    get failMessage(){
        return 'Introduzca un numero mayor que ' + this.min;
    }
}
Validation.min = Min;

class Max {
    constructor(toValid, maxNumber){
        this.max = maxNumber
        this.toValid = toValid;
    }
    assert(){
        return this.toValid <= this.max;
    }
    get failMessage(){
        return 'Introduzca un numero mayor que ' + this.max;
    }
}
Validation.max = Max;


// Funciones


var assertions = {
    name: {required: true, minLength: 6, maxLength: 64},
    email: {required: true, emailFormat: true, minLength: 6, maxLength: 64},
    password: {required: true, minLength: 6, maxLength: 64},
    nameEvent: {required: true, minLength: 4},
    day:  {required: true, min: 1,max: 31},
    month: {required: true, min: 1,max: 12},
    year: {required: true, min: 2017},
    hour: {required: true, min:0, max: 23},
    minutes: {required: true, min: 0, max: 59},
    observations: {}
};

function renderError(input, error){
    input = $(input);
    input.parents('.form-group')
            .addClass('error')
            .children('.validation-msg').text(error);
}
function clearErrors() {
    $('.error').removeClass('error');
}
function formIsValid(form){
    clearErrors();
    var dataIsValid = true;

    var inputsText = form.elements.length - 1 // -1 ya que el ultimo suele ser el submit
    for(var i=0; i< inputsText; i++){
        var input = form.elements[i];
        var validation = new Validation(input.value, assertions[input.name]);
        var failMessage = validation.failMessage;
        if( failMessage){
            dataIsValid = false;
            renderError(input, failMessage);
        }
    }
    return dataIsValid;
}

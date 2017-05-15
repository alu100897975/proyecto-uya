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
        return this.toValid != undefined;
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

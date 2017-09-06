'use strict'
var assertions = {
    name: {required: true, minLength: 6, maxLength: 64},
    email: {required: true, emailFormat: true, minLength: 6, maxLength: 64},
    password: {required: true, minLength: 6, maxLength: 64}
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
$('.validatable-form').on('submit', function(e){
    e.preventDefault();
    clearErrors();
    var form = $(this).context; // o $(this)[0]
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

    if(dataIsValid){
        $.ajax({
            method: form.method,
            url: form.action,
            data: $(form).serialize(),
            success: function(data){
                window.location.href="/";
            },
            error: function(res){
                $('.server-msg').text(res.responseJSON.message).addClass('error');
            }
        })
    }else {
        return false;
    }

})

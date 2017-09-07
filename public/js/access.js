'use strict'

$('.signin-form').on('submit', function(e){
    e.preventDefault();

    if(formIsValid(this)){
        $.ajax({
            method: this.method,
            url: this.action,
            data: $(this).serialize(),
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

$('#days').on('click','.day-calendar', function(){
    getEventsDay({
        dayIndex: this.getAttribute('data-index'),
        day: this.getAttribute('data-day'),
        monthIndex: $cal.month.data('month'),
        year: $cal.month.data('year')
    })
});

$('.event-form-toggle').on(' click', function(){
    $('#create-event-popover').toggleClass('is-open');
});
function clearForm(form, opt){

    var options = {inputSubmit : true};
    Object.assign(options, opt);

    var formElements = document.querySelector(form).elements;
    var lenght = options.inputSubmit == true? formElements.length -1: formElements.length;

    for(var i=0; i<lenght; i++){
        formElements[i].value = '';
    }
};
$('#create-event-form').on('submit', function(e){
    e.preventDefault();
    $.ajax({
        method: this.method,
        url: this.action,
        data: {
            name: this.nameEvent.value,
            day: this.day.value,
            month: this.month.value,
            year: this.year.value,
            hour: this.hour.value,
            minutes: this.minutes.value,
            observations: this.observations.value
        },
        success: function(data){
            $('#create-event-popover').removeClass('is-open');
            clearForm('#create-event-form');
            getEventsDay($('#date-calendar').data('date'));
            loadNextEvents();
        },
        error: function(res){
            console.log("Algo salio mal");
        }

    });
});

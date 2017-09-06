$('#days .day-calendar').on('click', function(){
    var day = this.getAttribute('data-day');
    var month = $cal.month.data('month');
    var year = $cal.month.data('year');

    $.ajax({
        method: 'GET',
        url: `/events?day=${day}&month=${month}&year=${year}`,
        success: function(){
            alert("exito");
        }
    })
});

$('.event-form-toggle').on(' click', function(){
    $('#create-event-popover').toggleClass('is-open');
});

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
            console.log(data);
            alert("exito");
        },
        error: function(res){
            console.log(res);
            alert("error");
        }

    });
    console.log(this);
})

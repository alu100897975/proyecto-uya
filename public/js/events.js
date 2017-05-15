var NAME_MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio", "Agosto", "Septiembre",
                "Octubre", "Noviembre", "Diciembre"];
function renderEvent(dayEvent){
    var time = dayEvent.time;
    return `
        <div class="event">
            <div class="event-time">${time.hour}:${time.minutes}</div>
            <div class="event-name">${dayEvent.name}</div>
            <div class="event-actions actions">
                <button class="action edit">
                    <i class="fa fa-pencil" aria-hidden="true"> </i>
                </button>
                <button class="action remove">
                    <i class="fa fa-trash" aria-hidden="true"> </i>
                </button>
            </div>
        </div>
    `
}
/*
.event.medium-imp
    .event-time 4:00
    .event-name Sistemas informaticos
    .event-actions.actions
        button.action.edit
            i(class="fa fa-pencil" aria-hidden="true")
        button.action.remove
            i(class="fa fa-trash" aria-hidden="true")
*/
function renderDayEvents(events){
    var eventsContainer = $('#events');
    eventsContainer.html('');
    for(var i=0; i<events.length; i++){
        eventsContainer.append( renderEvent( events[i] ));
    }


};

/*
.day-events.center-block#day-events
    header.day
        span.date-day#date 4 de agosto
        .actions
            button.action#open-form-event
                    i(class="fa fa-plus" aria-hidden="true")
    .events#events
        .event.imp
            .event-time 24:00
            .event-name Sistemas informaticos
        .event.medium-imp
            .event-time 4:00
            .event-name Sistemas informaticos
            .event-actions.actions
                button.action.edit
                    i(class="fa fa-pencil" aria-hidden="true")
                button.action.remove
                    i(class="fa fa-trash" aria-hidden="true")

*/
$('.cal-day').on('click' , function(){
    var day = $(this).data('day');
    var month = $(this).data('month');
    var year = $(this).data('year');
    console.log(day, month, year);

    $('#date').text(`${day} de ${NAME_MONTHS[month-1]}, ${year}`);
    $.ajax({
        method: 'GET',
        url: `/event/${year}/${month}/${day}`,
        success: function(data){
            console.log(data);
            renderDayEvents(data.events);
        },
        error: function(res){
            console.log(res);
        }

    });
})

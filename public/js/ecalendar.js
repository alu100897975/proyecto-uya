'use strict'
String.prototype.toCapitalize = function(){
    return this[0].toUpperCase() + this.slice(1);
}
var DAYS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
var MONTHS = [
    { name: "enero", days: 31 },
    { name: "febrero", days: 28 },
    { name: "marzo", days: 31 },
    { name: "abril", days: 30 },
    { name: "mayo", days: 31 },
    { name: "junio", days: 30 },
    { name: "julio", days: 31 },
    { name: "agosto", days: 31 },
    { name: "septiembre", days: 30 },
    { name: "octubre", days: 31 },
    { name: "noviembre", days: 30 },
    { name: "diciembre", days: 31 }
];
var $cal = (function (){
    $('#ecalendar').html(`
    <table id="calendar">
        <thead>
            <tr>
                <th>L</th>
                <th>M</th>
                <th>Mi</th>
                <th>J</th>
                <th>V</th>
                <th>S</th>
                <th>D</th>
            </tr>
        </thead>
        <tbody id="days"></tbody>
    </table>
    `);
    return {
        month: $('#month'),
        days: $('#days')
    };
})();
function getEventsDay(info){
    var {dayIndex, day, monthIndex, year} = info;
    $('#date-calendar')
        .html(`
            <span class="highlight">${DAYS[dayIndex].toCapitalize()}</span>
            <span> ${day} de ${MONTHS[monthIndex].name} de ${year}</span>
        `)
        .data('date', info);
    var formEvent = document.querySelector('#create-event-form');
    formEvent.day.value = day;
    formEvent.month.value= monthIndex + 1;
    formEvent.year.value = year;

    $.ajax({
        method: 'GET',
        url: `/events?day=${day}&month=${monthIndex+1}&year=${year}`,
        success: function(data){
            var events = data.events;
            var html ='';

            for(var i=0; i<events.length; i++){
                html += `<li class="event">
                    <div class="event-info">
                        <div class="event-info">
                            <div class="event-name">
                                ${events[i].name}
                            </div>
                            <div class="aditional-info">
                                <span class="event-time">${events[i].time.hour}:${events[i].time.minutes}</span>
                                <span class="event-observations">${events[i].observations}</span>
                            </div>
                        </div>
                    </div>
                    <div class="event-actions">
                        <button>
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button>
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                    </div>
                </li>`
            }
            $('#day-events').html(html);
        }
    })
}
class Calendar {
    constructor(){
        var date = new Date();
        this.cd = {
            dayIndex: this._normalizeDayIndex(date.getDay()),
            day: date.getDate(),
            monthIndex: date.getMonth(),
            year: date.getFullYear()
        };
        console.log(this.cd);
        date.setDate(1);
        this._generateMonth(date);

    }
    refreshMonth(n){
        this._generateMonth(new Date(
            this.month.year,
            this.month.month.index + n
        ));
    }

    // métodos privados
    _generateMonth(date){
        var
        d = this._normalizeDayIndex(date.getDay()),
        m = date.getMonth(),
        y = date.getFullYear(),
        cd = {
            day: {
                index: d,
                name: DAYS[d],
                number: 1
            },
            month: {
                index: m,
                name: MONTHS[m].name,
                days: (m==1 && y%4==0)? 29: MONTHS[m].days,
                number: m+1
            },
            year: y
        };
        //semanas (filas tr) que ocupará
        cd.weeks = Math.ceil( (cd.month.days + d)/7 );
        this.month = cd;
        this._render();
    }
    _htmlCalendar(date){
        var
        day = date.day.number,
        j = date.day.index,
        tds = '<td></td>'.repeat(j),
        trs = '';

        for(var i=0; i<date.weeks; i++){
            trs += '<tr>';
            while(j<7 && day<=date.month.days){
                tds += `
                    <td>
                        <div class="day-calendar" data-day="${day}" data-index="${j++}">
                            <div class="day-number">${day++}</div>
                        </div>
                    </td>`;
                /*
                //codigo despues de div.day-number
                <div class="day-resume">
                    <div class="day-events-calendars">
                        <div class="type-calendar personal"></div>
                        <div class="type-calendar school"></div>
                    </div>
                </div>
                */
            }
            trs+=tds + '</tr>';
            tds =''; j=0;
        }
        return {
            month: `<span class="month-calendar highlight">${date.month.name.toCapitalize()}</span> de ${date.year}`,
            days: trs
        }

    }
    _render(){

        var cal = this._htmlCalendar(this.month);
        $cal.month
            .html(cal.month)
            .data('year', this.month.year)
            .data('month', this.month.month.index);


        $cal.days.html(cal.days);

        // marcar dia actual
        if(this.month.month.index == this.cd.monthIndex && this.month.year == this.cd.year){
            $(`.day-calendar[data-day="${this.cd.day}"]`).addClass('currend-day');
        }
    }
    _normalizeDayIndex(day){
        return (day+6)%7;
    }

};
var calendar = new Calendar();
getEventsDay(Object.assign({},calendar.cd) );

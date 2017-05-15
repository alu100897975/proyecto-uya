'use strict'
var NAME_DAYS = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
var FULL_CURRENT_DATE = new Date();

var CURRENT_DATE = {
    day: FULL_CURRENT_DATE.getUTCDate(),
    month: FULL_CURRENT_DATE.getUTCMonth()+ 1,
    year: FULL_CURRENT_DATE.getUTCFullYear(),
    day_in_week: FULL_CURRENT_DATE.getDay() //0-6
}

function initializeCalendar(year_number) {
    return {
        date: year_number,
        months: {
            1: {name: 'Enero', days: 31},
            2: {name: 'Febrero', days:  year_number % 4 == 0? 29 : 28}, //por si es año bisiesto
            3: {name: 'Marzo', days: 31 },
            4: {name: 'Abril', days: 30 },
            5: {name: 'Mayo', days: 31 },
            6: {name: 'Junio',days: 30 },
            7: {name: 'Julio', days: 31 },
            8: {name: 'Agosto', days: 31 },
            9: {name: 'Septiembre', days: 30 },
            10: {name: 'Octubre', days: 31},
            11: {name: 'Noviembre', days: 30 },
            12: {name: 'Diciembre', days: 31 },
        }
    };
}

function arrayDays(day, year,month_int ,limit, day_in_week){
    var month = year.months[month_int];
    var monthDays = new Array(limit);
    for(var i=0; i<limit; i++){
        var date = day+i;
        var name = NAME_DAYS[ (day_in_week +i) % 7 ];
        monthDays[i] = { date: date, name: name }
    }
    return {
        name: month.name,
        date: month_int,
        days: monthDays,
        year: year.date
    }
}
function changeMonth(month, year){

    if(++month > 12){
        year = initializeCalendar(year.date+1); //Volver a inicialize por si se cambia a un año bisiesto
        return 1; //Enero
    }
    return  month;
}

function daysToShow(days_to_show=7){
    var month_int = CURRENT_DATE.month;
    var pointer_day = CURRENT_DATE.day;
    var day_in_week = CURRENT_DATE.day_in_week;
    var year = initializeCalendar(CURRENT_DATE.year);
    var months = [];
    while(days_to_show > 0){
        // console.log('month int', month_int);
        var month = year.months[month_int];
        var month_days = month.days;

        var res_of_days = (month_days - pointer_day)+1; //Dias restantes para que termine el mes
        // console.log("dias del mes", month_days);
        // console.log("dia", pointer_day);
        // console.log("resto de dias para que termine el mes",res_of_days);
        if(res_of_days > days_to_show){ //Hay mas dias restantes del mes que dias que mostrar. No se cambia de mes
            months.push(arrayDays(pointer_day, year,month_int, days_to_show, day_in_week));
            days_to_show = 0;
        }else { //Se cambia de mes
            months.push(arrayDays(pointer_day, year,month_int, res_of_days, day_in_week));
            pointer_day = 1; //principio de mes
            day_in_week = (day_in_week + res_of_days)% 7;
            days_to_show -= res_of_days;
            month_int = changeMonth(month_int, year);
        }
    }
    return months;
}



function toDays(date, months){
    var days = date.day;
    for(var i=1; i<=date.month; i++){
        days += months[i].days;
    }
    // Años a dias

    days += (date.year * 365);
    // Ajustar dias bisiestos
    var leaps = Math.floor(date.year / 4);

    if( ( (date.month>=2 && date.day >=29) ||(date.month >=3) ) && ( (date.year %4)== 0 ) ) {
        leaps --;
    }

    return days + leaps;
}
function remainingDays(dateA, dateB){
    //inicializar calendarios
    var yearA = initializeCalendar(dateA.year);
    var yearB = initializeCalendar(dateB.year);

    //Pasar a dias
    var years = dateA.year - dateB.year;
    //Obvié el uso de propiedad communativa para dejar mas claro el codigo

    if (years <0){
        throw 'Error al calcular dias restantes';
    }
    // console.log("Dias de a",toDays(dateA, yearA.months));
    // console.log("Dias de b", toDays(dateB, yearB.months));
    return ( toDays(dateA, yearA.months) - toDays(dateB, yearB.months) );
}
function remainingDaysEvent (events){
    for(var i=0; i<events.length; i++){
        var eventDate = events[i].date;
        events[i].remaining = remainingDays(eventDate, CURRENT_DATE);
    }
}

module.exports = {
    daysToShow,
    remainingDaysEvent,
    remainingDays
}

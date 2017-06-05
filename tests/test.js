'use strict'
let Calendar = require('calendar-util');

describe('Dias restantes',function(){
    it('10 días restantes desde 20/2/2016 - 1/3/2016',function(){
        let calendar = new Calendar({day:20, month:2, year: 2016})
        let dateEnd =[{day:1, month:3, year: 2016}];
        calendar.remainingDays(dateEnd);
        dateEnd[0].remaining.should.be.equal(10);
    });
    it('No hay 635 días restantes desde 1/1/2016 - 1/1/2017',function(){
        let calendar = new Calendar({day:1, month:1, year: 2016})

        let dateEnd = [{day:1, month:1, year: 2017}]
        calendar.remainingDays(dateEnd);
        dateEnd[0].remaining.should.not.be.equal(365);
    });
});
describe('Días siguientes',function(){
    it('4 días siguientes desde el 28/02/2016',function(){
        var expect = [ [28,29],[1,2] ];
        let calendar = new Calendar({day:28, month: 2, year:2016});
        let months = calendar.nextDays(4);
        //console.log(JSON.stringify(months,null,2));
        for(var i=0; i<months.length; i++){
            var days = months[i].days;
            for(var j=0; j<days.length;j++ ){
                months[i].days[j].date.should.be.equal(expect[i][j]);
            }
        }
    });
})

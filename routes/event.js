'use strict'

var router = require('express').Router();
var DayEvent  = require('../models/event');
router.get('/', (req,res)=>{
    var {day,month, year} = req.query;
    DayEvent
        .find({user: '59196f0213fc3e078f55fb3c' , "date.day":day, "date.year":year, "date.month":month})
        .sort({'time.hour': 1,'time.minutes': 1 })
        .exec(
            function(err,events){
                if(err)
                    return res.status(500).json({message: "Error al buscar los eventos"});
                if (events.length==0)
                    return res.status(204).json({message: "No se encontro ningun evento"});
                res.status(200).json({message: 'Ok', events: events});
            }
        );
});
router.get('/next-events', (req,res) =>{
    var cd = new Date(); //current_date
    DayEvent.find({user: '59196f0213fc3e078f55fb3c'})
        .sort({"date.year": 1, "date.month": 1, "date.day": 1})
        .exec(
            function(err,events){
                if(err){
                    return res.status(500).json({message:"No se pudieron cargar los eventos"});

                }
                var dateEvents = [];

                for(var i=0; i<events.length && dateEvents.length<4; i++){
                    var event = Object.assign({},events[i].toObject());
                    var dateEvent = new Date(event.date.year,event.date.month-1, event.date.day, event.time.hour, event.time.minutes );
                    var remaining = dateEvent - cd;
                    if( remaining >= 0){

                        remaining = (remaining/86400000).toFixed(0);
                        event.remaining = remaining;
                        dateEvents.push(event);
                    }

                };
                if(dateEvents.length==0)
                    return res.status(204).json({message: "No se encontraron eventos proximos"});
                res.status(200).json({nextEvents: dateEvents});

            }
        );
});
router.post('/', (req, res)=>{
    var dataEvent = req.body;
    var dayEvent = new DayEvent({
        name: dataEvent.name,
        user: '59196f0213fc3e078f55fb3c',
        date: {
            day: dataEvent.day,
            month: dataEvent.month,
            year: dataEvent.year
        },
        time: {
            hour: dataEvent.hour,
            minutes: dataEvent.minutes
        },
        observations: dataEvent.observations
    });
    dayEvent.save((err, ev)=>{
        if(err){
            return res.status(500).json({message:'Hubo un error al guardar el evento'});
        }
        return res.status(200).json(dataEvent);

    })
});
module.exports = router;

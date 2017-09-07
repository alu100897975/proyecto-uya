'use strict'

var router = require('express').Router();
var DayEvent  = require('../models/event');
router.get('/', (req,res)=>{
    var {day,month, year} = req.query;
    DayEvent
        .find({user: '59132aab98f4890eb8618e09' , "date.day":day, "date.year":year, "date.month":month})
        .sort({'time.hour': 1,'time.minutes': 1 })
        .exec(
            function(err,events){
                if(err)
                    return res.status(500).json({message: "Error al buscar los eventos"});
                if (!events)
                    return res.status(204).json({message: "No se encontro ningun evento"});
                res.status(200).json({message: 'Ok', events: events});
            }
        );
});
router.post('/', (req, res)=>{
    var dataEvent = req.body;
    var dayEvent = new DayEvent({
        name: dataEvent.name,
        user: '59132aab98f4890eb8618e09',
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

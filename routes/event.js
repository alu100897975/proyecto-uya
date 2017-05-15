'use strict'

var router = require('express').Router();
var DayEvent  = require('../models/event');
router.post('/', (req, res)=>{
    console.log(req.body);
    var dataEvent = req.body;
    var userId = req.user.id;
    var dayEvent = new DayEvent({
        name: dataEvent.name,
        user: userId,
        date: {
            day: dataEvent.day,
            month: dataEvent.month,
            year: dataEvent.year
        },
        time: {
            hour: dataEvent.hour,
            minutes: dataEvent.minutes
        },
        important: dataEvent.level === 'on'
    });
    dayEvent.save((err, ev)=>{
        if(err){
            console.log('Hubo un error:', err.message);
            return res.send('Hubo un error al guardar el evento');
        }
        console.log(ev);
        return res.redirect('/');

    })
});
router.get('/:year/:month/:day', (req,res)=>{
    var date = req.params;
    // 59190da7c3b545080c377966
    console.log(date);
    DayEvent.find({user: req.user.id , "date.day":date.day, "date.year":date.year, "date.month":date.month},
        (err, events)=>{
            if(err)
                return res.status(500).json({message: "Error al buscar los eventos"});
            if (!events)
                return res.status(204).json({message: "No se encontro ningun evento"});
            console.log(events);
            res.status(200).json({message: 'Ok', events: events});
        }
    );
})
module.exports = router;

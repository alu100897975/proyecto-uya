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
module.exports = router;

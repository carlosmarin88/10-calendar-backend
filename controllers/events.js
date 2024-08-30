const { response } = require('express');
const Event = require('../models/Event');

// {
//     ok: true,
//     msg: 'getEvents'
// }

const getEvents = async(req, resp = response) => {

    const events = await Event.find().populate('user', 'name');

    return resp.status(200).json({
        ok: true,
        events
    });
}


// {
//     ok: true,
//     msg: 'createEvents'
// }

const createEvents = async(req, resp = response) => {

    //console.log(req.body);

    const event = new Event(req.body);

    try {

        event.user = req.uid;

        const newEvent = await event.save();

        return resp.status(201).json({
            ok: true,
            event: newEvent
        })

    } catch (error) {
        console.error(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

// {
//     ok: true,
//     msg: 'updateEvents'
// }

const updateEvents = async(req, resp = response) => {

    const eventId = req.params.id;

    try {
        

        const event = await Event.findById(eventId);

        if(!event){
            return resp.status(404).json({
                ok: false,
                msg: `No existe evento para el id ${eventId}`
            })
        }

        if(event.user.toString() !== req.uid){
           return resp.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});

        return resp.status(200).json({
            ok: true,
            event: updatedEvent
        })

    } catch (error) {
        console.error(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

// {
//     ok: true,
//     msg: 'deleteEvents'
// }

const deleteEvents = async(req, resp = response) => {

    const eventId = req.params.id;

    try {
        

        const event = await Event.findById(eventId);

        if(!event){
            return resp.status(404).json({
                ok: false,
                msg: `No existe evento para el id ${eventId}`
            })
        }

        if(event.user.toString() !== req.uid){
           return resp.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para eliminar este evento'
            })
        }

      await Event.findByIdAndDelete(eventId);

        return resp.status(200).json({
            ok: true,
        });

    } catch (error) {
        console.error(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getEvents,
    createEvents,
    updateEvents, 
    deleteEvents
}
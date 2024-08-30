
const { Router } = require('express');
const router = Router();
const { validateJWT } = require('../middlewares/validate-jwt');
const { getEvents, createEvents, updateEvents, deleteEvents } = require('../controllers/events');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { isDate } = require('../helpers/isDate');

/*
    Event Routes
    /api/events

*/


// obtener eventos
// todas tienen que pasar por la validacion del token (JWT)
router.use(validateJWT);

router.get('/', getEvents);

// Crear un nuevo evento
router.post('/',
    [ // middlewares
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validateFields
    ],
    createEvents);

// Actualizar eventos
router.put('/:id',
    [ // middlewares
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validateFields
    ], updateEvents);

// Borrar eventos
router.delete('/:id', deleteEvents);

module.exports = router;
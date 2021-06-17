const { Router } = require('express');
const videogameController = require('../controllers/videogameController');

function videogameRouter(VideogameModel) {
    const router = Router();

    const controller = videogameController(VideogameModel);

    router.route('/all-games').get(controller.getVideogames);

    return router;

}

module.exports = videogameRouter;
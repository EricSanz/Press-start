const { Router } = require('express');
const videogameController = require('../controllers/videogameController');

function videogameRouter(VideogameModel) {
    const router = Router();

    const controller = videogameController(VideogameModel);

    router.route('/all-games')
        .get(controller.getVideogames)
        .post(controller.postEdition);
    
    router.route('/product/:id')
        .get(controller.getOneVideogame);

    return router;

}

module.exports = videogameRouter;
const axios = require('axios');

function videogameController(VideogameModel) {
    function getVideogames(req, res) {
        const query = {};

        VideogameModel.find(query, (errorGettingVideogames, videogames) => ((errorGettingVideogames)
            ? res.send(errorGettingVideogames) : res.json(videogames)));
    }

    return {
        getVideogames,
    };
}

module.exports = videogameController;
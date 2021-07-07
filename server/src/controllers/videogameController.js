const axios = require('axios');

function videogameController(VideogameModel) {
    function getVideogames(req, res) {
        const query = {};

        VideogameModel.find(query, (errorGettingVideogames, videogames) => ((errorGettingVideogames)
            ? res.send(errorGettingVideogames) : res.json(videogames)));
    }

    function postEdition({ body }, res) {
        const videogameId = body.id;
        VideogameModel.findOne({ id: videogameId }, (errorFindUser, videogame) => {
            if (videogame) {
                const findVideogame = videogame.other_editions.some(
                    (videogame) => String(videogame) === body.videogame,
                );
                if (findVideogame) {
                    const videogameFilter = videogame.other_editions.filter((videogame) => String(videogame) !== body.videogame);
                    videogame.other_editions = videogameFilter;
                    videogame.save();
                    res.send('delete');
                } else {
                    videogame.other_editions = [...videogame.other_editions, body.videogame];
                    videogame.save();
                    res.json('save');
                }
            } else {
                res.send(errorFindUser);
            }
        });
    }

    return {
        getVideogames,
        postEdition
    };
}

module.exports = videogameController;
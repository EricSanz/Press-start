const axios = require('axios');

function videogameController(VideogameModel) {
    function getVideogames(req, res) {
        const query = {};

        VideogameModel.find(query, (errorGettingVideogames, videogames) => ((errorGettingVideogames)
            ? res.send(errorGettingVideogames) : res.json(videogames)));
    }

    function getOneVideogame(req, res) {
        const { id } = req.params;

        VideogameModel.findById(id).populate('other_editions').populate('other_platforms').exec((errorGettingVideogame, videogame) => ((errorGettingVideogame)
            ? res.send(errorGettingVideogame) : res.json(videogame)));
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
                    res.send('deleted');
                } else {
                    videogame.other_editions = [...videogame.other_editions, body.videogame];
                    videogame.save();
                    res.json('saved');
                }
            } else {
                res.send(errorFindUser);
            }
        });
    }

    function putPlatform({ body }, res) {
        const videogameId = body.id;
        VideogameModel.findOne({ id: videogameId }, (errorFindUser, videogame) => {
            if (videogame) {
                const findVideogame = videogame.other_platforms.some(
                    (videogame) => String(videogame) === body.videogame,
                );
                if (findVideogame) {
                    const videogameFilter = videogame.other_platforms.filter((videogame) => String(videogame) !== body.videogame);
                    videogame.other_platforms = videogameFilter;
                    videogame.save();
                    res.send('deleted');
                } else {
                    videogame.other_platforms = [...videogame.other_platforms, body.videogame];
                    videogame.save();
                    res.json('saved');
                }
            } else {
                res.send(errorFindUser);
            }
        });
    }

    return {
        getVideogames,
        getOneVideogame,
        postEdition,
        putPlatform
    };
}

module.exports = videogameController;
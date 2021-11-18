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

    function putPlatformsAvailable({body}, res) {
        const videogameId = body.id;
        const ps4 = body.ps4Platform; 
        const ps5 = body.ps5Platform; 
        const xbox = body.xboxPlatform; 
        const nintendo = body.switchPlatform; 
        const pc = body.pcPlatform;

        VideogameModel.findOne({ id: videogameId }, (errorFindUser, videogame) => {
            if (videogame) {

                ps4 !== "" ? videogame.available_platforms_logos.push(ps4) : null;
                ps5 !== "" ? videogame.available_platforms_logos.push(ps5) : null;
                xbox !== "" ? videogame.available_platforms_logos.push(xbox) : null;
                nintendo !== "" ? videogame.available_platforms_logos.push(nintendo) : null;
                pc !== "" ? videogame.available_platforms_logos.push(pc) : null;

                videogame.available_platforms_logos = [... videogame.available_platforms_logos];
                videogame.save();
                res.json('saved');
            } else {
                res.send(errorFindUser);
            }
        });
    }

    // function putPlatform({ body }, res) {
    //     const videogameId = body.id;
    //     VideogameModel.findOne({ id: videogameId }, (errorFindUser, videogame) => {
    //         if (videogame) {
    //             const findVideogame = videogame.other_platforms.some(
    //                 (videogame) => String(videogame) === body.videogame,
    //             );
    //             if (findVideogame) {
    //                 const videogameFilter = videogame.other_platforms.filter((videogame) => String(videogame) !== body.videogame);
    //                 videogame.other_platforms = videogameFilter;
    //                 videogame.save();
    //                 res.send('deleted');
    //             } else {
    //                 videogame.other_platforms = [...videogame.other_platforms, body.videogame];
    //                 videogame.save();
    //                 res.json('saved');
    //             }
    //         } else {
    //             res.send(errorFindUser);
    //         }
    //     });
    // }

    return {
        getVideogames,
        getOneVideogame,
        postEdition,
        // putPlatform,
        putPlatformsAvailable,
    };
}

module.exports = videogameController;
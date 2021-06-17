const { Schema, model } = require('mongoose');

const videogameSchema = new Schema({
    game: String,
    genres: Array,
    developer: String,
    editor: String,
    images: Array,
    pegi: String,
    release: [
        {
            date: String,
            day: Number,
            month: Number,
            year: Number,
            not: String,
            released: Boolean,
        }
    ],
    platforms: [
        {
            platform: {
                version: String,
                edition: [
                    {
                        name: String,
                        price: String,
                        cover: String,
                        stock: Boolean,
                        sale: Boolean,
                        salePrice: String,
                        is_content: Boolean,
                        content: [
                            {
                                title: String,
                                pack: Array,
                            }
                        ]
                    }
                ]
            },
            ps4: Boolean,
            ps5: Boolean,
            xboxOne: Boolean,
            xboxSeriesSX: Boolean,
            nintendoSwitch: Boolean,
            pc: Boolean,
        }
    ],
    description: [
        {
            global: Array,
            features: [
                {
                    title: String,
                    text: Array,
                }
            ]
        }
    ],
    slider: [
        {
            is_main: Boolean,
            main: String,
            card: String,
        }
    ]
});

module.exports = model('Videogame', videogameSchema);

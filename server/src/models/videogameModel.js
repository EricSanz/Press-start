const { Schema, model } = require('mongoose');

const videogameSchema = new Schema({
    game: {
        first_title: String,
        second_title: String,
        dual_title: Boolean
    },
    id: Number,
    genres: Array,
    developer: String,
    images: Array,
    pegi: String,
    release: {
        date: String,
        day: String,
        month: String,
        year: String,
        no_date: String,
        released: Boolean,
    },
    ps4: Boolean,
    ps5: Boolean,
    xboxOne: Boolean,
    xboxSeriesSX: Boolean,
    nintendoSwitch: Boolean,
    pc: Boolean,
    edition: {
        version: String,
        name: String,
        price: String,
        cover: String,
        stock: Boolean,
        sale: Boolean,
        salePrice: String,
        is_content: Boolean,
        content_image: Array,
        content: [
            {
                title: String,
                pack: Array,
            }
        ]
    },
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
    card: String,
    other_editions: [{ type: Schema.Types.ObjectId, ref: 'videogame' }],
    other_platforms: [{ type: Schema.Types.ObjectId, ref: 'videogame' }]
});

module.exports = model('videogame', videogameSchema);

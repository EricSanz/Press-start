const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
    videogame: [{ type: Schema.Types.ObjectId, ref: 'videogame'}],
    quantity: Number
});

module.exports = model('cart', cartSchema);


const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    user: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    videogame: String,
    date: { type: Date, default: new Date() },
    comment: [
        {
            title: String,
            message: String
        }
    ],
    rating: String 
});

module.exports = model('message', messageSchema);
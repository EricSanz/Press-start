const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    uid: String,
    displayName: String,
    email: String,
    photoURL: String,
    favorites: [{ type: Schema.Types.ObjectId, ref: 'videogame' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'message'}],
});

module.exports = model('user', userSchema);
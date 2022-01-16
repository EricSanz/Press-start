const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    uid: String,
    displayName: String,
    email: String,
    firstName: String,
    lastName: String,
    birthDate: Date,
    gender: String,
    mobile: String,
    landline: String,
    password: String,
    photoURL: String,
    favorites: [{ type: Schema.Types.ObjectId, ref: 'videogame' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'message' }],
    shoppingCart: [{ type: Schema.Types.ObjectId, ref: 'cart' }]
});

module.exports = model('user', userSchema);
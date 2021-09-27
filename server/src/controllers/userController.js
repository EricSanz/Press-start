function userController(UserModel) {
    function getUser(req, res) {
        const query = { displayName: req.query,displayName };
        UserModel.findOne(query).populate('favorites').populate('messages').populate('shoppingCart').exec((errorFindUser, user) => ((errorFindUser)
        ? res.send(errorFindUser) : res.json(user)));
    };

    function putUser({body}, res) {
        const userId = body.uid;
        const query = { uid: userId };
        UserModel.findOneAndUpdate(query, body, { upsert: true, useFindAndModify: false }, (
            errorFindUser, userModified
            ) => (
                (errorFindUser) ? res.send(errorFindUser) : res.json(userModified)));
    };

    return {
        getUser,
        putUser
    };
};

module.exports = userController;
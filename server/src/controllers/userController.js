function userController(UserModel) {
    function getUser(req, res) {
        const query = { displayName: req.query, displayName };
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

    const postUser = async (req, res) => {
        const { displayName, email, password } = req.body;
        const uid = Math.random().toString(36).slice(2);
        const emailAlreadyRegisteredError = ({ registerError: { msg: 'Email already exist.'} });
        const displayNameAlreadyRegisteredError = ({ registerError: { msg: 'User name already exist.'} });
        const emailAlreadyRegistered = await UserModel.exists({ email });
        const displayNameAlreadyRegistered = await UserModel.exists({ displayName });
        const user = new UserModel({displayName, email, password, uid});

        if (emailAlreadyRegistered) {
            res.json(emailAlreadyRegisteredError);
        } else if (displayNameAlreadyRegistered) {
            res.json(displayNameAlreadyRegisteredError);
        } else {
            UserModel.create(user)
            res.json(user);
        }
    }

    const loginPostUser = async (req, res) => {
        const { email, password } = req.body;
        console.log(req.body);
        const notUserFound = ({ loginError: { msg: "User doesn't exist."} });
        const invalidPassword = ({ loginError: { msg: "Invalid password."} });

        const user = await UserModel.findOne({ email });

        if (!user) {
            res.json(notUserFound)
        } else {
            user.password === password ? res.json(user) : res.json(invalidPassword);
        }
        // if (!user) return res.json(notUserFound);
        // (user.password === password) ? res.json(user) : res.json(invalidPassword);
    }

    return {
        getUser,
        putUser,
        postUser,
        loginPostUser
    };
};

module.exports = userController;
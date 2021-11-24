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
        const email = req.body.email;
        const password = req.body.password;
        console.log(email,password);
        const notUserFound = ({ loginError: { msg: "User email doesn't exist."} });
        const invalidPassword = ({ loginError: { msg: "Invalid password."} });

        const user = await UserModel.findOne({ email: email }).populate('favorites');

        if (!user) {
            res.json(notUserFound)
        } else {
            user.password === password ? res.json(user) : res.json(invalidPassword);
        }
    }


    function getUnicUser(req, res) {
        const { userId } = req.params;
        console.log(userId);

        UserModel.findOne({ uid: userId }).populate('favorites').exec((errorFindUser, user) => (errorFindUser) ? res.send(errorFindUser) : res.json(user));
    }

    function addFavorite( {body}, res) {

        const userId = body.userId;
        const videogameId = body.videogameId;
        // console.log(userId);
        // console.log(videogameId);

        UserModel.findOne({uid: userId }, (errorFindUser, user) => {
            console.log(user);
    
            if (user) {
                const findVideogame = user.favorites.some((videogame) => String(videogame) === videogameId );
                if (findVideogame) {
                    const videogameFilter = user.favorites.filter((videogame) => String(videogame) !== videogameId);
                    user.favorites = videogameFilter;
                    user.save();
                    res.json('delete');
                } else {
                    user.favorites = [...user.favorites, videogameId];
                    user.save();
                    res.json('save');
                }
            } else {
                res.send(errorFindUser);
            }
        })
    }

    return {
        getUser,
        putUser,
        postUser,
        loginPostUser,
        getUnicUser,
        addFavorite
    };
};

module.exports = userController;
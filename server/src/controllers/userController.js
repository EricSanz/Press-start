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
        const photoURL = "https://i.ibb.co/fdYMRQv/icon-profile.png";
        const emailAlreadyRegisteredError = ({ registerError: { msg: 'Email already exist.'} });
        const displayNameAlreadyRegisteredError = ({ registerError: { msg: 'User name already exist.'} });
        const emailAlreadyRegistered = await UserModel.exists({ email });
        const displayNameAlreadyRegistered = await UserModel.exists({ displayName });
        const user = new UserModel({displayName, email, password, uid, photoURL});

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

        UserModel.findOne({uid: userId }, (errorFindUser, user) => {
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

    const changeProfilePic = async ({body}, res) => {
        const query = { uid: body.userId};
        const photoUrl = { photoURL: body.photoUrl };

        const user = await UserModel.findOneAndUpdate(query, photoUrl, {new: true})
        if (user) {
            res.json(user);
        }
    }

    const updateUserInfo = async ({body}, res) => {
        const query = { uid: body.userId };
        const updateInfo = {};

        body.firstName === '' ? null : updateInfo.firstName = body.firstName;
        body.lastName === '' ? null : updateInfo.lastName = body.lastName;
        body.displayName === '' ? null : updateInfo.displayName = body.displayName;
        body.birthDate === '' ? null : updateInfo.birthDate = body.birthDate;
        body.gender === ('' || undefined) ? null : updateInfo.gender = body.gender;
        body.mobile === '' ? null : updateInfo.mobile = body.mobile;
        body.landline === '' ? null : updateInfo.landline = body.landline;

        const user = await UserModel.findOneAndUpdate(query, updateInfo, {new: true});
        if (user) {
            res.json(user);
        }        
    }

    // const updatePassword = async ({body}, res) => {
    //     const query = { uid: body.userId };
    //     const actualPassword = body.actualPassword;
    //     const newPassword = body.newPassword;
    //     const messageError = {
    //         error: "Your actual password doesn't match"
    //     };

    //     const user = await UserModel.findOne(query);

    //     if (user.password === actualPassword) {
    //             user.password = newPassword;
    //             user.save();
    //             res.json(user);
    //     } else {
    //         res.send(messageError);
    //     }
    // };

    function updatePassword({body}, res) {
        const query = { uid: body.userId };
        const actualPassword = body.actualPassword;
        const newPassword = body.newPassword;
        
        UserModel.findOne(query, (message, user) => {
            if (user.password === actualPassword) {
                user.password = newPassword;
                user.save();
                res.json(user);
            } else {
                res.send(message);
            }
        })
    }

    return {
        getUser,
        putUser,
        postUser,
        loginPostUser,
        getUnicUser,
        addFavorite,
        changeProfilePic,
        updateUserInfo,
        updatePassword
    };
};

module.exports = userController;
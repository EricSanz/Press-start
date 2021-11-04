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
        const emailAlreadyRegisteredError = ({ error: { msg: 'Email already exist.'} });
        // const emailBlankRegisterError = ({ error: { msg: "The email is not filled in."} });
        // const emailNotEmailRegisterError = ({ error: { msg: "Invalid email address."} });
        const displayNameAlreadyRegisteredError = ({ error: { msg: 'User name already exist.'} });
        // const displayNameBlankRegisterError = ({ error: { msg: "The user name is not filled in"} });
        // const passwordRegisterError = ({ error: { msg: "Password must contain minimum 8 characters"} });
        const emailAlreadyRegistered = await UserModel.exists({ email });
        const displayNameAlreadyRegistered = await UserModel.exists({ displayName });
        const user = new UserModel({displayName, email, password, uid});

        // if (req.body.email === '') {
        //     res.json(emailBlankRegisterError);
        // } else if ((req.body.email.includes('@') === false) || req.body.email.includes('.') === false) {
        //     res.json(emailNotEmailRegisterError);
        // } else if (req.body.displayName === '') {
        //     res.json(displayNameBlankRegisterError);
        // } else if (req.body.password.length < 8) {
        //     res.json(passwordRegisterError);
        // } else if (emailAlreadyRegistered) {
        //     res.json(emailAlreadyRegisteredError);
        // } else if (displayNameAlreadyRegistered) {
        //     res.json(displayNameAlreadyRegisteredError);
        // } else {
        //     UserModel.create(user)
        //     res.json(user);
        // }

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
        const notUserFound = ({ error: { msg: "User doesn't exist."} });
        const invalidPassword = ({ error: { msg: "Invalid password."} });

        const user = await UserModel.findOne({ email });
        if (!user) return res.json(notUserFound);

        (user.password === password) ? res.json(user) : res.json(invalidPassword);
    }

    // const postUser = async (req, res) => {
    //     const { displayName, email, password } = req.body;
    //     const uid = Math.random().toString(36).slice(2);
    //     const emailAlreadyRegisteredError = ({ error: [{ msg: 'Email already exist.'}] })
    //     try {
    //         const emailAlreadyRegistered = await UserModel.exists({ email });
    //         if (emailAlreadyRegistered) return res.status(409).json(emailAlreadyRegisteredError);
    //         const displayNameAlreadyRegistered = await UserModel.exists({ displayName });
    //         if (displayNameAlreadyRegistered) return res.status(409).json({ error: [{ msg: 'User name already exist.'}] });
            
    //         const user = new UserModel({displayName, email, password, uid});
    //         await UserModel.create(user);
    //     } catch (error) {
    //         res.status(500).json({ error: [{msg: 'REGISTER_USER_ERROR'}]});
    //     }
    //     return true;

    // }
    // const uid = Math.random().toString(36).slice(2);
    // console.log(body);
    // const user = { displayName: displayName, email: email, password: password, uid: uid };
    // UserModel.findOneAndUpdate({displayName}, body, { upsert: true, useFindAndModify: false }, (
    //     errorFindUser, userModified
    //     ) => (
    //         (errorFindUser) ? res.send(errorFindUser) : res.json(userModified)));

    return {
        getUser,
        putUser,
        postUser,
        loginPostUser
    };
};

module.exports = userController;
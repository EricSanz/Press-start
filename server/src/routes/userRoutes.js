const { Router } = require('express');
const userController = require('../controllers/userController');

function userRoute(User) {
    const userRouter = Router();
    const user = userController(User);

    userRouter.route('/register')
        .get(user.getUser)
        .put(user.putUser)
        .post(user.postUser);

    userRouter.route('/login')
        .post(user.loginPostUser);

    return userRouter;
};

module.exports = userRoute;
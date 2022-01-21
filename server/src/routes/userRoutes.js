const { Router } = require('express');
const userController = require('../controllers/userController');

function userRoute(User) {
    const userRouter = Router();
    const user = userController(User);

    userRouter.route('/register')
        .get(user.getUser)
        .put(user.putUser)
        .post(user.postUser)

    userRouter.route('/login')
        .post(user.loginPostUser)

    userRouter.route('/favorites')
        .post(user.addFavorite)

    userRouter.route('/:userId')
        .get(user.getUnicUser)
        .post(user.changeProfilePic)
        .patch(user.updateUserInfo)
        .put(user.updatePassword)

    return userRouter;
};

module.exports = userRoute;
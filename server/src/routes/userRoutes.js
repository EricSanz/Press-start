const { Router } = require('express');
const userController = require('../controllers/userController');

function userRoute(User) {
    const userRouter = Router();
    const user = userController(User);

    userRouter.route('')
        .get(user.getUser)
        .put(user.putUser);
    
    return userRouter;
};

module.exports = userRoute;
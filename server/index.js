const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const debug = require('debug')('app');
const { connect } = require('mongoose');
const cors = require('cors');

const VideogameModel = require('./src/models/videogameModel');
const videogameRouter = require('./src/routes/videogameRoutes')(VideogameModel);

const app = express();
const port = process.env.PORT || 5000;

connect('mongodb+srv://Eric:one_DataBase_10@ericcluster.lqwr5.mongodb.net/pressStartDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

app.use(cors());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '10mb', extended: true }));

app.use('/pressStartDb/videogames', videogameRouter);

app.listen(port, () => {
    debug(`Press Start is running in ${chalk.bgGreen.bold(`http://localhost:${port}`)}`);
});

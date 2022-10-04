
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./appConfig.json');

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// add methods
app.use(require('./controllers'));

// serve static files
app.use(express.static('public'));

app.use((req, res, next) => {
    console.warn('not found', req.url);
    res.status(404).send('Resource not found');
});

app.listen(config.port, () => console.log(`service started on ${config.port}`));

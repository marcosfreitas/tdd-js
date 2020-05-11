const routes = require('express').Router();

const SessionController = require('./app/controllers/SessionController')

const authMiddleware = require('./app/middleware/auth');

routes.post('/sessions', SessionController.store);


/** not applicable to upside routes */
routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
});

module.exports = routes;
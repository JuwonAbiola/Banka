import { Router } from 'express';
import routes from '../routes/index';

const api = Router();

api.get('/', (req, res) => res.send({
    ok: true,
    message: 'Welcome to Andela',
    status: 'API version 1',
}));

api.use('/', routes);
api.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

api.use((req, res) => res.status(404).send({
    message: 'Sorry that route/method doesnt exist',
}));

export default api;
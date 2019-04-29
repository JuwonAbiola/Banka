import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swagger from 'swagger-ui-express';
import version from './version/v1';
import swaggerDocument from '../swagger';

const app = express();

const port = process.env.PORT || 5000;
console.log(port);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use('/api/v1', version);
app.get('/', (req, res) => res.send({ message: 'Welcome to BANKa' }).status(200));
app.listen(port);

export default app;

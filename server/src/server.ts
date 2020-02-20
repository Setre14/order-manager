import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import { Config } from './config/config';

Config.print();

// Create a new express application instance
const app = express();

// Call midlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

//Set all routes from routes folder
app.use('/', routes);

const PORT = process.env.OM_SERVER_PORT ? process.env.OM_SERVER_PORT : 3001;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});

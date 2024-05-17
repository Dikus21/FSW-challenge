import express from 'express';
import cors from 'cors';
import carsRoute from './src/routes/CarsRoute.js';
import morgan from 'morgan';
import expressLayout from 'express-ejs-layouts';
import methodOverride from 'method-override';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const PORT = 8080;
const app = express();
//use ejs
app.set('view engine', 'ejs');
app.set('views', path.join(dirname(fileURLToPath(import.meta.url)), './src/views'));
app.use(expressLayout);

// third party middleware
app.use(morgan('dev'));



app.use(cors());
app.use(express.json());
app.use(express.static('./public/asset'));
app.use(express.urlencoded());
app.use(methodOverride('_method'));
app.use(carsRoute);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
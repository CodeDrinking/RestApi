import express from "express";
import mongoose from "mongoose";
// import { DB_URL } from "./config";
import errorHandler from "./middleware/errorHandler"

import routes from "./routes"
import db from "./config/mongoose";
import path from "path"

const port = 8000;

//database connection
// mongoose.connect('mongodb://localhost/RestApi');
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//     console.log('DB connected...');
// });


const app = express();


global.appRoot= path.resolve(__dirname)

app.use(express.urlencoded({extended:false})) // coz our json response having files
app.use(express.json());
app.use('/api' , routes);
app.use('/uploads' , express.static('uploads'))


app.use(errorHandler)
app.listen( port ,  () => console.log(`app is runnning on port ${port}`))
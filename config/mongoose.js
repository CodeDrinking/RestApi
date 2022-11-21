
const  mongoose = require('mongoose');
mongoose.connect('mongodb+srv://roshan_123:Roshan1102@cluster0.ugpv4zv.mongodb.net/test');



//database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});

module.exports=db;
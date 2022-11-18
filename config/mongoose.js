
const  mongoose = require('mongoose');
mongoose.connect('mongodb+srv://roshan123:Roshan123@cluster0.im4h1ke.mongodb.net/testRestApi');



//database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});

module.exports=db;
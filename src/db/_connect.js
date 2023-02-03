const mongoose = require('mongoose');

function _connect() {
    const MONGO_HOST = "localhost";
    const MONGO_DB = "restaurant_db";

    //const URI = 'mongodb://'+process.env.MONGO_HOST+ '/'+ process.env.MONGO_DB;
    const URI = 'mongodb://root:root@localhost/restaurant_db';

    mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true, authSource: 'admin'} )
    .then(
        () => {
            console.log("connection db ready to use");
        },
        (err) => {
            console.log("error en conexion * ", err);
        },
    )
}
module.exports = _connect;
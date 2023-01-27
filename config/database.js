const mongoose = require('mongoose');
const { databaseURL } = require('./config');

const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 50000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 450000, // Close sockets after 45 seconds of inactivity
    family: 4,// Use IPv4, skip trying IPv6
    useNewUrlParser: true/*  */
};

mongoose.connect(`${databaseURL}`, options).then().catch(err => console.log(err.reason));

mongoose.Promise = global.Promise;

mongoose.connection.once('open', function () {
    console.log('MongoDB connection opened!');
});

mongoose.connection.on('connected', () => {
    console.log('✔ Database is now connected');
});

// On error in database connection
mongoose.connection.on('error', (error) => {
    console.log('✘ MONGODB ERROR: ', error);
});

mongoose.connection.on('disconnecting', () => {
    console.log('Database is now disconnecting!');
});
mongoose.connection.on('disconnected', () => {
    console.log('Database is now disconnecting!');
    mongoose.connect(`${databaseURL}`, options);
});
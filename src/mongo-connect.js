import mongoose from 'mongoose';

const mongodbUrl = process.env.MONGODB_URI + process.env.MONGODB_NAME;
const mongodbConnectionTimeout = process.env.MONGODB_CONNECTION_TIMEOUT || 30000;
const mongodbReplicaSet = process.env.MONGODB_REPLICA_SET;

if (!mongodbUrl) {
    throw new Error('Brô, como que eu vou me conectar sem a variável de ambiente MONGODB_URI. Cria o .env ou exporta no seu ambiente.');
}

mongoose.Promise = global.Promise;

const options = {
    server: {
        auto_reconnect: true,
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: mongodbConnectionTimeout
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: mongodbConnectionTimeout
        }
    }
};

if (mongodbReplicaSet) {
    options.replset.rs_name = mongodbReplicaSet;
}

console.log('Conectando no servidor ' + mongodbUrl);
mongoose.connect(mongodbUrl, options);

const db = mongoose.connection;

db.on('error', err => {
    console.log(err);
    console.log(err.stack);
    throw err;
});

db.on('connected', () => {
    console.log('Conectado ao servidor ' + mongodbUrl + ' com sucesso!');
});

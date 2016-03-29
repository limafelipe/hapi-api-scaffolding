import Hapi from 'hapi';
import hapiAuthJWT from 'hapi-auth-jwt';
import { AuthenticationClient } from 'auth0';
import { APP_PORT, V1_ROUTE_PREFIX } from './constantes';
import swagger from './swagger';
import good from './good';
import bunyan from './bunyan';
import rotas from './v1/rotas';
import './mongo-connect';

const erroNoRegistroDePlugin = err => console.error('Houve um erro ao carregar o plugin: ', err);

const auth0 = new AuthenticationClient({
    domain: process.env.AUTH0_DOMAIN
});

const server = new Hapi.Server();

server.app.rootUrl = process.env.APPLICATION_BASE_URL;

server.connection({
    port: APP_PORT,
    router: {
        stripTrailingSlash: true
    },
    routes: {
        cors: {
            credentials: true
        }
    }
});

server.realm.modifiers.route.prefix = V1_ROUTE_PREFIX;

let registers = [hapiAuthJWT, swagger];
if (process.env.NODE_ENV !== 'test') {
    registers.push(good);
    registers.push(bunyan);
}

server.register(registers)
    .then(() => {
        server.auth.strategy('token', 'jwt', 'optional', {
            key: new Buffer(process.env.AUTH0_PRIVATE_KEY, 'base64')
        });

        rotas(server);

        return server.start();
    })
    .then(() => console.log('Servidor rodando no endereço:', server.info.uri))
    .catch(err => {
        throw err
    });

export default server;

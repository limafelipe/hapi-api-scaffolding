import helloWorldHandler from './hello-world-handler';

function register(server) {
    server.route({
        path: '/',
        method: 'GET',
        handler: helloWorldHandler,
        config: {
            auth: false
        }
    });

}

export default register;

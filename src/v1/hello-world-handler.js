import errorHandler from '../default-error-handler';

function helloWorld() {
    return Promise.resolve('Hello World');
}

export default function(request, reply) {
    helloWorld()
        .then(reply)
        .catch(errorHandler(request, reply));
};

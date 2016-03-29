import HapiSwagger from 'hapi-swaggered';
import { version } from '../package';

const swaggerOptions = {
    info: {
        'title': 'Documentação da API',
        'version': version,
    }
};

export default {
    register: HapiSwagger,
    options: swaggerOptions
};

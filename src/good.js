import good from 'good';
import goodConsole from 'good-console';

const goodOptions = {
    opsInterval: 1000,
    reporters: [{
        reporter: goodConsole,
        events: {
            log: '*',
            response: '*'
        }
    }]
};

export default {
    register: good,
    options: goodOptions
};

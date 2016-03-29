import Boom from 'boom';

export default (req, reply) => {
    return err => {
        let wrappedError = Boom.wrap(err);
        if (process.env.NODE_ENV !== 'test') {
          req.log.error(wrappedError);
        }
        reply(wrappedError);
    };
};

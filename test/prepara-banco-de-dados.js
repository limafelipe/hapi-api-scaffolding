import { MongoClient } from 'mongodb';
import { dados } from './dados-para-teste';

const mongodbUrl = process.env.MONGODB_URI + 'hapi_test';

export default (popularBanco = true) => {
    let db = null;

    before(() => {
        return MongoClient.connect(mongodbUrl)
            .then(db1 => {
                db = db1;
            });
    });

    beforeEach(() => {
        let acoes = [
            db.collection('COLEÇÃO').remove({})
        ];

        if (popularBanco === true) {
            acoes.push(db.collection('COLEÇÃO').insert(dados));
        }

        return Promise.all(acoes);
    });

    afterEach(() => {
        return Promise.all([
            db.collection('COLEÇÃO').remove({})
        ]);
    });

    after(() => {
        return db.close();
    });
}

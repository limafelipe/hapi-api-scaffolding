import { expect } from 'chai';
import server from '../src/app';
import { V1_ROUTE_PREFIX } from '../src/constantes';

describe('Dummy', function() {
    it('Deve passar caso o projeto esteja configurado corretamente', function() {
        expect(true).to.be.equal(true);
    });
});

describe('Servidor', () => {
    it('Deve retornar o manifesto do swagger', () => {
        let options = {
            method: 'GET',
            url: V1_ROUTE_PREFIX + '/swagger'
        };

        return server.inject(options)
            .then(response => {
                expect(response.statusCode).to.be.equal(200);
            });
    });
});

const { server } = require('../src/server')
const nock = require('nock')

describe('Routes /hello', () => {
    it('should return hello world', async () => {
        const { payload } = await server.inject({
            method: 'GET',
            url: '/hello'
        })
    
        expect(payload).toBe('{"message":"Isso funciona"}')
    });
    
    it('should return cep', async () => {
        const payloadViaCEP = {
            cep: '14407-598',
            logradouro: 'Rua Horácio Otávio Gonçalves',
            complemento: '',
            bairro: 'Jardim Luiza',
            localidade: 'Franca',
            uf: 'SP',
            unidade: '',
            ibge: '3516200',
            gia: '3104'
        };
    
        nock(`https://viacep.com.br`)
            .get('/ws/14407598/json/')
            .reply(200, JSON.stringify(payloadViaCEP));
    
        const { payload } = await server.inject({
            method: 'GET',
            url: '/cep/14407598'
        });
    
        expect(JSON.parse(payload)).toEqual(payloadViaCEP)
    })
})

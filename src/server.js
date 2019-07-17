'use strict';

const Hapi = require('hapi');
const Axios = require('axios');

// Create a server with a host and port
const server = Hapi.server({
    host: 'localhost',
    port: 8001
});

// Add the route
server.route({
    method: 'GET',
    path: '/hello',
    handler: (request, h) => {
        return h.response({
            message: 'Isso funciona'
        });
    }
});

server.route({
    method: 'GET',
    path: '/cep/{cep}',
    handler: async (request, h) => {
        try {
            const response = await Axios.get(`https://viacep.com.br/ws/${request.params.cep}/json/`);

            return h.response(response.data);
        } catch (error) {
            console.log('error => ', error);
        }
    }
})

// Start the server
const start = async function () {

    try {
        await server.start();
        // console.log('Server running at:', server.info.uri);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();

module.exports = {
    server
}

exports.options = {
    routePrefix: '/documentation',
    exposeRoute: true,
    swagger: {
        info: {
            title: 'Boba Bunch API',
            description: 'Boba Bunch REST API build with Node.js, MongoDB, and Fastify',
            version: '1.0.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        host: 'localhost',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
    }
}
  
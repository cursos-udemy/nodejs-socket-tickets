const { io } = require('../server');
const TicketControl = require('../classes/TicketControl');

const tc = new TicketControl();
tc.reinitialize();

io.on('connection', (client) => {


    client.emit('established-connection', {
        user: 'Administrador',
        connection: 'ok',
        timestamp: new Date().getTime(),
        message: 'Aplicacion lista para usar!!'
    });

    client.on('disconnect', () => {
        console.log('El usuario se desconecto');
    });

    client.on('login', (data, callback) => {
        if (data.username) {
            console.log(`El usuario ${data.username} ingreso a la aplicacion`);
            // callback(`Bienvenido ${data.username}`);
        } else {
            // callback(`Por favor ingrese sus credenciales`);
        }
    });

    client.on('publish', function (data) {
        console.log(`${data.username}: ${data.message}`);
        //io.emit('published', data);
        client.broadcast.emit('published', data)
    });

});

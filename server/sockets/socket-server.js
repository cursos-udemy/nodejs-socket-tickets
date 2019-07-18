const { io } = require('../server');
const TicketControl = require('../classes/TicketControl');

const tc = new TicketControl();
tc.start();

io.on('connection', (client) => {

    console.log('nuevo cliente conectado');

    client.on('disconnect', () => {
        console.log('El usuario se desconecto!!');
    });

    client.on('next-ticket', (request, callback) => {
        const ticket = tc.nextTicket(request);
        callback(ticket);
    });

    client.on('publish', function (data) {
        console.log(`${data.username}: ${data.message}`);
        client.broadcast.emit('published', data)
    });

    const status = tc.getStatus();
    client.emit('status', { ...status });

});

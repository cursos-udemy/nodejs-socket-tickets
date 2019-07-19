const { io } = require('../server');
const TicketControl = require('../classes/TicketControl');

const tc = new TicketControl();
//tc.reinitialize();
tc.start();

io.on('connection', (client) => {

    console.log('nuevo cliente conectado');

    client.on('disconnect', () => {
        console.log('El usuario se desconecto!!');
    });

    client.on('create-ticket', (request, callback) => {
        const ticket = tc.createTicket(request);
        callback(ticket);
    });

    client.on('attend-ticket', (request, callback) => {
        if (!request.box) {
            callback('debe especificar el box' );
        }
        const ticketAssigned = tc.attendTicket(request);
        client.broadcast.emit('refresh-state', tc.getStatus());
        callback(null, ticketAssigned);
    });

    client.emit('initial-state', {...tc.getStatus()});

});

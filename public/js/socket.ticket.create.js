const client = io();
const label = $('#lblNuevoTicket');


client.on('connect', function () {
    console.log('Conectado al servidor');
});

client.on('disconnect', function () {
    console.log('Desconectado del servidor');
});

client.on('initial-state', function (status) {
    label.text(`Ticket: ${status.ticketID}`);
})

client.on('refresh-state', function (status) {
    label.text(`Ticket: ${status.ticketID}`);
})

$('#new-ticket').on('click', function () {
    client.emit('create-ticket', { user: 'gwfernandez' }, function (ticket) {
        label.text(`Ticket: ${ticket.ticketID}`);
    });
});

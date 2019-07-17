const client = io();
const label = $('#lblNuevoTicket');


client.on('connect', function () {
    console.log('Conectado al servidor');
});

client.on('disconnect', function () {
    console.log('Desconectado del servidor');
});


$('#new-ticket').on('click', function () {
    console.log('click nuevo ticket');
    client.emit('next-ticket', {user: 'gwfernandez', box: 1} , function (ticket) {
        console.log('ticket: ', ticket);
        label.text(`Ticket: ${ticket.ticketID}`);
    });
});

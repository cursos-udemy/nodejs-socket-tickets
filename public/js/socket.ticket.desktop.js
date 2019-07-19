const socketDesktop = io();

const PARAM_BOX = 'escritorio';
const PARAM_USER = 'username';

const params = new URLSearchParams(location.search)
if (!params.has(PARAM_BOX)) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}
if (!params.has(PARAM_USER)) {
    window.location = 'index.html';
    throw new Error('El usuario es necesario');
}

const box = params.get(PARAM_BOX);
const username = params.get(PARAM_USER);
$('#lblBox').text(`Escritorio: ${box}`);
$('#lblUsername').text(`Usuario: ${username}`);

const labelTicket = $('#lblTicket');
$('#btnAttendTicket').on('click', function () {
    const request = {username, box}
    socketDesktop.emit('attend-ticket', request, function (err, ticketAssigned) {
        if (err) return alert('Error: ' + err);
        labelTicket.text(ticketAssigned.ticketID);
    });
});
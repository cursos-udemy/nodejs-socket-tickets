const socket = io();

socket.on('connect', function () {
    console.log('conectandose con el servidor via socket ...');
});

socket.on('established-connection', function (data) {
    console.log('CLIENT->established-connection: ', data);
});

socket.on('disconnect', function () {
    console.log('perdimos conexion con el servidor');
});

socket.emit('login', {
    username: 'gwfernandez',
}, function (data) {
    console.log('callback-login: ', data);
});


socket.on('published', function (data) {
    console.log(`${data.username}: ${data.message}`);
});



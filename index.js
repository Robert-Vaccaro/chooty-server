const fastify = require('fastify')({
    logger: true
});

const socketio = require('socket.io');
const swagger = require('./config/swagger');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const lessonRoutes = require('./routes/lessonRouter');

const app = require('fastify')();
const io = socketio(app.server);

fastify.register(require('fastify-swagger'), swagger.options);
lessonRoutes.forEach((route, index) => {
    fastify.route(route);
}); 

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    
    if (error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'Admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

const start = async () => {
    try {
        await fastify.listen(process.env.PORT || 5000);
        fastify.swagger();
        fastify.log.info(`Server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
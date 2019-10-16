"use strict";
module.exports = function (server) {
    // Fix for SMAR-25733 based on https://github.com/socketio/socket.io/issues/3259#issuecomment-448058937
    // Will revert back this change, when socket-io library fixes this issue natively
    var socketio = require('socket.io')(server, {
        pingTimeout: 60000
    });
    /**
     * Redis
     *
     * @type {adapter}
     */
    var redis = require('socket.io-redis');
    socketio.adapter(redis({ host: '127.0.0.1', port: '6379' }));
    /**
     * connection
     */
    socketio.on('connection', function (connection) {
        console.log('a user connected: ' + connection.id);
    });
    /**
     * onConnect
     *
     * @param socket
     */
    function onConnect(socket) {
        //logger.info("WebSocket connected");
        /**
         * Query
         */
        var query = socket.handshake.query;
        var hoge = query.hoge;
        socket.on('subscribe', function (room) {
            socket.join(room);
        });
        /**
         * disconnect
         */
        socket.on('disconnect', onDisconnect);
        socket.on('unsubscribe', function (data) {
            socket.leave(data.room);
        });
        /**
         * Event Received
         */
        socket.on('MessageeRedis', onMessage);
    }
    /**
     * onDisconnect
     *
     */
    function onDisconnect() { }
    /**
     * onMessage
     *
     * @param data
     */
    function onMessage(data) {
        // Emit Message
        socketio.sockets.emit('MessageeRedis', data);
        console.log('receive:' + data);
    }
    return socketio;
};
//# sourceMappingURL=socket.util.js.map
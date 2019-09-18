
module.exports = (server: any) => {
    // Fix for SMAR-25733 based on https://github.com/socketio/socket.io/issues/3259#issuecomment-448058937
    // Will revert back this change, when socket-io library fixes this issue natively
    const socketio = require('socket.io')(server, {
        pingTimeout: 60000
    });

    /**
     * Redis
     *
     * @type {adapter}
     */
    const redis = require('socket.io-redis');
    socketio.adapter(redis({ host: '127.0.0.1', port: '6379'}));

    /**
     * connection
     */
    socketio.on('connection', onConnect);

    /**
     * onConnect
     *
     * @param socket
     */
    function onConnect(socket: any) {
        //logger.info("WebSocket connected");
        /**
         * Query
         */
        let query = socket.handshake.query;
        const hoge = query.hoge;
        socket.on('subscribe', function(room: any) { 
            socket.join(room); 
        })
        /**
         * disconnect
         */
        socket.on('disconnect', onDisconnect);
        socket.on('unsubscribe', function(data: any) { 
            socket.leave(data.room); 
        })
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
    function onMessage(data: any) {
        // Emit Message
        socketio.sockets.emit('MessageeRedis', data);
        console.log('receive:' + data);
    }

    return socketio;
};
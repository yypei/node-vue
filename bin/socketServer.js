function socketServer(http){
    var io=require('socket.io')(http);
    io.path('/chat');
    // io.set('origins', '*:*');
    // io.origins([ 'http://127.0.0.1:8080' ]);
    io.on('connection',function(socket){
        socket.on('test',function(data){
            console.log(data);
            socket.emit('test','nihao');
        });
        socket.on('disconnect',function(data){
            console.log('连接结束');
        });
        socket.emit('test','nihao');
    });
}
module.exports=socketServer;

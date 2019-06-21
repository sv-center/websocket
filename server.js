const WebSocketServer = new require('ws');
const clients = {};
const server = new WebSocketServer.Server({port: 8081});

server.on('connection', function(ws){
    var id = Math.random();
    clients[id] = ws;
    sender({
        code: 0,
        msg: " входит в чат",
    });

    ws.on('message', function (data) {
        sender(JSON.parse(data));
    });

    ws.on('close', function(){
        sender({
            code: 0,
            msg: " выходит из чата"
        });
        delete clients[id];
    });

    function sender(data){
        data.msg = id + ": " + data.msg;
        data = JSON.stringify(data);
        for (var key in clients) {
            clients[key].send(data);
        }
    }
});
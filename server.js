import express from 'express';
import {join,dirname} from 'path';
import http from 'http';
import {Server} from 'socket.io';
import ejs from 'ejs';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(join(dirname('.'), 'public')));
app.set('views',join(dirname('.').toString(), 'public'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use('/',(req,res)=>{
    res.render('index.html');
});

let messageList = Array();

io.on('connection', socket =>{
    console.log(`Socket conectado: ${socket.id}`);

    socket.emit('previousMessages', messageList.slice(-3));

    socket.on('sendMessage', data =>{
        messageList.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });
})
server.listen(3000);
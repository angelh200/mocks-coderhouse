// Variables de entorno
require('dotenv').config();

const express =require('express');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


// Motor de Plantillas
const hbs = require('express-handlebars');

// Importando los Models
const Productos = require('./model/Productos');
const Mensajes = require('./model/Mensajes');

const PORT = 3000;

//Conexion a la base de datos de mongoose
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DATABASE);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Directorio publico
app.use(express.static('public'));

// Configura el motor de plantillas
app.engine('hbs',
    hbs.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts/',
        partialsDir: __dirname + '/views/partials'
    })
);

//Rutas
const webRouter = require('./routes/index');
const testRouter = require('./routes/test');
app.use('/', webRouter);
app.use('/', testRouter);

// Establece el directorio y el motor
app.set('view engine', 'hbs');
app.set('views', './views');

const { normalize } = require('normalizr');
const msgSchema = require('./msgSchema');
// Conexiones websocket
io.on('connection', socket => {
    console.log('Usuario Conectado');

    // Obtiene los productos y los envia
    Productos.getAll().then((items) => {
        // Envia los items al frontend
        socket.emit('items', items);
    });

    Mensajes.getAll().then((msgs) => {
        console.log(msgs);
        const normalizedMsgs = normalize(msgs, msgSchema);
        console.log(JSON.stringify(normalizedMsgs, null, 2));
        // Envia los mensajes del servidor
        socket.emit('msgs', msgs);
    });


    // Recibe un nuevo item y lo guarda
    socket.on('new-item', async data => {
        await Productos.save(data);
        const items = await Productos.getAll();
        io.sockets.emit('items', items);
    });

    // Recibe un nuevo mesaje y lo guarda
    socket.on('new-msg', async data => {
        await Mensajes.save(data);
        const msgs = await Mensajes.getAll();
        io.sockets.emit('msgs', msgs);
    });
})

httpServer.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});
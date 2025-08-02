import express from 'express';
import userRoutes from './routes/user.js';
import session from 'express-session';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { Socket } from 'dgram';

const app = express(); 
const httpServer = createServer(app);
const io = new Server(httpServer);

//session set up
app.use(session({
  secret:  'key',
  resave: false,
  saveUninitialized: false,
  store: false,
  cookie: {secure:false}
}));
//Set up EJS
app.set('view engine', 'ejs'); 
//Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));
app.use((req, res, next) => {//user for all template
  res.locals.user = req.session.user || null;
  next();
});
//Routes
app.use('/users', userRoutes); 

app.get('/', (req, res) =>{
    res.render('index')
});

//Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


io.on('connection', socket => {
  socket.on('user-message', message => {
  socket.broadcast.emit('new-message', message);
  });
});
//Start server
httpServer.listen(3000, () => {
  console.log('Server running on port 3000');
});
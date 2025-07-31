import express from 'express';
import userRoutes from './routes/user.js';
import session from 'express-session';

const app = express(); 

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

//Start server
app.listen(3000, () => {console.log("server is running in port 3000")});

import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js';

const app = express(); 

//Set up EJS
app.set('view engine', 'ejs'); 
//Middleware
app.use(logger);
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));

//Routes
app.use('/users', userRoutes); 

//Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

//Logger middleware
function logger(req, res, next){
    console.log(req.originalUrl);
    next(); 
} 

//Start server
app.listen(3000, () => {console.log("server is running in port 3000")});

import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js';

const app = express(); 

//Set up EJS
app.set('view engine', 'ejs'); 
//Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));

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

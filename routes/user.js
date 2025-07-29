import express from 'express';  //import express
import { createUser, getUser, getUsersList} from '../database.js';

const router = express.Router();

//Route to view all user
router.get('/', async (req, res) => {
    const list = await getUsersList();
    res.send(list);
    console.log("User List")
});

//Route to render new user form
router.get('/new', (req, res) => {
    res.render("users/new");
});
//route to create new user form
router.post('/', (req, res) => {
    const isValid = true;
    if(isValid){
        users.push({name: req.body.name});
        res.redirect(`/users/${users.length - 1}`);                 // Redirect to the user list after adding a new user
    }else{
        console.log('Error in user creation');
        res.render('users/new', {name: req.body.name});             // Render the new user form with the entered name
    }

});

//Route to handle dynamic user IDs
router
    .route("/:Userid")                                              // Handle GET, POST, and DELETE requests for a specific user ID
    .get((req, res) => {    
    res.send(`Get user id is ${req.params.Userid}`);                // Respond with the user ID
    console.log(req.user);                                          // Log the user ID to the console
    })
    .put((req, res) => {
        const id = req.params.Userid;
        res.send(`update user id ${req.params.Userid}`);
    })
    .delete((req, res) => {
        const id = req.params.Userid;
        res.send(`User id deleted ${req.user}`);
    });                                     

const users = [
    {name: 'John Doe' },
    {name: 'Jane Doe' }
];  
//Middleware for userId param
router.param("Userid", (req, res, next, id) => {
    req.user = users[id];
    next();
});                                             

export default router;                       //export the router
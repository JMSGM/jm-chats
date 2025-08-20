import express from 'express';  //import express
import bcrypt from 'bcrypt';
import { createUser, getUsersList, getAccount} from '../database.js';

const router = express.Router();

//Route to view all user
router.get('/', async (req, res) => {
    const list = await getUsersList();
    res.send(list);
    console.log("User List")
});

//Route to render new user form
router.get('/createAccount', (req, res) => {
    res.render("users/createAccount");
});
router.get('/loginAccount', (req, res) => {
    res.render("users/loginAccount");
});
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err){
            return res.status(500).send("error logging out")
        } 
        res.redirect('/');
        console.log("successfully logged out")
    });
});

//route to create new user form
router.post('/createAccount', async(req, res) => {
    
    const {username, password} = req.body;
    const hashPass = await bcrypt.hash(password, 13);
    
    if (!username || !password) {
        return res.render('users/createAccount',
             {error: 'All fields must be filled', name: username, pass: password });
    }

    try {
        const newAccount = await createUser(username, hashPass);
        res.status(201).redirect('/');
        console.log("acccount created!")
    } catch (err) {
        console.error(err);
        res.status(500).send("Error with creating user");
    }
});

//Route to user login form
router.post('/loginAccount', async(req, res) => {
    
    const {username, password} = req.body;
   
    
    //case 1: All fields are empty 
    if (!username || !password) {
        return res.render('users/loginAccount',
             {error: 'All fields must be filled', name: username, pass: password });
    }

    //case 2: check if account is valid:
    const account = await getAccount(username)
    if(!account){
        return res.render('users/loginAccount',
             {error: 'Invalid username or password', name: username});
    }
   
    //case 3: check if password is valid   
    const textPass = password;
    const hashPass = account.user_password   
    const isValidPass = await bcrypt.compare(textPass, hashPass)
    if (!isValidPass) {
        return res.render('users/loginAccount',
             {error: 'Invalid username or password', name: username });
    }
    
    
    req.session.user = {username: account.username, id: account.user_id};
    console.log("user logged in: ", req.session.user);
    res.redirect('/'); //succesfull login
});




//Route to handle dynamic user IDs
router
    .route("/:userID")                                              // Handle GET, POST, and DELETE requests for a specific user ID
    .get((req, res) => {    
    res.send(`Get user id is ${req.params.userID}`);                // Respond with the user ID
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


                                             

export default router;
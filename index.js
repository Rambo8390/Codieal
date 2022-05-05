const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 8181;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')
//used for session-cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal  = require('./config/passport-local');

const passportJWT  = require('./config/passport-jwt');

const passportGoogle = require('./config/passport-google-oauth2');

const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');
const customMware = require('./config/middleware');

// for chatengine
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_socket').chatSockets(chatServer);
const port1 = process.env.PORT || 5020; 
chatServer.listen(5000);
console.log("Chat Server on port 5000"); 


app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}))

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname +"/uploads"));

app.use(expressLayouts);

app.set('layout extractStyles' , true);
app.set('layout extractScripts', true);


//to use views and embed html,css,js to controllers
app.set('view engine' ,'ejs');
app.set('views','./views');

//mongo store is used to store session cokie in the db
app.use(session({
    name : 'codieal',
    //Todo change the secrate before deployment in production mode
    secret: 'blawsomthing',
    saveUninitialized:false,
    resave:false,
    cookie :{
        maxAge : (1000 * 60 * 100),
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());   
app.use(customMware.setFlash);
// use express router

app.use('/' , require('./routes')); // /module.exports = router


app.listen(port , function(err){
    if(err)
    {
        console.log(`Error in running server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});
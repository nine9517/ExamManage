const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const busboy = require('connect-busboy');
const back = require('express-back');
const middleWare = require('./middleware/auth');
const flash = require('flash-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('./configuration/app.json');

mongoose.Promise = global.Promise; 
mongoose.connect('mongodb://'+config.DB_HOST+':'+config.DB_PORT+'/'+config.DB_NAME, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

require('./helpers/general');
require('./helpers/server')(http);

app.use(morgan(config.LOG));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
app.set('view engine', config.VIEW_ENGINE);
app.use(express.static(path.join(__dirname, config.STATIC_DIR)));
app.use(require('./helpers/mongoAdmin'));
app.use(session({
    secret: 'super secret',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(flash());
app.use(back());
app.use(require('./helpers/ejsLocals'));


app.get('/',(req,res)=>{
    return res.redirect('/login');
});

app.use("/login", require("./routes/login"));
app.use("/manageuser",middleWare.login,busboy({immediate:true}), require('./routes/users'));
app.use("/exam",middleWare.login, require('./routes/exam'));
app.use("/building",middleWare.login, require('./routes/building'));
app.use("/room",middleWare.login, require('./routes/room'));
app.use("/subject",middleWare.login, require('./routes/subject'));
app.use("/table",middleWare.login, require('./routes/timetable'));
app.use("/login",middleWare.login, require('./routes/login'));
app.use("/staff",middleWare.login, require('./routes/staff'));
app.use("/term",middleWare.login, require('./routes/term'));
app.use("/course",middleWare.login, require('./routes/course'));
app.get("/config/ui/:hide",middleWare.login, require('./helpers/Config'));
app.get('/main',middleWare.login, require('./controllers/mainController'));


http.startServer(config.PORT);
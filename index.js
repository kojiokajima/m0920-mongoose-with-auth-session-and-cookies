const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
require('dotenv').config()

const adminRouters = require('./routes/admin');
const shopRouters = require('./routes/shop');

const errorController = require('./controllers/error');
const User = require('./models/User')

//--------------------Setups--------------------
const app = express();
app.use(express.urlencoded({extended:false}));

//app.set = allows us to set any values globally on our express application
app.set('view engine', 'ejs');
//views is set to default path of views but I am just implicitly showing
app.set('views','views');

//serve file statically
app.use(express.static(path.join(__dirname, 'public')))

// Dummy Auth
app.use((req,res,next) => {
    User.findById('609e0e2f646b8417cf3a77e8').then(user => {
        req.user = user
        next()
    }).catch(err => console.log(err))

})

//--------------------Middleware--------------------
app.use('/admin',adminRouters);
app.use(shopRouters);

// catch all middleware
app.use(errorController.get404);
//----------------End of Middleware-----------------

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connected to Database")

    //not necessary for production. Just a dummy auth for id
    User.findOne().then(user => {
        if(!user){
            const user = new User({
                username: 'Sushi',
                email: 'maki@zushi.com'
            })
            user.save()
        }
    })

    app.listen(5000, () => console.log('Server connected to port 5000'));
}).catch(err => console.log(err))
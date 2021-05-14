const User = require('../models/User')

exports.getLogin = (req,res,next) => {
    
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuth: req.isLoggedIn
    })
}

exports.postLogin = (req,res,next) => {
    // req.isLoggedIn = true
    // res.setHeader('Set-Cookie', 'loggedIn=true')
    req.session.isLoggedIn = true
    res.redirect('/')
}

exports.postLogout = (req,res,next) => {
    req.session.destroy(err => {
        console.log(err)
        res.redirect('/')
    })
}

exports.getSignup = (req,res,next) => {
    res.render('auth/signup', {
        pageTitle: 'Sign Up',
        path: '/signup',
        isAuth: req.session.isLoggedIn
    })
}

exports.postSignup = (req,res,next) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    const user = new User({
        username,
        email,
        password,
        cart: { items: [] }
    })

    user.save()
    res.redirect('/login')
}
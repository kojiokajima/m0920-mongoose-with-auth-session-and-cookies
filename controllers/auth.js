const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const User = require('../models/User')

exports.getLogin = (req,res,next) => {
    
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuth: req.session.isLoggedIn,
        errorMessage: null,

    })
}

exports.postLogin = (req,res,next) => {
    // req.isLoggedIn = true
    // res.setHeader('Set-Cookie', 'loggedIn=true')

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(422).render('auth/login', {
        pageTitle: "Login",
        path: "/login",
        isAuth: req.session.isLoggedIn,
        errorMessage: errors.array()[0].msg
      })
    }

    const {email, password} = req.body

    User.findOne({ email: email }).then((user) => {
      // is user not found
      if(!user){
        return res.redirect('/login')
      }

      // if user is found
      bcrypt.compare(password, user.password).then((isMatching) => {
        if(isMatching){
          req.session.isLoggedIn = true
          req.session.user = user
          return req.session.save((err) => {
            // console.log(err)
            res.redirect('/')
          })
        } else {
          res.redirect('/login')
        }
      }).catch(err => console.log(err))

    }).catch(err => console.log(err))
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
        isAuth: req.session.isLoggedIn,
        errorMessage: null,
    })
}

exports.postSignup = (req,res,next) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    // const confirmPassword = req.body.confirmPassword

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(422).render('auth/signup', {
        pageTitle: "Sign Up",
        path: '/signup',
        errorMessage: errors.array()[0].msg,
        isAuth: req.session.isLoggedIn
      })
    }

    bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new User({
          username,
          email,
          password: hashedPassword,
          cart: { items: [] }
      })
      return user.save() 
    }).then(() => {
      res.redirect('/login')
    }).catch(err => console.log(err))

}
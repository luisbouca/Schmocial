var passport = require('passport') , FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');

passport.use(new FacebookStrategy({
    clientID: "222804808641694",
    clientSecret: "19cc983d1eea7eb9f6a705cce0761157",
    callbackURL: "http://localhost:3000/facebook/callback",
    profileFields: ['id', 'displayName','emails', 'name'] 
  },
  function(accessToken, refreshToken, profile, done) { 
   for(var key in profile._json){
       console.log("dsa: "+key)
   }
      console.dir("dasd"+profile.username)
    //check user table for anyone with a facebook ID of profile.id
    User.findOne({
        'facebook.id': profile.id 
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        //No user was found... so create a new user with values from Facebook (all the profile. stuff)
        if (!user) {
            var facebook = {
                id: profile.id,
        token: accessToken,
        email: profile.emails[0].value,
        name: profile._json.first_name
            }
            user = new User({
                  
                name: profile.displayName,
                email: profile.emails[0].value,
                username: profile.displayName,
                gender: profile.gender,
                provider: 'facebook',
                password: "123", 
                age:  "23", 
                address:{
                    country:"England",
                    city: "Porto" 
                },
                //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                facebook: facebook
            });
            user.save(function(err) {
                if (err) console.log(err);
                return done(err, user);
            });
        } else {
            //found user. Return
            return done(err, user);
        }
    });
}
));

module.exports = passport;
const jwt = require('jsonwebtoken');
const config = require('config');

exports.signToken = (user, callback) => {
  
    //Return jsonwebtoken. It requires a payload and the secret
    //create payload 
    const payload = {
      user: {
        id: user.id //the id created in MongoDB and returned by user.save()
      }
    };

    //Sign token with secret word
    jwt.sign(
      payload, 
      config.get('jwtSecret'),
      { expiresIn: 360000 }, //TODO: change to 3600 before deploying to prod (use env variable)
      (err, token) => { //callback
        if (err) callback(err);
        callback(null, token);
      }
    );
}
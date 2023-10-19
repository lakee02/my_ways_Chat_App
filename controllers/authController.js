const User = require('../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');


const registerUser = (req, res) => {
  const { username, email, password } = req.body;

  
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ error: 'Email already exists' });
    } else {
      const newUser = new User({ username, email, password });

      
      newUser
        .save()
        .then(() => res.json({ message: 'User registered successfully' }))
        .catch((err) => console.log(err));
    }
  });
};


const loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    user
      .comparePassword(password)
      .then((isMatch) => {
        if (isMatch) {
          
          const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
          };

          
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 }, // Token expires in 1 hour
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token,
              });
            }
          );
        } else {
          return res.status(400).json({ error: 'Password incorrect' });
        }
      })
      .catch((err) => console.log(err));
  });
};


module.exports = {
  registerUser,
  loginUser,
};

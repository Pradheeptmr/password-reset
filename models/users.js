var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//Define a schema
var UserSchema = new mongoose.Schema({
    username: { 
                type: String,
                required: true,
                unique: true 
              },
	  email: { 
              type: String,
              required: true,
              unique: true 
            },
	  password: { 
                type: String,
                required: true 
              },
	  resetPasswordToken: String,// used for after password reset is submitted
	  resetPasswordExpires: Date
});


UserSchema.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
     // Store hash in your password DB.
      bcrypt.hash(newUser.password, salt, (err, hash) => {
          console.log(newUser);
          newUser.password = hash;

          newUser.save(callback);
      });
  });
}

UserSchema.getUserByUsername = (username, callback) => {
  var query = {username: username};
  User.findOne(query, callback);
}

UserSchema.getUserById = (id, callback) => {
  User.findById(id, callback);
}

UserSchema.comparePassword = (candidatePassword, hash, callback) => {
  // Load hash from your password DB.
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
  });
}
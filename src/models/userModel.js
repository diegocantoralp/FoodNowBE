const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

// Antes de guardar, hashea la contraseña
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    passwordHashed= await bcrypt.hash(this.password, 12);
  }
  next();
});

// Método para verificar la contraseña
userSchema.methods.isValidPassword = async function(password) {
  const match = await bcrypt.compare(password, passwordHashed);
  console.log(`Password: ${password}, Hashed password: ${passwordHashed}, Match: ${match}`);
  return match;
};

const ModelUser = mongoose.model('users', userSchema);

module.exports = ModelUser;
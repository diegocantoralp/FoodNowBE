const mongoose = require("mongoose")
const bcrypt = require('bcrypt');

//Database scheme

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {type: String, required: true},
    password: {type: String, required: true},
    institution: {type: Boolean, required: true},
    favoriteMenus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'menus' }]
  },
  {
    timetamp: true,
    versionKey: false
});

clientSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password= await bcrypt.hash(this.password, 12);
  }
  next();
});

clientSchema.methods.isValidPassword = async function(password) {
  const match = await bcrypt.compare(password, this.password);
  console.log(`Password: ${password}, Hashed password: ${this.password}, Match: ${match}`);
  return match;
};

const ModelClient = mongoose.model("clients", clientSchema)

module.exports = ModelClient;


    
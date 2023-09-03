import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validta(val){
      if(!validator.isEmail(val)){
        throw new Error ('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(val){
      let pass= new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
      if(!pass.test(val)){
        throw new Error ("password must include uppercase,lowercase,number,speacial characters ")
      }
    }
  },
});

userSchema.pre ("save", async function(){
    const user = this
    if (user.isModified ('password'))
    user.password = await bcryptjs.hash (user.password, 8)
})

export default mongoose.model('User', userSchema);
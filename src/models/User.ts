import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type: String,
    required:true
  },
  favorites:{
    type:[String],
  },
},{
  timestamps:true
})

export default mongoose.model('User', UserSchema)

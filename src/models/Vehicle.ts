import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  brand:{
    type:String,
    required:true
  },
  price:{
    type: Number,
    required:true
  },
  color:{
    type:String,
    required:true
  },
  productionYear:{
    type:Number,
    required:true
  },
  plate:{
    type:String,
    required:true
  },
  description:{
    type:String,
  },
  userId:{
    type:String,
    required:true
  }
},{
  timestamps:true
})

export default mongoose.model('Vehicle', VehicleSchema)

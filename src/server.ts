import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import vehicleRoutes from './routes/vehicle.routes'
import userRoutes from './routes/user.routes'

dotenv.config()
const app = express()

// eslint-disable-next-line no-useless-catch
try{
  const url = process.env.MONGODB_CLUSTER as string
  mongoose.connect(url)
  console.log('Connected to mongoDB')
} catch(err){
  throw err
}

//middlewares
app.use(cors())
app.use(express.json())


//routes
app.use('/api/vehicle', vehicleRoutes)
app.use('/api/user',userRoutes)

//server
app.listen(process.env.PORT, ()=>{
  console.log('server running')
})

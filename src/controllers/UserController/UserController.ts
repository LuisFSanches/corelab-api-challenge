import {Request, Response} from 'express'
import bcrypt from "bcryptjs";
import { jwtGenerator } from "../../utils/jwtGenerator";
import User from '../../models/User';
import {IUser} from '../../types/user'

export const createUser = async(request:Request,response:Response)=>{
  const {name, email, password} = request.body
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)
  try{
      const user = new User({
        name,
        email,
        password:hashedPassword
      })
      const checkEmail = await User.findOne({email})
      if(checkEmail){
          return response.status(403).json('Email already in the system.')
      }
      const newUser = await user.save()
      return response.status(200).json(newUser)
  }catch(err){
      return response.status(400).json(err)
  }
}

export const userLogin = async(request:Request,response:Response)=>{
  const {email, password} = request.body

  try{
      const user = await User.findOne({email}) as IUser
      if(!user) return response.status(404).json("Invalid email or password")

      const checkPassword = await bcrypt.compare(password, user.password)
      if(!checkPassword) return response.status(403).json("Invalid email or password")

      const token = jwtGenerator(user._id)

      const userData = {
        id:user._id,
        name:user.name,
        email:user.email,
        token
      }

      return response.status(200).json(userData)


  } catch(err){
      response.status(400)
  }
}

export const selectFavoriteVehicle = async(request:Request,response:Response)=>{
  const userId = request.id
  const {vehicleId} = request.body

  const addFavorite = async ()=>{
    const updateFavorites = await User.updateOne(
      {_id:userId},
      {$push:{favorites:vehicleId}},
      {returnOriginal:false}
    )
    return response.status(200).json(updateFavorites)
  }

  const removeFavorite = async ()=>{
    const updateFavorites = await User.updateOne(
      {_id:userId},
      {$pull:{favorites:vehicleId}},
      {returnOriginal:false}
    )
    return response.status(200).json(updateFavorites)
  }

  try{
    const user = await User.findById(userId) as IUser
    const userFavorites = user.favorites.map((favorite)=>{
      return favorite
    })
    if(userFavorites.includes(vehicleId)){
      removeFavorite()
    }
    else{
      addFavorite()
    }

  } catch(err){
    return response.status(400).json(err)
  }

}

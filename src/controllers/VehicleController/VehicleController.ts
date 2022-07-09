import {Request, Response} from 'express'
import User from '../../models/User';
import Vehicle from '../../models/Vehicle'
import { IVehicle } from '../../types/vehicle';
import {IUser} from '../../types/user'


export const createVehicle = async(request:Request, response:Response)=>{
  const userId = request.id
  const {name, brand,price,color, productionYear, plate,description}= request.body as IVehicle
  try{
    const vehicle = new Vehicle({
      name,
      brand,
      price,
      color,
      productionYear,
      plate,
      description,
      userId
    })
    const newVehicle = await vehicle.save()
    return response.status(200).json(newVehicle)
  }
    catch(err){
      return response.status(403).json(err)
    }
}

export const updateVehicle = async(request:Request, response:Response)=>{
  const id = request.params.id
  try{
    const updateVehicle = await Vehicle.findByIdAndUpdate(id, {$set:request.body}, {new:true})
    return response.status(200).json(updateVehicle)
  }
  catch(err){
    return response.status(403).json(err)
  }
}

export const deleteVehicle = async(request:Request, response:Response)=>{
  const id = request.params.id
  try{
    await Vehicle.findByIdAndDelete(id)
    return response.status(200).json('Vehicle deleted')
  }
  catch(err){
    return response.status(403).json(err)
  }
}

export const listAllVehicles = async(request:Request, response:Response)=>{
  try{
    const vehicles = await Vehicle.find()
    return response.status(200).json(vehicles)
  } catch(err){
    return response.status(400).json(err)
  }
}

export const listSpecificVehicle = async(request:Request, response:Response)=>{
  const id = request.params.id
  try{
    const vehicle = await Vehicle.findById(id)
    return response.status(200).json(vehicle)
  }
  catch(err){
    return response.status(403).json(err)
  }

}

export const listUserVehicles = async(request:Request, response:Response)=>{
  const userId = request.id
  try{
      const vehicles = await Vehicle.find({userId})
      return response.status(200).json(vehicles)
  }
  catch(err){
      return response.status(403).json(err)
  }
}


export const listFavoriteVehicles = async(request:Request, response:Response)=>{
  const userId = request.id

  try{
    const vehicles = await Vehicle.find()
    const user = await User.findById(userId) as IUser
    const userFavorites = user.favorites.map((favorite)=>{
      return favorite
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const favoriteVehicles = vehicles.filter((vehicle:any)=>
      userFavorites.some(vehicleId=> vehicle._id.toString().includes(vehicleId))
    )

    return response.status(200).json(favoriteVehicles)
  } catch(err){
    return response.status(403).json(err)
  }

}

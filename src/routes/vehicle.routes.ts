import {Router} from 'express'
import {createVehicle, updateVehicle, deleteVehicle, listAllVehicles, listFavoriteVehicles, listSpecificVehicle, listUserVehicles} from '../controllers/VehicleController/VehicleController'
import { verifyToken } from '../middlewares/auth'

const router = Router()

//create vehicle
router.post('/',verifyToken,createVehicle)

//delete vehicle
router.delete('/:id',verifyToken, deleteVehicle)

//update vehicle
router.put('/:id',verifyToken, updateVehicle)

//list all vehicles
router.get('/', listAllVehicles)

//list user vehicles
router.get('/user', verifyToken, listUserVehicles)

//list favorite vehicles
router.get('/favorites',verifyToken, listFavoriteVehicles)

//list specific vehicle
router.get('/:id', listSpecificVehicle)



export default router

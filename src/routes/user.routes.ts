import { Router } from "express";
import { createUser, selectFavoriteVehicle, userLogin } from "../controllers/UserController/UserController";
import { verifyToken } from "../middlewares/auth";

const router = Router()

//create user
router.post('/',createUser)


//user login
router.post('/login',userLogin)

//update user favorites
router.patch('/favorite', verifyToken, selectFavoriteVehicle)
export default router

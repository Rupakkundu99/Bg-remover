import express from 'express'
import {clerkWebhooks, userCredits} from '../controllers/userController.js'
import authuser from '../middlewares/Auth.js'

const userRouter=express.Router()

userRouter.post('/webhooks',clerkWebhooks)
userRouter.get('/credits',authuser,userCredits)

export default userRouter;
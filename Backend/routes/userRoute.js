import express from 'express' 
import { loginUser, registerUser, resetPass, sendPassResetOtp } from '../controllers/userController.js'

const userRouter=express.Router()

userRouter.post('/login',loginUser)
userRouter.post('/register',registerUser)
userRouter.post('/send-pass-reset-otp',sendPassResetOtp)
userRouter.post('/reset-pass',resetPass)

export default userRouter
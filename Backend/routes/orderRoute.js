import express from 'express'
import { listOrders, placeOrder, updateOrderStatus, userOrders, verifyOrder } from '../controllers/orderController.js'
import authMiddleware from '../middlewares/auth.js'

const orderRouter=express.Router()

orderRouter.post('/place',authMiddleware,placeOrder)
orderRouter.post('/verify',verifyOrder)
orderRouter.post('/user-orders',authMiddleware,userOrders)
orderRouter.get('/list',listOrders)
orderRouter.post('/status',updateOrderStatus)

export default orderRouter
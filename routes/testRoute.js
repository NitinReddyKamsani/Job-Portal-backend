import express from 'express'
import { testPostController } from '../controllers/testController.js'
import userAuth from '../middlewares/authMiddleware.js'

// router obj

const router = express.Router()

//routes
router.post('/test-post', userAuth, testPostController)

//export router
export default router
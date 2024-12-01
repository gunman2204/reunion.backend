const express=require('express');
const controllers=require('../controllers/authController')
const router=express.Router();

// router.post('/', controllers.registerUser)
router.post('/add',controllers.addTask)
router.post('/signin',controllers.loginUser)
router.get('/tasks',controllers.authenticicate,controllers.getTask)
router.delete('/delete/:id',controllers.authenticicate,controllers.deleteTask)
router.put('/update/:toEditId',controllers.authenticicate,controllers.update)
module.exports=router;
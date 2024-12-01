const User = require('../models/User')
const Task = require('../models/Task')
const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_secret, {
        expiresIn: '30d',
    });
};

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.create({
            username,
            password,
        });
        console.log(user)
        console.log('registerUser success at backend')
        res.status(201).json({
            _id: user._id,
            username: user.username,
        })

    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.update=async(req,res)=>{
    const id=req.params.toEditId;
    const toUpdate=req.body
    try {
        const update=await Task.findByIdAndUpdate(
            id,
            {$set:toUpdate},
            {new:true}
        ) ;
        if(!update) {
            return res.status(404).json({success:false,message:"Task not found"})
        }
        res.status(200).json({success:true,data:update});
    } catch (error){
        res.status(500).json({success:false,message:error.message});
    }
}
exports.addTask = async (req, res) => {    
    const { title, priority, status, start_time, end_time,total_time_to_finish } = req.body;
    try {
        const newTask = new Task({
            title, status, priority, start_time, end_time,total_time_to_finish
        });
        const created = await newTask.save();
        res.status(201).json({
            success: true,
            message: 'task added',
            task: newTask
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.getTask = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        const element = await Task.findByIdAndDelete(id)
        console.log('at bacckend', element);
        if (!element) {
            res.status(401).json({
                success: false,
                message: 'Task not found'
            })
        }
        res.status(200).json({
            success: true,
            messsage: 'Task Deleted Successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error',
            error: error.message
        })
    }

}
exports.authenticicate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token, 'authentication passed');
    if (!token) return res.status(401).json({ message: 'Authentication failed' });
    try {
        const decoded = jwt.verify(token, '23mi31004');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'invalid token' })
    }
}
exports.loginUser = async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        console.log('backend', username, password);
        const tasks = await Task.find({ user_id: user._id })
        const token = jwt.sign({ userId: user._id, email: user.username }, '23mi31004', {
            expiresIn: '1h', // Token validity duration
        });
        if (user) {
            res.status(200).json({
                success: true,
                message: 'User Found',
                token,
                userId: user._id,
                tasks: tasks
            })
            console.log('success at backend')
        }
        else {
            res.status(401).json({ message: 'User Not Found' })
            console.log('failure at backend')
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        console.log('failure at backend error catched')
    }
}

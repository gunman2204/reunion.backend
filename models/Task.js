const mongoose=require('mongoose');
const TaskSchema= new mongoose.Schema({
    user_id:{
        type:String
    },
    title:{
        type:String
    },
    status:{
        type:String
    },
    priority:{
        type:Number
    },
    start_time:{
        type:String
    },
    end_time:{
        type:String
    },
    total_hours_to_finish:{
        type:Number
    }
});
const Task=mongoose.model('Task',TaskSchema);
module.exports=Task;
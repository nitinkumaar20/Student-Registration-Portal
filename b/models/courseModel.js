import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    category: { type: String, required: true, unique: true, set: (val) => val.toLowerCase()},
    created_at: { type: Date, required: true, default: Date.now },
})


const courseSchema = mongoose.Schema({
    course_name: { type: String, required: true, set: (val) => val.toLowerCase() },
    duration_time: { type: Number, required: true },
    duration_type: { type: String, required: true, enum: ['y', 'm', 'd', 'h'], set: (val) => val.toLowerCase() },
    fees: { type: Number, required: true },
    eligibility: { type: [String] },
    category: { type: mongoose.Schema.ObjectId, required: true, ref: 'Course_Category', set: (val) => val.toLowerCase() },
    description: { type: String, required: true },
    created_at: { type: Date, required: true, default: Date.now },
  
})

const batchSchema = mongoose.Schema({
    course_id: { type: mongoose.Schema.ObjectId, required: true, ref:'Courses' },
    batch_name: { type: String, required: true },
    fees: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    actual_end_date: { type: Date },
    status: { type: String, required: true, enum: ['upcoming', 'ended', 'ongoing', 'cancel'] },
    user_list: { type: [
        {
            user_id : {type: mongoose.Schema.ObjectId, required: true, ref:'Users' }, 
            applied_at: {type: Date, default: Date.now, required: true }
        }
    ]},
    created_at: { type: Date, required: true, default: Date.now },
    // file: { type: String, required: true, default: Date.now },
})


export const categoryModel = mongoose.model('Course_Category', categorySchema);
export const courseModel = mongoose.model('Courses', courseSchema);
export const batchModel = mongoose.model('Batches', batchSchema);
 
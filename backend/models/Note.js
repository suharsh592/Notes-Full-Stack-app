import mongoose from "mongoose";
const NoteSchema = new mongoose.Schema({
    title: String,
    content: String,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt:{
        type: Date,
        deault: Date.now,
    },
});
export default mongoose.model('Note', NoteSchema); 
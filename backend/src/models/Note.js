import mongoose from "mongoose";

// 1 Create Schema
// 2 Create Model based on that schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },    
},
{ timestamps: true} // createdAt, updatedAt - auto for mongodb)
);


const Note = mongoose.model("Note", noteSchema);

export default Note
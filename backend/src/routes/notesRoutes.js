import express from "express"
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from "../controllers/notesController.js";

// http://localhost:5001/api/notes
const router = express.Router();

router.get("/", getAllNotes)
router.get("/:id", getNoteById)
router.post("/", createNote)
router.put("/:id", updateNote)
router.delete("/:id", deleteNote)

export default router;
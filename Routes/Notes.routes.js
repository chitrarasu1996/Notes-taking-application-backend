const express=require("express")
const { createNotes, getNotesById, deleteNote, updateNotes } = require("../controller/Notes.controller")

const router=express.Router()
router.post("/createNote",createNotes)
router.get("/get-userNotes",getNotesById)
router.delete("/delete-note/:id",deleteNote)
router.put("/edit-note/:noteId",updateNotes)

module.exports=router;
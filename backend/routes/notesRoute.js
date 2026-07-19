const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
//Route 1- Create Note _Login require
router.post(
  "/createnotes",
  [
    body("title", "Title must be at least 3 characters").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
    body("tag", "Tag must  be at least 2 characters").isLength({ min: 2 }),
  ],
  fetchUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const { title, description, tag } = req.body;
      const notesExist = await Notes.findOne({ title: title });
      if (notesExist) {
        return res.status(400).json({
          message: "Notes already Exist",
        });
      }
      const notes = new Notes({
        user: req.user.id,
        title,
        description,
        tag,
      });
      await notes.save();
      res.json({
        message: "Notes added Successfully",
        notes,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
);
// Route 2- Fetch all notes of a user _Login required
router.get("/fetchnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
//Route 3- Update an existing Note _Login required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //create updateNote object
    const updateNote = {};
    if (title) {
      updateNote.title = title;
    }
    if (description) {
      updateNote.description = description;
    }
    if (tag) {
      updateNote.tag = tag;
    }
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Notes not exist");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: updateNote },
      { new: true },
    );
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
//Route 4- Delete an existing Note _Login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Notes not exist");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted successfuuly", note: note });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
module.exports = router;

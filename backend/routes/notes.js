import express from 'express';
import Note from '../models/Note.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching notes' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      categoryId: req.body.categoryId,
      userId: req.userId,
    });

    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating note' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, content: req.body.content, categoryId: req.body.categoryId },
      { new: true }
    );
    res.json(note);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating note' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting note' });
  }
});

export default router;

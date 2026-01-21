import express from 'express';
import Category from '../models/Category.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.userId });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching categories' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      userId: req.userId,
    });

    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating category' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    // Import Note model at top if not already
    const Note = (await import('../models/Note.js')).default;
    
    // Delete all notes in this category
    await Note.deleteMany({ categoryId: req.params.id });
    
    // Then delete the category
    await Category.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Category and associated notes deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting category' });
  }
});

export default router;

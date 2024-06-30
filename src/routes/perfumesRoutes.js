const express = require('express');
const router = express.Router();
const perfumeController = require('../controllers/perfumeController');

router.get('/', async (req, res) => {
    try {
        const perfumes = await perfumeController.getPerfumes();
        res.status(200).json(perfumes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching perfumes' });
    }
});


module.exports = router;

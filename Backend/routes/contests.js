import express from 'express';
import Contest from '../models/Contest.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all active/upcoming contests
// @route   GET /api/contests
// @access  Public
router.get('/', async (req, res) => {
    try {
        const contests = await Contest.find().populate('companyId', 'name').sort({ startTime: 1 });
        res.status(200).json(contests);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching contests' });
    }
});

// @desc    Get single contest by ID
// @route   GET /api/contests/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const contest = await Contest.findById(req.params.id)
            .populate('companyId', 'name')
            .populate('problems', 'title difficulty category');

        if (!contest) return res.status(404).json({ message: 'Contest not found' });
        res.status(200).json(contest);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching contest' });
    }
});

// @desc    Create a modern contest (Company Only)
// @route   POST /api/contests
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        if (req.user.preference !== 'company') {
            return res.status(403).json({ message: 'Only companies can create contests' });
        }

        const { title, description, problems, startTime, endTime, strictValidation } = req.body;

        const contest = new Contest({
            title,
            description,
            companyId: req.user._id,
            problems,
            startTime,
            endTime,
            strictValidation
        });

        const createdContest = await contest.save();
        res.status(201).json(createdContest);
    } catch (error) {
        res.status(500).json({ message: 'Server Error creating contest', error: error.message });
    }
});

export default router;

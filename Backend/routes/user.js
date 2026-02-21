import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get user profile data
// @route   GET /api/user/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
    try {
        // req.user is already populated by the protect middleware
        if (req.user) {
            res.status(200).json({
                _id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                preference: req.user.preference,
                bio: req.user.bio,
                location: req.user.location,
                github: req.user.github,
                role: req.user.role,
                rating: req.user.rating,
                createdAt: req.user.createdAt
            });
        } else {
            res.status(404).json({ message: 'User profile not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching profile' });
    }
});

export default router;

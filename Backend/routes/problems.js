import express from 'express';
import Problem from '../models/Problem.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all problems (with optional category filter)
// @route   GET /api/problems
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { category, isMock } = req.query;
        let query = {};

        if (category) query.category = category;
        if (isMock) query.isMock = isMock === 'true';

        const problems = await Problem.find(query).select('-testCases.expectedOutput'); // Hide expected output
        res.status(200).json(problems);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching problems' });
    }
});

// @desc    Get single problem by ID
// @route   GET /api/problems/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) return res.status(404).json({ message: 'Problem not found' });
        res.status(200).json(problem);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching problem' });
    }
});

// @desc    Create a new problem (Company only)
// @route   POST /api/problems
// @access  Private (Company)
router.post('/', protect, async (req, res) => {
    try {
        if (req.user.preference !== 'company') {
            return res.status(403).json({ message: 'Only companies can create problems' });
        }

        const { title, description, difficulty, category, testCases, isMock } = req.body;

        const problem = new Problem({
            title,
            description,
            difficulty,
            category,
            testCases,
            companyId: req.user._id,
            isMock: isMock || false
        });

        const createdProblem = await problem.save();
        res.status(201).json(createdProblem);
    } catch (error) {
        res.status(500).json({ message: 'Server Error creating problem', error: error.message });
    }
});

// @desc    Seed Mock Data for Practice Screen
// @route   POST /api/problems/seed
// @access  Public (Just for dev)
router.post('/seed', async (req, res) => {
    try {
        await Problem.deleteMany({ isMock: true });

        const mockProblems = [
            {
                title: "Two Sum",
                description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
                difficulty: "Easy",
                category: "Arrays",
                isMock: true,
                testCases: [
                    { input: "[2,7,11,15]\n9", expectedOutput: "[0,1]" },
                    { input: "[3,2,4]\n6", expectedOutput: "[1,2]" }
                ]
            },
            {
                title: "Maximum Subarray",
                description: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
                difficulty: "Medium",
                category: "Dynamic Programming",
                isMock: true,
                testCases: [
                    { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
                    { input: "[1]", expectedOutput: "1" }
                ]
            },
            {
                title: "Valid Parentheses",
                description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
                difficulty: "Easy",
                category: "Stacks",
                isMock: true,
                testCases: [
                    { input: "()", expectedOutput: "true" },
                    { input: "()[]{}", expectedOutput: "true" }
                ]
            }
        ];

        await Problem.insertMany(mockProblems);
        res.status(201).json({ message: "Mock problems seeded successfully!" });
    } catch (error) {
        res.status(500).json({ message: 'Server Error seeding problems' });
    }
});

export default router;

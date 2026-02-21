import express from 'express';
import Problem from '../models/Problem.js';
import Groq from 'groq-sdk';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Initialize Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// @desc    Evaluate code submission using Groq AI
// @route   POST /api/submissions/:problemId
// @access  Public (or Private depending on needs, using protect if required)
router.post('/:problemId', async (req, res) => {
    try {
        const { problemId } = req.params;
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ status: 'Error', message: 'Code is required.' });
        }

        if (!process.env.GROQ_API_KEY) {
            return res.status(500).json({ status: 'Error', message: 'Groq API Key is missing on the server.' });
        }

        // Fetch the problem
        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ status: 'Error', message: 'Problem not found.' });
        }

        // Prepare test cases string
        const testCasesString = problem.testCases.map((tc, idx) =>
            `Test Case ${idx + 1}:\nInput: ${tc.input}\nExpected Output: ${tc.expectedOutput}\n`
        ).join('\n');

        // Formulate prompt
        const prompt = `You are an expert programming judge. You are evaluating a user's code submission for a coding problem.
        
Problem Title: ${problem.title}
Problem Description: ${problem.description}

Test Cases to pass:
${testCasesString}

User's Code:
\`\`\`
${code}
\`\`\`

Analyze the code and evaluate if its logic effectively solves the problem and passes all test cases (both explicitly listed and general edge cases). You do not need to execute the code, just perform a deep static analysis of the logic. The user can write in any language, infer the language automatically.

Respond strictly with a JSON object in the following format. DO NOT wrap the JSON in markdown blocks (e.g., no \`\`\`json). Just the raw JSON string:
{
  "status": "Accepted" | "Wrong Answer" | "Compile Error",
  "message": "A brief explanation of why it failed or a congratulatory message if it passed."
}
`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are a strict but helpful AI coding judge that only outputs raw JSON.',
                },
                {
                    role: 'user',
                    content: prompt,
                }
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.1,
            max_completion_tokens: 500,
            response_format: { type: 'json_object' }
        });

        const aiResponse = chatCompletion.choices[0]?.message?.content;

        try {
            const parsedResponse = JSON.parse(aiResponse);
            return res.status(200).json(parsedResponse);
        } catch (parseError) {
            console.error("Failed to parse AI response:", aiResponse);
            return res.status(500).json({ status: 'Error', message: 'Failed to evaluate code properly.' });
        }

    } catch (error) {
        console.error("Submission Error:", error);
        res.status(500).json({ status: 'Error', message: 'Server Error during evaluation.', error: error.message });
    }
});

export default router;

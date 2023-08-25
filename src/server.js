const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors()); // Enable CORS to allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON requests

const answeredQuestions = [];

// Endpoint to receive answers
app.post('/submit-answer', (req, res) => {
    const answer = req.body.answer;
    const questionId = req.body.questionId;

    if (answer !== undefined && questionId !== undefined) {
        answeredQuestions.push({ questionId, answer });
        res.status(200).json({ message: 'Answer received successfully' });
    } else {
        res.status(400).json({ message: 'Invalid answer format' });
    }
});

const port = 3001; // Use a port different from your React app

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

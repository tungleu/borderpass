const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const answeredQuestions = [];

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

const port = 3001;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/submit-answers', (req, res) => {
    const answers = req.body

    if (answers !== undefined) {
        res.status(200).json({ message: 'Answer received successfully' });
        console.log(answers)
    } else {
        res.status(400).json({ message: 'Invalid answer format' });
    }
});

const port = 3001;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

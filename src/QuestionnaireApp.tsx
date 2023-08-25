import React, { useState } from 'react';
import {Button, Container, Grid} from '@mui/material';
import questionsData from './questions.json';
import QuestionPage from './QuestionPage';

interface Answer {
    question: string;
    answer: string;
}

function QuestionnaireApp() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);

    const handleAnswer = (answer: string) => {
        setAnswers([...answers, { question: questionsData[currentIndex].question, answer }]);
        setCurrentIndex(currentIndex + 1);
    };
    const submitAllAnswers = async () => {
        try {
            const response = await fetch('http://localhost:3001/submit-answers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers),
            });

            if (response.ok) {
                console.log('All answers submitted successfully');
            } else {
                console.error('Error submitting answers:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting answers:', error);
        }
    };
    const handleBack = () => {
        setCurrentIndex(currentIndex - 1);
    };

    return (
        <Grid container justifyContent="center">
            {currentIndex < questionsData.length ? (
                <QuestionPage
                    question={questionsData[currentIndex]}
                    onAnswer={handleAnswer}
                    onBack={handleBack}
                />
            ) : (
                <div>
                    <h2>Questionnaire Completed</h2>
                    {/* Display submitted answers */}
                    <pre>{JSON.stringify(answers, null, 2)}</pre>
                    <Button onClick={submitAllAnswers}>Submit answers</Button>
                </div>
            )}
        </Grid>
    );
}

export default QuestionnaireApp;

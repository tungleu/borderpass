import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid, MenuItem,
    Radio,
    RadioGroup, Select, SelectChangeEvent,
    TextField,
    Typography
} from '@mui/material';

export interface Question {
    id: number;
    question: string;
    type: string;
    options: string[];
    required: boolean;
}

interface QuestionPageProps {
    question: Question;
    onAnswer: (answer: string) => void;
    onBack: () => void;
}

function QuestionPage({ question, onAnswer, onBack }: QuestionPageProps) {
    const [selectedOption, setSelectedOption] = useState('');
    const [textInput, setTextInput] = useState('');

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
        setSelectedOption(e.target.value);
        setIsAnswered(true);
    };

    const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(e.target.value);
        setIsAnswered(true);
    };
    const [isAnswered, setIsAnswered] = useState(false)

    const handleSubmit = () => {
        const answer = question.type === 'text' ? textInput : selectedOption;
        onAnswer(answer);
        setSelectedOption('');
        setTextInput('');
        setIsAnswered(false);
    };


    return (
        <Grid>
            <Grid>
            <Typography variant="h6">Question {question.id}  </Typography>
            {question.required && !isAnswered && (<Typography color="error">*required</Typography>)}
            <Typography variant="body1">{question.question}</Typography>
            {question.type === 'radio' && (
                <FormControl component="fieldset">
                    <RadioGroup
                        value={selectedOption}
                        onChange={handleOptionChange}
                    >
                        {question.options.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                value={option}
                                control={<Radio />}
                                label={option}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            )}
            {question.type === 'text' && (
                <TextField
                    value={textInput}
                    onChange={handleTextInputChange}
                    variant="outlined"
                    fullWidth
                />
            )}
            {question.type === 'checkbox' && (
                <FormControl component="fieldset">
                        {question.options.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                value={option}
                                control={
                                    <Checkbox
                                        checked={selectedOption.includes(option)}
                                        onChange={handleOptionChange}
                                    />
                                }
                                label={option}
                            />
                        ))}
                </FormControl>
            )}
            {question.type === 'dropdown' && (
                <FormControl fullWidth variant="outlined">
                    <Select
                        value={selectedOption}
                        label={question.question}
                        onChange={handleOptionChange}
                    >
                        {question.options.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
            </Grid>
            <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>
                    <Button onClick={onBack} disabled={question.id === 1}>
                        BACK
                    </Button>
                </Grid>
                <Grid item xs={8}>
                    <Button onClick={handleSubmit} disabled={!isAnswered && question.required}>NEXT</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default QuestionPage;

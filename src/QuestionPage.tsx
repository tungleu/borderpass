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
    const [isAnswered, setIsAnswered] = useState(true);
    const [warning, setWarning] = useState(false);

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
        setSelectedOption(e.target.value);
        setIsAnswered(true);
        setWarning(false);

    };
    const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(e.target.value);
        setIsAnswered(true);
        setWarning(false);
    };

    const handleSubmit = (isRequired: boolean) => {
        const answer = question.type === 'text' ? textInput : selectedOption;
        (answer || !isRequired) && onAnswer(answer);
        !answer && setWarning(true)
        setSelectedOption('');
        setTextInput('');
        setIsAnswered(false);
    };


    return (
        <Grid container>
            <Grid container>
            <Typography variant="h6">Question {question.id}
                <br/>
                <Typography display="inline" variant="body1">{question.question}</Typography>
                {question.required && (<Typography display="inline" color="error"> *</Typography>)}
                {(question.required && warning) && (<Typography display="inline" color="error"> Question is required</Typography>)}
            </Typography>
            <Grid container>
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
                    error={!isAnswered}
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
            </Grid>
            <Grid container justifyContent={"space-between"} alignItems="center">
                    <Button onClick={onBack} disabled={question.id === 1}>
                        BACK
                    </Button>
                    <Button onClick={() => handleSubmit(question.required)}>NEXT</Button>
            </Grid>
        </Grid>
    );
}

export default QuestionPage;

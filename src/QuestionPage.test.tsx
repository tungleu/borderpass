import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QuestionPage, {Question} from './QuestionPage';

describe('QuestionPage Component', () => {
    const mockQuestion = {
        id: 1,
        question: 'What is your favorite color?',
        type: 'radio',
        options: ['Red', 'Blue', 'Green'],
        required: true,
    } as Question;

    test('renders question correctly', () => {
        render(<QuestionPage question={mockQuestion} onAnswer={() => {}} onBack={() => {}} />);
        const questionText = screen.getByText(mockQuestion.question);
        expect(questionText).toBeInTheDocument();
    });

    test('handles radio option selection', () => {
        render(<QuestionPage question={mockQuestion} onAnswer={() => {}} onBack={() => {}} />);
        const radioOption = screen.getByLabelText('Red');
        fireEvent.click(radioOption);
        expect(radioOption).toBeChecked();
    });

    test('handles checkbox option selection', () => {
        const mockCheckboxQuestion = {
            ...mockQuestion,
            type: 'checkbox',
            options: ['Option 1', 'Option 2', 'Option 3'],
        } as Question;

        render(<QuestionPage question={mockCheckboxQuestion} onAnswer={() => {}} onBack={() => {}} />);

        const checkboxOption1 = screen.getByLabelText('Option 1');

        fireEvent.click(checkboxOption1);

        expect(checkboxOption1).toBeChecked();
    });

    test('handles text input', () => {
        const mockTextQuestion = {
            ...mockQuestion,
            type: 'text',
        } as Question;

        render(<QuestionPage question={mockTextQuestion} onAnswer={() => {}} onBack={() => {}} />);
        const textInput = screen.getByRole('textbox');
        fireEvent.change(textInput, { target: { value: 'Sample text' } });
        expect(textInput).toHaveValue('Sample text');
    });
});

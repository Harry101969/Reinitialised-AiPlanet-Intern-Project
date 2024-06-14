
import React from 'react';
import './InputField.css'; // Import your CSS file for styling
import { PiPaperPlaneRightThin } from "react-icons/pi";
import { FaSquare } from "react-icons/fa";

const InputField = ({ question, handleQuestionChange, handleQuestionSubmit, isLoading }) => {
    const handleKeyPress = (event) => {
        // Check if Enter key is pressed
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default behavior (like new line)
            if (question.trim() !== '') { // Check if question is not empty after trimming
                handleQuestionSubmit(); // Call handleQuestionSubmit function
            }
        }
    };

    return (
        <div className="input-field-container">
            <div className="input-field">
                <textarea
                    value={question}
                    onChange={handleQuestionChange}
                    onKeyPress={handleKeyPress} // Handle key press events
                    placeholder="Send Message.."
                    className="question-input"
                    rows="1"
                />
                <button
                    onClick={handleQuestionSubmit}
                    className="submit-button"
                    disabled={isLoading || !question.trim()}
                >
                    {isLoading ? <FaSquare /> : <PiPaperPlaneRightThin />}
                </button>
            </div>
        </div>
    );
};

export default InputField;

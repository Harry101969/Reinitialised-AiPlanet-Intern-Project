
// import React from 'react';
// import './InputField.css'; // Import your CSS file for styling
// import { PiPaperPlaneRightThin } from "react-icons/pi";
// import { FaSquare } from "react-icons/fa";

// const InputField = ({ question, handleQuestionChange, handleQuestionSubmit, isLoading }) => {
//     return (
//         <div className="input-field-container">
//             <div className="input-field">
//                 <textarea
//                     value={question}
//                     onChange={handleQuestionChange}
//                     placeholder="Send Message.."
//                     className="question-input"
//                     rows="1"
//                 />
//                 <button onClick={handleQuestionSubmit} className="submit-button" disabled={isLoading}>
//                     {isLoading ? <FaSquare /> : <PiPaperPlaneRightThin />}
//                 </button>
//             </div>


//         </div>
//     );
// };

// export default InputField;
import React from 'react';
import './InputField.css'; // Import your CSS file for styling
import { PiPaperPlaneRightThin } from "react-icons/pi";
import { FaSquare } from "react-icons/fa";

const InputField = ({ question, handleQuestionChange, handleQuestionSubmit, isLoading }) => {
    return (
        <div className="input-field-container">
            <div className="input-field">
                <textarea
                    value={question}
                    onChange={handleQuestionChange}
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

import React from 'react';
import user from '../assets/User.png';


const Question = ({ text }) => {
    return (
        <div className="question-box">
            <img src={user} alt="User" className="question-icon" />
            <span className="question-text">{text}</span>
        </div>
    );
};

export default Question;

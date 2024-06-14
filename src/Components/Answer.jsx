import React from 'react';
import aiUser from '../assets/aiLogoUser.png';

const Answer = ({ text }) => {
    return (
        <div className="answer-box">
            <img src={aiUser} alt="AI User" className="answer-icon" />
            <span className="answer-text">{text}</span>
        </div>
    );
};

export default Answer;

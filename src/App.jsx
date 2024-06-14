import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Components/Navbar'
import InputField from './Components/InputField'
import Question from './Components/Question';
import Answer from './Components/Answer';
import axiosInstance from './axiosInstance';
import './App.css'
function App() {
  const [page, setPage] = useState([]);
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [question, setQuestion] = useState('');
  const [urls, setUrls] = useState([]); // State to hold URLs detected in PDF
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [qaHistory, setQaHistory] = useState([]); // State to hold questions and answers
  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const res = await axiosInstance.get('api/home');
      setPage(res.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
      submitPdf(selectedFile);
    } else {
      setFileName('');
      setFile(null);
    }
  };

  const submitPdf = async (selectedFile) => {
    const formData = new FormData();
    formData.append("pdfFile", selectedFile);
    try {
      setIsLoading(true);
      const result = await axiosInstance.post('api/home', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log('File uploaded successfully', result.data);
      setExtractedText(result.data.extractedText);
      setUrls(result.data.urls);
    } catch (err) {
      console.error('Error uploading file:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleQuestionSubmit = async () => {
    try {
      setIsLoading(true);
      const questionsArray = question.split('?').map(q => q.trim()).filter(q => q.length > 0);
      setQaHistory(prevQaHistory => [...prevQaHistory, { question, answer: '' }]);
      const result = await axiosInstance.post('/query', { text: extractedText, questions: questionsArray });
      const responses = result.data.responses.map(resp => resp.answer).join('\n');
      setQaHistory(prevQaHistory => {
        const updatedQaHistory = [...prevQaHistory];
        updatedQaHistory[updatedQaHistory.length - 1].answer = responses;
        return updatedQaHistory;
      });
      setQuestion('');
    } catch (err) {
      console.error('Error getting answer:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <div className='App'>
      <Navbar fileName={fileName} handleFileChange={handleFileChange} />
      <div className="chat-section">
        {qaHistory.map((qa, index) => (
          <div key={index}>
            <Question text={qa.question} />
            {qa.answer && <Answer text={qa.answer} />}
          </div>
        ))}
      </div>
      <InputField
        question={question}
        handleQuestionChange={handleQuestionChange}
        handleQuestionSubmit={handleQuestionSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}

export default App

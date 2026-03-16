import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

const TanyaJawab = () => {
    const [question, setQuestion] = useState('');
    const [responses, setResponses] = useState([]);
    const [authResponse, setAuthResponse] = useState(null);

    // Handle question submission
    const handleQuestionSubmit = () => {
        if (question.trim()) {
            setResponses([...responses, question]);
            setQuestion('');
        }
    };

    // Google Drive API integration
    const handleBackupToGoogleDrive = () => {
        // Insert logic here to use Google Drive API to backup responses
        alert('Backup to Google Drive feature is not implemented yet.');
    };

    // Handle Google Login
    const responseGoogle = (response) => {
        setAuthResponse(response);
        console.log(response);
    };

    return (
        <div>
            <h1>Tanya Jawab Q&A Interface</h1>
            <input
                type='text'
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder='Ask your question'
            />
            <button onClick={handleQuestionSubmit}>Submit</button>
            <button onClick={handleBackupToGoogleDrive}>Backup to Google Drive</button>
            <h2>Responses:</h2>
            <ul>
                {responses.map((response, index) => (
                    <li key={index}>{response}</li>
                ))}
            </ul>
            <div>
                <GoogleLogin
                    clientId='YOUR_CLIENT_ID.apps.googleusercontent.com'
                    buttonText='Login to Google'
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
    );
};

export default TanyaJawab;

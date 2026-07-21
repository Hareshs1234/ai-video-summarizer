import './App.css'
import VideoInput from './VideoInput.jsx'
import Summary from './Summary.jsx'
import KeyPoints from './KeyPoints.jsx'
import Transcript from "./Transcript";
import { useState } from 'react';
import logo from "./assets/logo.png";
function App() {

  const [VideoUrl, setVideoUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyPoints, setKeyPoints] = useState([
  "React is a frontend library",
  "Components manage UI",
  "State stores changing data",
]);
  const [transcript,setTranscript] = useState("");

  return (
    

    <div className="app">
      <img src={logo} alt="VideoNotes Logo" className="logo" />
    <div className="headerTop">
    <h1>AI Video <span>Notes Generator</span></h1>

<p>
  Paste a YouTube link or upload a video and get AI-generated
  transcripts, summaries, and key points in seconds.
</p>

    </div>            

    <div className="videoSection"> 
      <VideoInput
        onVideoSubmit={setVideoUrl}
        onGenerate={setSummary}
        setLoading={setLoading}
        loading = {loading}
        setKeyPoints={setKeyPoints}
        setTranscript={setTranscript}
      />
      <p className = "example">Example: <span>https://www.youtube.com/watch?v=dQw4w9WgXcQ</span></p>
      </div>


      <div className="notes-container">
        <Summary
          summary={summary}
          loading={loading}
        />

        <KeyPoints points={keyPoints}
        loading = {loading}>

        </KeyPoints>
        <Transcript transcript={transcript}
        loading = {loading}/>
      </div>

      <footer className="footer">
  <p>© 2026 VideoNotes. Built by Haresh.<br />
    Powered by React, FastAPI, and OpenAI
  </p>
 
      </footer>

      
    </div>

    

  )
}

export default App;

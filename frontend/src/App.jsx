import './App.css'
import VideoInput from './VideoInput.jsx'
import Summary from './Summary.jsx'
import KeyPoints from './KeyPoints.jsx'
import Transcript from "./Transcript";
import { useState } from 'react';

function App() {

  const [videoURL, setVideoUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const[keyPoints,setKeyPoints] = useState([
  "React is a frontend library",
  "Components manage UI",
  "State stores changing data"
]);
  const [transcript, setTranscript] = useState(
  "This is a fake transcript of the video. The AI will replace this later."
);

  return (
    <div className="app">

      <h1>AI Video Notes Generator</h1>

      <VideoInput
        onVideoSubmit={setVideoUrl}
        onGenerate={setSummary}
        setLoading={setLoading}
        loading = {loading}
      />

      <div className="notes-container">

        <Summary
          summary={summary}
          loading={loading}
        />

        <KeyPoints points={keyPoints}>

        </KeyPoints>
        <Transcript transcript={transcript}/>

      </div>

    </div>
  )
}

export default App;
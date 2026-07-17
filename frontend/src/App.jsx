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

        <KeyPoints />
        <Transcript />

      </div>

    </div>
  )
}

export default App;
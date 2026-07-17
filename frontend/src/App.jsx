import './App.css'
import VideoInput from './VideoInput.jsx'
import Summary from './Summary.jsx'
import KeyPoints from './KeyPoints.jsx'
import Transcript from "./Transcript";

function App() {

  return (
    <div className="app">

      <h1>AI Video Notes Generator</h1>

      <VideoInput />

      <div className="notes-container">
        <Summary />
        <KeyPoints />
        <Transcript />
      </div>

    </div>
  )
}

export default App
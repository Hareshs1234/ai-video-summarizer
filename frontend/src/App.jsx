
import './App.css'
import  VideoInput from './VideoInput.jsx'
import  Summary from './Summary.jsx'
import  KeyPoints from './KeyPoints.jsx'

function App() {

  return (
    <>
      <div>
         <h1>AI Video Notes Generator</h1>
         <VideoInput></VideoInput>
         <Summary></Summary>
         <KeyPoints></KeyPoints>

      </div>
    </>
  )
}

export default App

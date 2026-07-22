import { useState } from "react";
import { Sparkles } from "lucide-react";

function VideoInput({ onVideoSubmit, onGenerate, setLoading, loading, setKeyPoints,
  setTranscript}) {
  const [videoUrl, setVideoUrl] = useState("");

  const handleUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };



  const handleGenerate = async () => {
    console.log("setKeyPoints:", setKeyPoints);
    console.log("setTranscript:", setTranscript);

    
  if (!videoUrl.trim()) {
    alert("Please enter a YouTube URL");
    return;
  }

  setLoading(true);

  try{
    const response = await fetch(
    "https://ai-video-summarizer-1f0h.onrender.com/generate-notes",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            video_url: videoUrl
        })
    }
);

if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}

const data = await response.json();
onGenerate(data.summary);
onVideoSubmit(videoUrl);
setKeyPoints(data.key_points);
setTranscript(data.transcript);


  }

catch (error) {
    console.error(error);
    alert("Please make sure the YouTube link is entered correctly and that the video has captions available.");
}
finally {
    setLoading(false);
}


  }



  

  return (
    <div className="inputRow">
      <input
        type="text"
        placeholder="Paste YouTube link here..."
        value={videoUrl}
        onChange={handleUrlChange}
      />

      <button onClick={handleGenerate} disabled={loading}>
    <Sparkles size={20} />
    {loading ? " Generating" : " Generate Summary"}
    </button>

    </div>
  );
}

export default VideoInput;
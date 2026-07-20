import { useState } from "react";
import { Sparkles } from "lucide-react";

function VideoInput({ onVideoSubmit, onGenerate, setLoading, loading }) {
  const [videoUrl, setVideoUrl] = useState("");

  const handleUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleGenerate = () => {
    if (videoUrl.trim() === "") {
      alert("Please enter a video URL");
      return;
    }

    setLoading(true);
    onVideoSubmit(videoUrl);

    setTimeout(() => {
      onGenerate("The summary of the video will appear here");
      setLoading(false);
    }, 2000);
  };

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
import { useState } from "react";

function VideoInput({ onVideoSubmit, onGenerate, setLoading, loading }) {
    


    const [videoUrl, setVideoUrl] = useState("");

    const handleUrlChange = (event) => {
        setVideoUrl(event.target.value);
    };


    const handleGenerate = () => {

        if (videoUrl.trim() === ""){
            alert("Please enter a video URL");
            return;
        }

        setLoading(true);

        onVideoSubmit(videoUrl);

        setTimeout(() => {

            onGenerate("This is a fake AI summary of the video.");

            setLoading(false);

        }, 2000);

    };


    return (
        <div>

            <input
                type="text"
                placeholder="Paste YouTube URL OR drag Video File"
                value={videoUrl}
                onChange={handleUrlChange}
            />

            <button onClick={handleGenerate}
            disable = {loading}>
                {loading ? "Generating" : "Generate Summary"}
            </button>

        </div>
    );
}

export default VideoInput;
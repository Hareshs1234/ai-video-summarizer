import { useState } from "react";

function VideoInput(){

    const [videoUrl,setVideoUrl] = useState("");
    const HandelUrlChange = (event) => {setVideoUrl(event.target.value)};
    const handleGenerate = () => {console.log(videoUrl);};

    return(

        <div>
            
            <input
            type="text"
            placeholder="Paste YouTube URL OR drag Video File"
            value={videoUrl}
            onChange = {HandelUrlChange}
             />

             <button onClick = {handleGenerate}>
                Generate Summary
             </button>
            
        </div>



    );




}

export default VideoInput;
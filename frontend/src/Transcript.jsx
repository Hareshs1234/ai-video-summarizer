import { FileText, Sparkles } from "lucide-react";

function Transcript({ transcript, loading }) {

    return (
        <div className="note-card">
            <div className="card-heading">
                <span className="card-icon"><FileText size={21} /></span>
                <h2>Transcript</h2>
            </div>
            
<div className="card-content">
    {loading ? (
        <div className="summary-skeleton">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line medium"></div>
        </div>
    ) : (
        <div className="inside-box">
            <p>{transcript || "The transcript of the video will appear here."}</p>
        </div>
    )}
</div>
            
        </div>
    );
}

export default Transcript;

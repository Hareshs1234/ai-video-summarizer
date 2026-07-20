import { List, Sparkles } from "lucide-react";

function Summary({ summary, loading }) {

    return (
        <div className="note-card">
            <div className="noteCrad">
                <span className="card-icon"><List size={22} /></span>
                <h2>Summary</h2>
            </div>

            <div className={`card-content summary-content ${loading ? "is-loading" : ""}`}>
                {loading && <span className="loader" aria-hidden="true" />}
                {loading ? (
    <div className="summary-skeleton">
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line medium"></div>
    </div>
) : (
    <p className="inside-box">
        {summary || "Your AI summary will appear here"}
    </p>
)}
                
            </div>
        </div>
    );
}

export default Summary;

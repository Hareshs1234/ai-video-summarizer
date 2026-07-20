import { Star } from "lucide-react";

function KeyPoints({ points, loading }) {
  return (
    <div className="note-card">
      <div className="card-heading">
        <span className="card-icon">
          <Star size={21} fill="currentColor" />
        </span>

        <h2>Key Points</h2>
      </div>

      <div className="card-content">
        {loading ? (
          <div className="summary-skeleton">
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
            <div className="skeleton-line medium"></div>
          </div>
        ) : (
          <ol className="inside-box key-points-list">
            {points.map((point, index) => (
              <li key={index}>
                <span>{point}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export default KeyPoints;
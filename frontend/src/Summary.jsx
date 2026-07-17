function Summary({ summary, loading }) {

    return (
        <div>

            <h2>Summary</h2>

            <p>
                {loading 
                    ? "Generating summary..." 
                    : summary || "Your AI summary will appear here"
                }
            </p>

        </div>
    );
}

export default Summary;
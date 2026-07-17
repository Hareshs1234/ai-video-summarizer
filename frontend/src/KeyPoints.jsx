function KeyPoints({ points }) {

    return (
        <div>
            <h2>Key Points</h2>

            <ul>
                {points.map((point, index) => (
                    <li key={index}>
                        {point}
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default KeyPoints;
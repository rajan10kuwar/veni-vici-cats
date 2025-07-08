import React from 'react';

// History component displays a list of previously discovered cats
const History = ({ history }) => {
  // Render the history section with a title
  return (
    <div className="history-section">
      <h2>Discovery History</h2>
      {/* Show empty message if no history exists, otherwise render the list */}
      {history.length === 0 ? (
        <p className="empty">No previous discoveries yet.</p>
      ) : (
        <ul className="history-list">
          {/* Map through history array to display each cat entry */}
          {history.map((cat, index) => (
            <li key={index} className="history-item">
              {/* Display cat image with alt text for accessibility */}
              <img src={cat.imageUrl} alt={cat.name} className="history-image" />
              <div className="history-info">
                {/* Show cat name and origin in a formatted way */}
                <p><strong>Name:</strong> {cat.name}</p>
                <p><strong>Origin:</strong> {cat.origin}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
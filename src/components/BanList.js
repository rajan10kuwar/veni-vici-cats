import React from 'react';

const BanList = ({ banList, onRemoveBan }) => {
  return (
    <div className="ban-list-section">
      <h2>Ban List</h2>
      <p>Banned items won't appear in future discoveries</p>
      
      <div className="ban-list-container">
        <div className="ban-list-category">
          <h3>Banned Breeds</h3>
          {banList.breeds.length === 0 ? (
            <p className="empty">No banned breeds</p>
          ) : (
            <ul>
              {banList.breeds.map((breed, i) => (
                <li key={`breed-${i}`}>
                  {breed}
                  <button 
                    onClick={() => onRemoveBan('breeds', breed)}
                    title="Remove ban"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="ban-list-category">
          <h3>Banned Origins</h3>
          {banList.origins.length === 0 ? (
            <p className="empty">No banned origins</p>
          ) : (
            <ul>
              {banList.origins.map((origin, i) => (
                <li key={`origin-${i}`}>
                  {origin}
                  <button 
                    onClick={() => onRemoveBan('origins', origin)}
                    title="Remove ban"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default BanList;
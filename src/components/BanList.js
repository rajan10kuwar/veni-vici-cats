import React from 'react';

/**
 * Displays and manages the list of banned attributes
 * @param {Object} props - Component props
 * @param {Array} props.banList - Array of banned attributes
 * @param {Function} props.onRemoveBan - Callback for removing bans
 */
const BanList = ({ banList, onRemoveBan }) => {
  return (
    <div className="ban-list-section">
      <h2>Ban List</h2>
      <p>Select an attribute in your listing to ban it</p>
      
      {banList.length === 0 ? (
        <p className="empty-message">No attributes banned yet</p>
      ) : (
        <ul className="ban-list-items">
          {banList.map((item, index) => (
            <li 
              key={index} 
              className="ban-item"
              onClick={() => onRemoveBan(item)}
              title="Click to remove ban"
            >
              {item}
              <span className="remove-btn">×</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BanList;
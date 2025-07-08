import React from 'react';

/**
 * Displays a single cat's information with clickable attributes
 * @param {Object} props - Component props
 * @param {Object|null} props.cat - Current cat data
 * @param {boolean} props.loading - Loading state
 * @param {string|null} props.error - Error message
 * @param {Function} props.onBanAttribute - Callback for banning attributes
 */
const CatCard = ({ cat, loading, error, onBanAttribute }) => {
  // Loading state
  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Finding your perfect cat...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-state">
        <p>{error}</p>
      </div>
    );
  }

  // No cat found (but not loading/error)
  if (!cat) {
    return (
      <div className="no-cat-state">
        <p>No cats found. Try adjusting your preferences.</p>
      </div>
    );
  }

  // Normal display with cat data
  return (
    <div className="cat-card">
      <img 
        src={cat.imageUrl} 
        alt={cat.name} 
        className="cat-image"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x300?text=Cat+Image+Not+Found';
        }}
      />
      
      <div className="cat-info">
        <h2>{cat.name}</h2>
        
        {/* Clickable Origin */}
        <p>
          <strong>Origin: </strong>
          <span 
            className="clickable-attribute"
            onClick={() => onBanAttribute(cat.origin)}
            title="Click to ban this origin"
          >
            {cat.origin}
          </span>
        </p>
        
        {/* Non-clickable Attributes */}
        <p><strong>Weight:</strong> {cat.weight} lbs</p>
        <p><strong>Life Span:</strong> {cat.lifeSpan}</p>
        <p><strong>Temperament:</strong> {cat.temperament}</p>
      </div>
    </div>
  );
};

export default CatCard;
import React from 'react';

const CatCard = ({ cat, loading, error, onBanBreed, onBanOrigin }) => {
  if (loading) return <div className="loading"> Finding your perfect cat...</div>;
  if (error) return <div className="error"> {error}</div>;
  if (!cat) return <div className="no-cat">No cats found. Try adjusting preferences.</div>;

  return (
    <div className="cat-card">
      <img src={cat.imageUrl} alt={cat.name} className="cat-image" />
      
      <div className="cat-info">
        <h2>
          <span 
            className="clickable-attribute" 
            onClick={() => onBanBreed(cat.name)}
            title="Click to ban this breed"
          >
            {cat.name}
          </span>
        </h2>
        
        <p>
          <strong>Origin: </strong>
          <span 
            className="clickable-attribute"
            onClick={() => onBanOrigin(cat.origin)}
            title="Click to ban this origin"
          >
            {cat.origin}
          </span>
        </p>
        
        <p><strong>Weight:</strong> {cat.weight} lbs</p>
        <p><strong>Life Span:</strong> {cat.lifeSpan}</p>
        <p><strong>Temperament:</strong> {cat.temperament}</p>
      </div>
    </div>
  );
};

export default CatCard;
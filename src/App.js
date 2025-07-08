import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import CatCard from './components/CatCard';
import BanList from './components/BanList';
import './App.css';

function App() {
  // State management
  const [currentCat, setCurrentCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [banList, setBanList] = useState({
    origins: [],
    breeds: []
  });

  // API configuration
  const API_KEY = process.env.REACT_APP_CAT_API_KEY;
  const API_URL = 'https://api.thecatapi.com/v1/images/search?has_breeds=1';

  /**
   * Checks if cat should be banned based on ban list
   */
  const isCatBanned = (cat) => {
    const breed = cat.breeds[0].name;
    const origin = cat.breeds[0].origin || 'Unknown';
    return (
      banList.origins.includes(origin) ||
      banList.breeds.includes(breed)
    );
  };

  /**
   * Fetches random cat, skipping banned attributes
   */
  const fetchRandomCat = async () => {
    setLoading(true);
    setError(null);
    let attempts = 0;
    const maxAttempts = 15; // Increased for better filtering
    
    try {
      while (attempts < maxAttempts) {
        // Rate limiting protection
        if (attempts > 0) await new Promise(r => setTimeout(r, 300));
        
        const response = await axios.get(API_URL, {
          headers: { 'x-api-key': API_KEY }
        });
        
        const cat = response.data[0];
        if (cat?.breeds?.length > 0 && !isCatBanned(cat)) {
          const breed = cat.breeds[0];
          setCurrentCat({
            imageUrl: cat.url,
            name: breed.name,
            weight: breed.weight?.imperial || 'N/A',
            origin: breed.origin || 'Unknown',
            lifeSpan: breed.life_span || 'N/A',
            temperament: breed.temperament || 'N/A'
          });
          return;
        }
        attempts++;
      }
      
      throw new Error(
        Object.values(banList).flat().length > 0
          ? "No cats available matching your preferences. Try adjusting your ban list."
          : "Failed to fetch cats. Please try again later."
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Adds attribute to ban list
   */
  const handleBanAttribute = (type, value) => {
    if (!value) return;
    setBanList(prev => ({
      ...prev,
      [type]: [...new Set([...prev[type], value])] // Prevent duplicates
    }));
  };

  /**
   * Removes attribute from ban list
   */
  const handleRemoveBan = (type, value) => {
    setBanList(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item !== value)
    }));
  };

  // Initial fetch and refetch when ban list changes
  useEffect(() => {
    fetchRandomCat();
  }, [banList]);

  return (
    <div className="App">
      <Header />
      <main className="container">
        <CatCard 
          cat={currentCat} 
          loading={loading} 
          error={error}
          onBanBreed={(breed) => handleBanAttribute('breeds', breed)}
          onBanOrigin={(origin) => handleBanAttribute('origins', origin)} 
        />
        
        <button 
          className="discover-btn"
          onClick={fetchRandomCat}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Discover Another Cat'}
        </button>
        
        <BanList 
          banList={banList} 
          onRemoveBan={handleRemoveBan}
        />
      </main>
    </div>
  );
}

export default App;
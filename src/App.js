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
  const [banList, setBanList] = useState([]);

  // API configuration
  const API_KEY = process.env.REACT_APP_CAT_API_KEY;
  const API_URL = 'https://api.thecatapi.com/v1/images/search?has_breeds=1';

  /**
   * Fetches a random cat, skipping banned origins
   * Implements retry logic with rate limiting protection
   */
  const fetchRandomCat = async () => {
    setLoading(true);
    setError(null);
    let attempts = 0;
    const maxAttempts = 10;
    
    try {
      // Basic API key validation
      if (!API_KEY) {
        throw new Error('API key configuration error');
      }

      while (attempts < maxAttempts) {
        try {
          // Add small delay between attempts to avoid rate limiting
          if (attempts > 0) await new Promise(resolve => setTimeout(resolve, 300));
          
          const response = await axios.get(API_URL, {
            headers: { 'x-api-key': API_KEY }
          });
          
          const cat = response.data[0];
          if (cat?.breeds?.length > 0) {
            const breed = cat.breeds[0];
            const origin = breed.origin || 'Unknown';
            
            // Skip if origin is banned
            if (banList.includes(origin)) {
              attempts++;
              continue;
            }
            
            // Found valid cat
            setCurrentCat({
              imageUrl: cat.url,
              name: breed.name,
              weight: breed.weight?.imperial || 'N/A',
              origin,
              lifeSpan: breed.life_span || 'N/A',
              temperament: breed.temperament || 'N/A'
            });
            return;
          }
        } catch (err) {
          console.error(`Attempt ${attempts + 1} failed:`, err);
        }
        attempts++;
      }
      
      // If we get here, all attempts failed
      throw new Error(
        banList.length > 0
          ? "No cats available that match your preferences. Try adjusting your ban list."
          : "Couldn't connect to the cat database. Please try again later."
      );
      
    } catch (err) {
      console.error('Final fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Adds an attribute to ban list
   * @param {string} attribute - The value to ban (e.g., country name)
   */
  const handleBanAttribute = (attribute) => {
    if (attribute && !banList.includes(attribute)) {
      setBanList([...banList, attribute]);
    }
  };

  /**
   * Removes an attribute from ban list
   * @param {string} attribute - The value to unban
   */
  const handleRemoveBan = (attribute) => {
    setBanList(banList.filter(item => item !== attribute));
  };

  // Initial fetch and fetch when ban list changes
  useEffect(() => {
    fetchRandomCat();
  }, [banList]); // Now refetches when ban list changes

  return (
    <div className="App">
      <Header />
      <main className="container">
        {/* Cat Display Area */}
        <CatCard 
          cat={currentCat} 
          loading={loading} 
          error={error} 
          onBanAttribute={handleBanAttribute}
        />
        
        {/* Discover Button */}
        <button 
          className="discover-btn"
          onClick={fetchRandomCat}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Loading...
            </>
          ) : (
            'Discover Another Cat'
          )}
        </button>
        
        {/* Ban List Section */}
        <BanList 
          banList={banList} 
          onRemoveBan={handleRemoveBan} 
        />
      </main>
    </div>
  );
}

export default App;
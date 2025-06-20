
import { useState, useEffect } from 'react';
import axios from 'axios';
import type { APODData, NEOData } from '../types/space';

// NASA API key - using your personal API key
const NASA_API_KEY = 'w8opIIPearbfbRSNobyDNK4J7LmJlhdF9xYcGDAC';
const NASA_APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
const NASA_NEO_URL = `https://api.nasa.gov/neo/rest/v1/feed?api_key=${NASA_API_KEY}`;

export const useSpaceData = () => {
  const [apodData, setApodData] = useState<APODData | null>(null);
  const [neoData, setNeoData] = useState<NEOData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAPOD = async () => {
    try {
      const response = await axios.get(NASA_APOD_URL);
      setApodData(response.data);
    } catch (err) {
      console.error('Failed to fetch APOD:', err);
      // Fallback data
      setApodData({
        title: "Beautiful Space Vista",
        url: "",
        date: new Date().toISOString().split('T')[0],
        explanation: "A stunning view of our cosmos",
        media_type: "image"
      });
    }
  };

  const fetchNEOData = async () => {
    try {
      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 7);
      
      const startDateStr = today.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];
      
      const response = await axios.get(`${NASA_NEO_URL}&start_date=${startDateStr}&end_date=${endDateStr}`);
      
      const asteroids: NEOData[] = [];
      const nearEarthObjects = response.data.near_earth_objects;
      
      Object.keys(nearEarthObjects).forEach(date => {
        nearEarthObjects[date].forEach((neo: any) => {
          const closeApproach = neo.close_approach_data[0];
          asteroids.push({
            id: neo.id,
            name: neo.name,
            closeApproachDate: closeApproach?.close_approach_date || date,
            velocity: parseFloat(closeApproach?.relative_velocity?.kilometers_per_hour || '0'),
            distance: parseFloat(closeApproach?.miss_distance?.kilometers || '0')
          });
        });
      });
      
      setNeoData(asteroids);
    } catch (err) {
      console.error('Failed to fetch NEO data:', err);
      // Generate mock data for demonstration
      const mockAsteroids: NEOData[] = Array.from({ length: 12 }, (_, i) => ({
        id: `mock-${i}`,
        name: `Asteroid ${2000 + i}${String.fromCharCode(65 + i)}`,
        closeApproachDate: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        velocity: Math.random() * 50000 + 10000,
        distance: Math.random() * 1000000 + 100000
      }));
      setNeoData(mockAsteroids);
    }
  };

  const refetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([fetchAPOD(), fetchNEOData()]);
    } catch (err) {
      setError('Failed to fetch space data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchData();
  }, []);

  return {
    apodData,
    neoData,
    loading,
    error,
    refetchData
  };
};

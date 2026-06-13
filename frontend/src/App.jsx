import React, { useState, useEffect } from 'react';

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchOverwatchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/matches');
        const data = await response.json();

        setMatches(data);
      } catch (error) {
        console.error('Error fetching data from the backend:', error);
      }
    };

    fetchOverwatchData();
    }, []);

    return (
      <div style ={{ padding: '35px', fontFamily: 'sans-serif', backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
        <h1 style={{ color: '#f96816' }}>Overwatch Stats Tracker Dashboard</h1>
        <p>The frontend is succesfully connected to the backend!</p>

        <div style={{ marginTop: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <pre>{JSON.stringify(matches, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
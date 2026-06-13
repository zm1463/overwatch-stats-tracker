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
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ color: '#f96816', fontSize: '2.5rem', margin: '0' }}>OVERWATCH STATS HUB</h1>
        <p style={{ color: '#555', marginTop: '5px' }}>Live Full-Stack Match Performance Dashboard</p>
      </header>


      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {matches.map((match) => {
          const isWin = match.victory;
          
          return (
            <div 
              key={match.id} 
              style={{ 
                backgroundColor: '#fff', 
                borderRadius: '12px', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)', 
                padding: '20px', 
                borderLeft: isWin ? '8px solid #2ecc71' : '8px solid #e74c3c',
                transition: 'transform 0.2s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '15px' }}>
                <h2 style={{ margin: '0', fontSize: '1.4rem', color: '#2c3e50', textTransform: 'capitalize' }}>
                  {match.hero}
                </h2>
                <span style={{ 
                  marginLeft: 'auto',
                  padding: '4px 10px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: 'bold',
                  backgroundColor: isWin ? '#e8f8f0' : '#fdedec',
                  color: isWin ? '#27ae60' : '#c0392b'
                }}>
                  {match.result?.toUpperCase()}
                </span>
              </div>

              <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '10px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', color: '#7f8c8d' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase' }}>Role</span>
                  <strong style={{ color: '#34495e', textTransform: 'capitalize' }}>{match.role}</strong>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase' }}>KDA</span>
                  <strong style={{ color: '#34495e' }}>{match.kills} / {match.deaths} / {match.assists}</strong>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase' }}>Map</span>
                  <strong style={{ color: '#34495e', textTransform: 'capitalize' }}>{match.map_name || match.map || 'N/A'}</strong>
                </div>
              </div>
            </div>
          );
        })}

        {matches.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: '12px', color: '#7f8c8d' }}>
            No matches found in the database directory. Use Swagger UI to log a game!
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
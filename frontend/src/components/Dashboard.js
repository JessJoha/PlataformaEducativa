import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [protectedData, setProtectedData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }

      try {
        const response = await fetch('http://23.20.89.9:5000/protected-route', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProtectedData(data);  // Guarda los datos protegidos
        } else {
          setError('Failed to fetch protected data');
        }
      } catch (err) {
        setError('Error: ' + err.message);
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p>{error}</p>}
      {protectedData ? (
        <pre>{JSON.stringify(protectedData, null, 2)}</pre>
      ) : (
        <p>Loading protected data...</p>
      )}
    </div>
  );
};

export default Dashboard;

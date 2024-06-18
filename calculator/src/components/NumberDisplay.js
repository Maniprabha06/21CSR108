import React, { useEffect, useState } from 'react';

const NumberDisplay = () => {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4NjkyNTMzLCJpYXQiOjE3MTg2OTIyMzMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQ0MmYyNzQzLWJiNTAtNGMxOC1iNjE1LTM4MzFhOTJmMjk1ZSIsInN1YiI6Im1hbmlwcmFiaGFzLjIxY3NlQGtvbmd1LmVkdSJ9LCJjb21wYW55TmFtZSI6Imtvbmd1IEVuZ2luZWVyaW5nIENvbGxlZ2UiLCJjbGllbnRJRCI6ImQ0MmYyNzQzLWJiNTAtNGMxOC1iNjE1LTM4MzFhOTJmMjk1ZSIsImNsaWVudFNlY3JldCI6ImZKZ2RCaUppYUNrTW5odFQiLCJvd25lck5hbWUiOiJNYW5pUHJhYmhhIiwib3duZXJFbWFpbCI6Im1hbmlwcmFiaGFzLjIxY3NlQGtvbmd1LmVkdSIsInJvbGxObyI6IjIxQ1NSMTA4In0.ZTHNut6a44Kz39igQnS4qu-_jsJ3PxAbjN_N1dKz28M'; 

  const fetchNumbers = () => {
    setLoading(true);
    fetch('http://20.244.56.144/test/primes', {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data from API:', data.numbers); // Log the numbers array
        setNumbers(data.numbers); // Update state with the 'numbers' array
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Optionally, you can call fetchNumbers here to fetch numbers on component mount
    // fetchNumbers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Numbers</h1>
      <button onClick={fetchNumbers}>Fetch Prime Numbers</button>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

export default NumberDisplay;

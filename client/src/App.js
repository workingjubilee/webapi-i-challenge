import React, { useState, useEffect } from 'react';

const App = props => {
  const [array, setArray] = useState([]);

  useEffect(
    () => {
      const getUsers = fetch('http://localhost:4000/api/users')
        .then(response => response.json())
        .then(response => setArray(response))
    },
    []
  );

  useEffect(
    () => {
      console.log(array);
    },
    [array]
  );

  return (
    <div>
    { array ? 
      <p>{JSON.stringify(array)}</p> :
      <p>Loading...</p> }
    </div>
  );
};

export default App;

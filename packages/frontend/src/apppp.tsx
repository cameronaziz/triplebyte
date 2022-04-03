import { useEffect, useState, VFC } from 'react';
import './app.css';

const App: VFC = () => {
  const [data, setData] = useState(null)

  useEffect(
    () => {
     getData()
    },
    [],
  );

  const getData = async () => {
    const response = await fetch('http://localhost:4000/get-data')
    const json = await response.json()
    setData(json)
  }

  return (
    <div className="container">
      <h1>Well, hello.</h1>
      <img className="cat" alt="cat" src="images/cat.png" />
      <code className="code">{JSON.stringify(data, null, 2)}</code>
    </div>
  );
};

export default App;

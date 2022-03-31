import { useEffect, useState, VFC } from 'react';



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
    <div>
      Hello World
      <div>{JSON.stringify(data, null, 2)}</div>
    </div>
  );
};

export default App;

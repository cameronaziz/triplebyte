import { ChangeEvent, useEffect, useRef, useState, VFC } from 'react';
import './app.css';

type Data = {
  name: string;
}

const App: VFC = () => {
  const [name, setName] = useState<string>('');
  const inputRef =  useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(
    () => {
     getData()
    },
    [],
  );

  useEffect(
    () => {
      window.addEventListener('click', handleClickOutside);

      return () => {
        window.removeEventListener('click', handleClickOutside);
      };
    },
    [isEditing]
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (!isEditing) {
      return;
    }

    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      handleOnSubmit();
      setIsEditing(false);
    }
  }

  const getData = async () => {
    const response = await fetch('http://localhost:4000/get-data')
    const json = await response.json() as Data
    console.log(json)
    setName(json.name)
  };

  const handleOnClick = () => {
    setIsEditing(true);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  const handleOnSubmit = () => {
    // fetch(
    //   'http://localhost:4000/set-data',
    //   {
    //     method: 'POST', body: JSON.stringify({ name }),
    //   },
    // );
  };

  console.log(isEditing)
  return (
    <div className="container">
      <h1>Well, hello.</h1>
      <img className="cat" alt="cat" src="images/cat.png" />
      <code className="code">My name is {isEditing ?
        <input className="input" ref={inputRef} value={name} onChange={handleOnChange} />
        :
        <span onClick={handleOnClick}>{name}</span>
      }</code>
    </div>
  );
};

export default App;

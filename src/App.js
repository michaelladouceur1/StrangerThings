// LIBRARY IMPORTS 
import React from 'react';
import {useState} from 'react';

// JS IMPORTS LOCAL 
import Header from './components/Header';
import Content from './components/Content'


// CSS IMPORTS 
import './App.css';

function App() {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [posts, setPosts] = useState([]);


  return (
    <div className='container'>
      <Header
      setUsername={setUsername}
      setPassword={setPassword}
      username={username}
      password={password} />
      <Content />
    </div>
  );
}

export default App;

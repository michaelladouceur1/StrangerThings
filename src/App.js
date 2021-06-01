// LIBRARY IMPORTS 
import React from 'react';
import {useState, useEffect} from 'react';

// JS IMPORTS LOCAL 
import Header from './components/Header';
import Content from './components/Content';
import Posts from './components/Posts';
import NewPost from './components/NewPost';
import {getPosts} from './api';


// CSS IMPORTS 
import './App.css';

function App() {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [currentUser, setCurrentUser] = useState('');
  let [posts, setPosts] = useState([]);

  useEffect(async () => {
    let posts = await getPosts();
    setPosts(posts);
  }, [])

  return (
    <div className='container'>
      <Header
      setUsername={setUsername}
      setPassword={setPassword}
      setCurrentUser={setCurrentUser}
      username={username}
      password={password}
      currentUser={currentUser}
      posts={posts}
      setPosts={setPosts} />
      {/* <Content
      posts={posts} /> */}
      <main>
        <Posts
        posts={posts}
        currentUser={currentUser} />
        <NewPost
        setPosts={setPosts} />
      </main>
    </div>
  );
}

export default App;

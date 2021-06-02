// LIBRARY IMPORTS 
import React from 'react';
import {useState, useEffect} from 'react';
import {
  Route,
  Switch,
  useParams
} from 'react-router-dom';

// JS IMPORTS LOCAL 
import Header from './components/Header';
import Posts from './components/Posts';
import NewPost from './components/NewPost';
import FeaturedPost from './components/FeaturedPost';
import {getPosts} from './api';


// CSS IMPORTS 
import './App.css';

function App() {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [token, setToken] = useState('');
  let [currentUser, setCurrentUser] = useState('');
  let [posts, setPosts] = useState([]);
  let [filteredPosts, setFilteredPosts] = useState([])

  useEffect(async () => {
    let posts = await getPosts();
    setPosts(posts);
    setFilteredPosts(posts);
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
        <Switch>
          <Route exact path='/'>
            <Posts
            posts={posts}
            filteredPosts={filteredPosts}
            currentUser={currentUser}
            setPosts={setPosts}
            setFilteredPosts={setFilteredPosts} />
          </Route>
          <Route exact path='/:id' render={(routeProps) => <FeaturedPost posts={posts} {...routeProps}/>} />
        </Switch>
        <NewPost
        setPosts={setPosts} />
      </main>
    </div>
  );
}

export default App;

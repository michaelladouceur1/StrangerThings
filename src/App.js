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
import Account from './components/Account';
import {getPosts, getMeData, setToken} from './api';
import {getLocalToken} from './utils';


// CSS IMPORTS 
import './App.css';

function App() {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  // let [token, setToken] = useState('');
  let [currentUser, setCurrentUser] = useState('');
  let [posts, setPosts] = useState([]);
  let [filteredPosts, setFilteredPosts] = useState([])
  let [accountData, setAccountData] = useState({});

  useEffect(async () => {
    let posts = await getPosts();
    setPosts(posts);
    setFilteredPosts(posts);
    if(checkLocalToken()) {
      setCurrentUser(getLocalToken('user'))
      let data = await getMeData();
      setAccountData(data);
    }
  }, [])

  function checkLocalToken() {
    let token = getLocalToken('token')
    if(token !== '') {
      setToken(token)
      return true
    }
  }

  return (
    <div className='container'>
      <Header
      setUsername={setUsername}
      setPassword={setPassword}
      setCurrentUser={setCurrentUser}
      setAccountData={setAccountData}
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
          <Route exact path='/fp/:id' render={(routeProps) => <FeaturedPost posts={posts} {...routeProps}/>} />
          <Route exact path='/me'>
            <Account
            accountData={accountData}
            posts={posts}
            filteredPosts={filteredPosts}
            currentUser={currentUser}
            setPosts={setPosts}
            setFilteredPosts={setFilteredPosts} />
          </Route>
        </Switch>
        <NewPost
        setPosts={setPosts}
        setFilteredPosts={setFilteredPosts} />
      </main>
    </div>
  );
}

export default App;

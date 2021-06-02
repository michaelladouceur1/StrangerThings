# Future Features
- Add localStorage for login token
- Search and filter functionality
- User data page (posts and messages)
- Finish FeaturedPosts page and functionality

# Refactor 
- Change functionality from using author.username to isAuthor from API (Posts.js ~ 36)
- Move event listener functions to separate functions in components
- Move PostCard to separate file
- Ask Travis or Alan about how to use useEffect instead of setFilteredPosts

# Bugs
- Messages not showing in object even after successful API call (Posts.js ~ 68 ; FeaturedPost.js ~ 23)
- Why is switch on App.js calling featuredpost and account when going to http route? (App.js ~ 59)
- Why are useState components not working in subcomponents (ie: accountData won't work in Account.js)
- ~~Location for a new post is not reverting to '[On Request]' when left blank (NewPost.js ~ 13)~~
- ~~New post form not clearing when submitted and function invoked (NewPost.js ~ 38)~~
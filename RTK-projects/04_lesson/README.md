```javascript
// find the post object
export const selectPostById = (state, postId) => {
  state.posts.posts.find((post) => post.id === postId);
};

const post = useSelector((state) => selectPostById(state, postId));

// another solution
// import postId using react-router-dom useParam() hook
const { postId } = useParam();

//import the posts array
const posts = useSelector((state) => state.posts.posts);

const post = posts.find((post) => post.id === postId);
//=> the post's constant returns a posts' element matches the postId value

// INDEX.JS
// wrapping the App component with Router and Routes

// App.js

<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<PostsList />} />

    <Route path="post">
      <Route index element={<AddPostForm />} />
      <Route path=":postId" element={<SinglePostPage />} />
    </Route>
  </Route>
</Routes>;
```

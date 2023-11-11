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

create branch pages using react router for the following:

- create post page => AddPostForm.js /post

- post page => for a single post using react router params hook /post/:postId

- layout page => the whole page container

===========================================

create deletion action

- create async action and call the id from the initial post

- return the data of the response

- create addCase extrarReducers

- filter the existing state.posts without the deleted element

- crerate function handles the deletion dispatch

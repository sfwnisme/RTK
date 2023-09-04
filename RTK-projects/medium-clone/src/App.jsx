import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './components'
import PostsList from './features/posts/PostsList'
import PostForm from './features/posts/PostForm'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path='create-post' element={<PostForm />} />
      </Route>
    </Routes>
  )
}

export default App

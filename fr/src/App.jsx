import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Layout from './pages/Layout'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App

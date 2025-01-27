import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Layout from './pages/Layout'
import ProductDetail from './pages/ProductDetail'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path:"product",
        element: <ProductDetail />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App

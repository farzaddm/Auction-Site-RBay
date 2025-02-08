import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './pages/Layout';
import ProductDetail from './pages/ProductDetail';
import UserProfile from './pages/UserProfile';
import UserDashboard from './pages/UserDashboard';
import NewItem from './pages/NewItem';
import DiscoverPage from './pages/DiscoverPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'product',
        element: <ProductDetail />,
      },
      {
        path: 'user',
        element: <UserProfile />,
      },
      {
        path: 'dashboard',
        element: <UserDashboard />,
      },
      {
        path: 'new',
        element: <NewItem />,
      },
      {
        path: 'discover',
        element: <DiscoverPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

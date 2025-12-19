import { createBrowserRouter } from 'react-router-dom';
import Home from '@pages/Home';
import { LogIn, LogOut } from '@components/Modal';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/login',
        element: <LogIn />
      },
      {
        path: '/logout',
        element: <LogOut />
      },
    ]
  }
]);

export default router;
